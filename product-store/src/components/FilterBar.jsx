import { useSearchParams } from 'react-router-dom'

export default function FilterBar({ categories }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('q') || ''
  const category = searchParams.get('category') || ''
  const sort = searchParams.get('sort') || ''

  const updateParam = (name, value) => {
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set(name, value)
    } else {
      params.delete(name)
    }

    setSearchParams(params)
  }

  return (
    <div className="sticky top-[73px] z-30 mb-6 border-b bg-slate-50 py-4">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 sm:flex-row">

        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => updateParam('q', e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 outline-none focus:border-teal-600 sm:flex-1"
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => updateParam('category', e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 outline-none focus:border-teal-600"
        >
          <option value="">All categories</option>

          {categories.map((item) => (
            <option
              key={item.slug}
              value={item.slug}
            >
              {item.name}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => updateParam('sort', e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 outline-none focus:border-teal-600"
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price low → high</option>
          <option value="price-desc">Price high → low</option>
          <option value="rating-desc">Rating high → low</option>
        </select>

      </div>
    </div>
  )
}