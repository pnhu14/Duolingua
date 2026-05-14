interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-4 py-12 text-center dark:border-red-900 dark:bg-red-950/40">
      <h3 className="text-lg font-semibold text-red-700 dark:text-red-300">Đã có lỗi xảy ra</h3>
      <p className="mt-2 max-w-md text-sm text-red-600 dark:text-red-200">{message}</p>
      {onRetry ? (
        <button
          onClick={onRetry}
          className="mt-6 rounded-full bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
        >
          Thử lại
        </button>
      ) : null}
    </div>
  )
}
