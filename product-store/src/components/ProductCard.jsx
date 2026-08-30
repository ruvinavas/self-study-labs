import { Link } from 'react-router-dom'
import { ShoppingCart, Star } from 'lucide-react'
import useCartStore from '../store/useCartStore'
import { formatPrice, getDiscountedPrice } from '../utils/format'

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()

    addItem(product)
  }

  return (
    <Link
      to={`/products/${product.id}`}
      className="group overflow-hidden rounded-lg bg-white shadow"
    >
      <div className="relative">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-56 w-full object-cover"
        />

        {product.discountPercentage > 10 && (
          <span className="absolute left-3 top-3 rounded bg-red-500 px-2 py-1 text-sm text-white">
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

        
        <div className="mt-3">
          <span className="font-bold">
            {formatPrice(getDiscountedPrice(product))}
          </span>

          {product.discountPercentage > 0 && (
            <span className="ml-2 text-sm text-slate-400 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

       
        <div className="mt-2 flex">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={16}
              className={
                index < Math.round(product.rating)
                  ? 'text-yellow-500'
                  : 'text-slate-300'
              }
              fill={
                index < Math.round(product.rating)
                  ? 'currentColor'
                  : 'none'
              }
            />
          ))}
        </div>

      
        <button
          onClick={handleAddToCart}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded bg-teal-700 px-4 py-2 text-white hover:bg-teal-800"
        >
          <ShoppingCart size={18} />
          Add to cart
        </button>

      </div>
    </Link>
  )
}