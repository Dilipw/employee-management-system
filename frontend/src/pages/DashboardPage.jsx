import MainLayout from "../layouts/MainLayout"

import {
  useAuth
} from "../context/AuthContext"


function DashboardPage() {

  const {
    isAuthenticated
  } = useAuth()


  return (

    <MainLayout>

      <div className="bg-white p-6 rounded-2xl shadow-md">

        <h1 className="text-3xl font-bold mb-4">
          Dashboard
        </h1>

        <p className="mb-4">
          Authentication Status:
        </p>

        <div className="font-semibold text-lg">

          {
            isAuthenticated
              ? "Authenticated ✅"
              : "Not Authenticated ❌"
          }

        </div>

      </div>

    </MainLayout>
  )
}

export default DashboardPage