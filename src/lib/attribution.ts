import { z } from 'zod'

/**
 * Cookie first-party posé par `src/proxy.ts` à la première visite seulement.
 * Il sert à rattacher un lead à sa source Instagram, ce que l’ancien site ne savait pas faire.
 */
export const ATTRIBUTION_COOKIE = 'ip_attribution'
export const ATTRIBUTION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30

const field = z.string().trim().min(1).max(180).optional()

export const attributionSchema = z.object({
  utm_source: field,
  utm_medium: field,
  utm_campaign: field,
  utm_content: field,
  fbclid: field,
  referrer: field,
})

export type Attribution = z.infer<typeof attributionSchema>

export const ATTRIBUTION_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'fbclid',
  'referrer',
] as const

/** Lecture tolérante : un cookie corrompu ne doit jamais casser une soumission. */
export function parseAttribution(value: string | undefined): Attribution {
  if (!value) return {}
  try {
    const parsed = attributionSchema.safeParse(JSON.parse(value))
    return parsed.success ? parsed.data : {}
  } catch {
    return {}
  }
}

export function attributionColumns(attribution: Attribution) {
  return {
    utm_source: attribution.utm_source ?? null,
    utm_medium: attribution.utm_medium ?? null,
    utm_campaign: attribution.utm_campaign ?? null,
    utm_content: attribution.utm_content ?? null,
    fbclid: attribution.fbclid ?? null,
    referrer: attribution.referrer ?? null,
  }
}
