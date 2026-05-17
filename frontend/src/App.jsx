import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"

import ProtectedRoute from "./components/common/ProtectedRoute"


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Public Route */}
        <Route
          path="/"
          element={<LoginPage />}
        />



        {/* Protected Route */}
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