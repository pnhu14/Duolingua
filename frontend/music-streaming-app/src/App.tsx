import { useEffect, useState } from 'react'
import { MusicalNoteIcon } from '@heroicons/react/24/solid'
import type { Song, SongDetail } from './types'
import { api } from './services/api'
import SongCard from './components/SongCard'
import SearchBar from './components/SearchBar'
import Loading from './components/Loading'
import ErrorMessage from './components/ErrorMessage'
import EmptyState from './components/EmptyState'
import MiniPlayer from './components/MiniPlayer'

export default function App() {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSong, setSelectedSong] = useState<SongDetail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    loadSongs()
  }, [])

  async function loadSongs() {
    try {
      setLoading(true)
      setError(null)
      const data = await api.getAllSongs()
      setSongs(data)
    } catch (err) {
      setError('Không thể kết nối với server. Vui lòng kiểm tra backend đã chạy chưa (http://localhost:8080)')
      console.error('Error loading songs:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (query: string) => {
    setSearchQuery(query)

    if (!query.trim()) {
      loadSongs()
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await api.searchSongs(query)
      setSongs(data)
    } catch (err) {
      setError('Lỗi khi tìm kiếm bài hát')
      console.error('Error searching songs:', err)
    } finally {
      setLoading(false)
    }
  }

  const handlePlaySong = async (song: Song) => {
    try {
      setDetailLoading(true)
      const detail = await api.getSong(song.id)
      setSelectedSong(detail)
      setIsPlaying(true)
    } catch (err) {
      console.error('Error loading song detail:', err)
      setSelectedSong({
        ...song,
        album: null,
        trackNumber: null,
        discNumber: null,
        lyrics: null,
        explicit: false,
        status: 'PUBLISHED',
      })
      setIsPlaying(true)
    } finally {
      setDetailLoading(false)
    }
  }

  const handleTogglePlay = () => {
    setIsPlaying((current) => !current)
  }

  const handleClosePlayer = () => {
    setSelectedSong(null)
    setIsPlaying(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-32 dark:from-gray-900 dark:to-gray-800">
      <header className="sticky top-0 z-10 bg-white shadow-md dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="rounded-xl bg-gradient-to-br from-green-400 to-green-600 p-3 shadow-lg">
                <MusicalNoteIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Music Streaming
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">{songs.length} bài hát</p>
              </div>
            </div>
            {detailLoading ? (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/40 dark:text-green-300">
                Đang tải chi tiết...
              </span>
            ) : null}
          </div>

          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage message={error} onRetry={loadSongs} />
        ) : songs.length === 0 ? (
          <EmptyState
            message={searchQuery ? `Không tìm thấy bài hát với từ khóa "${searchQuery}"` : 'Chưa có bài hát nào'}
          />
        ) : (
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
                <SongCard key={song.id} song={song} onPlay={handlePlaySong} />
              ))}
            </div>
          </>
        )}

        {selectedSong ? (
          <section className="mt-12 rounded-3xl bg-white p-6 shadow-lg dark:bg-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Bài hát đang xem chi tiết</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">{selectedSong.title}</span>
              {selectedSong.artist?.name ? ` • ${selectedSong.artist.name}` : ''}
              {selectedSong.album?.title ? ` • ${selectedSong.album.title}` : ''}
            </p>
          </section>
        ) : null}
      </main>

      <footer className="mt-12 border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © 2024 Music Streaming App. Made with ❤️ and React + Spring Boot
          </p>
        </div>
      </footer>

      <MiniPlayer
        song={selectedSong}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onClose={handleClosePlayer}
      />
    </div>
  )
}
