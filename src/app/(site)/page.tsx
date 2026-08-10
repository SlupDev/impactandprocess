import type { Metadata } from 'next'

export function generateMetadata(): Metadata {
  return {
    title: 'Impact & Process — coaching sportif en ligne',
    description:
      'Coaching sportif en ligne pour les hommes actifs de 35 à 55 ans : des guides gratuits et deux accompagnements pour remettre l’entraînement dans un emploi du temps déjà plein.',
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: '/',
      siteName: 'Impact & Process',
      title: 'Impact & Process — coaching sportif en ligne',
      description:
        'Des guides gratuits et deux accompagnements pour remettre l’entraînement dans un emploi du temps déjà plein.',
    },
  }
}

export default function HomePage() {
  return (
    <main>
      <h1>Impact &amp; Process</h1>
    </main>
  )
}
