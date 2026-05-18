import { MusicalNoteIcon } from '@heroicons/react/24/solid'

interface CoverArtProps {
  title: string
  imageUrl: string | null
  size?: 'large' | 'small'
}

export default function CoverArt({ title, imageUrl, size = 'large' }: CoverArtProps) {
  const sizeClass = size === 'large' ? 'h-64 w-64' : 'h-20 w-20'

  return (
    <div
      className={`${sizeClass} flex-shrink-0 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-indigo-900 to-blue-950 shadow-2xl ring-1 ring-white/15`}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <MusicalNoteIcon
            className={size === 'large' ? 'h-24 w-24 text-white/80' : 'h-10 w-10 text-white/80'}
          />
        </div>
      )}
    </div>
  )
}
