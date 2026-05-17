import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaBuilding,
  FaBriefcase,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
} from "react-icons/fa"
import api from "../api/axios"

// ─── Register API call ────────────────────────────────────────────────────────
const registerEmployee = async (data) => {
  const response = await api.post("/employees/register", data)
  return response.data
}

// ─── Constants ────────────────────────────────────────────────────────────────
const DEPARTMENTS = ["IT", "HR", "Finance", "Marketing"]

// ─── Validation ───────────────────────────────────────────────────────────────
function validate(data) {
  const errors = {}

  if (!data.full_name.trim()) {
    errors.full_name = "Full name is required"
  } else if (data.full_name.trim().length < 3) {
    errors.full_name = "Full name must be at least 3 characters"
  }

  if (!data.email.trim()) {
    errors.email = "Email is required"
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Enter a valid email address"
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone number is required"
  } else if (!/^\d{10}$/.test(data.phone.trim())) {
    errors.phone = "Phone must be exactly 10 digits"
  }

  if (!data.department) {
    errors.department = "Please select a department"
  }

  if (!data.designation.trim()) {
    errors.designation = "Designation is required"
  }

  if (!data.password) {
    errors.password = "Password is required"
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters"
  }

  if (!data.confirm_password) {
    errors.confirm_password = "Please confirm your password"
  } else if (data.password !== data.confirm_password) {
    errors.confirm_password = "Passwords do not match"
  }

  return errors
}

// ─── Password strength ────────────────────────────────────────────────────────
function getStrength(pwd) {
  if (!pwd) return 0
  if (pwd.length < 6) return 1
  if (pwd.length < 10) return 2
  return 3
}

// ─── Reusable Input Field ─────────────────────────────────────────────────────
function InputField({ label, error, icon: Icon, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-slate-300 text-sm font-medium block">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none z-10" />
        )}
        {children}
      </div>
      {error && <p className="text-red-400 text-xs pl-1">{error}</p>}
    </div>
  )
}

function inputCls(hasError, hasIcon = true, hasPadRight = false) {
  return [
    "w-full bg-white/5 border text-white placeholder-slate-500 py-3.5 rounded-2xl text-sm focus:outline-none focus:ring-2 transition",
    hasIcon ? "pl-11" : "pl-4",
    hasPadRight ? "pr-12" : "pr-4",
    hasError
      ? "border-red-500/50 focus:ring-red-500/40"
      : "border-white/10 focus:ring-cyan-500/60 focus:border-cyan-500/40",
  ].join(" ")
}

// ─── RegisterPage ─────────────────────────────────────────────────────────────
function RegisterPage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    password: "",
    confirm_password: "",
  })

  const [fieldErrors, setFieldErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const set = (key) => (e) => {
    const value = e.target.value
    setFormData((prev) => ({ ...prev, [key]: value }))
    if (fieldErrors[key]) {
      setFieldErrors((prev) => ({ ...prev, [key]: "" }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = validate(formData)
    if (Object.keys(errors).length) {
      setFieldErrors(errors)
      return
    }
    setFieldErrors({})
    setError("")

    try {
      setLoading(true)
      const { confirm_password, ...payload } = formData
      await registerEmployee(payload)
      setSuccess(true)
      setTimeout(() => navigate("/login"), 2500)
    } catch (err) {
      const detail = err.response?.data?.detail
      setError(
        Array.isArray(detail)
          ? detail[0]?.msg
          : detail || "Registration failed. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  const strength = getStrength(formData.password)
  const strengthLabel = ["", "Weak", "Fair", "Strong"][strength]
  const strengthColor = ["", "bg-red-400", "bg-amber-400", "bg-emerald-500"][strength]
  const strengthText = ["", "text-red-400", "text-amber-400", "text-emerald-400"][strength]

  // ── Success screen ──────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500 rounded-full blur-[200px] opacity-10" />
        </div>
        <div className="relative text-center space-y-5">
          <div className="w-24 h-24 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
            <span className="text-5xl">✓</span>
          </div>
          <h2 className="text-3xl font-black text-white">Account Created!</h2>
          <p className="text-slate-400 text-sm">Redirecting you to login…</p>
          <div className="w-48 h-1 bg-white/10 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full animate-[progress_2.5s_linear_forwards]" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4 sm:px-6 py-10">

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500 rounded-full blur-[200px] opacity-[0.07]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600 rounded-full blur-[160px] opacity-[0.06]" />
      </div>

      <div className="relative w-full max-w-2xl">

        {/* Card */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden">

          {/* Top accent bar */}
          <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600" />

          <div className="p-7 sm:p-10">

            {/* Header */}
            <div className="text-center mb-8">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto shadow-xl mb-5">
                <FaUserPlus className="text-white text-2xl sm:text-3xl" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
                Create Account
              </h1>
              <p className="text-slate-400 text-sm sm:text-base">
                Register as a new employee
              </p>
            </div>

            {/* Global Error */}
            {error && (
              <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/25 text-red-400 px-4 py-3 rounded-2xl mb-6 text-sm">
                <span className="text-base mt-0.5 flex-shrink-0">⚠</span>
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>

              {/* ── Personal Info ── */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
                  Personal Information
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* Full Name */}
                  <InputField label="Full Name" error={fieldErrors.full_name} icon={FaUser}>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.full_name}
                      onChange={set("full_name")}
                      autoComplete="name"
                      className={inputCls(!!fieldErrors.full_name)}
                    />
                  </InputField>

                  {/* Email */}
                  <InputField label="Email Address" error={fieldErrors.email} icon={FaEnvelope}>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={set("email")}
                      autoComplete="email"
                      className={inputCls(!!fieldErrors.email)}
                    />
                  </InputField>

                  {/* Phone */}
                  <InputField label="Phone Number" error={fieldErrors.phone} icon={FaPhone}>
                    <input
                      type="tel"
                      placeholder="10-digit number"
                      value={formData.phone}
                      onChange={set("phone")}
                      maxLength={10}
                      autoComplete="tel"
                      className={inputCls(!!fieldErrors.phone)}
                    />
                  </InputField>

                </div>
              </div>

              {/* ── Work Info ── */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
                  Work Details
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* Department */}
                  <InputField label="Department" error={fieldErrors.department} icon={FaBuilding}>
                    <select
                      value={formData.department}
                      onChange={set("department")}
                      className={[inputCls(!!fieldErrors.department), "appearance-none"].join(" ")}
                    >
                      <option value="" className="bg-slate-900">Select department</option>
                      {DEPARTMENTS.map((d) => (
                        <option key={d} value={d} className="bg-slate-900">{d}</option>
                      ))}
                    </select>
                    {/* chevron */}
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">▾</span>
                  </InputField>

                  {/* Designation */}
                  <InputField label="Designation" error={fieldErrors.designation} icon={FaBriefcase}>
                    <input
                      type="text"
                      placeholder="e.g. Senior Developer"
                      value={formData.designation}
                      onChange={set("designation")}
                      className={inputCls(!!fieldErrors.designation)}
                    />
                  </InputField>

                </div>
              </div>

              {/* ── Security ── */}
              <div className="mb-8">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
                  Security
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* Password */}
                  <div className="space-y-1.5">
                    <label className="text-slate-300 text-sm font-medium block">Password</label>
                    <div className="relative">
                      <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Min. 6 characters"
                        value={formData.password}
                        onChange={set("password")}
                        autoComplete="new-password"
                        className={inputCls(!!fieldErrors.password, true, true)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        tabIndex={-1}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition cursor-pointer"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                      </button>
                    </div>

                    {/* Strength bar */}
                    {formData.password && (
                      <div className="space-y-1 pt-0.5">
                        <div className="flex gap-1">
                          {[1, 2, 3].map((s) => (
                            <div
                              key={s}
                              className={[
                                "h-1 flex-1 rounded-full transition-all duration-300",
                                s <= strength ? strengthColor : "bg-white/10",
                              ].join(" ")}
                            />
                          ))}
                        </div>
                        <p className={`text-xs font-medium ${strengthText}`}>{strengthLabel}</p>
                      </div>
                    )}

                    {fieldErrors.password && (
                      <p className="text-red-400 text-xs pl-1">{fieldErrors.password}</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-1.5">
                    <label className="text-slate-300 text-sm font-medium block">Confirm Password</label>
                    <div className="relative">
                      <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none" />
                      <input
                        type={showConfirm ? "text" : "password"}
                        placeholder="Re-enter password"
                        value={formData.confirm_password}
                        onChange={set("confirm_password")}
                        autoComplete="new-password"
                        className={inputCls(!!fieldErrors.confirm_password, true, true)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((s) => !s)}
                        tabIndex={-1}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition cursor-pointer"
                        aria-label={showConfirm ? "Hide password" : "Show password"}
                      >
                        {showConfirm ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                      </button>
                    </div>

                    {/* Match indicator */}
                    {formData.confirm_password && (
                      <p className={`text-xs pl-1 ${
                        formData.password === formData.confirm_password
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}>
                        {formData.password === formData.confirm_password
                          ? "✓ Passwords match"
                          : "✕ Passwords do not match"}
                      </p>
                    )}

                    {fieldErrors.confirm_password && (
                      <p className="text-red-400 text-xs pl-1">{fieldErrors.confirm_password}</p>
                    )}
                  </div>

                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-2xl font-semibold text-sm hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Creating Account…
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>

              {/* Login link */}
              <p className="text-center text-slate-500 text-sm mt-6">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold transition"
                >
                  Sign In
                </Link>
              </p>

            </form>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-600 text-xs mt-5">
          Protected by end-to-end encryption
        </p>

      </div>
    </div>
  )
}

export default RegisterPage