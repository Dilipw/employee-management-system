import {
  Link
} from "react-router-dom"

import {
  FaUsers,
  FaShieldAlt,
  FaChartLine,
  FaDatabase
} from "react-icons/fa"


function HomePage() {

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">


      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid lg:grid-cols-2 gap-16 items-center">


          {/* Left Content */}
          <div>

            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full text-sm mb-6">

              <FaShieldAlt />

              Secure Employee Management Platform

            </div>


            <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-8">

              Modern Workforce

              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                Management System

              </span>

            </h1>


            <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-xl">

              Streamline employee operations with a scalable,
              secure and modern management platform built
              using FastAPI and React architecture.

            </p>


            <div className="flex flex-wrap gap-4">

              <Link
                to="/login"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-2xl font-semibold shadow-xl hover:scale-105 transition"
              >
                Get Started
              </Link>

              <Link
                to="/features"
                className="border border-slate-700 bg-slate-900/50 px-8 py-4 rounded-2xl font-semibold hover:bg-slate-800 transition"
              >
                Explore Features
              </Link>

            </div>

          </div>


          {/* Right Card */}
          <div className="relative">

            <div className="absolute inset-0 bg-cyan-500 blur-3xl opacity-20 rounded-full"></div>

            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">


              <div className="flex items-center justify-between mb-10">

                <div>

                  <h2 className="text-2xl font-bold">
                    Workforce Overview
                  </h2>

                  <p className="text-slate-400 mt-2">
                    Real-time employee analytics
                  </p>

                </div>

                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-2xl">

                  <FaUsers className="text-3xl" />

                </div>

              </div>


              <div className="space-y-6">


                <div className="bg-slate-900/70 rounded-2xl p-5 border border-white/5">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-slate-400">
                        Total Employees
                      </p>

                      <h3 className="text-3xl font-bold mt-2">
                        1,284
                      </h3>

                    </div>

                    <FaUsers className="text-cyan-400 text-3xl" />

                  </div>

                </div>


                <div className="grid grid-cols-2 gap-5">

                  <div className="bg-slate-900/70 rounded-2xl p-5 border border-white/5">

                    <FaChartLine className="text-green-400 text-2xl mb-4" />

                    <h3 className="text-2xl font-bold">
                      92%
                    </h3>

                    <p className="text-slate-400 mt-2">
                      Productivity
                    </p>

                  </div>


                  <div className="bg-slate-900/70 rounded-2xl p-5 border border-white/5">

                    <FaDatabase className="text-blue-400 text-2xl mb-4" />

                    <h3 className="text-2xl font-bold">
                      Secure
                    </h3>

                    <p className="text-slate-400 mt-2">
                      Cloud Storage
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="text-center mb-20">

          <h2 className="text-4xl font-bold mb-6">

            Platform Features

          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto">

            Designed with scalability, security and performance
            focused architecture for modern organizations.

          </p>

        </div>


        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">


          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition">

            <FaUsers className="text-cyan-400 text-4xl mb-6" />

            <h3 className="text-2xl font-bold mb-4">

              Employee Management

            </h3>

            <p className="text-slate-400">

              Efficiently manage employee records and workflows.

            </p>

          </div>


          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition">

            <FaShieldAlt className="text-green-400 text-4xl mb-6" />

            <h3 className="text-2xl font-bold mb-4">

              Secure Authentication

            </h3>

            <p className="text-slate-400">

              JWT protected authentication and secure API access.

            </p>

          </div>


          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition">

            <FaChartLine className="text-blue-400 text-4xl mb-6" />

            <h3 className="text-2xl font-bold mb-4">

              Analytics Dashboard

            </h3>

            <p className="text-slate-400">

              Monitor employee metrics and performance insights.

            </p>

          </div>


          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition">

            <FaDatabase className="text-purple-400 text-4xl mb-6" />

            <h3 className="text-2xl font-bold mb-4">

              Scalable Backend

            </h3>

            <p className="text-slate-400">

              FastAPI and MySQL powered scalable architecture.

            </p>

          </div>

        </div>

      </section>

    </div>
  )
}

export default HomePage