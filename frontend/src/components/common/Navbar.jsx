import { useState, useEffect, useRef } from "react"
import { NavLink, useNavigate, useLocation } from "react-router-dom"
import { FaBars, FaTimes, FaUsers, FaSignOutAlt } from "react-icons/fa"
import { useAuth } from "../../context/AuthContext"

function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()
    const { logout, isAuthenticated } = useAuth()
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef(null)

    // Close mobile menu on route change
    useEffect(() => {
        setMenuOpen(false)
    }, [location.pathname])

    // Close mobile menu on outside click
    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false)
            }
        }
        if (menuOpen) document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [menuOpen])

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    const linkCls = ({ isActive }) =>
        [
            "text-sm font-medium transition-colors duration-200",
            isActive
                ? "text-cyan-400"
                : "text-slate-400 hover:text-white",
        ].join(" ")

    const mobileLinkCls = ({ isActive }) =>
        [
            "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors",
            isActive
                ? "bg-white/10 text-cyan-400"
                : "text-slate-300 hover:bg-white/5 hover:text-white",
        ].join(" ")

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/[0.08] shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">

                    {/* ── Logo ── */}
                    <NavLink to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-3 flex-shrink-0">
                        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 flex-shrink-0">
                            <FaUsers className="text-white text-sm" />
                        </div>
                        <div className="hidden xs:block">
                            <p className="text-base font-extrabold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent leading-tight">
                                EmployeeHub
                            </p>
                            <p className="text-[10px] text-slate-500 leading-tight -mt-0.5">
                                Smart Employee Management
                            </p>
                        </div>
                    </NavLink>

                    {/* ── Desktop Menu ── */}
                    <div className="hidden md:flex items-center gap-1">
                        {isAuthenticated ? (
                            <>
                                <NavLink to="/dashboard" className={linkCls}>
                                    <span className="px-3 py-2 rounded-lg hover:bg-white/5 block">Dashboard</span>
                                </NavLink>
                                <NavLink to="/employees" className={linkCls}>
                                    <span className="px-3 py-2 rounded-lg hover:bg-white/5 block">Employees</span>
                                </NavLink>
                                <NavLink to="/profile" className={linkCls}>
                                    <span className="px-3 py-2 rounded-lg hover:bg-white/5 block">Profile</span>
                                </NavLink>

                                <div className="w-px h-5 bg-white/10 mx-3" />

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 hover:text-red-300 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer"
                                >
                                    <FaSignOutAlt className="text-xs" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/" end className={linkCls}>
                                    <span className="px-3 py-2 rounded-lg hover:bg-white/5 block">Home</span>
                                </NavLink>
                                <NavLink to="/features" className={linkCls}>
                                    <span className="px-3 py-2 rounded-lg hover:bg-white/5 block">Features</span>
                                </NavLink>
                                <NavLink to="/about" className={linkCls}>
                                    <span className="px-3 py-2 rounded-lg hover:bg-white/5 block">About</span>
                                </NavLink>

                                <div className="w-px h-5 bg-white/10 mx-3" />

                                <NavLink
                                    to="/login"
                                    className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 rounded-xl hover:bg-white/5 transition-all"
                                >
                                    Sign In
                                </NavLink>

                                <NavLink
                                    to="/register"
                                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all ml-1"
                                >
                                    Sign Up
                                </NavLink>
                            </>
                        )}
                    </div>

                    {/* ── Mobile Hamburger ── */}
                    <button
                        onClick={() => setMenuOpen((o) => !o)}
                        className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
                    </button>

                </div>
            </div>

            {/* ── Mobile Menu ── */}
            {menuOpen && (
                <div
                    ref={menuRef}
                    className="md:hidden border-t border-white/[0.08] bg-slate-950/95 backdrop-blur-xl"
                >
                    <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
                        {isAuthenticated ? (
                            <>
                                <NavLink to="/dashboard" className={mobileLinkCls}>Dashboard</NavLink>
                                <NavLink to="/employees" className={mobileLinkCls}>Employees</NavLink>
                                <NavLink to="/profile" className={mobileLinkCls}>Profile</NavLink>

                                <div className="pt-2 pb-1">
                                    <div className="h-px bg-white/[0.06]" />
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition cursor-pointer"
                                >
                                    <FaSignOutAlt className="text-xs" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/" end className={mobileLinkCls}>Home</NavLink>
                                <NavLink to="/features" className={mobileLinkCls}>Features</NavLink>
                                <NavLink to="/about" className={mobileLinkCls}>About</NavLink>

                                <div className="pt-2 pb-1">
                                    <div className="h-px bg-white/[0.06]" />
                                </div>

                                <NavLink to="/login" className={mobileLinkCls}>Sign In</NavLink>

                                <NavLink
                                    to="/register"
                                    className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-90"
                                >
                                    Sign Up
                                </NavLink>
                            </>
                        )}
                    </div>

                    {/* safe area bottom spacing */}
                    <div className="h-2" />
                </div>
            )}
        </nav>
    )
}

export default Navbar