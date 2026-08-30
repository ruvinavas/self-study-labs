import { useEffect, useState } from 'react'
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import api from '../api/axiosInstance'
import StateBlock from '../components/StateBlock'
import useCartStore from '../store/useCartStore'

import { formatPrice } from '../utils/format'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const addItem = useCartStore((state) => state.addItem)

  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await api.get(`/products/${id}`)

        setProduct(response.data)
        setSelectedImage(response.data.thumbnail)
      } catch (err) {
        setError('Product could not be found.')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return <StateBlock type="loading" />
  }

  if (error) {
    return (
      <StateBlock
        type="error"
        message={error}
        onRetry={() => window.location.reload()}
      />
    )
  }

  return (
    <div>

      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-teal-700"
      >
        <ArrowLeft size={18} />
        Back
      </button>


      <div className="grid gap-8 md:grid-cols-2">
        <div>

          <img
            src={selectedImage}
            alt={product.title}
            className="h-80 w-full rounded-lg object-cover"
          />

          <div className="mt-4 flex gap-3 overflow-x-auto">

            {product.images.map((image) => (
              <button
                key={image}
                onClick={() => setSelectedImage(image)}
                className="shrink-0"
              >
                <img
                  src={image}
                  alt={`${product.title} thumbnail`}
                  className="h-20 w-20 rounded object-cover"
                />
              </button>
            ))}

          </div>

        </div>
        <div>

          <h1 className="font-display text-3xl font-bold">
            {product.title}
          </h1>

          <p className="mt-2 text-slate-500">
            {product.brand || 'No brand'}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Category: {product.category}
          </p>

          <div className="mt-4 flex items-center gap-2">
            <Star
              size={20}
              className="text-yellow-500"
              fill="currentColor"
            />

            <span>{product.rating}</span>
          </div>

          <p className="mt-5 text-2xl font-bold">
            ${formatPrice(product.price)}
          </p>

          <p className="mt-2 text-slate-600">
            Stock: {product.stock}
          </p>

          <p className="mt-5 leading-relaxed text-slate-600">
            {product.description}
          </p>

          <button
            onClick={() => addItem(product)}
            className="mt-6 flex items-center gap-2 rounded bg-teal-700 px-5 py-3 text-white hover:bg-teal-800"
          >
            <ShoppingCart size={20} />
            Add to cart
          </button>

        </div>

      </div>

    </div>
  )
}