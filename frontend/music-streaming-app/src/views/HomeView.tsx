import type { Song } from '../types'
import type { View } from '../types/navigation'
import EmptyState from '../components/EmptyState'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import SongCard from '../components/SongCard'

interface HomeViewProps {
  songs: Song[]
  loading: boolean
  error: string | null
  searchQuery: string
  onRetry: () => void
  onPlaySong: (song: Song) => void
  onNavigate: (view: View) => void
}

export default function HomeView({
  songs,
  loading,
  error,
  searchQuery,
  onRetry,
  onPlaySong,
  onNavigate,
}: HomeViewProps) {
  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={onRetry} />
  if (songs.length === 0) {
    return (
      <EmptyState
        message={searchQuery ? `Không tìm thấy bài hát với từ khóa "${searchQuery}"` : 'Chưa có bài hát nào'}
      />
    )
  }

  return (
    <>
      {searchQuery ? (
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Tìm thấy <span className="font-semibold text-gray-900 dark:text-white">{songs.length}</span> kết quả cho "{searchQuery}"
          </p>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {songs.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            onPlay={onPlaySong}
            onOpenDetail={() => onNavigate({ name: 'songDetail', id: song.id })}
            onOpenArtist={(artistId) => onNavigate({ name: 'artistDetail', id: artistId })}
          />
        ))}
      </div>
    </>
  )
}
