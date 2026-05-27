import type { Album, Artist, ArtistPayload, Song, SongDetail, SongPayload, User, LoginRequest, RegisterRequest, AuthResponse } from '../types'
import { normalizeArtist, normalizeArtists, normalizeSong, normalizeSongs } from '../data/catalogFallbacks'

const API_BASE_URL = 'http://localhost:8080/api'

function getHeaders(extraHeaders: Record<string, string> = {}): HeadersInit {
  const headers: Record<string, string> = {
    ...extraHeaders,
  }
  const token = localStorage.getItem('accessToken')
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

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
    const response = await fetch(`${API_BASE_URL}/songs`, {
      headers: getHeaders(),
    })
    const songs = await handleResponse<Song[]>(response)
    return normalizeSongs(songs)
  },

  async searchSongs(title: string): Promise<Song[]> {
    const response = await fetch(`${API_BASE_URL}/songs?title=${encodeURIComponent(title)}`, {
      headers: getHeaders(),
    })
    const songs = await handleResponse<Song[]>(response)
    return normalizeSongs(songs)
  },

  async getSong(id: string): Promise<SongDetail> {
    const response = await fetch(`${API_BASE_URL}/songs/${id}`, {
      headers: getHeaders(),
    })
    const song = await handleResponse<SongDetail>(response)
    return normalizeSong(song)
  },

  async createSong(payload: SongPayload): Promise<SongDetail> {
    const response = await fetch(`${API_BASE_URL}/songs`, {
      method: 'POST',
      headers: getHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(payload),
    })
    const song = await handleResponse<SongDetail>(response)
    return normalizeSong(song)
  },

  async updateSong(id: string, payload: SongPayload): Promise<SongDetail> {
    const response = await fetch(`${API_BASE_URL}/songs/${id}`, {
      method: 'PUT',
      headers: getHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(payload),
    })
    const song = await handleResponse<SongDetail>(response)
    return normalizeSong(song)
  },

  async deleteSong(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/songs/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    })
    return handleResponse<void>(response)
  },

  async getAllArtists(): Promise<Artist[]> {
    const response = await fetch(`${API_BASE_URL}/artists`, {
      headers: getHeaders(),
    })
    const artists = await handleResponse<Artist[]>(response)
    return normalizeArtists(artists)
  },

  async searchArtists(name: string): Promise<Artist[]> {
    const response = await fetch(`${API_BASE_URL}/artists?name=${encodeURIComponent(name)}`, {
      headers: getHeaders(),
    })
    const artists = await handleResponse<Artist[]>(response)
    return normalizeArtists(artists)
  },

  async getArtist(id: string): Promise<Artist> {
    const response = await fetch(`${API_BASE_URL}/artists/${id}`, {
      headers: getHeaders(),
    })
    const artist = await handleResponse<Artist>(response)
    return normalizeArtist(artist)
  },

  async createArtist(payload: ArtistPayload): Promise<Artist> {
    const response = await fetch(`${API_BASE_URL}/artists`, {
      method: 'POST',
      headers: getHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(payload),
    })
    const artist = await handleResponse<Artist>(response)
    return normalizeArtist(artist)
  },

  async updateArtist(id: string, payload: ArtistPayload): Promise<Artist> {
    const response = await fetch(`${API_BASE_URL}/artists/${id}`, {
      method: 'PUT',
      headers: getHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(payload),
    })
    const artist = await handleResponse<Artist>(response)
    return normalizeArtist(artist)
  },

  async deleteArtist(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/artists/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    })
    return handleResponse<void>(response)
  },

  async getAlbum(id: string): Promise<Album> {
    const response = await fetch(`${API_BASE_URL}/albums/${id}`, {
      headers: getHeaders(),
    })
    return handleResponse<Album>(response)
  },

  async login(payload: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const authData = await handleResponse<AuthResponse>(response)
    if (authData && authData.accessToken) {
      localStorage.setItem('accessToken', authData.accessToken)
      localStorage.setItem('refreshToken', authData.refreshToken)
    }
    return authData
  },

  async register(payload: RegisterRequest): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return handleResponse<User>(response)
  },

  async logout(): Promise<void> {
    const refreshToken = localStorage.getItem('refreshToken')
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: getHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ refreshToken }),
    })
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    return handleResponse<void>(response)
  },

  async getMe(): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/me`, {
      headers: getHeaders(),
    })
    return handleResponse<User>(response)
  },
}
