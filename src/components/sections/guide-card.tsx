import Link from 'next/link'
import { ArrowRightIcon } from '@/components/ui/icons'
import type { Guide } from '@/lib/content'

interface GuideCardProps {
  guide: Guide
  tone?: 'clair' | 'sombre'
}

/**
 * Carte entièrement cliquable : le lien enveloppe la carte, et le pseudo-élément
 * étend la zone de clic sans imbriquer d’interactifs.
 */
export function GuideCard({ guide, tone = 'clair' }: GuideCardProps) {
  const sombre = tone === 'sombre'

  return (
    <article
      className={[
        'relative flex h-full w-full flex-col gap-4 rounded-card p-7',
        sombre
          ? 'carte-sombre border border-blanc/10 text-blanc'
          : 'border border-trait bg-gris shadow-card',
        'focus-within:outline-[3px] focus-within:outline-offset-3',
        sombre ? 'focus-within:outline-vert-clair' : 'focus-within:outline-noir',
      ].join(' ')}
    >
      <p>
        <span
          className={[
            'inline-block rounded-pill border px-3.5 py-1 text-chip font-medium italic',
            sombre ? 'border-blanc/40 text-blanc/85' : 'border-noir/25 text-ardoise',
          ].join(' ')}
        >
          {guide.pages} pages{guide.hasKcalVariant ? ' · 2 formats kcal' : ''}
        </span>
      </p>

      <h3 className={['text-h3 font-bold', sombre ? 'text-blanc' : 'text-noir'].join(' ')}>
        <Link
          href={`/guides/${guide.slug}`}
          className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
        >
          {guide.title}
        </Link>
      </h3>

      <p className={['text-body', sombre ? 'text-blanc/80' : 'text-ardoise'].join(' ')}>
        {guide.tagline}
      </p>

      <ul className="flex list-none flex-col gap-2.5 p-0">
        {guide.bullets.map((b) => (
          <li key={b} className="flex gap-3 text-body">
            <span
              aria-hidden="true"
              className={['mt-1 shrink-0', sombre ? 'text-vert-clair' : 'text-vert'].join(' ')}
            >
              <ArrowRightIcon className="size-4" />
            </span>
            <span className={sombre ? 'text-blanc/90' : ''}>{b}</span>
          </li>
        ))}
      </ul>

      <p
        className={[
          'mt-auto inline-flex items-center gap-2 pt-2 text-body font-bold italic',
          sombre ? 'text-vert-clair' : 'text-vert',
        ].join(' ')}
      >
        <ArrowRightIcon className="size-4" aria-hidden="true" />
        Recevoir ce guide
      </p>
    </article>
  )
}
