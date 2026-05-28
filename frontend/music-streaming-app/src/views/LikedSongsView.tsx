import type { Song } from '../types'
import type { View } from '../types/navigation'
import EmptyState from '../components/EmptyState'
import Loading from '../components/Loading'
import SongCard from '../components/SongCard'

interface LikedSongsViewProps {
  songs: Song[]
  likedSongIds: Set<string>
  loading: boolean
  onPlaySong: (song: Song) => void
  onNavigate: (view: View) => void
  onToggleLike: (song: Song) => void
}

export default function LikedSongsView({
  songs,
  likedSongIds,
  loading,
  onPlaySong,
  onNavigate,
  onToggleLike,
}: LikedSongsViewProps) {
  if (loading) return <Loading />

  if (songs.length === 0) {
    return <EmptyState message="Chưa có bài hát yêu thích" />
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black uppercase tracking-wide text-white">Yêu thích</h2>
        <p className="mt-1 text-xs font-semibold text-zinc-500">
          {songs.length} bài hát đã lưu trong thư viện của bạn
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {songs.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            onPlay={onPlaySong}
            onOpenDetail={() => onNavigate({ name: 'songDetail', id: song.id })}
            onOpenArtist={(artistId) => onNavigate({ name: 'artistDetail', id: artistId })}
            onToggleLike={onToggleLike}
            isLiked={likedSongIds.has(song.id)}
            compact={true}
          />
        ))}
      </div>
    </div>
  )
}
