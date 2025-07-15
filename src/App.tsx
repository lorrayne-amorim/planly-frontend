import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { BoardPage } from './pages/BoardPage'
import Login from './pages/Login'
import AuthLayout from './layouts/AuthLayout'
import Register from './pages/Register'

function App() {
  return (
    <BrowserRouter basename="/planly-frontend">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <AuthLayout>
              <Home />
            </AuthLayout>
          }
        />
        <Route
          index
          element={
            <AuthLayout>
              <Home />
            </AuthLayout>
          }
        />

        <Route
          path="/board/:id"
          element={
            <AuthLayout>
              <BoardPage />
            </AuthLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
