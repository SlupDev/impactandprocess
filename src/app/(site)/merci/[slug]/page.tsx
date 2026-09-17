import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LinkButton } from '@/components/ui/link-button'
import { getGuide, getPublishedGuides } from '@/lib/content'

const SUITE: Record<string, string> = {
  'sos-express': '4-piliers',
  'sos-deplacement': 'sos-express',
  'sos-reset': '4-piliers',
  '4-piliers': 'perte-masse-grasse',
  'perte-masse-grasse': 'sos-express',
  'profiter-des-fetes': 'sos-reset',
}

export function generateStaticParams() {
  return getPublishedGuides().map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata(props: PageProps<'/merci/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const guide = getGuide(slug)
  const title = guide ? `C’est envoyé — ${guide.title}` : 'C’est envoyé'

  return {
    title,
    description: 'Ton guide part par email dans la minute. Le lien reste valable sept jours.',
    alternates: { canonical: `/merci/${slug}` },
    // Page de conversion : elle doit exister comme URL mesurable, pas être indexée.
    robots: { index: false, follow: false },
    openGraph: { type: 'website', locale: 'fr_FR', title, siteName: 'Impact & Process' },
  }
}

export default async function MerciPage(props: PageProps<'/merci/[slug]'>) {
  const { slug } = await props.params
  const { deja } = await props.searchParams
  const guide = getGuide(slug)
  if (!guide) notFound()

  const dejaConnu = deja === '1'
  const suivant = getGuide(SUITE[guide.slug] ?? '') ?? getPublishedGuides().find((g) => g.slug !== guide.slug)

  return (
    <main id="contenu">
      <section className="bg-creme">
        <div className="site-container flex flex-col gap-4 py-section">
          <p>
            <span className="inline-block rounded-pill bg-jaune px-3.5 py-1.5 text-chip font-bold uppercase text-noir">
              C’est envoyé
            </span>
          </p>

          <h1 className="text-display font-black italic">
            «&nbsp;{guide.title}&nbsp;» arrive dans ta boîte.
          </h1>

          <p className="text-lede max-w-[44rem]">
            {dejaConnu
              ? 'Ton adresse était déjà connue, donc rien n’a été créé en double. Le guide vient de repartir.'
              : 'L’email part dans la minute.'}{' '}
            Le lien de téléchargement reste valable sept jours.
          </p>
        </div>
      </section>

      <section>
        <div className="site-container flex flex-col gap-5 py-section">
          <h2 className="text-h2 font-black italic">S’il n’arrive pas</h2>
          <ul className="flex max-w-[44rem] list-none flex-col gap-2.5 p-0">
            <li className="flex gap-2.5 text-body">
              <span aria-hidden="true" className="font-black">→</span>
              <span>Regarde dans les spams et dans l’onglet «&nbsp;Promotions&nbsp;» de Gmail.</span>
            </li>
            <li className="flex gap-2.5 text-body">
              <span aria-hidden="true" className="font-black">→</span>
              <span>
                L’expéditeur est <strong>guides@impactandprocess.fr</strong>. Ajoute-le à tes
                contacts, les prochains n’iront plus en spam.
              </span>
            </li>
            <li className="flex gap-2.5 text-body">
              <span aria-hidden="true" className="font-black">→</span>
              <span>
                Toujours rien après dix minutes&nbsp;? Écris-moi, je te l’envoie à la main.
              </span>
            </li>
          </ul>
          <LinkButton href="/contact" variant="outline" fullWidth={false} className="w-fit">
            Me contacter
          </LinkButton>
        </div>
      </section>

      {suivant ? (
        <section className="bg-gris">
          <div className="site-container flex flex-col gap-4 py-section">
            <p>
              <span className="inline-block rounded-pill bg-jaune px-3.5 py-1.5 text-chip font-bold uppercase text-noir">
                La suite logique
              </span>
            </p>
            <h2 className="text-h2 font-black italic">{suivant.title}</h2>
            <p className="text-lede max-w-[44rem]">{suivant.tagline}</p>
            <LinkButton
              href={`/guides/${suivant.slug}`}
              variant="primary"
              fullWidth={false}
              className="w-fit"
            >
              Recevoir aussi celui-là
            </LinkButton>
          </div>
        </section>
      ) : null}
    </main>
  )
}
