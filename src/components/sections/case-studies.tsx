import Image from 'next/image'
import { ArrowCircleIcon, CheckIcon, CrossIcon } from '@/components/ui/icons'

interface CaseStudy {
  id: string
  name: string
  tabLabel: string
  intro?: string
  image: { src: string; alt: string }
  objectifs: string[]
  obstacles: string[]
  resultats: string[]
}

const CASES: CaseStudy[] = [
  {
    id: 'sabine',
    name: 'Sabine, 48 ans',
    tabLabel: 'Sabine, 48 ans',
    intro: 'Elle a toujours fait du sport mais a dû stopper suite à des douleurs & blessures.',
    image: {
      src: '/images/avant-apres-sabine.webp',
      alt: 'Sabine de profil, photos avant et après son accompagnement, séparées par un mètre ruban.',
    },
    objectifs: ['Perdre du poids, prendre du temps pour elle et se sentir mieux mentalement.'],
    obstacles: ['Manque de discipline', 'Manque d’énergie', 'Manque de motivation'],
    resultats: [
      '−3,8 kg',
      '−35,4 cm de mensuration sur l’ensemble du corps dont 14 cm perdus sur la sangle abdominale (tour de taille + tour de hanche combinés)',
      'Condition physique améliorée',
      'Douleurs disparues',
      '0 frustration durant sa transformation',
    ],
  },
  {
    id: 'jean',
    name: 'Jean, 60 ans',
    tabLabel: 'Jean, 60 ans',
    image: {
      src: '/images/avant-apres-jean.webp',
      alt: 'Jean de profil, photos avant et après son accompagnement, séparées par un mètre ruban.',
    },
    objectifs: [
      'Maigrir, perdre du poids.',
      'Retrouver une condition physique pour être plus performant au quotidien et dans ses activités.',
    ],
    obstacles: ['Manque de temps : métier prenant, travaille de 6 h à 20 h, 4 à 5 fois par semaine.'],
    resultats: [
      '−10 kg (de 105 à 95 kg)',
      '−32 cm de mensurations sur l’ensemble du corps dont 19 cm perdus sur la sangle abdominale (tour de taille + tour de hanches combinés)',
      '0 frustration',
    ],
  },
]

const TAB_BASE =
  'inline-flex cursor-pointer items-center gap-2.5 rounded-pill px-6 py-3.5 text-body font-bold transition-colors'

/**
 * Onglets sans JavaScript : deux boutons radio masqués pilotent l’affichage.
 * Les flèches du clavier passent de l’un à l’autre nativement, et la sélection
 * fonctionne même si le bundle ne se charge jamais.
 */
export function CaseStudies() {
  return (
    <div className="group flex w-full flex-col items-center gap-8">
      {/*
        `group-has-[…]` plutôt que `peer-…` : les libellés ne sont pas des frères
        directs des boutons radio, et le combinateur `~` ne les atteindrait pas.
      */}
      <input id="cas-sabine" type="radio" name="etude-de-cas" defaultChecked className="sr-only" />
      <input id="cas-jean" type="radio" name="etude-de-cas" className="sr-only" />

      <div role="group" aria-label="Choisir une étude de cas" className="flex flex-wrap justify-center gap-4">
        <label
          htmlFor="cas-sabine"
          className={`${TAB_BASE} bg-gris-fonce text-noir group-has-[#cas-sabine:checked]:bg-noir group-has-[#cas-sabine:checked]:text-blanc group-has-[#cas-sabine:focus-visible]:outline-[3px] group-has-[#cas-sabine:focus-visible]:outline-offset-3 group-has-[#cas-sabine:focus-visible]:outline-noir`}
        >
          <ArrowCircleIcon className="size-5" />
          {CASES[0].tabLabel}
        </label>
        <label
          htmlFor="cas-jean"
          className={`${TAB_BASE} bg-gris-fonce text-noir group-has-[#cas-jean:checked]:bg-noir group-has-[#cas-jean:checked]:text-blanc group-has-[#cas-jean:focus-visible]:outline-[3px] group-has-[#cas-jean:focus-visible]:outline-offset-3 group-has-[#cas-jean:focus-visible]:outline-noir`}
        >
          <ArrowCircleIcon className="size-5" />
          {CASES[1].tabLabel}
        </label>
      </div>

      <div className="hidden w-full group-has-[#cas-sabine:checked]:block">
        <CasePanel study={CASES[0]} />
      </div>
      <div className="hidden w-full group-has-[#cas-jean:checked]:block">
        <CasePanel study={CASES[1]} />
      </div>
    </div>
  )
}

function CasePanel({ study }: { study: CaseStudy }) {
  return (
    <article className="section-sombre grid grid-cols-1 gap-10 rounded-carte-photo bg-noir p-6 text-left text-blanc md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] md:gap-12 md:p-12">
      <div className="flex flex-col gap-5">
        <Image
          src={study.image.src}
          alt={study.image.alt}
          width={1105}
          height={1080}
          sizes="(min-width: 768px) 18rem, 100vw"
          className="w-full rounded-card border border-blanc/15 object-cover"
        />
        <div className="flex flex-col gap-2">
          <h3 className="titre text-h3">{study.name}</h3>
          {study.intro ? <p className="text-body italic text-blanc/75">{study.intro}</p> : null}
        </div>
      </div>

      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-3">
          <h4 className="titre text-h3">Objectifs &amp; résultats souhaités</h4>
          <ul className="flex list-none flex-col gap-2 p-0">
            {study.objectifs.map((o) => (
              <li key={o} className="flex gap-3 text-body italic text-blanc/90">
                <span aria-hidden="true" className="mt-1 shrink-0 text-vert-clair">
                  <ArrowCircleIcon className="size-5" />
                </span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="carte-sombre flex flex-col gap-4 rounded-card border border-blanc/10 p-6">
          <h4 className="titre text-h3">Obstacles</h4>
          <ul className="flex list-none flex-col gap-2.5 p-0">
            {study.obstacles.map((o) => (
              <li key={o} className="flex gap-3 text-body text-blanc/90">
                <span aria-hidden="true" className="mt-1 shrink-0 text-[#ff6a5e]">
                  <CrossIcon className="size-5" />
                </span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="carte-sombre flex flex-col gap-4 rounded-card border border-blanc/10 p-6">
          <h4 className="titre text-h3">Résultats</h4>
          <ul className="flex list-none flex-col gap-2.5 p-0">
            {study.resultats.map((r) => (
              <li key={r} className="flex gap-3 text-body text-blanc/90">
                <span aria-hidden="true" className="mt-1 shrink-0 text-vert-clair">
                  <CheckIcon className="size-5" />
                </span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}
