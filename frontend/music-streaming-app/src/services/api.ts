// API Service để gọi Backend

import type { Album, Artist, Song, SongDetail } from '../types'

const API_BASE_URL = 'http://localhost:8080/api'

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json() as Promise<T>
}

export const api = {
  // Lấy tất cả bài hát
  async getAllSongs(): Promise<Song[]> {
    const response = await fetch(`${API_BASE_URL}/songs`)
    return handleResponse<Song[]>(response)
  },

  // Tìm kiếm bài hát theo tên
  async searchSongs(title: string): Promise<Song[]> {
    const response = await fetch(`${API_BASE_URL}/songs?title=${encodeURIComponent(title)}`)
    return handleResponse<Song[]>(response)
  },

  // Lấy chi tiết một bài hát
  async getSong(id: string): Promise<SongDetail> {
    const response = await fetch(`${API_BASE_URL}/songs/${id}`)
    return handleResponse<SongDetail>(response)
  },

  // Lấy chi tiết nghệ sĩ
  async getArtist(id: string): Promise<Artist> {
    const response = await fetch(`${API_BASE_URL}/artists/${id}`)
    return handleResponse<Artist>(response)
  },

  // Lấy chi tiết album
  async getAlbum(id: string): Promise<Album> {
    const response = await fetch(`${API_BASE_URL}/albums/${id}`)
    return handleResponse<Album>(response)
  },
}
