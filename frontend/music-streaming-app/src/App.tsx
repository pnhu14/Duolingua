import AppHeader from './components/AppHeader'
import MiniPlayer from './components/MiniPlayer'
import Sidebar from './components/Sidebar'
import { useMusicApp } from './hooks/useMusicApp'
import ArtistDetailView from './views/ArtistDetailView'
import ArtistsView from './views/ArtistsView'
import HomeView from './views/HomeView'
import LikedSongsView from './views/LikedSongsView'
import SongDetailView from './views/SongDetailView'
import LoginView from './views/LoginView'

export default function App() {
  const app = useMusicApp()

  if (app.view.name === 'login') {
    return (
      <LoginView
        onLogin={app.handleLogin}
        onRegister={app.handleRegister}
        isLoading={app.authLoading}
        onNavigate={app.navigate}
      />
    )
  }

  const renderView = () => {
    if (app.view.name === 'artists') {
      return (
        <ArtistsView
          artists={app.artists}
          songs={app.songs}
          loading={app.artistsLoading}
          onNavigate={app.navigate}
        />
      )
    }

    if (app.view.name === 'songDetail') {
      return (
        <SongDetailView
          song={app.activeSongDetail}
          loading={app.detailLoading}
          isLiked={app.activeSongDetail ? app.likedSongIds.has(app.activeSongDetail.id) : false}
          onBack={app.goBack}
          onPlaySong={app.handlePlaySong}
          onNavigate={app.navigate}
          onToggleLike={app.handleToggleLike}
        />
      )
    }

    if (app.view.name === 'likedSongs') {
      return (
        <LikedSongsView
          songs={app.likedSongs}
          likedSongIds={app.likedSongIds}
          loading={app.likedSongsLoading}
          onPlaySong={app.handlePlaySong}
          onNavigate={app.navigate}
          onToggleLike={app.handleToggleLike}
        />
      )
    }

    if (app.view.name === 'artistDetail') {
      return (
        <ArtistDetailView
          artist={app.activeArtist}
          songs={app.artistSongs}
          loading={app.detailLoading}
          onBack={app.goBack}
          onPlaySong={app.handlePlaySong}
          onNavigate={app.navigate}
        />
      )
    }

    return (
      <HomeView
        songs={app.songs}
        loading={app.loading}
        error={app.error}
        searchQuery={app.searchQuery}
        likedSongIds={app.likedSongIds}
        onRetry={app.loadSongs}
        onPlaySong={app.handlePlaySong}
        onNavigate={app.navigate}
        onToggleLike={app.handleToggleLike}
      />
    )
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-100 select-none">
      {/* Left Sidebar */}
      <Sidebar
        currentView={app.view}
        isAuthenticated={Boolean(app.currentUser)}
        onNavigate={app.navigate}
      />

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-zinc-900/40 backdrop-blur-md">
        <AppHeader
          view={app.view}
          songsCount={app.songs.length}
          detailLoading={app.detailLoading}
          onNavigate={app.navigate}
          onSearch={app.handleSearch}
          currentUser={app.currentUser}
          onLogout={app.handleLogout}
        />

        <main className="flex-1 overflow-y-auto px-8 py-6 pb-24 scrollbar-thin">
          {renderView()}
        </main>
      </div>

      <MiniPlayer
        song={app.selectedSong}
        isPlaying={app.isPlaying}
        onTogglePlay={app.togglePlay}
        onClose={app.closePlayer}
        onNext={app.playNextSong}
        onPrev={app.playPrevSong}
      />
    </div>
  )
}
