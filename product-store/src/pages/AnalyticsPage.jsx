
import { useEffect, useState } from 'react'
import {
  IndianRupee,
  ShoppingBag,
  Package,
  Percent,
} from 'lucide-react'

import api from '../api/axiosInstance'
import StateBlock from '../components/StateBlock'

import {
  totalRevenue,
  totalOrders,
  averageOrder,
  totalItems,
  totalDiscount,
  revenueByCategory,
  topProducts,
} from '../utils/analytics'

import { formatPrice, toTitleCase } from '../utils/format'

export default function AnalyticsPage() {
  const [carts, setCarts] = useState([])
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchData = async () => {
    try {
      setLoading(true)
      setError('')

      const [cartsRes, usersRes, productsRes] =
        await Promise.all([
          api.get('/carts'),
          api.get('/users?limit=100'),
          api.get('/products?limit=100'),
        ])

      setCarts(cartsRes.data.carts)
      setUsers(usersRes.data.users)
      setProducts(productsRes.data.products)
    } catch (err) {
      setError('Could not load analytics.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return <StateBlock type="loading" />
  }

  if (error) {
    return (
      <StateBlock
        type="error"
        message={error}
        onRetry={fetchData}
      />
    )
  }

  if (carts.length === 0) {
    return <StateBlock type="empty" />
  }

  const revenue = totalRevenue(carts)
  const orders = totalOrders(carts)
  const average = averageOrder(carts)
  const items = totalItems(carts)
  const discount = totalDiscount(carts)

  const categoryData =
    revenueByCategory(carts, products)

  const categoryRows =
    Object.entries(categoryData)

  const productsData =
    topProducts(carts, products)

  const stats = [
    {
      name: 'Revenue',
      value: formatPrice(revenue),
      icon: IndianRupee,
    },
    {
      name: 'Orders',
      value: orders,
      icon: ShoppingBag,
    },
    {
      name: 'Average Order',
      value: formatPrice(average),
      icon: IndianRupee,
    },
    {
      name: 'Items Sold',
      value: items,
      icon: Package,
    },
    {
      name: 'Discount',
      value: formatPrice(discount),
      icon: Percent,
    },
  ]

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">
        Analytics
      </h1>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <div
              key={stat.name}
              className="rounded-lg bg-white p-4 shadow"
            >
              <Icon
                size={22}
                className="text-teal-700"
              />

              <p className="mt-2 text-sm text-slate-500">
                {stat.name}
              </p>

              <p className="mt-1 text-xl font-bold">
                {stat.value}
              </p>
            </div>
          )
        })}
      </div>

      {/* Category chart */}
      <div className="mt-8 rounded-lg bg-white p-5 shadow">
        <h2 className="text-xl font-bold">
          Revenue by Category
        </h2>

        <div className="mt-5 space-y-4">
          {categoryRows.map(([category, value]) => {
            const max = Math.max(
              ...categoryRows.map((item) => item[1])
            )

            return (
              <div key={category}>
                <div className="flex justify-between text-sm">
                  <span>
                    {toTitleCase(category)}
                  </span>

                  <span>
                    {formatPrice(value)}
                  </span>
                </div>

                <div className="mt-1 h-3 rounded bg-slate-100">
                  <div
                    className="h-3 rounded bg-teal-600"
                    style={{
                      width: `${(value / max) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Top products */}
      <div className="mt-8 rounded-lg bg-white p-5 shadow">
        <h2 className="text-xl font-bold">
          Top Products
        </h2>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b text-left">
                <th className="p-3">
                  Product
                </th>

                <th className="p-3 text-right">
                  Quantity
                </th>
              </tr>
            </thead>

            <tbody>
              {productsData.map((item) => (
                <tr
                  key={item.product.id}
                  className="border-b even:bg-slate-50"
                >
                  <td className="p-3">
                    {item.product.title}
                  </td>

                  <td className="p-3 text-right">
                    {item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}