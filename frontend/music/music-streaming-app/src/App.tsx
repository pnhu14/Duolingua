import { useState, useEffect } from 'react'
import { MusicalNoteIcon } from '@heroicons/react/24/solid'
import type { Song } from './types'
import { api } from './services/api'
import SongCard from './components/SongCard'
import SearchBar from './components/SearchBar'
import Loading from './components/Loading'
import ErrorMessage from './components/ErrorMessage'
import EmptyState from './components/EmptyState'

export default function App() {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Load bài hát khi component mount
  useEffect(() => {
    loadSongs()
  }, [])

  const loadSongs = async () => {
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
      // Nếu search rỗng, load lại tất cả bài hát
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

  const handlePlaySong = (song: Song) => {
    console.log('Playing song:', song)
    // TODO: Implement audio player
    alert(`Đang phát: ${song.title} - ${song.artist.name}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-green-400 to-green-600 p-3 rounded-xl shadow-lg">
                <MusicalNoteIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Music Streaming
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {songs.length} bài hát
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            {/* Results info */}
            {searchQuery && (
              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Tìm thấy <span className="font-semibold text-gray-900 dark:text-white">{songs.length}</span> kết quả cho "{searchQuery}"
                </p>
              </div>
            )}

            {/* Songs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {songs.map((song) => (
                <SongCard
                  key={song.id}
                  song={song}
                  onPlay={handlePlaySong}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
            © 2024 Music Streaming App. Made with ❤️ and React + Spring Boot
          </p>
        </div>
      </footer>
    </div>
  )
}
