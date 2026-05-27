import { useState } from 'react'
import {
  ArrowDownTrayIcon,
  CalendarIcon,
  ClockIcon,
  FilmIcon,
  HeartIcon,
  MicrophoneIcon,
  MusicalNoteIcon,
  RectangleStackIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import type { View } from '../types/navigation'

interface SidebarProps {
  currentView: View
  isAuthenticated: boolean
  onNavigate: (view: View) => void
}

export default function Sidebar({ currentView, isAuthenticated, onNavigate }: SidebarProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showMockToast = (featureName: string) => {
    setToastMessage(`Tính năng "${featureName}" đang được phát triển!`)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const menuItems = [
    {
      name: 'Discover',
      label: 'Khám phá',
      icon: MusicalNoteIcon,
      action: () => onNavigate({ name: 'home' }),
      active: currentView.name === 'home' || currentView.name === 'songDetail',
    },
    {
      name: 'Artists',
      label: 'Nghệ sĩ',
      icon: UserGroupIcon,
      action: () => onNavigate({ name: 'artists' }),
      active: currentView.name === 'artists' || currentView.name === 'artistDetail',
    },
    {
      name: 'Albums',
      label: 'Albums',
      icon: RectangleStackIcon,
      action: () => showMockToast('Albums'),
      active: false,
    },
    {
      name: 'Music Videos',
      label: 'Music Videos',
      icon: FilmIcon,
      action: () => showMockToast('Music Videos'),
      active: false,
    },
    {
      name: 'Radio',
      label: 'Radio',
      icon: MicrophoneIcon,
      action: () => showMockToast('Radio'),
      active: false,
    },
  ]

  const subMenuItems = [
    {
      name: 'Favourite',
      label: 'Yêu thích',
      icon: HeartIcon,
      action: () => onNavigate(isAuthenticated ? { name: 'likedSongs' } : { name: 'login' }),
      active: currentView.name === 'likedSongs',
    },
    {
      name: 'Play History',
      label: 'Lịch sử phát',
      icon: ClockIcon,
      action: () => showMockToast('Lịch sử phát'),
      active: false,
    },
    {
      name: 'Download Items',
      label: 'Tải xuống',
      icon: ArrowDownTrayIcon,
      action: () => showMockToast('Tải xuống'),
      active: false,
    },
    {
      name: 'Events',
      label: 'Sự kiện',
      icon: CalendarIcon,
      action: () => showMockToast('Sự kiện'),
      active: false,
    },
  ]

  const playlists = [
    { name: 'Pop Music', label: 'Pop Music' },
    { name: 'Hip Hop', label: 'Hip Hop' },
    { name: 'Folk Songs', label: 'Folk Songs' },
  ]

  return (
    <aside className="w-64 flex-shrink-0 bg-zinc-950 border-r border-zinc-900 flex flex-col h-full text-zinc-400 select-none z-20">
      <div className="p-6 border-b border-zinc-900/60">
        <button
          type="button"
          onClick={() => onNavigate({ name: 'home' })}
          className="flex items-center space-x-3 text-left focus:outline-none w-full group"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20 p-2 shadow-inner group-hover:scale-105 transition-transform duration-300">
            <svg
              className="h-5 w-5 text-red-500 animate-pulse"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="8" cy="12" r="1.5" fill="currentColor" />
              <circle cx="16" cy="12" r="1.5" fill="currentColor" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-widest text-white group-hover:text-red-400 transition-colors duration-300">
              MELODIX
            </h1>
            <p className="text-[10px] text-zinc-600 tracking-[0.2em] font-semibold uppercase">Music App</p>
          </div>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-7 scrollbar-thin">
        <div className="space-y-2">
          <p className="px-3 text-[10px] font-bold tracking-[0.2em] text-zinc-600 uppercase">Menu</p>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={item.action}
                className={`flex w-full items-center space-x-3.5 rounded-xl px-3.5 py-3 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  item.active
                    ? 'bg-zinc-900 text-white shadow-md shadow-black/20'
                    : 'hover:bg-zinc-900/30 hover:text-zinc-200'
                }`}
              >
                <item.icon className={`h-5 w-5 ${item.active ? 'text-red-500' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-2">
          <p className="px-3 text-[10px] font-bold tracking-[0.2em] text-zinc-600 uppercase">Sub Menu</p>
          <nav className="space-y-1">
            {subMenuItems.map((item) => (
              <button
                key={item.name}
                onClick={item.action}
                className={`flex w-full items-center space-x-3.5 rounded-xl px-3.5 py-3 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  item.active
                    ? 'bg-zinc-900 text-white shadow-md shadow-black/20'
                    : 'hover:bg-zinc-900/30 hover:text-zinc-200'
                }`}
              >
                <item.icon className={`h-5 w-5 ${item.active ? 'text-red-500' : 'text-zinc-500'}`} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-2">
          <p className="px-3 text-[10px] font-bold tracking-[0.2em] text-zinc-600 uppercase">My Playlist</p>
          <div className="space-y-1">
            {playlists.map((playlist) => (
              <button
                key={playlist.name}
                onClick={() => showMockToast(playlist.label)}
                className="flex w-full items-center space-x-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold hover:bg-zinc-900/30 hover:text-zinc-200 text-left transition-colors duration-200 cursor-pointer"
              >
                <div className="h-2 w-2 rounded-full bg-zinc-700 mr-1" />
                <span className="truncate">{playlist.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {toastMessage && (
        <div className="absolute bottom-24 left-6 z-50 rounded-xl bg-zinc-900 border border-zinc-800 p-3.5 text-xs text-white shadow-2xl backdrop-blur-md max-w-[220px] animate-fadeIn">
          <div className="flex items-center space-x-2">
            <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping"></div>
            <p className="leading-relaxed">{toastMessage}</p>
          </div>
        </div>
      )}
    </aside>
  )
}
