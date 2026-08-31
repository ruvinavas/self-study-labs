import { Link, Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div>
      <div className="mb-6 flex gap-4 border-b pb-3">
        <Link
          to="/admin"
          className="text-teal-700 hover:underline"
        >
          Products
        </Link>

        <Link
          to="/admin/analytics"
          className="text-teal-700 hover:underline"
        >
          Analytics
        </Link>
      </div>

      <Outlet />
    </div>
  )
}