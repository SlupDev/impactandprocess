import { NextResponse, type NextRequest } from 'next/server'
import { GONE_ROUTES } from '@/lib/legacy-routes'

/**
 * Pages de l’ancien site supprimées sans équivalent : elles répondent 410 Gone pour que les
 * moteurs les désindexent au lieu de les recrawler. `next.config.ts` ne sait pas produire de
 * 410, d’où ce passage par le proxy.
 *
 * Phase 2 : ce fichier accueillera aussi la capture des UTM en cookie first-party.
 */

const GONE_PAGE = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Page supprimée — Impact &amp; Process</title>
<style>
  :root { color-scheme: light }
  body { margin:0; padding:2rem 1.25rem; background:#fff; color:#1a1a1a;
         font:1rem/1.6 system-ui, -apple-system, "Segoe UI", sans-serif; }
  main { max-width:34rem; margin:0 auto; }
  h1 { font-size:1.5rem; line-height:1.25; margin:0 0 1rem; }
  ul { padding-left:1.25rem; margin:1.5rem 0 0; }
  li { margin-bottom:.5rem; }
  a { color:#0b4f9e; }
  a:focus-visible { outline:3px solid #0b4f9e; outline-offset:2px; border-radius:2px; }
</style>
</head>
<body>
<main>
  <h1>Cette page n’existe plus</h1>
  <p>Elle a été retirée lors de la refonte du site et n’a pas d’équivalent.</p>
  <ul>
    <li><a href="/guides">Les guides gratuits</a></li>
    <li><a href="/services">Les accompagnements</a></li>
    <li><a href="/">L’accueil</a></li>
  </ul>
</main>
</body>
</html>
`

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/\/+$/, '') || '/'

  if (GONE_ROUTES.has(pathname)) {
    return new NextResponse(GONE_PAGE, {
      status: 410,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'x-robots-tag': 'noindex',
        'cache-control': 'public, max-age=0, s-maxage=86400',
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/programme-sportif-n1',
    '/programme-sportif-n2',
    '/programme-sportif-n3',
    '/nutrition',
    '/podcast',
    '/connexion',
    '/hello-world',
  ],
}
