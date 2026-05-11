import { PlayIcon, MusicalNoteIcon } from '@heroicons/react/24/solid'
import type { Song } from '../types'

interface SongCardProps {
  song: Song
  onPlay: (song: Song) => void
}

export default function SongCard({ song, onPlay }: SongCardProps) {
  // Format duration từ giây sang mm:ss
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Chưa có thông tin'
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-200 dark:bg-gray-700">
        {song.imageUrl ? (
          <img
            src={song.imageUrl}
            alt={song.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              // Fallback nếu ảnh lỗi
              e.currentTarget.style.display = 'none'
              e.currentTarget.nextElementSibling?.classList.remove('hidden')
            }}
          />
        ) : null}

        {/* Fallback icon */}
        <div className={`${song.imageUrl ? 'hidden' : ''} absolute inset-0 flex items-center justify-center`}>
          <MusicalNoteIcon className="w-20 h-20 text-gray-400" />
        </div>

        {/* Play button overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={() => onPlay(song)}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-lg"
            aria-label={`Play ${song.title}`}
          >
            <PlayIcon className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white text-lg truncate mb-1">
          {song.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 truncate mb-2">
          {song.artist.name}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
          <span>{formatDate(song.releaseDate)}</span>
        </div>
      </div>
    </div>
  )
}
