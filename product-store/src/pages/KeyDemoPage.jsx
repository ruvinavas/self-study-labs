import { useState } from 'react'

const initialProducts = [
  { id: 1, name: 'Laptop', price: 800 },
  { id: 2, name: 'Headphones', price: 100 },
  { id: 3, name: 'Keyboard', price: 50 },
  { id: 4, name: 'Monitor', price: 300 },
  { id: 5, name: 'Mouse', price: 30 },
]

function ProductRow({ product }) {
  const [quantity, setQuantity] = useState(0)

  return (
    <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4">

      <div>
        <h2 className="font-display text-lg font-bold">
          {product.name}
        </h2>

        <p className="text-slate-500">
          ${product.price}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <span className="font-bold">
          Quantity: {quantity}
        </span>

        <button
          onClick={() => setQuantity(quantity + 1)}
          className="rounded-lg bg-teal-700 px-4 py-2 text-xl text-white hover:bg-teal-800"
        >
          +
        </button>
      </div>

    </div>
  )
}


export default function KeyDemoPage() {
  const [products, setProducts] = useState(initialProducts)

  const sortByPrice = () => {
    const sortedProducts = [...products].sort(
      (a, b) => a.price - b.price
    )
    setProducts(sortedProducts)
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <button onClick={sortByPrice} className="mt-6 rounded-lg bg-teal-700 px-5 py-3 font-medium text-white hover:bg-teal-800">
        Sort by Price
      </button>

      <div className="mt-6 overflow-hidden rounded-xl shadow">
        {products.map((product, index) => (
          <ProductRow
            key={product.id}
            product={product}
          />
        ))}
      </div>

    </div>
  )
}