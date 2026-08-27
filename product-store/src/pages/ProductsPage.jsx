import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import api from '../api/axiosInstance'
import ProductCard from '../components/ProductCard'
import FilterBar from '../components/FilterBar'
import StateBlock from '../components/StateBlock'
import BackToTop from '../components/BackToTop'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [searchParams] = useSearchParams()

  const search = searchParams.get('q') || ''
  const category = searchParams.get('category') || ''
  const sort = searchParams.get('sort') || ''


  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError('')

      let response

      if (search) {
        response = await api.get(
          `/products/search?q=${encodeURIComponent(search)}&limit=12`
        )
      } else if (category) {
        response = await api.get(
          `/products/category/${category}?limit=12`
        )
      } else {
        response = await api.get('/products?limit=12&skip=0')
      }

      setProducts(response.data.products)
    } catch (err) {
      setError('Unable to load products. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [search, category])


  const fetchCategories = async () => {
    try {
      const response = await api.get('/products/categories')
      setCategories(response.data)
    } catch (err) {
      console.error('Failed to load categories')
    }
  }


  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])


  useEffect(() => {
    fetchCategories()
  }, [])


  const sortedProducts = useMemo(() => {
    const sorted = [...products]

    if (sort === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price)
    }

    if (sort === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price)
    }

    if (sort === 'rating-desc') {
      sorted.sort((a, b) => b.rating - a.rating)
    }

    return sorted
  }, [products, sort])


  return (
    <div>

      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Products
        </h1>

        <p className="mt-2 text-slate-600">
          Browse our collection of products.
        </p>
      </div>


      <FilterBar categories={categories} />


      {loading && (
        <StateBlock type="loading" />
      )}


      {!loading && error && (
        <StateBlock
          type="error"
          message={error}
          onRetry={fetchProducts}
        />
      )}


      {!loading && !error && sortedProducts.length === 0 && (
        <StateBlock type="empty" />
      )}


      {!loading && !error && sortedProducts.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>
      )}


      <BackToTop />

    </div>
  )
}