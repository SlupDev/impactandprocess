import { Eyebrow } from '@/components/sections/eyebrow'

/**
 * Le salut du hero. Tout est en CSS (voir `.bonhomme-*` dans globals.css) :
 * aucun JS envoyé, et le mouvement s’arrête avec `prefers-reduced-motion`.
 */
export function Bienvenue() {
  return (
    <Eyebrow>
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 28 34"
        className="-my-1 h-7 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g className="bonhomme-corps">
          <circle cx="12" cy="6" r="3.6" />
          <path d="M9 4h6l2 1.5" className="stroke-vert" strokeWidth={1.8} />
          <path d="M12 10v11M12 13l-4.5 4 1.5 3.5M12 21l-3 5-2 5M12 21l3 5 2 5" />
          <path d="M12 13l7-6.5" className="bonhomme-bras" />
        </g>
      </svg>
      Bienvenue
    </Eyebrow>
  )
}
