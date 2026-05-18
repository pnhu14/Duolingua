import type { Artist, Song, SongDetail } from '../types'

type ArtistSeed = Omit<Artist, 'createdAt'>

const CREATED_AT_FALLBACK = '2024-01-01T00:00:00.000Z'

const ARTISTS_BY_SLUG: Record<string, ArtistSeed> = {
  'son-tung-mtp': {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Sơn Tùng M-TP',
    slug: 'son-tung-mtp',
    bio: 'Ca sĩ, nhạc sĩ, rapper người Việt Nam.',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb4e8a7e14e2f602eb9af24e31',
    bannerUrl: 'https://picsum.photos/seed/son-tung-mtp-banner/1200/420',
    country: 'Việt Nam',
    verified: true,
    status: 'ACTIVE',
  },
  'hoa-minzy': {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'Hòa Minzy',
    slug: 'hoa-minzy',
    bio: 'Ca sĩ Việt Nam với giọng ca nội lực và nhiều bản hit ballad.',
    imageUrl: 'https://picsum.photos/seed/hoa-minzy-avatar/320/320',
    bannerUrl: 'https://picsum.photos/seed/hoa-minzy-banner/1200/420',
    country: 'Việt Nam',
    verified: true,
    status: 'ACTIVE',
  },
  'den-vau': {
    id: '00000000-0000-0000-0000-000000000003',
    name: 'Đen Vâu',
    slug: 'den-vau',
    bio: 'Rapper, nhạc sĩ Việt Nam với phong cách gần gũi và giàu tự sự.',
    imageUrl: 'https://picsum.photos/seed/den-vau-avatar/320/320',
    bannerUrl: 'https://picsum.photos/seed/den-vau-banner/1200/420',
    country: 'Việt Nam',
    verified: true,
    status: 'ACTIVE',
  },
  'my-tam': {
    id: '00000000-0000-0000-0000-000000000004',
    name: 'Mỹ Tâm',
    slug: 'my-tam',
    bio: 'Ca sĩ, nhạc sĩ Việt Nam, được yêu mến với nhiều bản pop ballad.',
    imageUrl: 'https://picsum.photos/seed/my-tam-avatar/320/320',
    bannerUrl: 'https://picsum.photos/seed/my-tam-banner/1200/420',
    country: 'Việt Nam',
    verified: true,
    status: 'ACTIVE',
  },
  'bich-phuong': {
    id: '00000000-0000-0000-0000-000000000005',
    name: 'Bích Phương',
    slug: 'bich-phuong',
    bio: 'Ca sĩ Việt Nam với nhiều ca khúc pop được yêu thích.',
    imageUrl: 'https://picsum.photos/seed/bich-phuong-avatar/320/320',
    bannerUrl: 'https://picsum.photos/seed/bich-phuong-banner/1200/420',
    country: 'Việt Nam',
    verified: true,
    status: 'ACTIVE',
  },
  hieuthuhai: {
    id: '00000000-0000-0000-0000-000000000006',
    name: 'HIEUTHUHAI',
    slug: 'hieuthuhai',
    bio: 'Rapper, ca sĩ Việt Nam với màu sắc trẻ trung.',
    imageUrl: 'https://picsum.photos/seed/hieuthuhai-avatar/320/320',
    bannerUrl: 'https://picsum.photos/seed/hieuthuhai-banner/1200/420',
    country: 'Việt Nam',
    verified: true,
    status: 'ACTIVE',
  },
  'hoang-thuy-linh': {
    id: '00000000-0000-0000-0000-000000000007',
    name: 'Hoàng Thùy Linh',
    slug: 'hoang-thuy-linh',
    bio: 'Ca sĩ, diễn viên Việt Nam với phong cách hiện đại kết hợp chất liệu truyền thống.',
    imageUrl: 'https://picsum.photos/seed/hoang-thuy-linh-avatar/320/320',
    bannerUrl: 'https://picsum.photos/seed/hoang-thuy-linh-banner/1200/420',
    country: 'Việt Nam',
    verified: true,
    status: 'ACTIVE',
  },
  vu: {
    id: '00000000-0000-0000-0000-000000000008',
    name: 'Vũ.',
    slug: 'vu',
    bio: 'Ca sĩ, nhạc sĩ Việt Nam với phong cách indie, ballad nhẹ nhàng.',
    imageUrl: 'https://picsum.photos/seed/vu-avatar/320/320',
    bannerUrl: 'https://picsum.photos/seed/vu-banner/1200/420',
    country: 'Việt Nam',
    verified: true,
    status: 'ACTIVE',
  },
}

const SONG_FALLBACKS: Record<string, { artistSlug: keyof typeof ARTISTS_BY_SLUG; coverUrl: string }> = {
  'lac-troi': {
    artistSlug: 'son-tung-mtp',
    coverUrl: 'https://i.ytimg.com/vi/DrY_K0mT-As/maxresdefault.jpg',
  },
  'chung-ta-cua-hien-tai': {
    artistSlug: 'son-tung-mtp',
    coverUrl: 'https://i.ytimg.com/vi/psZ1g9fMfeo/maxresdefault.jpg',
  },
  'hay-trao-cho-anh': {
    artistSlug: 'son-tung-mtp',
    coverUrl: 'https://i.ytimg.com/vi/knW7-x7Y7RE/maxresdefault.jpg',
  },
  'noi-nay-co-anh': {
    artistSlug: 'son-tung-mtp',
    coverUrl: 'https://i.ytimg.com/vi/FN7ALfpGxiI/maxresdefault.jpg',
  },
  'muon-roi-ma-sao-con': {
    artistSlug: 'son-tung-mtp',
    coverUrl: 'https://i.ytimg.com/vi/xypzmu5mMPY/maxresdefault.jpg',
  },
  'roi-bo': {
    artistSlug: 'hoa-minzy',
    coverUrl: 'https://i.ytimg.com/vi/bLsm4YJ_dqE/maxresdefault.jpg',
  },
  'khong-the-cung-nhau-suot-kiep': {
    artistSlug: 'hoa-minzy',
    coverUrl: 'https://i.ytimg.com/vi/xypzmu5mMPY/maxresdefault.jpg',
  },
  'tinh-dau-qua-chen': {
    artistSlug: 'hoa-minzy',
    coverUrl: 'https://picsum.photos/seed/tinh-dau-qua-chen-cover/900/900',
  },
  'anh-dang-o-dau-day-anh': {
    artistSlug: 'bich-phuong',
    coverUrl: 'https://i.ytimg.com/vi/s7bKSNZW-Hs/maxresdefault.jpg',
  },
  'bai-nay-chill-phet': {
    artistSlug: 'den-vau',
    coverUrl: 'https://i.ytimg.com/vi/K7NMvDSSY-A/maxresdefault.jpg',
  },
  'dua-nhau-di-tron': {
    artistSlug: 'den-vau',
    coverUrl: 'https://i.ytimg.com/vi/s9DxWoqKxqU/maxresdefault.jpg',
  },
  'mang-tien-ve-cho-me': {
    artistSlug: 'den-vau',
    coverUrl: 'https://picsum.photos/seed/mang-tien-ve-cho-me-cover/900/900',
  },
  'uoc-gi': {
    artistSlug: 'my-tam',
    coverUrl: 'https://picsum.photos/seed/uoc-gi-cover/900/900',
  },
  'nguoi-hay-quen-em-di': {
    artistSlug: 'my-tam',
    coverUrl: 'https://picsum.photos/seed/nguoi-hay-quen-em-di-cover/900/900',
  },
  'dung-hoi-em': {
    artistSlug: 'my-tam',
    coverUrl: 'https://picsum.photos/seed/dung-hoi-em-cover/900/900',
  },
  'bua-yeu': {
    artistSlug: 'bich-phuong',
    coverUrl: 'https://picsum.photos/seed/bua-yeu-cover/900/900',
  },
  'mot-cu-lua': {
    artistSlug: 'bich-phuong',
    coverUrl: 'https://picsum.photos/seed/mot-cu-lua-cover/900/900',
  },
  'di-du-dua-di': {
    artistSlug: 'bich-phuong',
    coverUrl: 'https://picsum.photos/seed/di-du-dua-di-cover/900/900',
  },
  'ngu-mot-minh': {
    artistSlug: 'hieuthuhai',
    coverUrl: 'https://picsum.photos/seed/ngu-mot-minh-cover/900/900',
  },
  'tron-tim': {
    artistSlug: 'hieuthuhai',
    coverUrl: 'https://picsum.photos/seed/tron-tim-cover/900/900',
  },
  'de-mi-noi-cho-ma-nghe': {
    artistSlug: 'hoang-thuy-linh',
    coverUrl: 'https://picsum.photos/seed/de-mi-noi-cho-ma-nghe-cover/900/900',
  },
  'ke-cap-gap-ba-gia': {
    artistSlug: 'hoang-thuy-linh',
    coverUrl: 'https://picsum.photos/seed/ke-cap-gap-ba-gia-cover/900/900',
  },
  'la-lung': {
    artistSlug: 'vu',
    coverUrl: 'https://picsum.photos/seed/la-lung-cover/900/900',
  },
  'buoc-qua-nhau': {
    artistSlug: 'vu',
    coverUrl: 'https://picsum.photos/seed/buoc-qua-nhau-cover/900/900',
  },
  'dong-kiem-em': {
    artistSlug: 'vu',
    coverUrl: 'https://picsum.photos/seed/dong-kiem-em-cover/900/900',
  },
}

const isPlaceholderYoutubeUrl = (url: string | null) => {
  if (!url) return true
  return /\/(abc|def|ghi|jkl|mno|pqr)\d+\/maxresdefault\.jpg$/.test(url)
}

const isSeedPlaceholderImageUrl = (url: string | null) => {
  if (!url) return true
  return /(?:1c1c1c|2a2a2a|3b3b3b|4c4c4c|5d5d5d|6e6e6e|8c3b9b9b5c5e5e5e)/.test(url)
}

const toArtist = (artist: ArtistSeed): Artist => ({
  ...artist,
  createdAt: CREATED_AT_FALLBACK,
})

const mergeArtistFallback = (artist: Artist): Artist => {
  const fallback = ARTISTS_BY_SLUG[artist.slug]
  if (!fallback) return artist

  return {
    ...artist,
    name: artist.name || fallback.name,
    bio: artist.bio || fallback.bio,
    imageUrl: isSeedPlaceholderImageUrl(artist.imageUrl) ? fallback.imageUrl : artist.imageUrl,
    bannerUrl: artist.bannerUrl || fallback.bannerUrl,
    country: artist.country || fallback.country,
    verified: artist.verified || fallback.verified,
    status: artist.status || fallback.status,
  }
}

export const normalizeArtist = (artist: Artist): Artist => mergeArtistFallback(artist)

export const normalizeArtists = (artists: Artist[]): Artist[] => {
  const existing = new Map(artists.map((artist) => [artist.slug, mergeArtistFallback(artist)]))

  Object.entries(ARTISTS_BY_SLUG).forEach(([slug, artist]) => {
    if (!existing.has(slug)) {
      existing.set(slug, toArtist(artist))
    }
  })

  return Array.from(existing.values()).sort((a, b) => a.name.localeCompare(b.name, 'vi'))
}

export const normalizeSong = <T extends Song | SongDetail>(song: T): T => {
  const fallback = SONG_FALLBACKS[song.slug]
  if (!fallback) return song

  const fallbackArtist = toArtist(ARTISTS_BY_SLUG[fallback.artistSlug])

  return {
    ...song,
    artist: song.artist ? mergeArtistFallback(song.artist) : fallbackArtist,
    coverUrl: isPlaceholderYoutubeUrl(song.coverUrl) ? fallback.coverUrl : song.coverUrl,
  }
}

export const normalizeSongs = <T extends Song | SongDetail>(songs: T[]): T[] => songs.map(normalizeSong)
