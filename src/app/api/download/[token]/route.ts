import { NextResponse } from 'next/server'
import { downloadState } from '@/lib/download'
import { serverEnv } from '@/lib/env'
import { getSupabaseAdminClient } from '@/lib/supabase/admin'

/** Durée de vie de l’URL signée Supabase : le temps de cliquer, pas de la partager. */
const SIGNED_URL_TTL_SECONDS = 300

function page(status: number, titre: string, message: string) {
  const body = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${titre} &mdash; Impact &amp; Process</title>
<style>
  :root { color-scheme: light }
  body { margin:0; padding:2.5rem 1.25rem; background:#FBFBFB; color:#1D3250;
         font:1.0625rem/1.6 system-ui, -apple-system, "Segoe UI", sans-serif; }
  main { max-width:34rem; margin:0 auto; }
  h1 { font-size:1.75rem; line-height:1.15; margin:0 0 1rem; font-style:italic; }
  a.cta { display:inline-block; margin-top:1.5rem; background:#FFDE59; color:#000;
          border:2px solid #000; border-radius:999px; padding:.9rem 1.5rem;
          font-weight:800; text-transform:uppercase; letter-spacing:.03em; text-decoration:none; }
  a.cta:focus-visible { outline:3px solid #1D3250; outline-offset:3px; }
</style>
</head>
<body>
<main>
  <h1>${titre}</h1>
  <p>${message}</p>
  <a class="cta" href="/guides">Redemander le guide</a>
</main>
</body>
</html>`

  return new NextResponse(body, {
    status,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'x-robots-tag': 'noindex',
      'cache-control': 'no-store',
    },
  })
}

export async function GET(_request: Request, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params

  const db = getSupabaseAdminClient()

  let download: {
    id: string
    storage_path: string
    expires_at: string
    downloaded_at: string | null
    download_count: number
  } | null = null

  if (token && token.length >= 32) {
    const { data, error } = await db
      .from('lead_downloads')
      .select('id, storage_path, expires_at, downloaded_at, download_count')
      .eq('token', token)
      .maybeSingle()

    if (error) {
      console.error('[download] lecture impossible', error.message)
      return page(
        500,
        'Le téléchargement est indisponible',
        'Un problème technique empêche la récupération du fichier. Réessaie dans quelques minutes.',
      )
    }
    download = data
  }

  const etat = downloadState(token, download, new Date())

  if (etat === 'jeton-invalide') {
    return page(
      404,
      'Ce lien n’est pas valide',
      'Le lien semble incomplet. Redemande le guide depuis le site&nbsp;: c’est immédiat.',
    )
  }

  if (etat === 'introuvable') {
    return page(
      404,
      'Ce lien n’existe pas',
      'Il a peut-être été tronqué par ton client mail. Redemande le guide depuis le site&nbsp;: c’est immédiat.',
    )
  }

  if (etat === 'expire') {
    return page(
      410,
      'Ce lien a expiré',
      'Les liens de téléchargement restent valables sept jours. Redemande le guide, tu le recevras tout de suite.',
    )
  }

  if (!download) {
    return page(500, 'Le téléchargement est indisponible', 'Réessaie dans quelques minutes.')
  }

  const { data: signed, error: signError } = await db.storage
    .from(serverEnv.SUPABASE_GUIDES_BUCKET)
    .createSignedUrl(download.storage_path, SIGNED_URL_TTL_SECONDS)

  if (signError || !signed) {
    console.error('[download] signature impossible', signError?.message)
    return page(
      500,
      'Le fichier est momentanément inaccessible',
      'Réessaie dans quelques minutes. Si ça persiste, écris-moi et je te l’envoie à la main.',
    )
  }

  await db
    .from('lead_downloads')
    .update({
      downloaded_at: download.downloaded_at ?? new Date().toISOString(),
      download_count: download.download_count + 1,
    })
    .eq('id', download.id)

  return NextResponse.redirect(signed.signedUrl, {
    status: 302,
    headers: { 'cache-control': 'no-store' },
  })
}
