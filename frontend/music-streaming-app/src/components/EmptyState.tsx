import { MusicalNoteIcon } from '@heroicons/react/24/outline'

interface EmptyStateProps {
  message?: string
}

export default function EmptyState({ message = 'Không tìm thấy bài hát nào' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white/60 py-14 px-4 text-center dark:border-gray-700 dark:bg-gray-900/40">
      <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-sky-100 text-emerald-600 shadow-sm dark:from-slate-700 dark:to-slate-800 dark:text-emerald-300">
        <MusicalNoteIcon className="h-12 w-12" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{message}</h3>
      <p className="mt-2 max-w-md text-sm text-gray-600 dark:text-gray-400">
        Hãy thử tìm bằng từ khóa khác hoặc quay lại danh sách bài hát
      </p>
    </div>
  )
}
