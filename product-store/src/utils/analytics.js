export const totalRevenue = (carts) => {
  return carts.reduce((sum, cart) => sum + cart.discountedTotal, 0)
}

export const totalOrders = (carts) => {
  return carts.length
}

export const averageOrder = (carts) => {
  if (carts.length === 0) return 0

  return totalRevenue(carts) / carts.length
}

export const totalItems = (carts) => {
  return carts.reduce((sum, cart) => sum + cart.totalQuantity, 0)
}

export const totalDiscount = (carts) => {
  return carts.reduce(
    (sum, cart) => sum + (cart.total - cart.discountedTotal),
    0
  )
}

export const revenueByCategory = (carts, products) => {
  const productMap = {}

  products.forEach((product) => {
    productMap[product.id] = product
  })

  return carts
    .flatMap((cart) => cart.products)
    .reduce((result, item) => {
      const category = productMap[item.id]?.category ?? 'unknown'

      result[category] =
        (result[category] ?? 0) + item.total

      return result
    }, {})
}

export const topProducts = (carts, products) => {
  const productMap = {}

  products.forEach((product) => {
    productMap[product.id] = product
  })

  const totals = carts
    .flatMap((cart) => cart.products)
    .reduce((result, item) => {
      result[item.id] =
        (result[item.id] ?? 0) + item.quantity

      return result
    }, {})

  return Object.entries(totals)
    .map(([id, quantity]) => ({
      product: productMap[id],
      quantity,
    }))
    .filter((item) => item.product)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 10)
}