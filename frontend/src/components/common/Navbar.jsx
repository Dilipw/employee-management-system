import {
  useState
} from "react"

import {
  NavLink,
  useNavigate
} from "react-router-dom"

import {
  FaBars,
  FaTimes,
  FaUsers
} from "react-icons/fa"

import {
  useAuth
} from "../../context/AuthContext"


function Navbar() {

  const navigate = useNavigate()

  const {
    logout,
    isAuthenticated
  } = useAuth()

  const [menuOpen, setMenuOpen] = useState(false)


  const handleLogout = () => {

    logout()

    navigate("/")
  }


  const navLinkClass = ({ isActive }) =>

    isActive
      ? "text-cyan-400 font-semibold"
      : "text-gray-300 hover:text-white transition"


  return (

    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-black/70 border-b border-white/10 shadow-xl">

      <div className="max-w-7xl mx-auto px-6 py-4">

        <div className="flex items-center justify-between">


          {/* Logo */}
          <div className="flex items-center gap-3">

            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-3 rounded-xl shadow-lg">

              <FaUsers className="text-white text-xl" />

            </div>

            <div>

              <h1 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                EmployeeHub

              </h1>

              <p className="text-xs text-gray-400">

                Smart Employee Management

              </p>

            </div>

          </div>


          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">

            {
              isAuthenticated ? (

                <>
                  <NavLink
                    to="/dashboard"
                    className={navLinkClass}
                  >
                    Dashboard
                  </NavLink>

                  <NavLink
                    to="/employees"
                    className={navLinkClass}
                  >
                    Employees
                  </NavLink>

                  <NavLink
                    to="/profile"
                    className={navLinkClass}
                  >
                    Profile
                  </NavLink>

                  <button
                    onClick={handleLogout}
                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded-xl hover:scale-105 transition shadow-lg"
                  >
                    Logout
                  </button>
                </>

              ) : (

                <>
                  <NavLink
                    to="/"
                    className={navLinkClass}
                  >
                    Home
                  </NavLink>

                  <NavLink
                    to="/features"
                    className={navLinkClass}
                  >
                    Features
                  </NavLink>

                  <NavLink
                    to="/about"
                    className={navLinkClass}
                  >
                    About
                  </NavLink>

                  <NavLink
                    to="/login"
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2 rounded-xl hover:scale-105 transition shadow-lg"
                  >
                    Login
                  </NavLink>
                </>
              )
            }

          </div>


          {/* Mobile Menu Button */}
          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="md:hidden text-white text-2xl"
          >

            {
              menuOpen
                ? <FaTimes />
                : <FaBars />
            }

          </button>

        </div>


        {/* Mobile Menu */}
        {
          menuOpen && (

            <div className="md:hidden mt-6 flex flex-col gap-4 bg-black/80 backdrop-blur-lg p-5 rounded-2xl border border-white/10">

              {
                isAuthenticated ? (

                  <>
                    <NavLink
                      to="/dashboard"
                      className={navLinkClass}
                    >
                      Dashboard
                    </NavLink>

                    <NavLink
                      to="/employees"
                      className={navLinkClass}
                    >
                      Employees
                    </NavLink>

                    <NavLink
                      to="/profile"
                      className={navLinkClass}
                    >
                      Profile
                    </NavLink>

                    <button
                      onClick={handleLogout}
                      className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-xl"
                    >
                      Logout
                    </button>
                  </>

                ) : (

                  <>
                    <NavLink
                      to="/"
                      className={navLinkClass}
                    >
                      Home
                    </NavLink>

                    <NavLink
                      to="/features"
                      className={navLinkClass}
                    >
                      Features
                    </NavLink>

                    <NavLink
                      to="/about"
                      className={navLinkClass}
                    >
                      About
                    </NavLink>

                    <NavLink
                      to="/login"
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl text-center"
                    >
                      Login
                    </NavLink>
                  </>
                )
              }

            </div>
          )
        }

      </div>

    </nav>
  )
}

export default Navbar