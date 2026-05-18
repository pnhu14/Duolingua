import { UserGroupIcon } from '@heroicons/react/24/solid'
import type { Artist } from '../types'

export default function ArtistAvatar({ artist }: { artist: Artist }) {
  return (
    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-emerald-500 via-sky-600 to-indigo-700 ring-4 ring-white shadow-xl dark:ring-gray-900">
      {artist.imageUrl ? (
        <img src={artist.imageUrl} alt={artist.name} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <UserGroupIcon className="h-12 w-12 text-white/85" />
        </div>
      )}
    </div>
  )
}
