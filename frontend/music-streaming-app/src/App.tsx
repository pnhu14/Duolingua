import AppHeader from './components/AppHeader'
import MiniPlayer from './components/MiniPlayer'
import { useMusicApp } from './hooks/useMusicApp'
import ArtistDetailView from './views/ArtistDetailView'
import ArtistsView from './views/ArtistsView'
import HomeView from './views/HomeView'
import SongDetailView from './views/SongDetailView'

export default function App() {
  const app = useMusicApp()

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
          onBack={app.goBack}
          onPlaySong={app.handlePlaySong}
          onNavigate={app.navigate}
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
        onRetry={app.loadSongs}
        onPlaySong={app.handlePlaySong}
        onNavigate={app.navigate}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-32 dark:from-gray-900 dark:to-gray-800">
      <AppHeader
        view={app.view}
        songsCount={app.songs.length}
        detailLoading={app.detailLoading}
        onNavigate={app.navigate}
        onSearch={app.handleSearch}
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{renderView()}</main>

      <footer className="mt-12 border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © 2024 Music Streaming App. Made with React + Spring Boot
          </p>
        </div>
      </footer>

      <MiniPlayer
        song={app.selectedSong}
        isPlaying={app.isPlaying}
        onTogglePlay={app.togglePlay}
        onClose={app.closePlayer}
      />
    </div>
  )
}
