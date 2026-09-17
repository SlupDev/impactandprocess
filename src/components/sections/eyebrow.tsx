import type { ReactNode } from 'react'

interface EyebrowProps {
  children: ReactNode
  tone?: 'clair' | 'sombre'
  className?: string
}

/**
 * Le sur-titre en pilule qui ouvre chaque section. C’est le seul endroit du site
 * où un contour fin est utilisé : partout ailleurs les blocs sont pleins.
 */
export function Eyebrow({ children, tone = 'clair', className }: EyebrowProps) {
  return (
    <p className={className}>
      <span
        className={[
          'inline-flex items-center gap-1.5 rounded-pill border px-4 py-1.5 text-chip font-medium italic',
          tone === 'sombre' ? 'border-blanc/45 text-blanc' : 'border-noir text-noir',
        ].join(' ')}
      >
        {children}
      </span>
    </p>
  )
}
