import { NextResponse, type NextRequest } from 'next/server'
import {
  ATTRIBUTION_COOKIE,
  ATTRIBUTION_MAX_AGE_SECONDS,
  attributionSchema,
  type Attribution,
} from '@/lib/attribution'
import { GONE_ROUTES } from '@/lib/legacy-routes'

/**
 * Deux responsabilités :
 *
 * 1. 410 Gone sur les pages de l’ancien site supprimées sans équivalent — `next.config.ts`
 *    ne sait pas produire ce statut.
 * 2. Capture de l’attribution à la PREMIÈRE visite seulement, dans un cookie first-party
 *    httpOnly. Sans ça, un lead venu du lien en bio Instagram n’est rattachable à rien.
 *
 * Next 16 : la convention `middleware.ts` est dépréciée, le fichier s’appelle `proxy.ts`.
 */

const GONE_PAGE = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Page supprim&eacute;e &mdash; Impact &amp; Process</title>
<style>
  :root { color-scheme: light }
  body { margin:0; padding:2rem 1.25rem; background:#FBFBFB; color:#1D3250;
         font:1rem/1.6 system-ui, -apple-system, "Segoe UI", sans-serif; }
  main { max-width:34rem; margin:0 auto; }
  h1 { font-size:1.75rem; line-height:1.15; margin:0 0 1rem; font-style:italic; }
  ul { padding-left:1.25rem; margin:1.5rem 0 0; }
  li { margin-bottom:.5rem; }
  a { color:#1D3250; text-decoration-color:#FFDE59; text-decoration-thickness:2px;
      text-underline-offset:3px; }
  a:focus-visible { outline:3px solid #1D3250; outline-offset:3px; border-radius:4px; }
</style>
</head>
<body>
<main>
  <h1>Cette page n&rsquo;existe plus</h1>
  <p>Elle a &eacute;t&eacute; retir&eacute;e lors de la refonte du site et n&rsquo;a pas d&rsquo;&eacute;quivalent.</p>
  <ul>
    <li><a href="/guides">Les guides gratuits</a></li>
    <li><a href="/services">Les accompagnements</a></li>
    <li><a href="/">L&rsquo;accueil</a></li>
  </ul>
</main>
</body>
</html>
`

function readAttribution(request: NextRequest): Attribution | null {
  const params = request.nextUrl.searchParams
  const referrer = request.headers.get('referer')

  const candidate = {
    utm_source: params.get('utm_source') ?? undefined,
    utm_medium: params.get('utm_medium') ?? undefined,
    utm_campaign: params.get('utm_campaign') ?? undefined,
    utm_content: params.get('utm_content') ?? undefined,
    fbclid: params.get('fbclid') ?? undefined,
    referrer: referrer && !referrer.includes(request.nextUrl.host) ? referrer : undefined,
  }

  const parsed = attributionSchema.safeParse(candidate)
  if (!parsed.success) return null

  const hasSomething = Object.values(parsed.data).some(Boolean)
  return hasSomething ? parsed.data : null
}

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

  const response = NextResponse.next()

  // Première visite uniquement : on ne réécrit jamais une attribution déjà connue.
  if (!request.cookies.has(ATTRIBUTION_COOKIE)) {
    const attribution = readAttribution(request)
    if (attribution) {
      response.cookies.set(ATTRIBUTION_COOKIE, JSON.stringify(attribution), {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: ATTRIBUTION_MAX_AGE_SECONDS,
      })
    }
  }

  return response
}

export const config = {
  matcher: [
    // Tout sauf les assets : la capture doit fonctionner sur la page d’atterrissage, quelle qu’elle soit.
    '/((?!_next/static|_next/image|favicon.ico|fonts/|guides/|.*\\.(?:png|jpg|jpeg|webp|avif|svg|ico|pdf|txt|xml)$).*)',
  ],
}
