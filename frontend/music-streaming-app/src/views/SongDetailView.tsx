import { ArrowLeftIcon, CalendarDaysIcon, ClockIcon, MusicalNoteIcon, PlayIcon } from '@heroicons/react/24/solid'
import type { SongDetail } from '../types'
import type { View } from '../types/navigation'
import CoverArt from '../components/CoverArt'
import EmptyState from '../components/EmptyState'
import Loading from '../components/Loading'
import { formatDate, formatDuration } from '../utils/format'

interface SongDetailViewProps {
  song: SongDetail | null
  loading: boolean
  onBack: () => void
  onPlaySong: (song: SongDetail) => void
  onNavigate: (view: View) => void
}

export default function SongDetailView({
  song,
  loading,
  onBack,
  onPlaySong,
  onNavigate,
}: SongDetailViewProps) {
  if (loading && !song) return <Loading />
  if (!song) return <EmptyState message="Không tìm thấy bài hát" />

  return (
    <div className="space-y-8">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Quay lại
      </button>

      <section className="overflow-hidden rounded-3xl bg-gray-950 text-white shadow-2xl">
        <div className="grid gap-8 p-6 md:grid-cols-[auto_1fr] md:p-10">
          <CoverArt title={song.title} imageUrl={song.coverUrl} />
          <div className="flex min-w-0 flex-col justify-end">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-green-300">Chi tiết bài hát</p>
            <h2 className="mt-4 text-4xl font-bold md:text-6xl">{song.title}</h2>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-white/75">
              <span>{song.artist?.name ?? 'Không rõ nghệ sĩ'}</span>
              {song.album?.title ? <span>• {song.album.title}</span> : null}
              <span>• {formatDuration(song.durationSeconds)}</span>
              {song.explicit ? <span className="rounded bg-white/15 px-2 py-1 text-xs font-bold">E</span> : null}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onPlaySong(song)}
                className="inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition-colors hover:bg-green-600"
              >
                <PlayIcon className="h-5 w-5" />
                Phát bài hát
              </button>
              {song.artist?.id ? (
                <button
                  type="button"
                  onClick={() => onNavigate({ name: 'artistDetail', id: song.artist!.id })}
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10"
                >
                  Xem nghệ sĩ
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-gray-800">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Thông tin</h3>
          <dl className="mt-5 space-y-4 text-sm">
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <CalendarDaysIcon className="h-5 w-5 text-green-500" />
              <span>Phát hành: {formatDate(song.releaseDate)}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <ClockIcon className="h-5 w-5 text-green-500" />
              <span>Thời lượng: {formatDuration(song.durationSeconds)}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <MusicalNoteIcon className="h-5 w-5 text-green-500" />
              <span>
                Track {song.trackNumber ?? '-'}{song.discNumber ? ` • Disc ${song.discNumber}` : ''}
              </span>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-gray-800">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Lời bài hát</h3>
          {song.lyrics ? (
            <p className="mt-4 whitespace-pre-line leading-7 text-gray-700 dark:text-gray-300">{song.lyrics}</p>
          ) : (
            <p className="mt-4 text-gray-500 dark:text-gray-400">Chưa có lời bài hát.</p>
          )}
        </div>
      </section>
    </div>
  )
}
