import localFont from 'next/font/local'

/**
 * DM Sans, reprise du site existant, auto-hébergée (règle 26).
 * Deux fichiers variables couvrant trois graisses utilisées : 400, 700, 900.
 * L’italique n’existe qu’en 700 et 900 : c’est la signature des titres.
 */
export const dmSans = localFont({
  src: [
    { path: '../app/fonts/dm-sans-roman.woff2', weight: '400 900', style: 'normal' },
    { path: '../app/fonts/dm-sans-italic.woff2', weight: '700 900', style: 'italic' },
  ],
  variable: '--font-dm-sans',
  display: 'swap',
  preload: true,
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
})
