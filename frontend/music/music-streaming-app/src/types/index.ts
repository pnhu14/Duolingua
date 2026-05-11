// Types cho Music Streaming App

export interface Artist {
  id: number
  name: string
  bio: string
  imageUrl: string
  createdAt: string
}

export interface Song {
  id: number
  title: string
  audioUrl: string | null
  imageUrl: string | null
  releaseDate: string | null
  artist: Artist
}

export interface ApiResponse {
  songs: Song[]
  total: number
}
