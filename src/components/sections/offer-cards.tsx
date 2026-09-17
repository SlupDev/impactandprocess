import Link from 'next/link'
import { OFFERS } from '@/lib/offers'

interface OfferCardsProps {
  /** Affiche le détail de chaque offre, réservé à la page Services. */
  detaille?: boolean
}

export function OfferCards({ detaille = false }: OfferCardsProps) {
  return (
    <ul className="grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-3">
      {OFFERS.map((offer) => (
        <li key={offer.id} id={detaille ? offer.id : undefined} className="flex scroll-mt-28">
          <article
            className={[
              'carte-sombre relative flex w-full flex-col gap-5 rounded-carte-photo p-7',
              offer.best ? 'border border-vert-clair/70' : 'border border-blanc/10',
              'focus-within:outline-[3px] focus-within:outline-offset-3 focus-within:outline-vert-clair',
            ].join(' ')}
          >
            <div className="flex items-start justify-between gap-4">
              <span
                aria-hidden="true"
                className="flex size-12 items-center justify-center rounded-card bg-blanc/10 text-[1.4rem] leading-none"
              >
                {offer.emoji}
              </span>
              {offer.best ? (
                <span className="rounded-pill border border-vert-clair px-4 py-1.5 text-chip font-medium italic text-vert-clair">
                  Best Seller
                </span>
              ) : null}
            </div>

            <h3 className="text-h3 font-bold">
              {detaille ? (
                offer.titre
              ) : (
                <Link
                  href={offer.href}
                  className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                >
                  {offer.titre}
                </Link>
              )}
            </h3>

            <p className="text-body text-blanc/80">{offer.texte}</p>

            {detaille ? (
              <ul className="flex list-none flex-col gap-2.5 p-0">
                {offer.details.map((d) => (
                  <li key={d} className="flex gap-3 text-body text-blanc/85">
                    <span aria-hidden="true" className="shrink-0 text-vert-clair">
                      →
                    </span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            <p className="mt-auto pt-2 text-body font-medium italic text-blanc">
              <span aria-hidden="true">→ </span>
              {offer.prix}
            </p>
          </article>
        </li>
      ))}
    </ul>
  )
}
