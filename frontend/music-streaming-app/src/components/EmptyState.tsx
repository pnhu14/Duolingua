import { MusicalNoteIcon } from '@heroicons/react/24/outline'

interface EmptyStateProps {
  message?: string
}

export default function EmptyState({ message = 'Không tìm thấy bài hát nào' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 mb-4">
        <MusicalNoteIcon className="w-16 h-16 text-gray-400 dark:text-gray-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {message}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
        Thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc
      </p>
    </div>
  )
}
