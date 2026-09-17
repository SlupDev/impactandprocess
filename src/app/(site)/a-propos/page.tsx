import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Eyebrow } from '@/components/sections/eyebrow'
import { buttonClasses } from '@/components/ui/button-classes'
import { FacebookIcon, InstagramIcon, RunIcon } from '@/components/ui/icons'
import { FACEBOOK_URL, INSTAGRAM_URL } from '@/lib/site'

const TITLE = 'À propos — Ludovic, coach sportif en ligne'
const DESCRIPTION =
  'Moi, c’est Ludo, coach sportif en ligne. J’aide les adultes actifs à perdre du gras, retrouver de l’énergie et construire une vraie régularité grâce à un cadre simple et adapté à leur quotidien.'

export function generateMetadata(): Metadata {
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: '/a-propos' },
    openGraph: {
      type: 'profile',
      locale: 'fr_FR',
      url: '/a-propos',
      siteName: 'Impact & Process',
      title: TITLE,
      description: DESCRIPTION,
    },
    twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
  }
}

const ENGAGEMENTS = [
  {
    titre: 'Un cadre adapté à ta vraie vie',
    texte:
      'Mes programmes et accompagnements sont pensés pour s’adapter à ton niveau, ton agenda, ton matériel et tes contraintes, pas à une semaine parfaite.',
  },
  {
    titre: 'Une méthode claire, sans bullshit',
    texte:
      'Pas de promesse miracle ni de méthode extrême. L’objectif est de construire des résultats visibles avec un cadre simple, progressif et durable.',
  },
  {
    titre: 'Un accompagnement humain',
    texte:
      'Quand tu choisis le Protocole Virage, tu n’es pas livré à toi-même : suivi WhatsApp, bilans réguliers et ajustements selon ton quotidien.',
  },
]

export default function AProposPage() {
  return (
    <main id="contenu">
      <section className="site-container flex flex-col items-start gap-6 py-12 md:py-20">
        <h1 className="titre max-w-[46rem] text-display">
          Une méthode claire pour reprendre le contrôle durablement.
        </h1>
        <p className="max-w-[40rem] text-body text-ardoise">
          Moi, c’est Ludo, coach sportif en ligne. J’aide les adultes actifs à perdre du gras,
          retrouver de l’énergie et construire une vraie régularité grâce à un cadre simple,
          structuré et adapté à leur quotidien.
        </p>
        <Link href="/services" className={buttonClasses('primary', false)}>
          Voir mes services
          <RunIcon />
        </Link>
      </section>

      <section className="section-sombre bg-noir text-blanc">
        <div className="site-container grid grid-cols-1 items-center gap-10 py-section md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:gap-14">
          <Image
            src="/images/portrait-ludo.jpg"
            alt="Portrait de Ludovic en tenue de sport, souriant, en extérieur."
            width={683}
            height={1024}
            sizes="(min-width: 768px) 22rem, 100vw"
            className="w-full rounded-carte-photo object-cover"
          />

          <div className="carte-sombre flex flex-col items-start gap-5 rounded-carte-photo border border-blanc/10 p-7 md:p-10">
            <Eyebrow tone="sombre">Qui suis-je&nbsp;?</Eyebrow>
            <h2 className="titre text-h2">
              Moi, c’est Ludo{' '}
              <span aria-hidden="true" className="not-italic">
                👋
              </span>
            </h2>
            <p className="text-body text-blanc/85">
              Coach sportif depuis plus de 3 ans, passionné par le dépassement de soi et la
              transformation humaine.
            </p>
            <p className="text-body text-blanc/85">
              J’aide les personnes actives à reprendre le contrôle de leur corps sans sacrifier toute
              leur vie autour du sport. Mon approche est simple&nbsp;: pas de plan extrême, pas de
              motivation forcée, pas de blabla.
            </p>
            <p className="text-body text-blanc/85">
              On travaille en équipe pour te construire un cadre réaliste, l’ajuster, et avancer
              ensemble{' '}
              <span aria-hidden="true" className="not-italic">
                🤝
              </span>
            </p>

            <ul className="flex list-none items-center gap-3 p-0">
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-11 items-center justify-center rounded-pill border border-blanc/30 hover:bg-blanc hover:text-noir"
                >
                  <InstagramIcon className="size-5" />
                  <span className="sr-only">Instagram (nouvelle fenêtre)</span>
                </a>
              </li>
              <li>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-11 items-center justify-center rounded-pill border border-blanc/30 hover:bg-blanc hover:text-noir"
                >
                  <FacebookIcon className="size-5" />
                  <span className="sr-only">Facebook (nouvelle fenêtre)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="site-container flex flex-col items-start gap-5 py-section">
        <Eyebrow>Ma méthode</Eyebrow>
        <h2 className="titre max-w-[38rem] text-h2">
          Un cadre réaliste, construit pour ta vraie vie.
        </h2>
        <p className="max-w-[40rem] text-body text-ardoise">
          Mon approche repose sur une idée simple&nbsp;: un plan ne sert à rien s’il ne tient pas
          dans ton quotidien.
        </p>
        <p className="max-w-[40rem] text-body text-ardoise">
          J’aide chaque personne à avancer avec une structure claire, progressive et adaptée à son
          niveau, son agenda, ses contraintes et son objectif.
        </p>
        <p className="max-w-[40rem] text-body text-ardoise">
          Selon le besoin, tu peux avancer seul avec un programme Hybrid Fat Burner, commencer par un
          guide gratuit, ou être accompagné avec le Protocole Virage.
        </p>
      </section>

      <section className="site-container grid grid-cols-1 items-center gap-10 pb-section md:grid-cols-2 md:gap-16">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>
            Mes engagements{' '}
            <span aria-hidden="true" className="not-italic">
              🤝🏻
            </span>
          </Eyebrow>
          <h2 className="titre text-h2">Pourquoi me faire confiance</h2>

          <ul className="flex w-full list-none flex-col p-0">
            {ENGAGEMENTS.map((e, index) => (
              <li
                key={e.titre}
                className={['flex flex-col gap-2 py-6', index > 0 ? 'border-t border-trait' : ''].join(
                  ' ',
                )}
              >
                <h3 className="flex items-center gap-3 text-body font-bold">
                  <span
                    aria-hidden="true"
                    className="size-3.5 shrink-0 rounded-pill border-2 border-noir"
                  />
                  {e.titre}
                </h3>
                <p className="text-body italic text-ardoise">{e.texte}</p>
              </li>
            ))}
          </ul>
        </div>

        <Image
          src="/images/confiance.jpg"
          alt="Ludovic exécute une traction à la barre fixe en extérieur."
          width={1000}
          height={1000}
          sizes="(min-width: 768px) 32rem, 100vw"
          className="w-full rounded-carte-photo object-cover"
        />
      </section>
    </main>
  )
}
