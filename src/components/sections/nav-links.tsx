'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const NAV_LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/services', label: 'Mes services' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
] as const

/**
 * Le seul morceau client de l’en-tête : marquer l’entrée courante demande de
 * connaître l’URL. Le reste du header reste rendu sur le serveur.
 */
export function NavLinks({ variant }: { variant: 'bureau' | 'mobile' }) {
  const pathname = usePathname()
  const links = variant === 'bureau' ? NAV_LINKS.slice(0, 3) : NAV_LINKS

  return (
    <ul
      className={
        variant === 'bureau'
          ? 'flex list-none items-center gap-9 p-0'
          : 'flex list-none flex-col p-0'
      }
    >
      {links.map((link) => {
        const actif = pathname === link.href
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={actif ? 'page' : undefined}
              className={
                variant === 'bureau'
                  ? [
                      'inline-block border-b-2 px-1 py-2.5 text-body',
                      actif ? 'border-noir font-bold' : 'border-transparent hover:border-trait',
                    ].join(' ')
                  : [
                      'block rounded-field px-4 py-3.5 text-body hover:bg-gris-fonce',
                      actif ? 'font-bold' : 'font-medium',
                    ].join(' ')
              }
            >
              {link.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
