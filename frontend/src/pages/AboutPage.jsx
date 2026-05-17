import {
  FaCode,
  FaServer,
  FaReact,
  FaDatabase
} from "react-icons/fa"


function AboutPage() {

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">

      <div className="max-w-6xl mx-auto px-6 py-24">


        {/* Heading */}
        <div className="text-center mb-20">

          <h1 className="text-5xl font-black mb-6">

            About EmployeeHub

          </h1>

          <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">

            EmployeeHub is a modern employee management platform
            developed using scalable full-stack technologies
            including React, FastAPI and MySQL architecture.

          </p>

        </div>


        {/* About Grid */}
        <div className="grid lg:grid-cols-2 gap-10">


          {/* Left Card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-lg shadow-xl">

            <FaCode className="text-cyan-400 text-5xl mb-8" />

            <h2 className="text-3xl font-bold mb-6">

              Modern Frontend Architecture

            </h2>

            <p className="text-slate-400 leading-relaxed">

              Built using React with reusable components,
              Context API, protected routes and scalable
              frontend architecture for maintainability
              and performance.

            </p>

          </div>


          {/* Right Card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-lg shadow-xl">

            <FaServer className="text-green-400 text-5xl mb-8" />

            <h2 className="text-3xl font-bold mb-6">

              Scalable Backend System

            </h2>

            <p className="text-slate-400 leading-relaxed">

              Backend APIs are powered using FastAPI,
              JWT authentication, SQLAlchemy ORM and
              MySQL database with production-level
              API architecture.

            </p>

          </div>

        </div>


        {/* Tech Stack */}
        <div className="mt-24">

          <h2 className="text-4xl font-bold text-center mb-16">

            Technology Stack

          </h2>


          <div className="grid md:grid-cols-3 gap-8">


            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">

              <FaReact className="text-cyan-400 text-5xl mx-auto mb-6" />

              <h3 className="text-2xl font-bold mb-4">

                React

              </h3>

              <p className="text-slate-400">

                Modern component-based frontend framework.

              </p>

            </div>


            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">

              <FaServer className="text-green-400 text-5xl mx-auto mb-6" />

              <h3 className="text-2xl font-bold mb-4">

                FastAPI

              </h3>

              <p className="text-slate-400">

                High-performance Python backend framework.

              </p>

            </div>


            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">

              <FaDatabase className="text-purple-400 text-5xl mx-auto mb-6" />

              <h3 className="text-2xl font-bold mb-4">

                MySQL

              </h3>

              <p className="text-slate-400">

                Reliable relational database management system.

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default AboutPage