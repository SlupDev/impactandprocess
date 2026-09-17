import type { Metadata } from 'next'
import Link from 'next/link'
import { Eyebrow } from '@/components/sections/eyebrow'
import { OfferCards } from '@/components/sections/offer-cards'
import { buttonClasses } from '@/components/ui/button-classes'
import { PhoneIcon, RunIcon } from '@/components/ui/icons'

const TITLE = 'Mes services — coaching, programmes et guides'
const DESCRIPTION =
  'Trois façons d’avancer : les programmes Hybrid Fat Burner en autonomie, le Protocole Virage en accompagnement premium sur 90 jours, ou les guides gratuits pour commencer sans engagement.'

export function generateMetadata(): Metadata {
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: '/services' },
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: '/services',
      siteName: 'Impact & Process',
      title: TITLE,
      description: DESCRIPTION,
    },
    twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
  }
}

export default function ServicesPage() {
  return (
    <main id="contenu">
      <section className="site-container flex flex-col items-start gap-6 py-12 md:py-20">
        <Eyebrow>Mes services phares</Eyebrow>
        <h1 className="titre text-display">Découvrez ce que je propose</h1>
        <p className="max-w-[40rem] text-body text-ardoise">
          Trois portes d’entrée, une seule logique&nbsp;: un cadre qui tient dans ta vraie semaine.
          Tu choisis selon le temps que tu peux y consacrer et le niveau d’accompagnement dont tu as
          besoin.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/contact" className={buttonClasses('primary', false)}>
            <PhoneIcon />
            Prendre contact
          </Link>
          <Link href="/guides" className={buttonClasses('secondary', false)}>
            Commencer par un guide gratuit
            <RunIcon />
          </Link>
        </div>
      </section>

      <section className="section-sombre bg-noir text-blanc">
        <div className="site-container flex flex-col gap-12 py-section">
          <h2 className="sr-only">Les trois offres</h2>
          <OfferCards detaille />

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className={buttonClasses('clair', false)}>
              Prendre contact
              <PhoneIcon />
            </Link>
          </div>
        </div>
      </section>

      <section className="site-container flex flex-col items-start gap-5 py-section">
        <Eyebrow>Comment ça se passe</Eyebrow>
        <h2 className="titre text-h2">Trois étapes, pas une de plus</h2>
        <ol className="flex list-none flex-col gap-6 p-0">
          {[
            {
              titre: 'On fait le point',
              texte:
                'Un échange pour comprendre ton niveau, ton agenda, ton matériel et ce que tu as déjà essayé.',
            },
            {
              titre: 'Tu reçois ton cadre',
              texte:
                'Entraînement, nutrition et rythme de vie, écrits noir sur blanc, calibrés sur le temps que tu as réellement.',
            },
            {
              titre: 'On ajuste en marchant',
              texte:
                'La semaine qui déraille fait partie du plan. On la rattrape et on garde la trajectoire.',
            },
          ].map((etape, index) => (
            <li key={etape.titre} className="flex gap-5">
              <span
                aria-hidden="true"
                className="titre flex size-12 shrink-0 items-center justify-center rounded-pill bg-noir text-blanc"
              >
                {index + 1}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-h3 font-bold">{etape.titre}</h3>
                <p className="text-body text-ardoise">{etape.texte}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </main>
  )
}
