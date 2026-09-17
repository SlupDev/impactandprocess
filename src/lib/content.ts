import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { z } from 'zod'
import type { GuideCategory, KcalVariant } from '@/lib/types'

export const GUIDE_CATEGORIES = ['semaines-sos', 'fondamentaux', 'periodes-a-risque'] as const

export const CATEGORY_LABELS: Record<GuideCategory, string> = {
  'semaines-sos': 'Semaines SOS',
  fondamentaux: 'Guides fondamentaux',
  'periodes-a-risque': 'Périodes à risque',
}

export const CATEGORY_INTROS: Record<GuideCategory, string> = {
  'semaines-sos': 'Trois plans de secours, prêts à appliquer dès ce soir.',
  fondamentaux:
    'Ces guides posent les bases : perte de gras, hygiène de vie, énergie, sommeil et régularité.',
  'periodes-a-risque':
    'Certaines périodes sont plus difficiles à gérer. La stratégie fait toute la différence.',
}

const GUIDES_DIR = path.join(process.cwd(), 'src', 'content', 'guides')
const PUBLIC_DIR = path.join(process.cwd(), 'public')

const frontmatterSchema = z
  .object({
    slug: z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'slug en kebab-case, sans accent ni majuscule'),
    title: z.string().min(3),
    category: z.enum(GUIDE_CATEGORIES),
    tagline: z.string().min(20),
    // Trois bénéfices concrets au minimum : c’est ce qui décide le lecteur.
    bullets: z.array(z.string().min(8)).min(3).max(5),
    hasKcalVariant: z.boolean(),
    // Chemin dans le bucket privé. Contient {kcal} quand il existe deux versions.
    file: z.string().regex(/^[a-z0-9{}-]+\.pdf$/),
    cover: z.string().startsWith('/'),
    pages: z.number().int().positive(),
    published: z.boolean(),
  })
  .refine((d) => d.hasKcalVariant === d.file.includes('{kcal}'), {
    message: 'hasKcalVariant et le marqueur {kcal} dans `file` doivent aller ensemble',
    path: ['file'],
  })

export type GuideFrontmatter = z.infer<typeof frontmatterSchema>

export interface Guide extends GuideFrontmatter {
  /** Corps MDX : la reformulation de la promesse. */
  body: string
  /** Vrai quand le visuel existe réellement dans /public. Sinon on dessine la couverture. */
  hasCoverAsset: boolean
}

let cache: Guide[] | null = null

function readAll(): Guide[] {
  const files = fs.readdirSync(GUIDES_DIR).filter((f) => f.endsWith('.mdx'))

  const guides = files.map((filename) => {
    const raw = fs.readFileSync(path.join(GUIDES_DIR, filename), 'utf8')
    const { data, content } = matter(raw)
    const parsed = frontmatterSchema.safeParse(data)

    if (!parsed.success) {
      const details = parsed.error.issues
        .map((i) => `  - ${i.path.join('.') || '(racine)'} : ${i.message}`)
        .join('\n')
      throw new Error(`Frontmatter invalide dans content/guides/${filename} :\n${details}`)
    }

    const expectedSlug = filename.replace(/\.mdx$/, '')
    if (parsed.data.slug !== expectedSlug) {
      throw new Error(
        `content/guides/${filename} : le slug « ${parsed.data.slug} » ne correspond pas au nom du fichier.`,
      )
    }

    return {
      ...parsed.data,
      body: content.trim(),
      hasCoverAsset: fs.existsSync(path.join(PUBLIC_DIR, parsed.data.cover)),
    }
  })

  const slugs = new Set<string>()
  for (const g of guides) {
    if (slugs.has(g.slug)) throw new Error(`Slug de guide en double : ${g.slug}`)
    slugs.add(g.slug)
  }

  return guides
}

export function getAllGuides(): Guide[] {
  cache ??= readAll()
  return cache
}

export function getPublishedGuides(): Guide[] {
  return getAllGuides().filter((g) => g.published)
}

export function getGuide(slug: string): Guide | undefined {
  return getPublishedGuides().find((g) => g.slug === slug)
}

export function getGuidesByCategory(): Array<{
  category: GuideCategory
  label: string
  intro: string
  guides: Guide[]
}> {
  return GUIDE_CATEGORIES.map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    intro: CATEGORY_INTROS[category],
    guides: getPublishedGuides().filter((g) => g.category === category),
  })).filter((group) => group.guides.length > 0)
}

/** Chemin du PDF dans le bucket privé, pour la variante demandée. */
export function storagePath(guide: Pick<Guide, 'file' | 'hasKcalVariant'>, variant: KcalVariant | null): string {
  if (!guide.hasKcalVariant) return guide.file
  return guide.file.replace('{kcal}', variant ?? '1800')
}
