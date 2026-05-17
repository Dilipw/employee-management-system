import {
  useEffect,
  useState
} from "react"

import MainLayout from "../layouts/MainLayout"

import {
  FaUsers,
  FaUserCheck,
  FaChartLine,
  FaDatabase,
  FaBuilding,
  FaUserTie
} from "react-icons/fa"

import {
  useAuth
} from "../context/AuthContext"

import {
  getEmployees
} from "../services/employeeService"


function DashboardPage() {

  const {
    isAuthenticated,
    user
  } = useAuth()


  const [loading, setLoading] =
    useState(true)

  const [employees, setEmployees] =
    useState([])

  const [totalEmployees, setTotalEmployees] =
    useState(0)

  const [itEmployees, setItEmployees] =
    useState(0)

  const [hrEmployees, setHrEmployees] =
    useState(0)

  const [recentEmployees, setRecentEmployees] =
    useState([])

  const [error, setError] =
    useState("")


  // Fetch Dashboard Data
  const fetchDashboardData =
    async () => {

      try {

        setLoading(true)

        setError("")

        const response =
          await getEmployees(
            1,
            100
          )

        const employeeData =
          response.data || []

        setEmployees(employeeData)

        setTotalEmployees(
          response.total || 0
        )

        // Department Statistics
        const itCount =
          employeeData.filter(
            (employee) =>
              employee.department === "IT"
          ).length

        const hrCount =
          employeeData.filter(
            (employee) =>
              employee.department === "HR"
          ).length

        setItEmployees(itCount)

        setHrEmployees(hrCount)

        // Recent Employees
        setRecentEmployees(
          employeeData.slice(0, 5)
        )

      } catch (error) {

        setError(
          error.response?.data?.detail
          || "Failed to load dashboard"
        )

      } finally {

        setLoading(false)
      }
    }


  useEffect(() => {

    fetchDashboardData()

  }, [])


  // Dashboard Cards
  const stats = [
    {
      title: "Total Employees",
      value: totalEmployees,
      icon: (
        <FaUsers className="text-cyan-400 text-3xl" />
      )
    },

    {
      title: "IT Department",
      value: itEmployees,
      icon: (
        <FaDatabase className="text-blue-400 text-3xl" />
      )
    },

    {
      title: "HR Department",
      value: hrEmployees,
      icon: (
        <FaBuilding className="text-purple-400 text-3xl" />
      )
    },

    {
      title: "System Status",
      value: "Active",
      icon: (
        <FaUserCheck className="text-green-400 text-3xl" />
      )
    }
  ]


  return (

    <MainLayout>

      <div className="space-y-10">


        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-10 shadow-2xl text-white">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">


            <div>

              <h1 className="text-5xl font-black mb-4">

                Dashboard Overview

              </h1>

              <p className="text-lg text-cyan-100">

                Welcome back,
                {" "}
                <span className="font-bold">

                  {user?.full_name}

                </span>

              </p>

            </div>


            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/10">

              <div className="flex items-center gap-5">

                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">

                  <FaUserTie className="text-3xl" />

                </div>

                <div>

                  <h3 className="text-2xl font-bold">

                    {user?.designation}

                  </h3>

                  <p className="text-cyan-100">

                    {user?.department}

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* Error */}
        {
          error && (

            <div className="bg-red-100 text-red-600 p-5 rounded-2xl">

              {error}

            </div>
          )
        }


        {/* Loading */}
        {
          loading ? (

            <div className="bg-white rounded-3xl p-10 text-center shadow-lg">

              <h2 className="text-2xl font-bold text-slate-700">

                Loading Dashboard...

              </h2>

            </div>

          ) : (

            <>
              {/* Statistics */}
              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

                {
                  stats.map((item, index) => (

                    <div
                      key={index}
                      className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:-translate-y-2 transition"
                    >

                      <div className="flex items-center justify-between mb-6">

                        {item.icon}

                        <div className="w-14 h-14 bg-slate-100 rounded-2xl"></div>

                      </div>

                      <h2 className="text-slate-500 mb-3">

                        {item.title}

                      </h2>

                      <h3 className="text-4xl font-black text-slate-900">

                        {item.value}

                      </h3>

                    </div>
                  ))
                }

              </div>


              {/* Authentication Status */}
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">

                <h2 className="text-3xl font-bold mb-6">

                  Authentication Status

                </h2>

                <div className="flex items-center gap-4">

                  <div className={`w-4 h-4 rounded-full ${
                    isAuthenticated
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}>
                  </div>

                  <p className="text-lg font-semibold text-slate-700">

                    {
                      isAuthenticated
                        ? "Authenticated User Session Active"
                        : "Authentication Required"
                    }

                  </p>

                </div>

              </div>


              {/* Recent Employees */}
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">

                <div className="flex items-center justify-between mb-8">

                  <h2 className="text-3xl font-bold">

                    Recent Employees

                  </h2>

                </div>


                <div className="overflow-x-auto">

                  <table className="w-full">

                    <thead>

                      <tr className="border-b border-slate-200">

                        <th className="text-left py-4 text-slate-500">
                          Employee
                        </th>

                        <th className="text-left py-4 text-slate-500">
                          Department
                        </th>

                        <th className="text-left py-4 text-slate-500">
                          Designation
                        </th>

                        <th className="text-left py-4 text-slate-500">
                          Status
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      {
                        recentEmployees.map((employee) => (

                          <tr
                            key={employee.id}
                            className="border-b border-slate-100 hover:bg-slate-50 transition"
                          >

                            <td className="py-5">

                              <div>

                                <h3 className="font-semibold text-slate-800">

                                  {employee.full_name}

                                </h3>

                                <p className="text-slate-500 text-sm">

                                  {employee.email}

                                </p>

                              </div>

                            </td>

                            <td className="py-5 text-slate-700">

                              {employee.department}

                            </td>

                            <td className="py-5 text-slate-700">

                              {employee.designation}

                            </td>

                            <td className="py-5">

                              <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm">

                                Active

                              </span>

                            </td>

                          </tr>
                        ))
                      }

                    </tbody>

                  </table>

                </div>

              </div>
            </>
          )
        }

      </div>

    </MainLayout>
  )
}

export default DashboardPage