import { ArrowLeftIcon, CheckBadgeIcon, GlobeAltIcon } from '@heroicons/react/24/solid'
import type { Artist, Song } from '../types'
import type { View } from '../types/navigation'
import ArtistAvatar from '../components/ArtistAvatar'
import EmptyState from '../components/EmptyState'
import Loading from '../components/Loading'
import SongCard from '../components/SongCard'

interface ArtistDetailViewProps {
  artist: Artist | null
  songs: Song[]
  loading: boolean
  onBack: () => void
  onPlaySong: (song: Song) => void
  onNavigate: (view: View) => void
}

export default function ArtistDetailView({
  artist,
  songs,
  loading,
  onBack,
  onPlaySong,
  onNavigate,
}: ArtistDetailViewProps) {
  if (loading && !artist) return <Loading />
  if (!artist) return <EmptyState message="Không tìm thấy nghệ sĩ" />

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

      <section className="overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-gray-800">
        <div className="h-48 bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-700 md:h-64">
          {artist.bannerUrl ? <img src={artist.bannerUrl} alt="" className="h-full w-full object-cover" /> : null}
        </div>
        <div className="-mt-14 p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end">
            <ArtistAvatar artist={artist} />
            <div className="min-w-0">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-green-600 dark:text-green-300">
                Nghệ sĩ
              </p>
              <h2 className="mt-2 flex items-center gap-3 text-4xl font-bold text-gray-900 dark:text-white md:text-6xl">
                <span className="truncate">{artist.name}</span>
                {artist.verified ? <CheckBadgeIcon className="h-9 w-9 flex-shrink-0 text-sky-500" /> : null}
              </h2>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-300">
                <span>{songs.length} bài hát</span>
                {artist.country ? (
                  <span className="inline-flex items-center gap-1">
                    <GlobeAltIcon className="h-4 w-4" />
                    {artist.country}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
          {artist.bio ? <p className="mt-6 max-w-3xl leading-7 text-gray-700 dark:text-gray-300">{artist.bio}</p> : null}
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-center justify-between gap-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Bài hát của nghệ sĩ</h3>
        </div>
        {songs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {songs.map((song) => (
              <SongCard
                key={song.id}
                song={song}
                onPlay={onPlaySong}
                onOpenDetail={() => onNavigate({ name: 'songDetail', id: song.id })}
              />
            ))}
          </div>
        ) : (
          <EmptyState message="Chưa có bài hát nào cho nghệ sĩ này" />
        )}
      </section>
    </div>
  )
}
