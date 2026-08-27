import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'

import Modal from '../components/Modal'
import useCartStore from '../store/useCartStore'

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const increment = useCartStore((state) => state.increment)
  const decrement = useCartStore((state) => state.decrement)
  const removeItem = useCartStore((state) => state.removeItem)

  const [itemToRemove, setItemToRemove] = useState(null)

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const confirmRemove = () => {
    if (itemToRemove) {
      removeItem(itemToRemove.id)
      setItemToRemove(null)
    }
  }

  if (items.length === 0) {
    return (
      <div className="py-16 text-center">

        <h1 className="font-display text-3xl font-bold">
          Your cart is empty
        </h1>

        <p className="mt-2 text-slate-500">
          Add some products to get started.
        </p>

        <Link
          to="/products"
          className="mt-6 inline-block rounded bg-teal-700 px-5 py-3 text-white"
        >
          Browse Products
        </Link>

      </div>
    )
  }

  return (
    <div>

      <h1 className="font-display text-3xl font-bold">
        Your Cart
      </h1>


      <div className="mt-6 space-y-4">

        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow sm:flex-row sm:items-center"
          >

            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-20 w-20 rounded object-cover"
            />

            <div className="flex-1">

              <h2 className="font-display font-bold">
                {item.title}
              </h2>

              <p className="text-slate-500">
                ${item.price} each
              </p>

            </div>


            <div className="flex items-center gap-3">

              <button
                onClick={() => decrement(item.id)}
                className="rounded border p-1"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>

              <span className="w-6 text-center">
                {item.quantity}
              </span>

              <button
                onClick={() => increment(item.id)}
                className="rounded border p-1"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>

            </div>


            <p className="font-bold">
              ${(item.price * item.quantity).toFixed(2)}
            </p>


            <button
              onClick={() => setItemToRemove(item)}
              className="text-red-600 hover:text-red-800"
              aria-label={`Remove ${item.title}`}
            >
              <Trash2 size={20} />
            </button>

          </div>
        ))}

      </div>


      <div className="mt-8 text-right">

        <p className="text-xl font-bold">
          Order Total: ${total.toFixed(2)}
        </p>

      </div>


      {/* Remove confirmation */}
      <Modal
        isOpen={Boolean(itemToRemove)}
        onClose={() => setItemToRemove(null)}
        title="Remove item?"
      >
        <p className="text-slate-600">
          Are you sure you want to remove{' '}
          <strong>{itemToRemove?.title}</strong> from your cart?
        </p>

        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={() => setItemToRemove(null)}
            className="rounded border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={confirmRemove}
            className="rounded bg-red-600 px-4 py-2 text-white"
          >
            Remove
          </button>

        </div>
      </Modal>

    </div>
  )
}