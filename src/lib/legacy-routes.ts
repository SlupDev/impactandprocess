/**
 * URLs de l’ancien site WordPress/Elementor.
 * `LEGACY_REDIRECTS` est consommé par `next.config.ts`, `GONE_ROUTES` par `src/proxy.ts`.
 */

export const LEGACY_REDIRECTS: ReadonlyArray<{ source: string; destination: string }> = [
  { source: '/accueil/services', destination: '/services' },
  { source: '/accueil/a-propos', destination: '/a-propos' },
  { source: '/accueil/contact', destination: '/contact' },
  { source: '/guides-gratuits', destination: '/guides' },
  { source: '/test-technique', destination: '/guides/sos-reset' },
  { source: '/test-technique-copy', destination: '/guides/sos-express' },
  { source: '/test-technique-copy-2', destination: '/guides/sos-deplacement' },
  { source: '/test-technique-copy-4', destination: '/guides/4-piliers' },
  { source: '/test-technique-copy-5', destination: '/guides/perte-masse-grasse' },
  { source: '/test-technique-copy-5-copy', destination: '/guides/profiter-des-fetes' },
]

export const GONE_ROUTES: ReadonlySet<string> = new Set([
  '/programme-sportif-n1',
  '/programme-sportif-n2',
  '/programme-sportif-n3',
  '/nutrition',
  '/podcast',
  '/connexion',
  '/hello-world',
])
