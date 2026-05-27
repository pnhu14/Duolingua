import { useState } from 'react'
import {
  HeartIcon as HeartOutlineIcon,
} from '@heroicons/react/24/outline'
import {
  HeartIcon as HeartSolidIcon,
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
  onToggleLike?: (song: Song) => void
  isLiked?: boolean
  compact?: boolean
}

const DEFAULT_COVER_STYLE = 'bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950'

function PlaceholderCover() {
  return (
    <div className={`relative flex h-full w-full items-center justify-center overflow-hidden ${DEFAULT_COVER_STYLE}`}>
      <div className="absolute -left-10 -top-10 h-36 w-36 rounded-full bg-red-500/5 blur-3xl" />
      <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-zinc-500/5 blur-3xl" />

      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
      <div className="relative z-10 flex flex-col items-center justify-center text-center transition-transform duration-300 group-hover:scale-105">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/60 text-zinc-500 shadow-2xl backdrop-blur-sm">
          <MusicalNoteIcon className="h-9 w-9 opacity-80" />
        </div>
      </div>
    </div>
  )
}

export default function SongCard({
  song,
  onPlay,
  onOpenDetail,
  onOpenArtist,
  onToggleLike,
  isLiked = false,
  compact = false,
}: SongCardProps) {
  const [showLikeBurst, setShowLikeBurst] = useState(false)

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
    <div className="group relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800/80 shadow-lg text-white select-none transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/50 hover:border-zinc-700/80">
      {/* Aspect-square cover art container */}
      <div className="relative aspect-square overflow-hidden rounded-xl m-3 border border-zinc-800/50">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={song.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <PlaceholderCover />
        )}

        {onToggleLike ? (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              if (!isLiked) {
                setShowLikeBurst(true)
                window.setTimeout(() => setShowLikeBurst(false), 620)
              }
              onToggleLike(song)
            }}
            className={`absolute right-2.5 top-2.5 z-10 flex h-9 w-9 items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition-all duration-200 ${
              isLiked
                ? 'border-red-500/40 bg-zinc-950/85 text-red-500 shadow-red-500/25 ring-2 ring-red-500/20 hover:border-red-400/60 hover:bg-zinc-900'
                : 'border-white/10 bg-black/45 text-white hover:bg-black/70'
            }`}
            aria-label={isLiked ? `Bỏ yêu thích ${song.title}` : `Yêu thích ${song.title}`}
          >
            {isLiked ? (
              <HeartSolidIcon className="h-4.5 w-4.5 animate-[liked-heart_360ms_ease-out]" />
            ) : (
              <HeartOutlineIcon className="h-4.5 w-4.5" />
            )}
            {showLikeBurst ? (
              <HeartSolidIcon className="pointer-events-none absolute h-4.5 w-4.5 text-red-500 animate-[float-heart_620ms_ease-out_forwards]" />
            ) : null}
          </button>
        ) : null}

        {/* Play Button Overlay on Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            type="button"
            onClick={() => onPlay(song)}
            className="h-12 w-12 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-2xl border border-red-400/20 transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
            aria-label={`Phát ${song.title}`}
          >
            <PlayIcon className="h-5 w-5 fill-current ml-0.5" />
          </button>
        </div>
      </div>

      {/* Details Area */}
      <div className="px-4 pb-4">
        <h3 className="truncate text-sm font-bold text-zinc-100 group-hover:text-red-400 transition-colors duration-200">
          {song.title}
        </h3>

        {song.artist?.id && onOpenArtist ? (
          <button
            type="button"
            onClick={() => onOpenArtist(song.artist!.id)}
            className="mt-1.5 inline-flex max-w-full items-center gap-1 text-xs text-zinc-400 font-semibold hover:text-zinc-200 transition-colors truncate block text-left"
          >
            <UserCircleIcon className="h-3.5 w-3.5 flex-shrink-0 text-zinc-500" />
            <span className="truncate">{artistName}</span>
          </button>
        ) : (
          <p className="mt-1 truncate text-xs text-zinc-400 font-semibold">{artistName}</p>
        )}

        {!compact && (
          <div className="flex items-center justify-between gap-3 text-[11px] font-bold text-zinc-500 mt-3 pt-3 border-t border-zinc-900/60">
            <span className="truncate">{formatDate(song.releaseDate)}</span>
            <span>{formatDuration(song.durationSeconds)}</span>
          </div>
        )}

        {onOpenDetail && !compact ? (
          <button
            type="button"
            onClick={() => onOpenDetail(song)}
            className="mt-3.5 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/40 py-2 text-xs font-bold text-zinc-400 hover:border-zinc-700 hover:text-white hover:bg-zinc-900 transition-all duration-200 cursor-pointer"
          >
            <InformationCircleIcon className="h-4 w-4" />
            <span>Chi tiết</span>
          </button>
        ) : null}
      </div>
    </div>
  )
}
