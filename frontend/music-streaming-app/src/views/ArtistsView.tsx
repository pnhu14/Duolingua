import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import type { Artist, Song } from '../types'
import type { View } from '../types/navigation'
import ArtistAvatar from '../components/ArtistAvatar'
import EmptyState from '../components/EmptyState'
import Loading from '../components/Loading'

interface ArtistsViewProps {
  artists: Artist[]
  songs: Song[]
  loading: boolean
  onNavigate: (view: View) => void
}

export default function ArtistsView({ artists, songs, loading, onNavigate }: ArtistsViewProps) {
  if (loading) return <Loading />
  if (artists.length === 0) return <EmptyState message="Chưa có nghệ sĩ nào" />

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {artists.map((artist) => {
        const songCount = songs.filter((song) => song.artist?.id === artist.id).length

        return (
          <button
            key={artist.id}
            type="button"
            onClick={() => onNavigate({ name: 'artistDetail', id: artist.id })}
            className="group overflow-hidden rounded-2xl bg-white text-left shadow-md transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800"
          >
            <div className="h-24 bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-600">
              {artist.bannerUrl ? <img src={artist.bannerUrl} alt="" className="h-full w-full object-cover" /> : null}
            </div>
            <div className="-mt-10 p-5">
              <ArtistAvatar artist={artist} />
              <div className="mt-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="flex items-center gap-2 truncate text-xl font-bold text-gray-900 dark:text-white">
                    <span className="truncate">{artist.name}</span>
                    {artist.verified ? <CheckBadgeIcon className="h-5 w-5 flex-shrink-0 text-sky-500" /> : null}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {songCount} bài hát{artist.country ? ` • ${artist.country}` : ''}
                  </p>
                </div>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-500/15 dark:text-green-300">
                  Xem
                </span>
              </div>
              {artist.bio ? (
                <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-300">{artist.bio}</p>
              ) : null}
            </div>
          </button>
        )
      })}
    </div>
  )
}
