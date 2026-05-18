import { MusicalNoteIcon, UserGroupIcon } from '@heroicons/react/24/solid'
import type { View } from '../types/navigation'
import SearchBar from './SearchBar'

interface AppHeaderProps {
  view: View
  songsCount: number
  detailLoading: boolean
  onNavigate: (view: View) => void
  onSearch: (query: string) => void
}

export default function AppHeader({
  view,
  songsCount,
  detailLoading,
  onNavigate,
  onSearch,
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-md dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <button
            type="button"
            onClick={() => onNavigate({ name: 'home' })}
            className="flex items-center space-x-3 text-left"
          >
            <div className="rounded-xl bg-gradient-to-br from-green-400 to-green-600 p-3 shadow-lg">
              <MusicalNoteIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Music Streaming</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">{songsCount} bài hát</p>
            </div>
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate({ name: 'home' })}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                view.name === 'home'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Bài hát
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ name: 'artists' })}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                view.name === 'artists' || view.name === 'artistDetail'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <UserGroupIcon className="h-4 w-4" />
              Nghệ sĩ
            </button>
            {detailLoading ? (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/40 dark:text-green-300">
                Đang tải chi tiết...
              </span>
            ) : null}
          </div>
        </div>

        <SearchBar onSearch={onSearch} />
      </div>
    </header>
  )
}
