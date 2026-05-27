export type View =
  | { name: 'home' }
  | { name: 'artists' }
  | { name: 'likedSongs' }
  | { name: 'songDetail'; id: string }
  | { name: 'artistDetail'; id: string }
  | { name: 'login' }
