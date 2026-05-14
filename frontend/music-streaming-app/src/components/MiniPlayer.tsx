import { PauseIcon, PlayIcon, SpeakerWaveIcon } from '@heroicons/react/24/solid'
import type { SongDetail } from '../types'

interface MiniPlayerProps {
  song: SongDetail | null
  isPlaying: boolean
  onTogglePlay: () => void
  onClose: () => void
}

export default function MiniPlayer({ song, isPlaying, onTogglePlay, onClose }: MiniPlayerProps) {
  if (!song) return null

  const artistName = song.artist?.name ?? 'Không rõ nghệ sĩ'
  const albumName = song.album?.title ?? 'Độc lập'
  const coverUrl = song.coverUrl

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-5xl">
      <div className="overflow-hidden rounded-3xl border border-white/20 bg-gray-900/95 text-white shadow-2xl backdrop-blur-xl ring-1 ring-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-indigo-500/10" />
        <div className="relative flex flex-col gap-4 p-4 md:flex-row md:items-center md:gap-5">
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/15">
              {coverUrl ? (
                <img src={coverUrl} alt={song.title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800 via-indigo-900 to-blue-950">
                  <SpeakerWaveIcon className="h-8 w-8 text-white/80" />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/50">Now Playing</p>
              <h3 className="mt-1 truncate text-lg font-semibold text-white">{song.title}</h3>
              <p className="truncate text-sm text-white/70">
                {artistName} • {albumName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:flex-shrink-0">
            <button
              onClick={onTogglePlay}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-gray-900 transition-transform hover:scale-[1.02]"
            >
              {isPlaying ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>

            <button
              onClick={onClose}
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
