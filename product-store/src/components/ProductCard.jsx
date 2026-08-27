import { Link } from 'react-router-dom'
import { ShoppingCart, Star } from 'lucide-react'

export default function ProductCard({ product }) {
  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()

    // Cart functionality will be added in Commit 7
    console.log('Add to cart:', product.title)
  }

  return (
    <Link
      to={`/products/${product.id}`}
      className="group overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-56 w-full object-cover"
        />

        {product.discountPercentage > 10 && (
          <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-sm font-medium text-white">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>

      <div className="p-4">
        <h2 className="truncate font-display text-lg font-bold">
          {product.title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {product.brand || 'No brand'}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-bold">
            ${product.price}
          </span>

          <div className="flex items-center gap-1 text-amber-500">
            <Star size={17} fill="currentColor" />

            <span className="text-sm text-slate-600">
              {product.rating}
            </span>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-2 text-white hover:bg-teal-800"
        >
          <ShoppingCart size={18} />
          Add to cart
        </button>
      </div>
    </Link>
  )
}