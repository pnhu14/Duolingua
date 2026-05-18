import type { Album, Artist, ArtistPayload, Song, SongDetail, SongPayload } from '../types'
import { normalizeArtist, normalizeArtists, normalizeSong, normalizeSongs } from '../data/catalogFallbacks'

const API_BASE_URL = 'http://localhost:8080/api'

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

export const api = {
  async getAllSongs(): Promise<Song[]> {
    const response = await fetch(`${API_BASE_URL}/songs`)
    const songs = await handleResponse<Song[]>(response)
    return normalizeSongs(songs)
  },

  async searchSongs(title: string): Promise<Song[]> {
    const response = await fetch(`${API_BASE_URL}/songs?title=${encodeURIComponent(title)}`)
    const songs = await handleResponse<Song[]>(response)
    return normalizeSongs(songs)
  },

  async getSong(id: string): Promise<SongDetail> {
    const response = await fetch(`${API_BASE_URL}/songs/${id}`)
    const song = await handleResponse<SongDetail>(response)
    return normalizeSong(song)
  },

  async createSong(payload: SongPayload): Promise<SongDetail> {
    const response = await fetch(`${API_BASE_URL}/songs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const song = await handleResponse<SongDetail>(response)
    return normalizeSong(song)
  },

  async updateSong(id: string, payload: SongPayload): Promise<SongDetail> {
    const response = await fetch(`${API_BASE_URL}/songs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const song = await handleResponse<SongDetail>(response)
    return normalizeSong(song)
  },

  async deleteSong(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/songs/${id}`, {
      method: 'DELETE',
    })
    return handleResponse<void>(response)
  },

  async getAllArtists(): Promise<Artist[]> {
    const response = await fetch(`${API_BASE_URL}/artists`)
    const artists = await handleResponse<Artist[]>(response)
    return normalizeArtists(artists)
  },

  async searchArtists(name: string): Promise<Artist[]> {
    const response = await fetch(`${API_BASE_URL}/artists?name=${encodeURIComponent(name)}`)
    const artists = await handleResponse<Artist[]>(response)
    return normalizeArtists(artists)
  },

  async getArtist(id: string): Promise<Artist> {
    const response = await fetch(`${API_BASE_URL}/artists/${id}`)
    const artist = await handleResponse<Artist>(response)
    return normalizeArtist(artist)
  },

  async createArtist(payload: ArtistPayload): Promise<Artist> {
    const response = await fetch(`${API_BASE_URL}/artists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const artist = await handleResponse<Artist>(response)
    return normalizeArtist(artist)
  },

  async updateArtist(id: string, payload: ArtistPayload): Promise<Artist> {
    const response = await fetch(`${API_BASE_URL}/artists/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const artist = await handleResponse<Artist>(response)
    return normalizeArtist(artist)
  },

  async deleteArtist(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/artists/${id}`, {
      method: 'DELETE',
    })
    return handleResponse<void>(response)
  },

  async getAlbum(id: string): Promise<Album> {
    const response = await fetch(`${API_BASE_URL}/albums/${id}`)
    return handleResponse<Album>(response)
  },
}
