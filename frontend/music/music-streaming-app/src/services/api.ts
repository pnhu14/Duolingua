// API Service để gọi Backend

import type { Song } from '../types'

const API_BASE_URL = 'http://localhost:8080/api'

export const api = {
  // Lấy tất cả bài hát
  async getAllSongs(): Promise<Song[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/songs`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching songs:', error)
      throw error
    }
  },

  // Tìm kiếm bài hát theo tên
  async searchSongs(title: string): Promise<Song[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/songs?title=${encodeURIComponent(title)}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error searching songs:', error)
      throw error
    }
  },
}
