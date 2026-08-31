import { Navigate, Route, Routes } from 'react-router-dom'

import RootLayout from './layouts/RootLayout'
import AdminLayout from './layouts/AdminLayout'

import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import AdminPage from './pages/AdminPage'
import AnalyticsPage from './pages/AnalyticsPage'
import NotFoundPage from './pages/NotFoundPage'
import KeyDemoPage from './pages/KeyDemoPage'

const isAdmin = true

function RequireAdmin({ children }) {
  if (!isAdmin) {
    return <Navigate to="/products" replace />
  }

  return children
}

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>

        <Route
          path="/"
          element={<Navigate to="/products" replace />}
        />

        <Route
          path="/products"
          element={<ProductsPage />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetailPage />}
        />

        <Route
          path="/cart"
          element={<CartPage />}
        />

        <Route
          path="/key-demo"
          element={<KeyDemoPage />}
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route index element={<AdminPage />} />

          <Route
            path="analytics"
            element={<AnalyticsPage />}
          />
        </Route>

        <Route
          path="*"
          element={<NotFoundPage />}
        />

      </Route>
    </Routes>
  )
}