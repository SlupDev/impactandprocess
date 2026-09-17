export const DOWNLOAD_TOKEN_MIN_LENGTH = 32

export type DownloadState = 'jeton-invalide' | 'introuvable' | 'expire' | 'valide'

export interface DownloadRecord {
  expires_at: string
}

/**
 * Décision pure : un jeton tronqué, inconnu ou périmé doit produire un message,
 * jamais une 500 ni un fichier.
 */
export function downloadState(
  token: string | undefined,
  record: DownloadRecord | null,
  now: Date,
): DownloadState {
  if (!token || token.length < DOWNLOAD_TOKEN_MIN_LENGTH) return 'jeton-invalide'
  if (!record) return 'introuvable'

  const expiry = new Date(record.expires_at).getTime()
  if (!Number.isFinite(expiry) || expiry <= now.getTime()) return 'expire'

  return 'valide'
}
