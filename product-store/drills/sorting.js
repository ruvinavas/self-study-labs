// drills/es6.js
const results = []
function check(name, actual, expected) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected)
  results.push(pass)
  console.log(pass ? `PASS  ${name}` : `FAIL  ${name}\n      got      ${JSON.stringify(actual)}\n      expected ${JSON.stringify(expected)}`)
}

// ---------- sample data ----------
const products = [
  { id: 1, title: 'Phone',  price: 500, rating: 4.5, category: 'tech',  tags: ['new', 'sale'] },
  { id: 2, title: 'Laptop', price: 900, rating: 4.8, category: 'tech',  tags: ['sale'] },
  { id: 3, title: 'Chair',  price: 150, rating: 4.5, category: 'home',  tags: [] },
  { id: 4, title: 'Lamp',   price: 150, rating: 3.9, category: 'home',  tags: ['new'] },
]

const makeComparator = (key, direction = 'asc') => (a, b) => {
  const multiplier = direction === 'asc' ? 1 : -1

  const left = a[key]
  const right = b[key]

  if (typeof left === 'string') {
    return left.localeCompare(right) * multiplier
  }
  return (left - right) * multiplier
}


// 1. Default sort
const defaultSort = () => {
  return [10, 9, 100, 1].sort()
}


// 2. Price low to high
const byPriceAsc = (list) => {
  return [...list].sort((a, b) => a.price - b.price)
}


// 3. Price high to low
const byPriceDesc = (list) => {
  return [...list].sort((a, b) => b.price - a.price)
}


// 4. Sort by title
const byTitle = (list) => {
  return [...list].sort((a, b) =>
    a.title.localeCompare(b.title)
  )
}


// 5. Rating high to low,
//    price low to high when rating is equal
const byRatingThenPrice = (list) => {
  return [...list].sort(
    (a, b) =>b.rating - a.rating || a.price - b.price
  )
}



const getDiscountedPrice = (product) => {
  return (
    product.price -(product.price * product.discountPercentage) / 100
  )
}


const byDiscountedPrice = (list) => {
  return [...list].sort(
    (a, b) =>
      getDiscountedPrice(a) - getDiscountedPrice(b)
  )
}

check(
  'default sort',
  defaultSort(),
  [1, 10, 100, 9]
)

const originalPrices = products.map(
  (product) => product.price
)

check(
  'price ascending',
  byPriceAsc(products).map(
    (product) => product.price
  ),
  [150, 150, 500, 900]
)


check(
  'price ascending no mutation',
  products.map(
    (product) => product.price
  ),
  originalPrices
)

check(
  'price descending',
  byPriceDesc(products).map(
    (product) => product.price
  ),
  [900, 500, 150, 150]
)


check(
  'title sorting',
  byTitle(products).map(
    (product) => product.title
  ),
  ['Chair', 'Lamp', 'Laptop', 'Phone']
)

check(
  'rating then price',
  byRatingThenPrice(products).map(
    (product) => product.title
  ),
  ['Laptop', 'Phone', 'Chair', 'Lamp']
)

check(
  'discounted price',
  byDiscountedPrice(products).map(
    (product) => product.title
  ),
  ['Chair', 'Lamp', 'Phone', 'Laptop']
)


// makeComparator - number ascending
check(
  'comparator number ascending',
  [...products]
    .sort(makeComparator('price', 'asc'))
    .map((product) => product.price),
  [150, 150, 500, 900]
)


// makeComparator - number descending
check(
  'comparator number descending',
  [...products]
    .sort(makeComparator('price', 'desc'))
    .map((product) => product.price),
  [900, 500, 150, 150]
)


// makeComparator - string ascending
check(
  'comparator string ascending',
  [...products]
    .sort(makeComparator('title', 'asc'))
    .map((product) => product.title),
  ['Chair', 'Lamp', 'Laptop', 'Phone']
)

check(
  'comparator string descending',
  [...products]
    .sort(makeComparator('title', 'desc'))
    .map((product) => product.title),
  ['Phone', 'Laptop', 'Lamp', 'Chair']
)


const wrongBooleanSort = (list) => {
  return [...list].sort(
    (a, b) => a.price > b.price
  )
}

const booleanTestProducts = [
  { id: 1, title: 'A', price: 3 },
  { id: 2, title: 'B', price: 1 },
  { id: 3, title: 'C', price: 2 },
]

check(
  'boolean comparator is wrong',
  wrongBooleanSort(booleanTestProducts).map(
    (product) => product.price
  ),
  [1, 2, 3]
)
console.log(
  `\n${results.filter(Boolean).length}/${results.length} passing`
)