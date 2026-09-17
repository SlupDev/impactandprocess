import type { Metadata } from 'next'
import Link from 'next/link'
import { Eyebrow } from '@/components/sections/eyebrow'
import { buttonClasses } from '@/components/ui/button-classes'
import { CalendarIcon, RunIcon, WhatsappIcon } from '@/components/ui/icons'
import { CALENDLY_PUBLIC_URL, CONTACT_EMAIL, WHATSAPP_URL } from '@/lib/site'

const TITLE = 'Me contacter'
const DESCRIPTION =
  'Une question sur le Protocole Virage, les programmes Hybrid Fat Burner ou les guides gratuits ? Écris-moi par email, sur WhatsApp, ou réserve directement un appel diagnostic.'

export function generateMetadata(): Metadata {
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: '/contact' },
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: '/contact',
      siteName: 'Impact & Process',
      title: TITLE,
      description: DESCRIPTION,
    },
    twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
  }
}

export default function ContactPage() {
  return (
    <main id="contenu">
      <section className="site-container flex flex-col items-start gap-6 py-12 md:py-20">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="titre text-display">Me contacter</h1>
        <p className="max-w-[40rem] text-body text-ardoise">
          Une question sur un programme, un accompagnement ou un guide&nbsp;? Choisis le canal qui
          t’arrange. Je réponds sous 24&nbsp;h ouvrées.
        </p>
      </section>

      <section className="site-container pb-section">
        <h2 className="sr-only">Canaux de contact</h2>
        <ul className="grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-3">
          <li className="flex flex-col gap-4 rounded-carte-photo border border-trait bg-gris p-7">
            <h3 className="text-h3 font-bold">Par email</h3>
            <p className="text-body text-ardoise">
              Le plus simple pour une question détaillée ou pour m’envoyer ton contexte.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-auto text-body font-bold text-noir underline decoration-2 underline-offset-4"
            >
              {CONTACT_EMAIL}
            </a>
          </li>

          <li className="flex flex-col gap-4 rounded-carte-photo border border-trait bg-gris p-7">
            <h3 className="text-h3 font-bold">Sur WhatsApp</h3>
            <p className="text-body text-ardoise">
              Pour une question courte. C’est aussi le canal de suivi du Protocole Virage.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses('primary', true, 'mt-auto')}
            >
              <WhatsappIcon />
              Ouvrir WhatsApp
            </a>
          </li>

          <li className="flex flex-col gap-4 rounded-carte-photo border border-trait bg-gris p-7">
            <h3 className="text-h3 font-bold">En visio</h3>
            <p className="text-body text-ardoise">
              Un appel diagnostic de 20 minutes pour savoir si le Protocole Virage a du sens pour
              toi.
            </p>
            <a
              href={CALENDLY_PUBLIC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses('secondary', true, 'mt-auto')}
            >
              <CalendarIcon />
              Réserver un créneau
            </a>
          </li>
        </ul>
      </section>

      <section className="section-sombre bg-noir text-blanc">
        <div className="site-container flex flex-col items-center gap-6 py-section text-center">
          <Eyebrow tone="sombre">Avant d’écrire</Eyebrow>
          <h2 className="titre max-w-[44rem] text-h2">
            Tu peux déjà commencer sans m’attendre
          </h2>
          <p className="max-w-[40rem] text-body text-blanc/80">
            Les guides sont gratuits et arrivent par email dans la minute. C’est souvent le meilleur
            point de départ avant un accompagnement.
          </p>
          <Link href="/guides" className={buttonClasses('clair', false, 'mt-2')}>
            Voir les guides gratuits
            <RunIcon />
          </Link>
        </div>
      </section>
    </main>
  )
}
