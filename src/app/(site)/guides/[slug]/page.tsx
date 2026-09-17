import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { LeadForm } from '@/components/forms/lead-form'
import { GuideCover } from '@/components/sections/guide-cover'
import { CATEGORY_LABELS, getGuide, getPublishedGuides } from '@/lib/content'

export function generateStaticParams() {
  return getPublishedGuides().map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata(props: PageProps<'/guides/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const guide = getGuide(slug)
  if (!guide) return { title: 'Guide introuvable' }

  const title = `${guide.title} — guide gratuit`
  const url = `/guides/${guide.slug}`

  return {
    title,
    description: guide.tagline,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      locale: 'fr_FR',
      url,
      siteName: 'Impact & Process',
      title,
      description: guide.tagline,
    },
    twitter: { card: 'summary_large_image', title, description: guide.tagline },
  }
}

const mdxComponents = {
  p: (props: React.ComponentProps<'p'>) => <p className="text-body max-w-[44rem]" {...props} />,
}

export default async function GuidePage(props: PageProps<'/guides/[slug]'>) {
  const { slug } = await props.params
  const guide = getGuide(slug)
  if (!guide) notFound()

  return (
    <main id="contenu">
      <section className="bg-creme">
        <div className="site-container flex flex-col gap-4 py-section">
          <p className="flex flex-wrap items-center gap-3">
            <Link
              href="/guides"
              className="text-small font-bold text-nuit underline decoration-jaune decoration-2 underline-offset-4"
            >
              ‹ Tous les guides
            </Link>
            <span className="inline-block rounded-pill bg-jaune px-3.5 py-1.5 text-chip font-bold uppercase text-noir">
              {CATEGORY_LABELS[guide.category]}
            </span>
          </p>

          <h1 className="text-display font-black italic">{guide.title}</h1>
          <p className="text-lede max-w-[44rem]">{guide.tagline}</p>

          <GuideCover guide={guide} priority />
        </div>
      </section>

      <section>
        <div className="site-container flex flex-col gap-5 py-section">
          <h2 className="text-h2 font-black italic">Ce que tu y trouves</h2>
          <ul className="flex max-w-[44rem] list-none flex-col gap-2.5 p-0">
            {guide.bullets.map((b) => (
              <li key={b} className="flex gap-2.5 text-body">
                <span aria-hidden="true" className="font-black text-nuit">
                  →
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Règle 1 : le formulaire est inline, présent dans la réponse serveur, jamais en modale. */}
      <section className="bg-gris">
        <div className="site-container flex max-w-[40rem] flex-col gap-4 py-section">
          <LeadForm
            slug={guide.slug}
            guideTitle={guide.title}
            hasKcalVariant={guide.hasKcalVariant}
            ctaLabel="Recevoir mon guide"
          />
        </div>
      </section>

      <section className="bg-nuit text-blanc">
        <div className="site-container flex flex-col gap-4 py-section">
          <h2 className="text-h2 font-black italic">Concrètement</h2>
          <div className="flex flex-col gap-4 text-blanc">
            <MDXRemote source={guide.body} components={mdxComponents} />
          </div>
          <p className="text-small text-blanc/70">
            Conseils d’hygiène de vie. Ils ne remplacent pas un avis médical ou diététique.
          </p>
        </div>
      </section>
    </main>
  )
}
