import { createHash, randomBytes } from 'node:crypto'
import { serverEnv } from '@/lib/env'

/**
 * Hash salé de l’IP. Règle 22 : jamais d’IP brute en base, ni en log.
 * Le sel vit dans l’environnement ; le changer invalide tous les compteurs, ce qui est voulu.
 */
export function hashIp(ip: string): string {
  return createHash('sha256').update(`${serverEnv.IP_HASH_SALT}:${ip}`).digest('hex')
}

/**
 * Première IP de `x-forwarded-for`. En cas d’absence on renvoie une constante :
 * mieux vaut limiter tout le monde ensemble que ne rien limiter du tout.
 */
export function readClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }
  return headers.get('x-real-ip')?.trim() || 'inconnue'
}

/** Jeton de téléchargement : 256 bits d’aléa, stockés tels quels et jamais devinables. */
export function createDownloadToken(): string {
  return randomBytes(32).toString('base64url')
}
