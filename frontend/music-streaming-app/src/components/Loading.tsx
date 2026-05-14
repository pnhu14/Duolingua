export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative h-16 w-16">
        <div className="absolute left-0 top-0 h-full w-full rounded-full border-4 border-green-200 dark:border-green-900" />
        <div className="absolute left-0 top-0 h-full w-full animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
      </div>
      <p className="mt-4 font-medium text-gray-600 dark:text-gray-400">Đang tải bài hát...</p>
    </div>
  )
}
