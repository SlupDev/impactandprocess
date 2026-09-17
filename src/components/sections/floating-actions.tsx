import { CalendarIcon, WhatsappIcon } from '@/components/ui/icons'
import { CALENDLY_PUBLIC_URL, WHATSAPP_URL } from '@/lib/site'

/**
 * Les deux pastilles fixes en bas à droite. Elles restent atteignables au
 * clavier — d’où de vrais liens et non des boutons décoratifs — et se rangent
 * au-dessus du pouce sur mobile.
 */
export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-center gap-3 md:bottom-8 md:right-8">
      <a
        href={CALENDLY_PUBLIC_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex size-14 items-center justify-center rounded-pill border border-trait bg-blanc text-noir shadow-lg hover:bg-gris-fonce"
      >
        <CalendarIcon className="size-6" />
        <span className="sr-only">Réserver un appel diagnostic (nouvelle fenêtre)</span>
      </a>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex size-14 items-center justify-center rounded-pill bg-noir text-vert-clair shadow-lg ring-1 ring-vert-clair/60 hover:bg-encre"
      >
        <WhatsappIcon className="size-6" />
        <span className="sr-only">Écrire sur WhatsApp (nouvelle fenêtre)</span>
      </a>
    </div>
  )
}
