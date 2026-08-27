export default function StateBlock({ type, message, onRetry }) {
  if (type === 'loading') {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-80 animate-pulse rounded-xl bg-slate-200"
          />
        ))}
      </div>
    )
  }

  if (type === 'error') {
    return (
      <div className="rounded-xl bg-red-50 p-8 text-center">
        <p className="font-medium text-red-700">
          {message || 'Something went wrong.'}
        </p>

        <button
          onClick={onRetry}
          className="mt-4 rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    )
  }

  if (type === 'empty') {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow-sm">
        <h2 className="font-display text-xl font-bold">
          No products found
        </h2>

        <p className="mt-2 text-slate-500">
          Try changing your search or selecting another category.
        </p>
      </div>
    )
  }

  return null
}