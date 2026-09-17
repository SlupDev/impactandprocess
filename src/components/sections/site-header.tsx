import Image from 'next/image'
import Link from 'next/link'
import { NavLinks } from '@/components/sections/nav-links'
import { MenuIcon, PhoneIcon } from '@/components/ui/icons'

export function SiteHeader() {
  return (
    <header className="bg-blanc">
      <div className="site-container flex min-h-20 items-center justify-between gap-4 py-3">
        <Link href="/" className="shrink-0" aria-label="Impact & Process — retour à l’accueil">
          <Image
            src="/images/logo.png"
            alt="Impact &amp; Process — IP Training"
            width={801}
            height={798}
            priority
            className="h-16 w-auto"
          />
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <NavLinks variant="bureau" />
        </nav>

        <Link
          href="/contact"
          className="hidden shrink-0 items-center gap-2.5 rounded-pill bg-noir px-6 py-3.5 text-body font-bold text-blanc hover:bg-encre lg:inline-flex"
        >
          Contact
          <PhoneIcon />
        </Link>

        {/*
          Menu mobile sans JavaScript : <details> ouvre et ferme tout seul, donc
          la navigation reste utilisable même si le bundle ne se charge pas.
        */}
        <details className="relative lg:hidden">
          <summary className="flex size-12 cursor-pointer list-none items-center justify-center rounded-pill border border-trait text-noir [&::-webkit-details-marker]:hidden">
            <MenuIcon className="size-6" />
            <span className="sr-only">Ouvrir le menu</span>
          </summary>

          <nav
            aria-label="Navigation principale"
            className="absolute right-0 top-14 z-50 w-60 rounded-card border border-trait bg-blanc p-2 shadow-lg"
          >
            <NavLinks variant="mobile" />
          </nav>
        </details>
      </div>
    </header>
  )
}
