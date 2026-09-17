import type { Metadata } from 'next'
import { LinkButton } from '@/components/ui/link-button'

export function generateMetadata(): Metadata {
  return {
    title: 'Désinscription',
    description: 'Confirmation de désinscription de la lettre du lundi.',
    alternates: { canonical: '/desinscription' },
    robots: { index: false, follow: false },
  }
}

const MESSAGES = {
  ok: {
    titre: 'C’est fait, tu es désinscrit.',
    texte:
      'Tu ne recevras plus la lettre du lundi. Les guides que tu as déjà demandés restent téléchargeables tant que leur lien est valable.',
  },
  inconnu: {
    titre: 'Ce lien de désinscription n’est plus reconnu',
    texte:
      'Soit la désinscription a déjà été faite, soit le lien a été tronqué par ton client mail. Dans le doute, écris-moi et je m’en occupe.',
  },
  erreur: {
    titre: 'La désinscription n’a pas pu être enregistrée',
    texte:
      'Un problème technique est survenu. Réessaie dans quelques minutes, ou écris-moi : je te retire de la liste à la main.',
  },
} as const

export default async function DesinscriptionPage(props: PageProps<'/desinscription'>) {
  const { etat } = await props.searchParams
  const cle = etat === 'inconnu' || etat === 'erreur' ? etat : 'ok'
  const { titre, texte } = MESSAGES[cle]

  return (
    <main id="contenu">
      <section className="bg-creme">
        <div className="site-container flex flex-col gap-4 py-section">
          <h1 className="text-display font-black italic">{titre}</h1>
          <p className="text-lede max-w-[44rem]">{texte}</p>
          <div className="flex flex-wrap gap-3">
            <LinkButton href="/guides" variant="primary" fullWidth={false} className="w-fit">
              Voir les guides
            </LinkButton>
            <LinkButton href="/contact" variant="outline" fullWidth={false} className="w-fit">
              Me contacter
            </LinkButton>
          </div>
        </div>
      </section>
    </main>
  )
}
