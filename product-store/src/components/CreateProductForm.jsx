import { useForm } from 'react-hook-form'
import api from '../api/axiosInstance'

export default function CreateProductForm({ categories, onSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/products/add', {
        title: data.title,
        price: Number(data.price),
        category: data.category,
        description: data.description,
      })

      onSuccess(response.data.id)
    } catch (error) {
      throw new Error('Failed to create product')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      {/* Title */}
      <div>
        <label className="block font-medium">
          Title
        </label>

        <input
          {...register('title', {
            required: 'Title is required',
            minLength: {
              value: 3,
              message: 'Title must be at least 3 characters',
            },
          })}
          className="mt-1 w-full rounded border px-3 py-2"
        />

        {errors.title && (
          <p className="mt-1 text-sm text-red-600">
            {errors.title.message}
          </p>
        )}
      </div>


      {/* Price */}
      <div>
        <label className="block font-medium">
          Price
        </label>

        <input
          type="number"
          step="0.01"
          {...register('price', {
            required: 'Price is required',
            valueAsNumber: true,
            validate: (value) =>
              value > 0 || 'Price must be positive',
          })}
          className="mt-1 w-full rounded border px-3 py-2"
        />

        {errors.price && (
          <p className="mt-1 text-sm text-red-600">
            {errors.price.message}
          </p>
        )}
      </div>


      {/* Category */}
      <div>
        <label className="block font-medium">
          Category
        </label>

        <select
          {...register('category', {
            required: 'Category is required',
          })}
          className="mt-1 w-full rounded border px-3 py-2"
        >
          <option value="">Select category</option>

          {categories.map((category) => (
            <option
              key={category.slug}
              value={category.slug}
            >
              {category.name}
            </option>
          ))}
        </select>

        {errors.category && (
          <p className="mt-1 text-sm text-red-600">
            {errors.category.message}
          </p>
        )}
      </div>


      {/* Description */}
      <div>
        <label className="block font-medium">
          Description
        </label>

        <textarea
          {...register('description', {
            required: 'Description is required',
            minLength: {
              value: 10,
              message: 'Description must be at least 10 characters',
            },
          })}
          rows="4"
          className="mt-1 w-full rounded border px-3 py-2"
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>


      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded bg-teal-700 px-4 py-2 text-white disabled:opacity-50"
      >
        {isSubmitting ? 'Creating...' : 'Create Product'}
      </button>

    </form>
  )
}