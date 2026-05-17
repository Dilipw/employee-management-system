import {
  Navigate
} from "react-router-dom"

import {
  useAuth
} from "../../context/AuthContext"


function ProtectedRoute({ children }) {

  const {
    isAuthenticated,
    loading
  } = useAuth()


  // Prevent UI flicker
  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-2xl font-semibold">
          Loading...
        </h1>

      </div>
    )
  }


  // Redirect if not authenticated
  if (!isAuthenticated) {

    return <Navigate to="/" replace />
  }


  return children
}

export default ProtectedRoute