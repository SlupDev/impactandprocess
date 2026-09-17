import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { LeadForm } from '@/components/forms/lead-form'
import { Bienvenue } from '@/components/sections/bienvenue'
import { CaseStudies } from '@/components/sections/case-studies'
import { Eyebrow } from '@/components/sections/eyebrow'
import { GuideCard } from '@/components/sections/guide-card'
import { OfferCards } from '@/components/sections/offer-cards'
import { buttonClasses } from '@/components/ui/button-classes'
import {
  ChartIcon,
  CheckIcon,
  FacebookIcon,
  InstagramIcon,
  ListIcon,
  PhoneIcon,
  RunIcon,
  StarIcon,
  UserCheckIcon,
} from '@/components/ui/icons'
import { getPublishedGuides } from '@/lib/content'
import { FACEBOOK_URL, INSTAGRAM_URL } from '@/lib/site'

const TITLE = 'Impact & Process — coaching sportif en ligne pour adultes actifs'
const DESCRIPTION =
  'J’aide les adultes actifs à perdre du gras, retrouver une vraie régularité et construire un cadre durable autour du sport, de la nutrition et de l’hygiène de vie.'

export function generateMetadata(): Metadata {
  return {
    // `absolute` : le titre porte déjà le nom du site, le gabarit le doublerait.
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: '/',
      siteName: 'Impact & Process',
      title: TITLE,
      description: DESCRIPTION,
    },
    twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
  }
}

const POINTS_CLES = [
  {
    icon: ListIcon,
    titre: 'Un cadre clair',
    texte:
      'Tu sais quoi faire, quand le faire et comment avancer sans repartir dans l’improvisation.',
  },
  {
    icon: ChartIcon,
    titre: 'Des résultats visibles',
    texte:
      'Perdre du gras, retrouver du tonus et voir ton corps évoluer avec une méthode structurée.',
  },
  {
    icon: CheckIcon,
    titre: 'Une meilleure régularité',
    texte:
      'On construit des habitudes réalistes pour tenir même quand ton quotidien devient chargé.',
  },
  {
    icon: UserCheckIcon,
    titre: 'Plus d’autonomie',
    texte:
      'Tu apprends à gérer sport, nutrition et rythme de vie sans dépendre uniquement de ta motivation.',
  },
]

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

const BANDE_PHOTOS = [
  { src: '/images/strip-1.jpg', alt: 'Un athlète soulève une barre chargée en salle de sport.' },
  { src: '/images/strip-2.jpg', alt: 'Une sportive fait onduler une corde ondulatoire contre un mur de briques.' },
  { src: '/images/strip-3.jpg', alt: 'Un homme de dos exécute une traction à la barre fixe.' },
  { src: '/images/strip-4.jpg', alt: 'Une sportive au sol travaille le dos avec deux haltères.' },
]

const TEMOIGNAGES = [
  {
    citation:
      'J’ai perdu 5 kg en 3 mois tout en retrouvant plus d’énergie et le plaisir de cuisiner. Le cadre m’a aidée à rester régulière sans tomber dans la frustration.',
    nom: 'Sabine',
    role: 'Manager',
  },
  {
    citation:
      'Après des années sans sport, j’ai repris progressivement avec des séances adaptées. J’ai gagné en confiance, en mobilité et je me sens mieux dans mon corps.',
    nom: 'Fernand',
    role: 'Retraité',
  },
  {
    citation:
      'L’accompagnement m’a permis de mieux structurer mon entraînement et mon alimentation. J’ai vu mon corps évoluer sans me sentir perdue ou livrée à moi-même.',
    nom: 'Julie',
    role: 'Ergothérapeute',
  },
]

export default function HomePage() {
  const guides = getPublishedGuides()
  const guidePrincipal = guides.find((g) => g.slug === 'sos-express') ?? guides[0]

  return (
    <main id="contenu">
      {/* ---------- HERO ---------- */}
      <section className="site-container grid grid-cols-1 items-center gap-10 py-12 md:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
        <div className="flex flex-col gap-6">
          <Bienvenue />
          <h1 className="titre text-display">Reprends le contrôle</h1>

          <p className="text-[clamp(1.4rem,1.05rem+1.45vw,2rem)] font-medium italic leading-[1.15] tracking-[-0.02em]">
            de ton corps, de ton énergie et de ta discipline.
          </p>

          <p className="max-w-[34rem] text-body text-ardoise">
            J’aide les adultes actifs à perdre du gras, retrouver une vraie régularité et construire
            un cadre durable autour du{' '}
            <strong className="font-bold text-noir">
              sport, de la nutrition et de l’hygiène de vie.
            </strong>
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className={buttonClasses('primary', false)}>
              <PhoneIcon />
              Prendre contact
            </Link>
            <Link href="/services" className={buttonClasses('secondary', false)}>
              Voir mes services
              <RunIcon />
            </Link>
          </div>

          <ul className="flex list-none flex-col gap-3 p-0">
            {[
              '+35 clients accompagnés',
              'Coach sportif depuis plus de 3 ans',
              'Diplômé Licence STAPS et BPJEPS',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-body">
                <span aria-hidden="true" className="shrink-0 text-vert">
                  <CheckIcon className="size-6" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <Image
          src="/images/hero.jpg"
          alt="Ludovic, coach sportif, en débardeur jaune devant un mur couvert de graffitis."
          width={1080}
          height={1350}
          priority
          sizes="(min-width: 1024px) 26rem, 100vw"
          className="w-full rounded-carte-photo object-cover"
        />
      </section>

      {/* ---------- QUI SUIS-JE ---------- */}
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

      {/* ---------- POINTS CLÉS ---------- */}
      <section className="site-container flex flex-col gap-12 py-section">
        <div className="flex flex-col items-start gap-4">
          <Eyebrow>Points clés</Eyebrow>
          <h2 className="titre text-h2">Un cadre clair</h2>
        </div>

        <ul className="grid list-none grid-cols-1 gap-10 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS_CLES.map(({ icon: Icon, titre, texte }) => (
            <li key={titre} className="flex flex-col gap-4">
              <span
                aria-hidden="true"
                className="flex size-14 items-center justify-center rounded-card bg-gris-fonce text-noir"
              >
                <Icon className="size-7" />
              </span>
              <h3 className="text-h3 font-bold">{titre}</h3>
              <p className="text-body text-ardoise">{texte}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- ZONE D’INTERVENTION ---------- */}
      <section className="site-container grid grid-cols-1 items-center gap-10 pb-section md:grid-cols-2 md:gap-16">
        <div className="flex flex-col items-start gap-5">
          <Eyebrow>Zone d’intervention</Eyebrow>
          <h2 className="titre text-h2">Coaching en ligne</h2>
          <p className="text-body text-ardoise">
            Coaching 100&nbsp;% en ligne, accessible partout en France et à l’étranger. Le suivi, les
            bilans, les programmes et les ajustements se font à distance, pour t’accompagner où que
            tu sois.
          </p>
          <p className="flex items-center gap-3 text-body font-medium">
            <span aria-hidden="true" className="shrink-0 text-vert">
              <CheckIcon className="size-6" />
            </span>
            Coaching 100&nbsp;% en ligne
          </p>
        </div>

        <Image
          src="/images/coaching-en-ligne.jpg"
          alt="Deux sportifs se tapent dans la main en position de gainage sur une aire de street workout."
          width={1500}
          height={1500}
          sizes="(min-width: 768px) 32rem, 100vw"
          className="w-full rounded-carte-photo object-cover"
        />
      </section>

      {/* ---------- SERVICES ---------- */}
      <section id="services" className="section-sombre bg-noir text-blanc">
        <div className="site-container flex flex-col gap-12 py-section">
          <div className="flex flex-col items-start gap-4">
            <Eyebrow tone="sombre">Mes services phares</Eyebrow>
            <h2 className="titre text-h2">Découvrez ce que je propose</h2>
          </div>

          <OfferCards />

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/services" className={buttonClasses('clair', false)}>
              Voir tous les services
            </Link>
            <Link href="/contact" className={buttonClasses('outline-clair', false)}>
              Prendre contact
              <PhoneIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- GUIDES GRATUITS + CAPTURE ---------- */}
      <section id="guides-gratuits" className="site-container flex flex-col gap-12 py-section">
        <div className="flex flex-col items-start gap-4">
          <Eyebrow>Ressources gratuites</Eyebrow>
          <h2 className="titre text-h2">Commence par un guide</h2>
          <p className="max-w-[38rem] text-body text-ardoise">
            Choisis la situation qui te correspond, laisse ton prénom et ton email, et reçois le PDF
            dans la minute. Sans carte bancaire.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:gap-14">
          <ul className="grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2">
            {guides.map((guide) => (
              <li key={guide.slug} className="flex">
                <GuideCard guide={guide} />
              </li>
            ))}
          </ul>

          {guidePrincipal ? (
            <div className="lg:sticky lg:top-8 lg:self-start">
              <LeadForm
                slug={guidePrincipal.slug}
                guideTitle={guidePrincipal.title}
                hasKcalVariant={guidePrincipal.hasKcalVariant}
                ctaLabel="Recevoir mon guide"
              />
            </div>
          ) : null}
        </div>
      </section>

      {/* ---------- ENGAGEMENTS ---------- */}
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
                className={[
                  'flex flex-col gap-2 py-6',
                  index > 0 ? 'border-t border-trait' : '',
                ].join(' ')}
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

      {/* ---------- BANDE PHOTOS ---------- */}
      <ul className="grid list-none grid-cols-2 gap-0 p-0 md:grid-cols-4">
        {BANDE_PHOTOS.map((photo) => (
          <li key={photo.src} className="relative aspect-[3/4] md:aspect-square">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover"
            />
          </li>
        ))}
      </ul>

      {/* ---------- ÉTUDES DE CAS ---------- */}
      <section className="site-container flex flex-col items-center gap-10 py-section text-center">
        <div className="flex flex-col items-center gap-4">
          <Eyebrow>Études de cas</Eyebrow>
          <h2 className="titre text-h2">Voici des résultats</h2>
        </div>

        <CaseStudies />
      </section>

      {/* ---------- TÉMOIGNAGES ---------- */}
      <section className="site-container flex flex-col gap-12 pb-section">
        <div className="flex flex-col items-start gap-4">
          <Eyebrow>Témoignages</Eyebrow>
          <h2 className="titre text-h2">Ils nous ont fait confiance</h2>
        </div>

        <ul className="grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-3">
          {TEMOIGNAGES.map((t) => (
            <li key={t.nom} className="flex">
              <figure className="flex w-full flex-col gap-5 rounded-carte-photo bg-gris p-7">
                <p aria-label="Noté 5 sur 5" className="flex gap-1 text-noir">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <StarIcon key={i} className="size-4" />
                  ))}
                </p>
                <blockquote className="text-body italic text-ardoise">
                  «&nbsp;{t.citation}&nbsp;»
                </blockquote>
                <figcaption className="mt-auto flex flex-col gap-0.5">
                  <span className="text-h3 font-bold text-noir">{t.nom}</span>
                  <span className="text-body italic text-ardoise">{t.role}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- CTA FINAL ---------- */}
      <section className="section-sombre bg-noir text-blanc">
        <div className="site-container flex flex-col items-center gap-6 py-section text-center">
          <Eyebrow tone="sombre">
            Prêt à passer à l’action&nbsp;?{' '}
            <span aria-hidden="true" className="not-italic">
              🔥
            </span>
          </Eyebrow>

          <h2 className="titre max-w-[52rem] text-h2">
            Tu veux reprendre le contrôle, mais tu ne sais pas par où commencer&nbsp;?
          </h2>

          <p className="max-w-[44rem] text-body text-blanc/80">
            Choisis ton point de départ&nbsp;: être accompagné avec le Protocole Virage, suivre un
            programme Hybrid Fat Burner, ou commencer gratuitement avec un guide adapté à ta
            situation.
          </p>

          <Link href="/services" className={buttonClasses('clair', false, 'mt-2')}>
            Voir mes services
            <RunIcon />
          </Link>
        </div>
      </section>
    </main>
  )
}
