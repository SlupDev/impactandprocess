import 'server-only'

import { attributionColumns } from '@/lib/attribution'
import { getGuide, storagePath } from '@/lib/content'
import { sendGuideEmail } from '@/lib/email'
import { clientEnv } from '@/lib/env'
import {
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW_SECONDS,
  type CreateDownloadInput,
  type GuideRef,
  type LeadDeps,
  type UpsertLeadInput,
  type UpsertLeadResult,
} from '@/lib/lead'
import { createDownloadToken } from '@/lib/request-identity'
import { getSupabaseAdminClient } from '@/lib/supabase/admin'

function downloadUrl(token: string): string {
  return new URL(`/api/download/${token}`, clientEnv.NEXT_PUBLIC_SITE_URL).toString()
}

function unsubscribeUrl(token: string): string {
  return new URL(`/api/desinscription/${token}`, clientEnv.NEXT_PUBLIC_SITE_URL).toString()
}

function findGuide(slug: string): GuideRef | undefined {
  const guide = getGuide(slug)
  if (!guide) return undefined
  return {
    slug: guide.slug,
    title: guide.title,
    hasKcalVariant: guide.hasKcalVariant,
    storagePathFor: (variant) => storagePath(guide, variant),
  }
}

async function consumeRateLimit(ipHash: string): Promise<number> {
  const { data, error } = await getSupabaseAdminClient().rpc('consume_rate_limit', {
    p_bucket: 'lead',
    p_ip_hash: ipHash,
    p_limit: RATE_LIMIT_MAX,
    p_window: `${RATE_LIMIT_WINDOW_SECONDS} seconds`,
  })

  // Une panne du compteur ne doit pas bloquer la capture : on laisse passer et on trace.
  if (error) {
    console.error('[rate-limit] compteur indisponible', error.message)
    return RATE_LIMIT_MAX
  }
  return typeof data === 'number' ? data : RATE_LIMIT_MAX
}

async function upsertLead(input: UpsertLeadInput): Promise<UpsertLeadResult> {
  const db = getSupabaseAdminClient()

  const { data: existing, error: readError } = await db
    .from('leads')
    .select('id, unsubscribe_token, newsletter_opt_in')
    .eq('email', input.email)
    .maybeSingle()

  if (readError) throw new Error(`lecture du lead impossible : ${readError.message}`)

  if (existing) {
    // On ne repasse jamais `newsletter_opt_in` à false ici : décocher la case n’est pas
    // une demande de désinscription, qui a son propre lien.
    const { error } = await db
      .from('leads')
      .update({
        first_name: input.firstName,
        newsletter_opt_in: existing.newsletter_opt_in || input.newsletterOptIn,
        consent_text: input.consentText,
        consent_at: new Date().toISOString(),
        ip_hash: input.ipHash,
        user_agent: input.userAgent,
      })
      .eq('id', existing.id)

    if (error) throw new Error(`mise à jour du lead impossible : ${error.message}`)

    return { id: existing.id, unsubscribeToken: existing.unsubscribe_token, created: false }
  }

  const { data, error } = await db
    .from('leads')
    .insert({
      email: input.email,
      first_name: input.firstName,
      newsletter_opt_in: input.newsletterOptIn,
      consent_text: input.consentText,
      first_guide_slug: input.guideSlug,
      ip_hash: input.ipHash,
      user_agent: input.userAgent,
      ...attributionColumns(input.attribution),
    })
    .select('id, unsubscribe_token')
    .single()

  if (error || !data) throw new Error(`création du lead impossible : ${error?.message}`)

  return { id: data.id, unsubscribeToken: data.unsubscribe_token, created: true }
}

async function createDownload(input: CreateDownloadInput): Promise<void> {
  const { error } = await getSupabaseAdminClient().from('lead_downloads').insert({
    lead_id: input.leadId,
    guide_slug: input.guideSlug,
    variant: input.variant,
    storage_path: input.storagePath,
    token: input.token,
    expires_at: input.expiresAt.toISOString(),
  })

  if (error) throw new Error(`création du lien de téléchargement impossible : ${error.message}`)
}

export const leadDeps: LeadDeps = {
  findGuide,
  consumeRateLimit,
  upsertLead,
  createDownload,
  sendGuide: ({ email, firstName, guideTitle, variant, token, unsubscribeToken }) =>
    sendGuideEmail(email, {
      firstName,
      guideTitle,
      variantLabel: variant ? `${variant} kcal` : null,
      downloadUrl: downloadUrl(token),
      unsubscribeUrl: unsubscribeUrl(unsubscribeToken),
    }),
  newToken: createDownloadToken,
  now: () => new Date(),
}
