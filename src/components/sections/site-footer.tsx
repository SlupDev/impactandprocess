import Image from 'next/image'
import Link from 'next/link'
import { FacebookIcon, InstagramIcon } from '@/components/ui/icons'
import { FACEBOOK_URL, INSTAGRAM_URL } from '@/lib/site'

const MENU = [
  { href: '/', label: 'Accueil' },
  { href: '/services', label: 'Services' },
  { href: '/guides', label: 'Guides gratuits' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/politique-de-confidentialite', label: 'Politique de confidentialité' },
]

/** Un seul footer sur tout le site (AGENTS.md §1). */
export function SiteFooter() {
  return (
    <footer className="section-sombre mt-auto bg-noir text-blanc">
      <div className="site-container grid grid-cols-1 gap-12 py-16 md:grid-cols-[minmax(0,1fr)_auto] md:gap-20">
        <div className="flex flex-col items-start gap-6">
          <Image
            src="/images/logo.png"
            alt="Impact &amp; Process — IP Training"
            width={801}
            height={798}
            className="h-16 w-auto"
          />

          <p className="max-w-[34rem] text-body text-blanc/75">
            J’aide les adultes actifs à perdre du gras, retrouver une vraie régularité et construire
            un cadre durable autour du sport, de la nutrition et de l’hygiène de vie.
          </p>

          <ul className="flex list-none items-center gap-3 p-0">
            <li>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-11 items-center justify-center rounded-pill border border-blanc/30 text-blanc hover:bg-blanc hover:text-noir"
              >
                <FacebookIcon className="size-5" />
                <span className="sr-only">Facebook (nouvelle fenêtre)</span>
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-11 items-center justify-center rounded-pill border border-blanc/30 text-blanc hover:bg-blanc hover:text-noir"
              >
                <InstagramIcon className="size-5" />
                <span className="sr-only">Instagram (nouvelle fenêtre)</span>
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Pied de page" className="flex flex-col gap-4">
          <p className="titre text-h3">Menu</p>
          <ul className="flex list-none flex-col gap-1 p-0">
            {MENU.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-block py-1.5 text-body text-blanc/80 hover:text-blanc hover:underline hover:underline-offset-4"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-blanc/15">
        <div className="site-container flex flex-col gap-2 py-6">
          <p className="text-small text-blanc/60">
            © {new Date().getFullYear()} Impact &amp; Process. Tous droits réservés.
          </p>
          <p className="text-small text-blanc/60">
            Conseils d’hygiène de vie. Ils ne remplacent pas un avis médical ou diététique.
          </p>
        </div>
      </div>
    </footer>
  )
}
