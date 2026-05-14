// Types cho Music Streaming App

export interface Artist {
  id: string
  name: string
  slug: string
  bio: string | null
  imageUrl: string | null
  createdAt: string
}

export interface Song {
  id: string
  title: string
  slug: string
  durationSeconds: number
  audioUrl: string
  coverUrl: string | null
  releaseDate: string | null
  artist: Artist | null
}

export interface ApiResponse {
  songs: Song[]
  total: number
}
