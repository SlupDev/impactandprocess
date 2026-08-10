import type { Metadata } from 'next'
import { clientEnv } from '@/lib/env'
import { dmSans } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(clientEnv.NEXT_PUBLIC_SITE_URL),
  title: {
    default: 'Impact & Process — coaching sportif en ligne',
    template: '%s — Impact & Process',
  },
  description:
    'Coaching sportif en ligne pour les hommes actifs de 35 à 55 ans : des guides gratuits et deux accompagnements pour remettre l’entraînement dans un emploi du temps déjà plein.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="fr" className={`${dmSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a className="skip-link" href="#contenu">
          Aller au contenu
        </a>
        {children}
      </body>
    </html>
  )
}
