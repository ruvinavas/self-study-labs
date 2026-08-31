import { LoaderCircle } from 'lucide-react'

export default function Button({
  children, variant = 'primary', size = 'md', disabled = false,
  loading = false,
  icon,
  onClick,
  type = 'button',
}) {
  const variants = {
    primary:
      'bg-teal-700 text-white hover:bg-teal-800 focus-visible:ring-teal-500',

    ghost:
      'text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-400',

    danger:
      'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
  }

  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-sm', lg: 'px-5 py-3 text-base',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]}`}
    >
      {loading ? (
        <LoaderCircle
          size={18}
          className="animate-spin"
        />
      ) : (
        icon
      )}

      {children}
    </button>
  )
}