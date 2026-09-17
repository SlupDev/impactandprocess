import Image from 'next/image'
import { CATEGORY_LABELS } from '@/lib/content'
import type { Guide } from '@/lib/content'

interface GuideCoverProps {
  guide: Guide
  priority?: boolean
}

/**
 * Le visuel réel dès qu’il existe dans /public, sinon une couverture dessinée aux
 * couleurs du guide. On ne livre pas d’image factice, et on n’affiche pas de trou.
 */
export function GuideCover({ guide, priority = false }: GuideCoverProps) {
  if (guide.hasCoverAsset) {
    return (
      <Image
        src={guide.cover}
        alt={`Couverture du guide ${guide.title}`}
        width={880}
        height={550}
        priority={priority}
        sizes="(min-width: 64rem) 26rem, 100vw"
        className="w-full max-w-[26rem] rounded-[14px]"
      />
    )
  }

  return (
    <div
      role="img"
      aria-label={`Couverture du guide ${guide.title}, ${CATEGORY_LABELS[guide.category]}, ${guide.pages} pages`}
      className="flex aspect-[16/10] w-full max-w-[26rem] flex-col justify-end gap-1 rounded-[14px] bg-nuit p-4"
    >
      <span className="text-chip font-bold uppercase text-blanc/60">
        {CATEGORY_LABELS[guide.category]} · {guide.pages} pages
      </span>
      <span className="text-h2 font-black italic text-jaune">{guide.title}</span>
    </div>
  )
}
