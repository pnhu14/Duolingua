import { useRef, useState, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
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
  likedSongIds: Set<string>
  onRetry: () => void
  onPlaySong: (song: Song) => void
  onNavigate: (view: View) => void
  onToggleLike: (song: Song) => void
}

interface ScrollableRowProps {
  title: string
  songs: Song[]
  likedSongIds: Set<string>
  onPlaySong: (song: Song) => void
  onNavigate: (view: View) => void
  onToggleLike: (song: Song) => void
}

function ScrollableRow({
  title,
  songs,
  likedSongIds,
  onPlaySong,
  onNavigate,
  onToggleLike,
}: ScrollableRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(false)

  const updateArrows = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setShowLeft(scrollLeft > 5)
      // Allow minor subpixel precision issues
      setShowRight(scrollLeft < scrollWidth - clientWidth - 5)
    }
  }

  useEffect(() => {
    const el = scrollRef.current
    if (el) {
      updateArrows()
      // Wait for images to load or state to render fully to recalculate scroll width
      const timer = setTimeout(updateArrows, 100)
      
      window.addEventListener('resize', updateArrows)
      return () => {
        clearTimeout(timer)
        window.removeEventListener('resize', updateArrows)
      }
    }
  }, [songs])

  const handleScroll = () => {
    updateArrows()
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const amount = clientWidth * 0.75
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - amount : scrollLeft + amount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-black text-white uppercase tracking-wider">{title}</h2>
      
      <div className="relative group/row">
        {/* Left Arrow */}
        {showLeft && (
          <button
            type="button"
            onClick={() => scroll('left')}
            className="absolute left-2 top-[40%] -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-zinc-950/80 border border-zinc-800/80 text-white flex items-center justify-center hover:bg-zinc-900 transition-all duration-200 shadow-xl cursor-pointer opacity-0 group-hover/row:opacity-100 backdrop-blur-sm"
          >
            <ChevronLeftIcon className="h-4.5 w-4.5" />
          </button>
        )}

        {/* Right Arrow */}
        {showRight && (
          <button
            type="button"
            onClick={() => scroll('right')}
            className="absolute right-2 top-[40%] -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-zinc-950/80 border border-zinc-800/80 text-white flex items-center justify-center hover:bg-zinc-900 transition-all duration-200 shadow-xl cursor-pointer opacity-0 group-hover/row:opacity-100 backdrop-blur-sm"
          >
            <ChevronRightIcon className="h-4.5 w-4.5" />
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto gap-6 pb-4 scroll-smooth no-scrollbar"
        >
          {songs.map((song) => (
            <div key={song.id} className="w-44 flex-shrink-0">
              <SongCard
                song={song}
                onPlay={onPlaySong}
                onOpenDetail={() => onNavigate({ name: 'songDetail', id: song.id })}
                onOpenArtist={(artistId) => onNavigate({ name: 'artistDetail', id: artistId })}
                onToggleLike={onToggleLike}
                isLiked={likedSongIds.has(song.id)}
                compact={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function HomeView({
  songs,
  loading,
  error,
  searchQuery,
  likedSongIds,
  onRetry,
  onPlaySong,
  onNavigate,
  onToggleLike,
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

  // Lấy 8 bài hát đầu tiên làm Featured (Nổi bật hôm nay)
  const featuredSongs = songs.slice(0, 8)
  // Lấy toàn bộ bài hát gợi ý
  const suggestedSongs = songs

  return (
    <div className="space-y-10">
      {searchQuery ? (
        // Giao diện khi người dùng tìm kiếm
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-wide">Kết quả tìm kiếm</h2>
            <p className="text-zinc-500 text-xs mt-1">
              Tìm thấy <span className="text-zinc-300 font-bold">{songs.length}</span> kết quả cho từ khóa "{searchQuery}"
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
      ) : (
        // Giao diện Trang chủ mặc định nằm ngang
        <div className="space-y-12">
          {/* Row 1: Nổi bật hôm nay */}
          <ScrollableRow
            title="Nổi bật hôm nay"
            songs={featuredSongs}
            likedSongIds={likedSongIds}
            onPlaySong={onPlaySong}
            onNavigate={onNavigate}
            onToggleLike={onToggleLike}
          />

          {/* Row 2: Bài hát gợi ý */}
          <ScrollableRow
            title="Bài hát gợi ý"
            songs={suggestedSongs}
            likedSongIds={likedSongIds}
            onPlaySong={onPlaySong}
            onNavigate={onNavigate}
            onToggleLike={onToggleLike}
          />
        </div>
      )}
    </div>
  )
}
