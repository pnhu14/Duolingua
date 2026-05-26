import { BellIcon } from '@heroicons/react/24/outline'
import type { View } from '../types/navigation'
import type { User } from '../types'
import SearchBar from './SearchBar'

interface AppHeaderProps {
  view: View
  songsCount: number
  detailLoading: boolean
  onNavigate: (view: View) => void
  onSearch: (query: string) => void
  currentUser: User | null
  onLogout: () => void
}

export default function AppHeader({
  detailLoading,
  onNavigate,
  onSearch,
  currentUser,
  onLogout,
}: AppHeaderProps) {
  return (
    <header className="h-20 bg-zinc-950/20 border-b border-zinc-900/40 px-8 flex items-center justify-between flex-shrink-0 z-10 backdrop-blur-md">
      {/* Left side: Search Bar */}
      <div className="flex-1 max-w-md">
        <SearchBar onSearch={onSearch} />
      </div>

      {/* Right side: Notifications, Loading status & Profile */}
      <div className="flex items-center space-x-4">
        {detailLoading && (
          <span className="flex items-center space-x-1.5 text-xs text-red-500/80 animate-pulse bg-red-500/5 px-2.5 py-1 rounded-full border border-red-500/10">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
            <span>Đang tải...</span>
          </span>
        )}

        {/* Notifications Icon */}
        <button
          type="button"
          className="relative p-2 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40 border border-transparent hover:border-zinc-800/60 transition-all duration-200 cursor-pointer"
          onClick={() => alert('Tính năng thông báo đang được phát triển!')}
        >
          <BellIcon className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Vertical Divider */}
        <div className="h-6 w-px bg-zinc-800/80" />

        {/* Profile / Login Button */}
        <div>
          {currentUser ? (
            <div className="relative group">
              <button
                type="button"
                className="flex items-center space-x-2.5 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/80 px-3.5 py-1.5 text-sm font-semibold text-zinc-200 hover:text-white transition-all duration-200 focus:outline-none cursor-pointer"
              >
                <div className="flex h-6.5 w-6.5 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-400 uppercase shadow-inner">
                  {currentUser.username.substring(0, 2)}
                </div>
                <span className="hidden sm:inline max-w-[120px] truncate">{currentUser.username}</span>
                <svg className="h-3.5 w-3.5 text-zinc-500 group-hover:text-zinc-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-zinc-950 border border-zinc-800/80 py-1.5 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible hover:opacity-100 hover:visible focus-within:opacity-100 focus-within:visible transition-all duration-200 z-50">
                <div className="px-4 py-2.5 border-b border-zinc-900/60">
                  <p className="text-[9px] uppercase font-bold tracking-widest text-zinc-500">
                    Đăng nhập với tư cách
                  </p>
                  <p className="text-sm font-semibold text-zinc-100 truncate mt-0.5">
                    {currentUser.username}
                  </p>
                  <p className="text-xs text-zinc-400 truncate">
                    {currentUser.email}
                  </p>
                  {currentUser.role === 'ADMIN' && (
                    <span className="mt-1.5 inline-block rounded bg-red-500/10 border border-red-500/20 px-1.5 py-0.5 text-[9px] font-bold text-red-400 tracking-wider">
                      ADMINISTRATOR
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={onLogout}
                  className="flex w-full items-center space-x-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/5 hover:text-red-300 text-left transition-colors duration-150 cursor-pointer"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="font-semibold">Đăng xuất</span>
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onNavigate({ name: 'login' })}
              className="rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 border border-zinc-200 px-4.5 py-1.5 text-xs font-bold tracking-wider uppercase shadow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

