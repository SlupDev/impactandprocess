import { describe, expect, it, vi } from 'vitest'
import {
  processLead,
  RATE_LIMIT_MAX,
  type LeadContext,
  type LeadDeps,
  type UpsertLeadResult,
} from '@/lib/lead'
import { downloadState } from '@/lib/download'

const GUIDE = {
  slug: 'sos-express',
  title: 'Semaine SOS Express',
  hasKcalVariant: true,
  storagePathFor: (v: string | null) => `sos-express-${v ?? '1800'}.pdf`,
}

const CONTEXT: LeadContext = {
  ipHash: 'a'.repeat(64),
  userAgent: 'vitest',
  attribution: { utm_source: 'ig', utm_medium: 'social' },
  honeypot: '',
}

const INPUT = {
  slug: 'sos-express',
  prenom: 'Julien',
  email: 'Julien@Exemple.FR',
  newsletter: false,
  variant: '1800' as const,
}

function makeDeps(overrides: Partial<LeadDeps> = {}) {
  const upsertLead = vi.fn<LeadDeps['upsertLead']>(
    async (): Promise<UpsertLeadResult> => ({ id: 'lead-1', unsubscribeToken: 'uuid-1', created: true }),
  )
  const createDownload = vi.fn<LeadDeps['createDownload']>(async () => { })
  const sendGuide = vi.fn<LeadDeps['sendGuide']>(async () => ({ ok: true as const, id: 'mail-1' }))
  const consumeRateLimit = vi.fn<LeadDeps['consumeRateLimit']>(async () => RATE_LIMIT_MAX - 1)

  const deps: LeadDeps = {
    findGuide: (slug) => (slug === GUIDE.slug ? GUIDE : undefined),
    consumeRateLimit,
    upsertLead,
    createDownload,
    sendGuide,
    newToken: () => 'j'.repeat(43),
    now: () => new Date('2026-08-10T12:00:00Z'),
    ...overrides,
  }

  return { deps, upsertLead, createDownload, sendGuide, consumeRateLimit }
}

describe('processLead', () => {
  it('livre le guide et normalise l’email', async () => {
    const { deps, upsertLead, createDownload, sendGuide } = makeDeps()

    const outcome = await processLead(INPUT, CONTEXT, deps)

    expect(outcome).toEqual({ kind: 'livre', slug: 'sos-express', dejaConnu: false })
    expect(upsertLead.mock.calls[0]![0].email).toBe('julien@exemple.fr')
    expect(createDownload).toHaveBeenCalledOnce()
    expect(sendGuide).toHaveBeenCalledOnce()
  })

  it('enregistre le libellé exact du consentement, pas un booléen', async () => {
    const { deps, upsertLead } = makeDeps()

    await processLead({ ...INPUT, newsletter: true }, CONTEXT, deps)

    const consent = upsertLead.mock.calls[0]![0].consentText ?? ''
    expect(consent).toContain('lettre du lundi')
    expect(consent).toContain('cochée')
    expect(consent).toContain('Semaine SOS Express')
  })

  it('email en doublon : aucun doublon créé, guide renvoyé quand même', async () => {
    const { deps, createDownload, sendGuide } = makeDeps({
      upsertLead: async () => ({ id: 'lead-1', unsubscribeToken: 'uuid-1', created: false }),
    })

    const outcome = await processLead(INPUT, CONTEXT, deps)

    expect(outcome).toEqual({ kind: 'livre', slug: 'sos-express', dejaConnu: true })
    expect(createDownload).toHaveBeenCalledOnce()
    expect(sendGuide).toHaveBeenCalledOnce()
  })

  it('honeypot rempli : rien n’est écrit, rien n’est envoyé', async () => {
    const { deps, upsertLead, createDownload, sendGuide, consumeRateLimit } = makeDeps()

    const outcome = await processLead(INPUT, { ...CONTEXT, honeypot: 'http://spam' }, deps)

    expect(outcome).toEqual({ kind: 'ignore', slug: 'sos-express' })
    expect(upsertLead).not.toHaveBeenCalled()
    expect(createDownload).not.toHaveBeenCalled()
    expect(sendGuide).not.toHaveBeenCalled()
    expect(consumeRateLimit).not.toHaveBeenCalled()
  })

  it('rate limit dépassé : message explicite, aucune écriture', async () => {
    const { deps, upsertLead, sendGuide } = makeDeps({ consumeRateLimit: async () => -1 })

    const outcome = await processLead(INPUT, CONTEXT, deps)

    expect(outcome).toMatchObject({ kind: 'erreur', code: 'limite-atteinte' })
    expect(upsertLead).not.toHaveBeenCalled()
    expect(sendGuide).not.toHaveBeenCalled()
  })

  it('email invalide : erreur ciblée sur le champ email', async () => {
    const { deps, upsertLead } = makeDeps()

    const outcome = await processLead({ ...INPUT, email: 'julien arobase exemple' }, CONTEXT, deps)

    expect(outcome).toMatchObject({ kind: 'erreur', code: 'email-invalide' })
    expect(upsertLead).not.toHaveBeenCalled()
  })

  it('guide inconnu : refus avant toute écriture', async () => {
    const { deps, upsertLead } = makeDeps()

    const outcome = await processLead({ ...INPUT, slug: 'guide-fantome' }, CONTEXT, deps)

    expect(outcome).toMatchObject({ kind: 'erreur', code: 'guide-inconnu' })
    expect(upsertLead).not.toHaveBeenCalled()
  })

  it('variante kcal manquante sur un guide qui en a deux', async () => {
    const { deps } = makeDeps()

    const outcome = await processLead({ ...INPUT, variant: null }, CONTEXT, deps)

    expect(outcome).toMatchObject({ kind: 'erreur', code: 'variante-invalide' })
  })

  it('échec d’envoi : le lead est conservé, l’utilisateur est prévenu', async () => {
    const { deps, upsertLead } = makeDeps({
      sendGuide: async () => ({ ok: false as const, reason: 'resend down' }),
    })

    const outcome = await processLead(INPUT, CONTEXT, deps)

    expect(outcome).toMatchObject({ kind: 'erreur', code: 'envoi-impossible' })
    expect(upsertLead).toHaveBeenCalledOnce()
  })

  it('le lien expire sept jours après la demande', async () => {
    const { deps, createDownload } = makeDeps()

    await processLead(INPUT, CONTEXT, deps)

    expect(createDownload.mock.calls[0]![0].expiresAt.toISOString()).toBe(
      '2026-08-17T12:00:00.000Z',
    )
    expect(createDownload.mock.calls[0]![0].storagePath).toBe('sos-express-1800.pdf')
  })
})

describe('downloadState', () => {
  const now = new Date('2026-08-10T12:00:00Z')
  const token = 'j'.repeat(43)

  it('jeton tronqué', () => {
    expect(downloadState('court', null, now)).toBe('jeton-invalide')
  })

  it('jeton inexistant', () => {
    expect(downloadState(token, null, now)).toBe('introuvable')
  })

  it('jeton expiré', () => {
    expect(downloadState(token, { expires_at: '2026-08-03T12:00:00Z' }, now)).toBe('expire')
  })

  it('expiration à la seconde près : périmé dès l’échéance', () => {
    expect(downloadState(token, { expires_at: '2026-08-10T12:00:00Z' }, now)).toBe('expire')
  })

  it('jeton valide', () => {
    expect(downloadState(token, { expires_at: '2026-08-17T12:00:00Z' }, now)).toBe('valide')
  })

  it('date corrompue : traitée comme expirée, jamais comme valide', () => {
    expect(downloadState(token, { expires_at: 'pas-une-date' }, now)).toBe('expire')
  })
})
