export type View =
  | { name: 'home' }
  | { name: 'artists' }
  | { name: 'songDetail'; id: string }
  | { name: 'artistDetail'; id: string }
  | { name: 'login' }
