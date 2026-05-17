import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { FaEnvelope, FaLock, FaShieldAlt, FaEye, FaEyeSlash } from "react-icons/fa"
import { useAuth } from "../context/AuthContext"
import { loginEmployee } from "../services/employeeService"

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState({ username: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear both field error and global error as user types
    setFieldErrors((prev) => ({ ...prev, [name]: "" }))
    setError("")
  }

  const validate = () => {
    const errors = {}
    if (!formData.username.trim()) {
      errors.username = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.username)) {
      errors.username = "Enter a valid email address"
    }
    if (!formData.password) {
      errors.password = "Password is required"
    }
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Always validate client-side first — never hit the API with empty fields
    const errors = validate()
    if (Object.keys(errors).length) {
      setFieldErrors(errors)
      return  // stop here, no API call
    }

    setFieldErrors({})
    setError("")
    setLoading(true)

    try {
      const formBody = new URLSearchParams()
      formBody.append("username", formData.username.trim())
      formBody.append("password", formData.password)

      const response = await loginEmployee(formBody)
      await login(response.access_token)
      navigate("/dashboard", { replace: true })

    } catch (err) {
      const status = err.response?.status
      const detail = err.response?.data?.detail

      // Handle 401 here explicitly so the axios interceptor does NOT
      // redirect to "/" — wrong credentials should stay on this page
      if (status === 401 || status === 403) {
        setError("Invalid email or password. Please try again.")
      } else if (status === 422) {
        setError(
          Array.isArray(detail)
            ? detail[0]?.msg
            : "Validation failed. Please check your inputs."
        )
      } else {
        setError(
          typeof detail === "string"
            ? detail
            : "Something went wrong. Please try again."
        )
      }
    } finally {
      setLoading(false)
    }
  }

  const inputCls = (hasError, padRight = false) =>
    [
      "w-full bg-white/5 border text-white placeholder-slate-500 pl-11 py-3.5 rounded-2xl text-sm focus:outline-none focus:ring-2 transition",
      padRight ? "pr-12" : "pr-4",
      hasError
        ? "border-red-500/50 focus:ring-red-500/40"
        : "border-white/10 focus:ring-cyan-500/60 focus:border-cyan-500/40",
    ].join(" ")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4 sm:px-6">

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500 rounded-full blur-[180px] opacity-10" />
      </div>

      <div className="relative w-full max-w-md">

        {/* Card */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 shadow-2xl">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto shadow-xl mb-5">
              <FaShieldAlt className="text-white text-2xl sm:text-3xl" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-400 text-sm sm:text-base">
              Sign in to access your dashboard
            </p>
          </div>

          {/* Global API Error banner — only for server errors, not field errors */}
          {error && (
            <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/25 text-red-400 px-4 py-3 rounded-2xl mb-6 text-sm">
              <span className="mt-0.5 flex-shrink-0">⚠</span>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-5">

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-slate-300 text-sm font-medium block">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none" />
                <input
                  type="email"
                  name="username"
                  placeholder="you@company.com"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="email"
                  className={inputCls(!!fieldErrors.username)}
                />
              </div>
              {fieldErrors.username && (
                <p className="text-red-400 text-xs pl-1 flex items-center gap-1">
                  <span>⚠</span> {fieldErrors.username}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-slate-300 text-sm font-medium block">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  className={inputCls(!!fieldErrors.password, true)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  tabIndex={-1}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword
                    ? <FaEyeSlash className="text-sm" />
                    : <FaEye className="text-sm" />
                  }
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-red-400 text-xs pl-1 flex items-center gap-1">
                  <span>⚠</span> {fieldErrors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3.5 rounded-2xl font-semibold text-sm hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 cursor-pointer mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Authenticating…
                </span>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Register link */}
            <p className="text-center text-slate-500 text-sm pt-1">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition"
              >
                Sign Up
              </Link>
            </p>

          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-600 text-xs mt-6">
          Protected by end-to-end encryption
        </p>

      </div>
    </div>
  )
}

export default LoginPage