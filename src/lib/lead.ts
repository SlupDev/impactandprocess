import { z } from 'zod'
import type { Attribution } from '@/lib/attribution'
import { buildConsentText } from '@/lib/consent'
import type { SendResult } from '@/lib/email'
import type { KcalVariant } from '@/lib/types'

export const HONEYPOT_FIELD = 'site_web'
export const RATE_LIMIT_MAX = 5
export const RATE_LIMIT_WINDOW_SECONDS = 60 * 60
export const DOWNLOAD_TTL_DAYS = 7

export const leadInputSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  prenom: z.string().trim().min(1, 'prénom manquant').max(80),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(254)
    .pipe(z.email('adresse invalide')),
  newsletter: z.boolean(),
  variant: z.union([z.literal('1800'), z.literal('2100')]).nullable(),
})

export type LeadInput = z.infer<typeof leadInputSchema>

export type LeadErrorCode =
  | 'guide-inconnu'
  | 'prenom-invalide'
  | 'email-invalide'
  | 'variante-invalide'
  | 'limite-atteinte'
  | 'envoi-impossible'
  | 'erreur-technique'

export type LeadOutcome =
  | { kind: 'livre'; slug: string; dejaConnu: boolean }
  /** Honeypot rempli : on ne stocke rien et on n’en dit rien au robot. */
  | { kind: 'ignore'; slug: string }
  | { kind: 'erreur'; code: LeadErrorCode; message: string }

export const LEAD_ERROR_MESSAGES: Record<LeadErrorCode, string> = {
  'guide-inconnu':
    'Ce guide n’existe plus. Retourne à la liste des guides et choisis-en un autre.',
  'prenom-invalide': 'Il manque ton prénom. Il sert uniquement à personnaliser l’email.',
  'email-invalide':
    'Cette adresse n’a pas l’air valide. Vérifie qu’elle contient un @ et pas d’espace.',
  'variante-invalide': 'Choisis une des deux versions, 1 800 ou 2 100 kcal, avant de continuer.',
  'limite-atteinte':
    'Cinq guides demandés en une heure depuis cette connexion. Attends une heure, ou écris-moi et je te les envoie à la main.',
  'envoi-impossible':
    'Ton inscription est bien enregistrée, mais l’email n’a pas pu partir. Réessaie dans deux minutes, ou écris-moi et je te l’envoie à la main.',
  'erreur-technique':
    'La connexion au serveur a échoué. Rien n’a été enregistré. Réessaie dans un instant.',
}

export interface GuideRef {
  slug: string
  title: string
  hasKcalVariant: boolean
  storagePathFor(variant: KcalVariant | null): string
}

export interface UpsertLeadInput {
  email: string
  firstName: string
  newsletterOptIn: boolean
  consentText: string
  guideSlug: string
  ipHash: string
  userAgent: string | null
  attribution: Attribution
}

export interface UpsertLeadResult {
  id: string
  unsubscribeToken: string
  /** Faux quand l’adresse était déjà en base : on renvoie le guide sans créer de doublon. */
  created: boolean
}

export interface CreateDownloadInput {
  leadId: string
  guideSlug: string
  variant: KcalVariant | null
  storagePath: string
  token: string
  expiresAt: Date
}

export interface LeadDeps {
  findGuide(slug: string): GuideRef | undefined
  consumeRateLimit(ipHash: string): Promise<number>
  upsertLead(input: UpsertLeadInput): Promise<UpsertLeadResult>
  createDownload(input: CreateDownloadInput): Promise<void>
  sendGuide(input: {
    email: string
    firstName: string
    guideTitle: string
    variant: KcalVariant | null
    token: string
    unsubscribeToken: string
  }): Promise<SendResult>
  newToken(): string
  now(): Date
}

export interface LeadContext {
  ipHash: string
  userAgent: string | null
  attribution: Attribution
  honeypot: string
}

/**
 * Orchestration de la capture. Aucune dépendance à Supabase, Resend ou Next :
 * les cas limites (doublon, honeypot, rate limit, envoi KO) se testent en isolation.
 */
export async function processLead(
  raw: unknown,
  context: LeadContext,
  deps: LeadDeps,
): Promise<LeadOutcome> {
  const parsed = leadInputSchema.safeParse(raw)

  if (!parsed.success) {
    const field = parsed.error.issues[0]?.path[0]
    const code: LeadErrorCode =
      field === 'prenom' ? 'prenom-invalide' : field === 'email' ? 'email-invalide' : 'guide-inconnu'
    return { kind: 'erreur', code, message: LEAD_ERROR_MESSAGES[code] }
  }

  const input = parsed.data
  const guide = deps.findGuide(input.slug)
  if (!guide) {
    return {
      kind: 'erreur',
      code: 'guide-inconnu',
      message: LEAD_ERROR_MESSAGES['guide-inconnu'],
    }
  }

  // Honeypot : on répond comme à un humain, sans rien écrire ni envoyer.
  if (context.honeypot.trim() !== '') {
    return { kind: 'ignore', slug: guide.slug }
  }

  if (guide.hasKcalVariant && input.variant === null) {
    return {
      kind: 'erreur',
      code: 'variante-invalide',
      message: LEAD_ERROR_MESSAGES['variante-invalide'],
    }
  }

  const variant = guide.hasKcalVariant ? input.variant : null

  const remaining = await deps.consumeRateLimit(context.ipHash)
  if (remaining < 0) {
    return {
      kind: 'erreur',
      code: 'limite-atteinte',
      message: LEAD_ERROR_MESSAGES['limite-atteinte'],
    }
  }

  const consentText = buildConsentText({
    guideTitle: guide.title,
    newsletterOptIn: input.newsletter,
  })

  const lead = await deps.upsertLead({
    email: input.email,
    firstName: input.prenom,
    newsletterOptIn: input.newsletter,
    consentText,
    guideSlug: guide.slug,
    ipHash: context.ipHash,
    userAgent: context.userAgent,
    attribution: context.attribution,
  })

  const token = deps.newToken()
  const expiresAt = new Date(deps.now().getTime() + DOWNLOAD_TTL_DAYS * 24 * 60 * 60 * 1000)

  await deps.createDownload({
    leadId: lead.id,
    guideSlug: guide.slug,
    variant,
    storagePath: guide.storagePathFor(variant),
    token,
    expiresAt,
  })

  const sent = await deps.sendGuide({
    email: input.email,
    firstName: input.prenom,
    guideTitle: guide.title,
    variant,
    token,
    unsubscribeToken: lead.unsubscribeToken,
  })

  if (!sent.ok) {
    return {
      kind: 'erreur',
      code: 'envoi-impossible',
      message: LEAD_ERROR_MESSAGES['envoi-impossible'],
    }
  }

  return { kind: 'livre', slug: guide.slug, dejaConnu: !lead.created }
}
