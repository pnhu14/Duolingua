import type { View } from '../types/navigation'

export const hashToView = (): View => {
  const hash = window.location.hash.replace(/^#\/?/, '')
  const [section, id] = hash.split('/')

  if (section === 'artists' && id) return { name: 'artistDetail', id }
  if (section === 'artists') return { name: 'artists' }
  if (section === 'liked-songs') return { name: 'likedSongs' }
  if (section === 'songs' && id) return { name: 'songDetail', id }
  if (section === 'login') return { name: 'login' }

  return { name: 'home' }
}

export const viewToHash = (view: View) => {
  if (view.name === 'artists') return '#/artists'
  if (view.name === 'artistDetail') return `#/artists/${view.id}`
  if (view.name === 'likedSongs') return '#/liked-songs'
  if (view.name === 'songDetail') return `#/songs/${view.id}`
  if (view.name === 'login') return '#/login'
  return '#/'
}
