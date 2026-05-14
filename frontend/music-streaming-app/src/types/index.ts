// Types cho Music Streaming App

export interface Artist {
  id: string
  name: string
  slug: string
  bio: string | null
  imageUrl: string | null
  createdAt: string
}

export interface Album {
  id: string
  title: string
  slug: string
  description: string | null
  releaseDate: string | null
  coverUrl: string | null
  albumType: string
  status: string
  primaryArtist: Artist | null
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

export interface SongDetail extends Song {
  album: Album | null
  trackNumber: number | null
  discNumber: number | null
  lyrics: string | null
  explicit: boolean
  status: string
}

export interface ApiResponse {
  songs: Song[]
  total: number
}
