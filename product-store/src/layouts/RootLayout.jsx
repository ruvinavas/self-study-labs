import { NavLink, Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">

      <nav className="border-b bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">

          <NavLink
            to="/products"
            className="font-display text-xl font-bold text-teal-700"
          >
            Product Store
          </NavLink>

          <div className="flex gap-6">

            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? 'font-medium text-teal-700'
                  : 'text-slate-600 hover:text-teal-700'
              }
            >
              Products
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? 'font-medium text-teal-700'
                  : 'text-slate-600 hover:text-teal-700'
              }
            >
              Cart
            </NavLink>

            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive
                  ? 'font-medium text-teal-700'
                  : 'text-slate-600 hover:text-teal-700'
              }
            >
              Admin
            </NavLink>

          </div>
        </div>
      </nav>


      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t bg-white py-4 text-center text-sm text-slate-500">
        Product Store © 2026
      </footer>

    </div>
  )
}