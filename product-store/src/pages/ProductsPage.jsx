import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import api from '../api/axiosInstance'
import ProductCard from '../components/ProductCard'
import FilterBar from '../components/FilterBar'
import StateBlock from '../components/StateBlock'
import BackToTop from '../components/BackToTop'

const LIMIT = 12

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [total, setTotal] = useState(0)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('q') ?? ''
  const category = searchParams.get('category') ?? ''
  const sort = searchParams.get('sort') ?? ''
  const minPrice = Number(searchParams.get('minPrice') ?? 0)
  const maxPrice = Number(searchParams.get('maxPrice') ?? 0)
  const page = Number(searchParams.get('page') ?? 1)

  const updateParam = (key, value) => {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous)

        if (!value || value === 'all') {
          next.delete(key)
        } else {
          next.set(key, value)
        }

        if (key !== 'page') {
          next.delete('page')
        }

        return next
      },
      { replace: key !== 'page' }
    )
  }

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError('')

      const skip = (page - 1) * LIMIT

      let response

      if (search) {
        response = await api.get(
          `/products/search?q=${encodeURIComponent(search)}&limit=${LIMIT}&skip=${skip}`
        )
      } else if (category) {
        response = await api.get(
          `/products/category/${category}?limit=${LIMIT}&skip=${skip}`
        )
      } else {
        response = await api.get(
          `/products?limit=${LIMIT}&skip=${skip}`
        )
      }

      setProducts(response.data.products)
      setTotal(response.data.total)
    } catch (err) {
      setError('Unable to load products. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [search, category, page])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/products/categories')
        setCategories(response.data)
      } catch (err) {
        console.error('Failed to load categories')
      }
    }

    fetchCategories()
  }, [])

  let displayedProducts = [...products]

  if (minPrice > 0) {
    displayedProducts = displayedProducts.filter(
      (product) => product.price >= minPrice
    )
  }

  if (maxPrice > 0) {
    displayedProducts = displayedProducts.filter(
      (product) => product.price <= maxPrice
    )
  }

 
  displayedProducts.sort((a, b) => {
    if (sort === 'price-asc') {
      return a.price - b.price
    }

    if (sort === 'price-desc') {
      return b.price - a.price
    }

    if (sort === 'rating-desc') {
      return b.rating - a.rating
    }

    return 0
  })

  const resetFilters = () => {
    setSearchParams({})
  }

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
    alert('Copied')
  }

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

      <FilterBar
        categories={categories}
        search={search}
        category={category}
        sort={sort}
        minPrice={minPrice}
        maxPrice={maxPrice}
        updateParam={updateParam}
      />

    
      <div className="mt-4 flex gap-3">
        <button
          onClick={resetFilters}
          className="rounded border px-4 py-2"
        >
          Reset Filters
        </button>

        <button
          onClick={copyLink}
          className="rounded bg-teal-700 px-4 py-2 text-white"
        >
          Copy Link
        </button>
      </div>

      {/* Active filter chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        {search && (
          <button
            onClick={() => updateParam('q', '')}
            className="rounded-full bg-slate-100 px-3 py-1 text-sm"
          >
            Search: {search} ×
          </button>
        )}

        {category && (
          <button
            onClick={() => updateParam('category', '')}
            className="rounded-full bg-slate-100 px-3 py-1 text-sm"
          >
            Category: {category} ×
          </button>
        )}

        {minPrice > 0 && (
          <button
            onClick={() => updateParam('minPrice', '')}
            className="rounded-full bg-slate-100 px-3 py-1 text-sm"
          >
            From ₹{minPrice} ×
          </button>
        )}

        {maxPrice > 0 && (
          <button
            onClick={() => updateParam('maxPrice', '')}
            className="rounded-full bg-slate-100 px-3 py-1 text-sm"
          >
            Under ₹{maxPrice} ×
          </button>
        )}

        {sort && (
          <button
            onClick={() => updateParam('sort', '')}
            className="rounded-full bg-slate-100 px-3 py-1 text-sm"
          >
            Sort: {sort} ×
          </button>
        )}
      </div>

      {/* Results */}
      {!loading && !error && (
        <p className="my-4 text-sm text-slate-500">
          {displayedProducts.length} products found
        </p>
      )}

      {loading && <StateBlock type="loading" />}

      {!loading && error && (
        <StateBlock
          type="error"
          message={error}
          onRetry={fetchProducts}
        />
      )}

      {!loading &&
        !error &&
        displayedProducts.length === 0 && (
          <StateBlock type="empty" />
        )}

      {!loading &&
        !error &&
        displayedProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

     
      {!loading && !error && total > LIMIT && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            disabled={page === 1}
            onClick={() =>
              updateParam('page', String(page - 1))
            }
            className="rounded border px-4 py-2 disabled:opacity-40"
          >
            Previous
          </button>

          <span>
            Page {page} of {Math.ceil(total / LIMIT)}
          </span>

          <button
            disabled={page >= Math.ceil(total / LIMIT)}
            onClick={() =>
              updateParam('page', String(page + 1))
            }
            className="rounded border px-4 py-2 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      <BackToTop />
    </div>
  )
}