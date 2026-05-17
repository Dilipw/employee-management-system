import MainLayout from "../layouts/MainLayout"

import {
  FaUsers,
  FaUserCheck,
  FaChartLine,
  FaDatabase
} from "react-icons/fa"

import {
  useAuth
} from "../context/AuthContext"


function DashboardPage() {

  const {
    isAuthenticated
  } = useAuth()


  const stats = [
    {
      title: "Total Employees",
      value: "1,284",
      icon: <FaUsers className="text-cyan-400 text-3xl" />
    },

    {
      title: "Active Employees",
      value: "1,120",
      icon: <FaUserCheck className="text-green-400 text-3xl" />
    },

    {
      title: "Performance",
      value: "92%",
      icon: <FaChartLine className="text-blue-400 text-3xl" />
    },

    {
      title: "Database Status",
      value: "Secure",
      icon: <FaDatabase className="text-purple-400 text-3xl" />
    }
  ]


  return (

    <MainLayout>

      <div className="space-y-10">


        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-10 shadow-2xl text-white">

          <h1 className="text-5xl font-black mb-4">

            Dashboard Overview

          </h1>

          <p className="text-lg text-cyan-100">

            Welcome to EmployeeHub management platform.

          </p>

        </div>


        {/* Stats */}
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


        {/* Activity Table */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-3xl font-bold">

              Recent Activity

            </h2>

            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-2xl shadow-lg">

              View All

            </button>

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
                    Status
                  </th>

                </tr>

              </thead>


              <tbody>

                <tr className="border-b border-slate-100">

                  <td className="py-5 font-semibold">
                    Dilip Waghmare
                  </td>

                  <td className="py-5">
                    Engineering
                  </td>

                  <td className="py-5">

                    <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm">

                      Active

                    </span>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </MainLayout>
  )
}

export default DashboardPage