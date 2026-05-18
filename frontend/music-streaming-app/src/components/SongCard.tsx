import {
  InformationCircleIcon,
  MusicalNoteIcon,
  PlayIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid'
import type { Song } from '../types'

interface SongCardProps {
  song: Song
  onPlay: (song: Song) => void
  onOpenDetail?: (song: Song) => void
  onOpenArtist?: (artistId: string) => void
}

const DEFAULT_COVER_STYLE = 'bg-gradient-to-br from-slate-800 via-indigo-900 to-blue-950'

function PlaceholderCover() {
  return (
    <div className={`relative flex h-full w-full items-center justify-center overflow-hidden ${DEFAULT_COVER_STYLE}`}>
      <div className="absolute -left-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/5" />
      <div className="absolute inset-0 backdrop-blur-[1px]" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center transition-transform duration-300 group-hover:scale-105">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-2xl backdrop-blur-md">
          <MusicalNoteIcon className="h-16 w-16 opacity-90 drop-shadow-[0_0_18px_rgba(255,255,255,0.35)]" />
        </div>
        <div className="mt-3 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-white/85 shadow-lg backdrop-blur-md">
          No Cover
        </div>
      </div>
    </div>
  )
}

export default function SongCard({ song, onPlay, onOpenDetail, onOpenArtist }: SongCardProps) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Chưa có thông tin'
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const artistName = song.artist?.name ?? 'Không rõ nghệ sĩ'
  const imageUrl = song.coverUrl

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800">
      <div className="relative aspect-square overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={song.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <PlaceholderCover />
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onPlay(song)}
            className="rounded-full bg-green-500 p-4 text-white shadow-lg transition-transform duration-300 hover:bg-green-600 group-hover:scale-105"
            aria-label={`Phát ${song.title}`}
          >
            <PlayIcon className="h-8 w-8" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="mb-1 truncate text-lg font-semibold text-gray-900 dark:text-white">
          {song.title}
        </h3>
        {song.artist?.id && onOpenArtist ? (
          <button
            type="button"
            onClick={() => onOpenArtist(song.artist!.id)}
            className="mb-2 inline-flex max-w-full items-center gap-1 text-sm text-gray-600 transition-colors hover:text-green-600 dark:text-gray-400 dark:hover:text-green-300"
          >
            <UserCircleIcon className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{artistName}</span>
          </button>
        ) : (
          <p className="mb-2 truncate text-sm text-gray-600 dark:text-gray-400">{artistName}</p>
        )}
        <div className="flex items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-500">
          <span className="truncate">{formatDate(song.releaseDate)}</span>
          <span>{formatDuration(song.durationSeconds)}</span>
        </div>
        {onOpenDetail ? (
          <button
            type="button"
            onClick={() => onOpenDetail(song)}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-green-300 hover:bg-green-50 hover:text-green-700 dark:border-gray-700 dark:text-gray-200 dark:hover:border-green-500/50 dark:hover:bg-green-500/10 dark:hover:text-green-300"
          >
            <InformationCircleIcon className="h-5 w-5" />
            Chi tiết
          </button>
        ) : null}
      </div>
    </div>
  )
}
