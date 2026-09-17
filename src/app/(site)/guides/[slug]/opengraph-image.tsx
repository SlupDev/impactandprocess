import { ImageResponse } from 'next/og'
import { CATEGORY_LABELS, getGuide, getPublishedGuides } from '@/lib/content'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Guide gratuit — Impact & Process'

export function generateStaticParams() {
  return getPublishedGuides().map((guide) => ({ slug: guide.slug }))
}

export default async function OpengraphImage(props: PageProps<'/guides/[slug]'>) {
  const { slug } = await props.params
  const guide = getGuide(slug)

  const kicker = guide ? CATEGORY_LABELS[guide.category] : 'Guides gratuits'
  const title = guide?.title ?? 'Impact & Process'
  const tagline = guide?.tagline ?? 'Coaching sportif en ligne.'
  const meta = guide
    ? `${guide.pages} pages${guide.hasKcalVariant ? ' · 2 formats kcal' : ''} · gratuit`
    : 'Six guides gratuits'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#1D3250',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div
            style={{
              display: 'flex',
              alignSelf: 'flex-start',
              backgroundColor: '#FFDE59',
              color: '#000000',
              borderRadius: '999px',
              padding: '12px 26px',
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            {kicker}
          </div>

          <div
            style={{
              display: 'flex',
              color: '#FFDE59',
              fontSize: 84,
              fontWeight: 800,
              fontStyle: 'italic',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: 'flex',
              color: 'rgba(255,255,255,0.88)',
              fontSize: 32,
              lineHeight: 1.4,
              maxWidth: '900px',
            }}
          >
            {tagline}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', color: '#FFFFFF', fontSize: 30, fontWeight: 800 }}>
            Impact &amp; Process
          </div>
          <div style={{ display: 'flex', color: 'rgba(255,255,255,0.7)', fontSize: 26 }}>{meta}</div>
        </div>
      </div>
    ),
    size,
  )
}
