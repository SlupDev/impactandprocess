'use server'

import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { ATTRIBUTION_COOKIE, parseAttribution } from '@/lib/attribution'
import {
  HONEYPOT_FIELD,
  LEAD_ERROR_MESSAGES,
  processLead,
  type LeadErrorCode,
} from '@/lib/lead'
import { leadDeps } from '@/lib/lead-repository'
import { hashIp, readClientIp } from '@/lib/request-identity'

export type LeadFormState =
  | { status: 'repos' }
  | { status: 'erreur'; code: LeadErrorCode; message: string }

export const LEAD_INITIAL_STATE: LeadFormState = { status: 'repos' }

function readVariant(formData: FormData): '1800' | '2100' | null {
  const raw = formData.get('variant')
  return raw === '1800' || raw === '2100' ? raw : null
}

/**
 * Server Action de capture. Elle fonctionne sans JavaScript : le navigateur poste le
 * formulaire, l’action répond par une redirection vers /merci/[slug] ou re-rend la page
 * avec l’erreur. L’ancien site avait perdu toute sa capture sur une erreur JS.
 */
export async function submitLead(
  _previous: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const requestHeaders = await headers()
  const cookieStore = await cookies()

  const slug = String(formData.get('slug') ?? '')

  const context = {
    ipHash: hashIp(readClientIp(requestHeaders)),
    userAgent: requestHeaders.get('user-agent'),
    attribution: parseAttribution(cookieStore.get(ATTRIBUTION_COOKIE)?.value),
    honeypot: String(formData.get(HONEYPOT_FIELD) ?? ''),
  }

  const input = {
    slug,
    prenom: String(formData.get('prenom') ?? ''),
    email: String(formData.get('email') ?? ''),
    newsletter: formData.get('newsletter') != null,
    variant: readVariant(formData),
  }

  let outcome
  try {
    outcome = await processLead(input, context, leadDeps)
  } catch (cause) {
    console.error('[lead] échec technique', cause)
    return {
      status: 'erreur',
      code: 'erreur-technique',
      message: LEAD_ERROR_MESSAGES['erreur-technique'],
    }
  }

  if (outcome.kind === 'erreur') {
    return { status: 'erreur', code: outcome.code, message: outcome.message }
  }

  // `redirect` lève : rien ne doit venir après.
  const suffixe = outcome.kind === 'livre' && outcome.dejaConnu ? '?deja=1' : ''
  redirect(`/merci/${outcome.slug}${suffixe}`)
}
