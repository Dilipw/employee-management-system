import {
  FaUsers,
  FaShieldAlt,
  FaChartLine,
  FaDatabase,
  FaSearch,
  FaLock
} from "react-icons/fa"


function FeaturesPage() {

  const features = [
    {
      title: "Employee Management",
      description:
        "Manage employee records with scalable CRUD operations.",
      icon: <FaUsers className="text-cyan-400 text-4xl" />
    },

    {
      title: "JWT Authentication",
      description:
        "Secure authentication system using JWT token architecture.",
      icon: <FaShieldAlt className="text-green-400 text-4xl" />
    },

    {
      title: "Analytics Dashboard",
      description:
        "Track employee performance and workforce statistics.",
      icon: <FaChartLine className="text-blue-400 text-4xl" />
    },

    {
      title: "Database Management",
      description:
        "MySQL powered scalable and reliable backend system.",
      icon: <FaDatabase className="text-purple-400 text-4xl" />
    },

    {
      title: "Search & Filters",
      description:
        "Quick employee search and advanced filtering capabilities.",
      icon: <FaSearch className="text-yellow-400 text-4xl" />
    },

    {
      title: "Protected APIs",
      description:
        "Secure API communication with protected route access.",
      icon: <FaLock className="text-red-400 text-4xl" />
    }
  ]


  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">

      <div className="max-w-7xl mx-auto px-6 py-24">


        {/* Heading */}
        <div className="text-center mb-20">

          <h1 className="text-5xl font-black mb-6">

            Platform Features

          </h1>

          <p className="text-slate-400 max-w-2xl mx-auto text-lg">

            Explore scalable and modern features designed
            for secure employee management systems.

          </p>

        </div>


        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {
            features.map((feature, index) => (

              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition shadow-xl backdrop-blur-lg"
              >

                <div className="mb-6">

                  {feature.icon}

                </div>

                <h2 className="text-2xl font-bold mb-4">

                  {feature.title}

                </h2>

                <p className="text-slate-400 leading-relaxed">

                  {feature.description}

                </p>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  )
}

export default FeaturesPage