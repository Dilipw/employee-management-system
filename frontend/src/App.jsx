import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"

import Navbar from "./components/common/Navbar"

import ProtectedRoute from "./components/common/ProtectedRoute"


function App() {

  return (

    <BrowserRouter>

      {/* Global Navbar */}
      <Navbar />

      <Routes>

        {/* Public Routes */}
        <Route
          path="/"
          element={
            <div className="p-10 text-center">
              <h1 className="text-5xl font-bold">
                Welcome to EmployeeHub 🚀
              </h1>
            </div>
          }
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/features"
          element={
            <div className="p-10 text-center">
              Features Page
            </div>
          }
        />

        <Route
          path="/about"
          element={
            <div className="p-10 text-center">
              About Page
            </div>
          }
        />


        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>

              <DashboardPage />

            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App