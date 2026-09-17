import type { Metadata } from 'next'
import { GuideCard } from '@/components/sections/guide-card'
import { getGuidesByCategory, getPublishedGuides } from '@/lib/content'

const TITLE = 'Six guides gratuits pour reprendre cette semaine'
const DESCRIPTION =
  'Choisis la situation qui te correspond et reçois le guide adapté par email. Semaines SOS, fondamentaux, périodes à risque. Offert, sans carte bancaire.'

export function generateMetadata(): Metadata {
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: '/guides' },
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: '/guides',
      siteName: 'Impact & Process',
      title: TITLE,
      description: DESCRIPTION,
    },
    twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
  }
}

export default function GuidesPage() {
  const groups = getGuidesByCategory()
  const total = getPublishedGuides().length

  return (
    <main id="contenu">
      <section className="bg-creme">
        <div className="site-container flex flex-col gap-4 py-section">
          <p>
            <span className="inline-block rounded-pill bg-jaune px-3.5 py-1.5 text-chip font-bold uppercase text-noir">
              {total} guides · offerts
            </span>
          </p>
          <h1 className="text-display font-black italic">Choisis le bon guide.</h1>
          <p className="text-lede max-w-[44rem]">
            Pas besoin de télécharger six PDF au hasard pour ne jamais les ouvrir. Tu choisis la
            situation qui te correspond, tu reçois le guide le plus adapté pour agir dès maintenant.
          </p>
          <p className="text-small text-ardoise">Offert. Reçu par email. Sans spam.</p>
        </div>
      </section>

      {groups.map((group, index) => {
        const nuit = index === 0
        return (
          <section
            key={group.category}
            id={group.category}
            className={nuit ? 'bg-nuit text-blanc' : index % 2 === 0 ? 'bg-gris' : ''}
          >
            <div className="site-container flex flex-col gap-5 py-section">
              <p>
                <span className="inline-block rounded-pill bg-jaune px-3.5 py-1.5 text-chip font-bold uppercase text-noir">
                  {group.label}
                </span>
              </p>
              <h2 className="text-h2 font-black italic">{group.intro}</h2>

              <ul className="grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
                {group.guides.map((guide) => (
                  <li key={guide.slug} className="flex">
                    <GuideCard guide={guide} tone={nuit ? 'sombre' : 'clair'} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )
      })}
    </main>
  )
}
