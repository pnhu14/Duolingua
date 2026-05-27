import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Artist, Song, SongDetail, User, LoginRequest, RegisterRequest } from '../types'
import type { View } from '../types/navigation'
import { api } from '../services/api'
import { hashToView, viewToHash } from '../utils/navigation'

export function useMusicApp() {
  const [view, setView] = useState<View>(() => hashToView())
  const [songs, setSongs] = useState<Song[]>([])
  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)
  const [artistsLoading, setArtistsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSong, setSelectedSong] = useState<SongDetail | null>(null)
  const [activeSongDetail, setActiveSongDetail] = useState<SongDetail | null>(null)
  const [activeArtist, setActiveArtist] = useState<Artist | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(false)

  const navigate = useCallback((nextView: View) => {
    const nextHash = viewToHash(nextView)
    if (window.location.hash === nextHash) {
      setView(nextView)
      return
    }

    window.location.hash = nextHash
  }, [])

  // Khôi phục phiên đăng nhập khi load trang
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      api.getMe()
        .then((user) => setCurrentUser(user))
        .catch((err) => {
          console.error('Session restore failed:', err)
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
        })
    }
  }, [])

  const handleLogin = useCallback(async (credentials: LoginRequest) => {
    try {
      setAuthLoading(true)
      const data = await api.login(credentials)
      setCurrentUser(data.user)
      navigate({ name: 'home' })
      return { success: true }
    } catch (err: unknown) {
      console.error('Login error:', err)
      const message = err instanceof Error ? err.message : 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.'
      return { success: false, error: message }
    } finally {
      setAuthLoading(false)
    }
  }, [navigate])

  const handleRegister = useCallback(async (details: RegisterRequest) => {
    try {
      setAuthLoading(true)
      await api.register(details)
      const loginData = await api.login({ email: details.email, password: details.password })
      setCurrentUser(loginData.user)
      navigate({ name: 'home' })
      return { success: true }
    } catch (err: unknown) {
      console.error('Registration error:', err)
      const message = err instanceof Error ? err.message : 'Đăng ký thất bại. Email hoặc Username có thể đã được sử dụng.'
      return { success: false, error: message }
    } finally {
      setAuthLoading(false)
    }
  }, [navigate])

  const handleLogout = useCallback(async () => {
    try {
      setAuthLoading(true)
      await api.logout()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      setCurrentUser(null)
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      navigate({ name: 'home' })
      setAuthLoading(false)
    }
  }, [navigate])

  const loadSongs = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      setSongs(await api.getAllSongs())
    } catch (err) {
      setError('Không thể kết nối với server. Vui lòng kiểm tra backend đã chạy chưa (http://localhost:8080)')
      console.error('Error loading songs:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const loadArtists = useCallback(async () => {
    try {
      setArtistsLoading(true)
      setArtists(await api.getAllArtists())
    } catch (err) {
      console.error('Error loading artists:', err)
    } finally {
      setArtistsLoading(false)
    }
  }, [])

  useEffect(() => {
    const handleHashChange = () => setView(hashToView())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    queueMicrotask(() => {
      void loadSongs()
      void loadArtists()
    })
  }, [loadArtists, loadSongs])

  useEffect(() => {
    let cancelled = false

    async function loadActiveDetail() {
      if (view.name === 'songDetail') {
        try {
          setDetailLoading(true)
          setActiveSongDetail(null)
          const detail = await api.getSong(view.id)
          if (!cancelled) setActiveSongDetail(detail)
        } catch (err) {
          if (!cancelled) setError('Không thể tải chi tiết bài hát')
          console.error('Error loading song detail:', err)
        } finally {
          if (!cancelled) setDetailLoading(false)
        }
      }

      if (view.name === 'artistDetail') {
        try {
          setDetailLoading(true)
          const artist = artists.find((item) => item.id === view.id) ?? (await api.getArtist(view.id))
          if (!cancelled) setActiveArtist(artist)
        } catch (err) {
          if (!cancelled) setError('Không thể tải thông tin nghệ sĩ')
          console.error('Error loading artist detail:', err)
        } finally {
          if (!cancelled) setDetailLoading(false)
        }
      }
    }

    void loadActiveDetail()

    return () => {
      cancelled = true
    }
  }, [artists, view])

  const artistSongs = useMemo(() => {
    if (view.name !== 'artistDetail') return []
    return songs.filter((song) => song.artist?.id === view.id)
  }, [songs, view])

  const handleSearch = useCallback(
    async (query: string) => {
      setSearchQuery(query)

      if (!query.trim()) {
        await loadSongs()
        return
      }

      try {
        setLoading(true)
        setError(null)
        setSongs(await api.searchSongs(query))
        navigate({ name: 'home' })
      } catch (err) {
        setError('Lỗi khi tìm kiếm bài hát')
        console.error('Error searching songs:', err)
      } finally {
        setLoading(false)
      }
    },
    [loadSongs, navigate],
  )

  const handlePlaySong = useCallback(async (song: Song) => {
    try {
      setDetailLoading(true)
      setSelectedSong(await api.getSong(song.id))
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
  }, [])

  const goBack = useCallback(() => {
    navigate(view.name === 'artistDetail' ? { name: 'artists' } : { name: 'home' })
  }, [navigate, view.name])

  const togglePlay = useCallback(() => {
    setIsPlaying((current) => !current)
  }, [])

  const closePlayer = useCallback(() => {
    setSelectedSong(null)
    setIsPlaying(false)
  }, [])

  const playNextSong = useCallback(() => {
    if (!selectedSong || songs.length === 0) return
    const currentIndex = songs.findIndex((s) => s.id === selectedSong.id)
    if (currentIndex === -1) return
    const nextIndex = (currentIndex + 1) % songs.length
    void handlePlaySong(songs[nextIndex])
  }, [songs, selectedSong, handlePlaySong])

  const playPrevSong = useCallback(() => {
    if (!selectedSong || songs.length === 0) return
    const currentIndex = songs.findIndex((s) => s.id === selectedSong.id)
    if (currentIndex === -1) return
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length
    void handlePlaySong(songs[prevIndex])
  }, [songs, selectedSong, handlePlaySong])

  return {
    activeArtist,
    activeSongDetail,
    artistSongs,
    artists,
    artistsLoading,
    closePlayer,
    detailLoading,
    error,
    goBack,
    handlePlaySong,
    handleSearch,
    isPlaying,
    loadSongs,
    loading,
    navigate,
    searchQuery,
    selectedSong,
    songs,
    togglePlay,
    view,
    currentUser,
    authLoading,
    handleLogin,
    handleRegister,
    handleLogout,
    playNextSong,
    playPrevSong,
  }
}
