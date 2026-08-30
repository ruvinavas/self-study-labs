const state = {
  user: { name: 'Asha', address: { city: 'Pune', pin: '411001' } },
  cart: {
    items: [
      { id: 1, title: 'Phone', price: 500, qty: 1 },
      { id: 2, title: 'Chair', price: 150, qty: 3 },
    ],
  },
  selectedTags: ['new'],
}

// 1. add an item to cart.items
const addItem = (state, item) => {
    return {...state,cart:{...state.cart,items:[...state.cart.items,item]}}
}

// 2. remove a cart item by id
const removeItem = (state, id) => {
    return {...state,cart: {...state.cart,
      items: state.cart.items.filter((item) => item.id !== id),
    },
  }

}

// 3. increment qty of one item, others untouched
const incrementQty = (state, id) => {
    return {
    ...state,cart: {...state.cart, items: state.cart.items.map((item) =>
        item.id === id
          ? { ...item, qty: item.qty + 1 }
          : item),
    },
  }
}

// 4. decrement qty but never below 1
const decrementQty = (state, id) => {
    return {
        ...state,cart:{...state.cart,items: state.cart.items.map((item) =>item.id === id ? { ...item, qty: Math.max(1, item.qty - 1) }
          : item
      ),}
    }
}

// 5. change the city, two levels deep
const setCity = (state, city) => {
    return {...state,user: {...state.user,address: {...state.user.address,city,
      },
    },
  }
}

// 6. toggle a tag in selectedTags
const toggleTag = (state, tag) => {
    const exists = state.selectedTags.includes(tag)

  return {...state,selectedTags: exists ? state.selectedTags.filter((item) => item !== tag): [...state.selectedTags, tag],
  }}

// 7. apply a discount percent to EVERY item's price
const discountAll = (state, percent) => {
    return {...state, cart: { ...state.cart, items: state.cart.items.map((item) => ({...item,
        price: item.price - (item.price * percent) / 100,
      })),
    },
  }
}

// 8. move the item at index `from` to index `to` — without splice on the original
const moveItem = (state, from, to) => {
    const items = [...state.cart.items]

  const [item] = items.splice(from, 1)
  items.splice(to, 0, item)

  return {...state, cart: {...state.cart, items,
    },
  }
}

// 1
const added = addItem(state, {
  id: 3,
  title: 'Lamp',
  price: 100,
  qty: 1,
})

check(
  'addItem',
  added.cart.items.length,
  3
)

check(
  'addItem no mutation',
  state.cart.items.length,
  2
)


// 2
const removed = removeItem(state, 1)

check(
  'removeItem',
  removed.cart.items.map((item) => item.id),
  [2]
)

check(
  'removeItem no mutation',
  state.cart.items.map((item) => item.id),
  [1, 2]
)


// 3
const incremented = incrementQty(state, 1)

check(
  'incrementQty',
  incremented.cart.items[0].qty,
  2
)

check(
  'incrementQty no mutation',
  state.cart.items[0].qty,
  1
)


// 4
const decremented = decrementQty(state, 2)

check(
  'decrementQty',
  decremented.cart.items[1].qty,
  2
)

check(
  'decrementQty no mutation',
  state.cart.items[1].qty,
  3
)


// 5
const cityChanged = setCity(state, 'Mumbai')

check(
  'setCity',
  cityChanged.user.address.city,
  'Mumbai'
)

check(
  'setCity no mutation',
  state.user.address.city,
  'Pune'
)


// 6
const tagAdded = toggleTag(state, 'sale')

check(
  'toggleTag add',
  tagAdded.selectedTags,
  ['new', 'sale']
)

const tagRemoved = toggleTag(state, 'new')

check(
  'toggleTag remove',
  tagRemoved.selectedTags,
  []
)

check(
  'toggleTag no mutation',
  state.selectedTags,
  ['new']
)


// 7
const discounted = discountAll(state, 10)

check(
  'discountAll',
  discounted.cart.items.map((item) => item.price),
  [450, 135]
)

check(
  'discountAll no mutation',
  state.cart.items.map((item) => item.price),
  [500, 150]
)


// 8
const moved = moveItem(state, 0, 1)

check(
  'moveItem',
  moved.cart.items.map((item) => item.id),
  [2, 1]
)

check(
  'moveItem no mutation',
  state.cart.items.map((item) => item.id),
  [1, 2]
)


console.log(`\n${results.filter(Boolean).length}/${results.length} passing`)