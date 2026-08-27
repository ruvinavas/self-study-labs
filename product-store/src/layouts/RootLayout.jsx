import { NavLink, Outlet } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'

export default function RootLayout() {
  const isAdmin = useAuthStore((state) => state.isAdmin)
  const toggleAdmin = useAuthStore((state) => state.toggleAdmin)

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">

      <nav className="sticky top-0 z-40 border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">

          <NavLink
            to="/products"
            className="font-display text-xl font-bold text-teal-700"
          >
            Product Store
          </NavLink>

          <div className="flex items-center gap-4">

            <NavLink to="/products">
              Products
            </NavLink>

            <NavLink to="/cart">
              Cart
            </NavLink>

            <NavLink to="/admin">
              Admin
            </NavLink>

            <button
              onClick={toggleAdmin}
              className="rounded bg-slate-800 px-3 py-2 text-sm text-white"
            >
              {isAdmin ? 'Log out admin' : 'Log in as admin'}
            </button>

          </div>

        </div>
      </nav>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t bg-white py-4 text-center text-sm text-slate-500">
        Product Store
      </footer>

    </div>
  )
}