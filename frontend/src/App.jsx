import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import HomePage from "./pages/HomePage"
import FeaturesPage from "./pages/FeaturesPage"
import AboutPage from "./pages/AboutPage"

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
          element={<HomePage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/features"
          element={<FeaturesPage />}
        />

        <Route
          path="/about"
          element={<AboutPage />}
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