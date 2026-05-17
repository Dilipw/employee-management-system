import { useState, useEffect, useCallback } from "react"
import MainLayout from "../layouts/MainLayout"
import { useAuth } from "../context/AuthContext"
import { updateMyProfile, changePassword } from "../services/employeeService"

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
    useEffect(() => {
        const t = setTimeout(onClose, 3500)
        return () => clearTimeout(t)
    }, [onClose])

    const ok = type === "success"
    return (
        <div className="fixed top-5 right-5 z-[100]">
            <div
                className={[
                    "flex items-start gap-3 px-5 py-4 rounded-2xl shadow-2xl min-w-72 max-w-sm",
                    ok ? "bg-emerald-600 text-white" : "bg-red-600 text-white",
                ].join(" ")}
            >
                <span className="text-xl mt-0.5">{ok ? "✓" : "✕"}</span>
                <div className="flex-1">
                    <p className="font-semibold text-sm">{ok ? "Success" : "Error"}</p>
                    <p className="text-xs opacity-90 mt-0.5">{message}</p>
                </div>
                <button
                    onClick={onClose}
                    className="opacity-70 hover:opacity-100 text-lg leading-none mt-0.5 cursor-pointer"
                >
                    ×
                </button>
            </div>
        </div>
    )
}

// ─── Reusable Field ───────────────────────────────────────────────────────────
function Field({ label, error, required, children }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-600">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {children}
            {error && <p className="text-red-500 text-xs">{error}</p>}
        </div>
    )
}

// ─── Password Field with show/hide toggle ─────────────────────────────────────
function PasswordField({ label, placeholder, value, onChange, error }) {
    const [show, setShow] = useState(false)
    return (
        <Field label={label} error={error} required>
            <div className="relative">
                <input
                    type={show ? "text" : "password"}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition bg-white"
                />
                <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition cursor-pointer text-lg leading-none"
                    tabIndex={-1}
                >
                    {show ? "🙈" : "👁️"}
                </button>
            </div>
        </Field>
    )
}

const INPUT_CLS =
    "w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition bg-white"

const DEPARTMENTS = ["IT", "HR", "Finance", "Marketing"]

// ─── Validation helpers ───────────────────────────────────────────────────────
function validateProfile(data) {
    const errors = {}
    if (!data.full_name?.trim()) errors.full_name = "Full name is required"
    if (!data.email?.trim()) {
        errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = "Invalid email address"
    }
    if (!data.phone?.trim()) {
        errors.phone = "Phone number is required"
    } else if (!/^\d{10}$/.test(data.phone.trim())) {
        errors.phone = "Phone must be exactly 10 digits"
    }
    if (!data.department?.trim()) errors.department = "Department is required"
    if (!data.designation?.trim()) errors.designation = "Designation is required"
    return errors
}

function validatePassword(data) {
    const errors = {}
    if (!data.current_password) errors.current_password = "Current password is required"
    if (!data.new_password) {
        errors.new_password = "New password is required"
    } else if (data.new_password.length < 6) {
        errors.new_password = "Password must be at least 6 characters"
    }
    if (!data.confirm_password) {
        errors.confirm_password = "Please confirm your new password"
    } else if (data.new_password !== data.confirm_password) {
        errors.confirm_password = "Passwords do not match"
    }
    return errors
}

// ─── Avatar initials ──────────────────────────────────────────────────────────
function Avatar({ name }) {
    const initials = name
        ? name.trim().split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase()
        : "?"
    return (
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 flex items-center justify-center text-white text-2xl sm:text-3xl font-black flex-shrink-0 border-2 border-white/30 shadow-inner">
            {initials}
        </div>
    )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
function ProfilePage() {
    const { user } = useAuth()

    const [profileData, setProfileData] = useState({
        full_name: user?.full_name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        department: user?.department || "",
        designation: user?.designation || "",
    })

    const [passwordData, setPasswordData] = useState({
        current_password: "",
        new_password: "",
        confirm_password: "",
    })

    const [profileErrors, setProfileErrors] = useState({})
    const [passwordErrors, setPasswordErrors] = useState({})
    const [profileLoading, setProfileLoading] = useState(false)
    const [passwordLoading, setPasswordLoading] = useState(false)
    const [toast, setToast] = useState(null)

    const showToast = useCallback((message, type = "success") => {
        setToast({ message, type })
    }, [])

    // ── Profile update ──────────────────────────────────────────────────────────
    const handleProfileUpdate = async (e) => {
        e.preventDefault()
        const errors = validateProfile(profileData)
        if (Object.keys(errors).length) { setProfileErrors(errors); return }
        setProfileErrors({})
        try {
            setProfileLoading(true)
            await updateMyProfile(profileData)
            showToast("Profile updated successfully")
        } catch (err) {
            const detail = err.response?.data?.detail
            showToast(
                Array.isArray(detail) ? detail[0]?.msg : detail || "Profile update failed",
                "error"
            )
        } finally {
            setProfileLoading(false)
        }
    }

    // ── Password change ─────────────────────────────────────────────────────────
    const handlePasswordChange = async (e) => {
        e.preventDefault()
        const errors = validatePassword(passwordData)
        if (Object.keys(errors).length) { setPasswordErrors(errors); return }
        setPasswordErrors({})
        try {
            setPasswordLoading(true)
            await changePassword({
                current_password: passwordData.current_password,
                new_password: passwordData.new_password,
            })
            showToast("Password changed successfully")
            setPasswordData({ current_password: "", new_password: "", confirm_password: "" })
        } catch (err) {
            const detail = err.response?.data?.detail
            showToast(
                Array.isArray(detail) ? detail[0]?.msg : detail || "Password update failed",
                "error"
            )
        } finally {
            setPasswordLoading(false)
        }
    }

    const setP = (key) => (e) =>
        setProfileData((prev) => ({ ...prev, [key]: e.target.value }))

    const setPwd = (key) => (e) =>
        setPasswordData((prev) => ({ ...prev, [key]: e.target.value }))

    return (
        <MainLayout>
            {/* Toast */}
            {toast && (
                <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
            )}

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

                {/* ── Hero Header ── */}
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl p-6 sm:p-8 shadow-xl text-white">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                        <Avatar name={profileData.full_name} />
                        <div className="min-w-0">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black truncate">
                                {profileData.full_name || "My Profile"}
                            </h1>
                            <p className="text-cyan-100 text-sm sm:text-base mt-1 truncate">
                                {profileData.designation || "—"}
                                {profileData.department ? ` · ${profileData.department}` : ""}
                            </p>
                            <p className="text-cyan-200 text-xs sm:text-sm mt-0.5 truncate">
                                {profileData.email}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Two Column Cards ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Profile Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-100">
                            <h2 className="text-lg font-bold text-slate-900">Update Profile</h2>
                            <p className="text-sm text-slate-500 mt-0.5">Edit your personal information</p>
                        </div>

                        <form onSubmit={handleProfileUpdate} noValidate className="p-6 space-y-4">
                            <Field label="Full Name" error={profileErrors.full_name} required>
                                <input
                                    type="text"
                                    value={profileData.full_name}
                                    onChange={setP("full_name")}
                                    placeholder="John Doe"
                                    className={INPUT_CLS}
                                />
                            </Field>

                            <Field label="Email Address" error={profileErrors.email} required>
                                <input
                                    type="email"
                                    value={profileData.email}
                                    onChange={setP("email")}
                                    placeholder="john@company.com"
                                    className={INPUT_CLS}
                                />
                            </Field>

                            <Field label="Phone Number" error={profileErrors.phone} required>
                                <input
                                    type="tel"
                                    value={profileData.phone}
                                    onChange={setP("phone")}
                                    placeholder="10-digit number"
                                    maxLength={10}
                                    className={INPUT_CLS}
                                />
                            </Field>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field label="Department" error={profileErrors.department} required>
                                    <select value={profileData.department} onChange={setP("department")} className={INPUT_CLS}>
                                        <option value="">Select</option>
                                        {DEPARTMENTS.map((d) => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>
                                </Field>

                                <Field label="Designation" error={profileErrors.designation} required>
                                    <input
                                        type="text"
                                        value={profileData.designation}
                                        onChange={setP("designation")}
                                        placeholder="e.g. Developer"
                                        className={INPUT_CLS}
                                    />
                                </Field>
                            </div>

                            <button
                                type="submit"
                                disabled={profileLoading}
                                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition disabled:opacity-60 cursor-pointer mt-2"
                            >
                                {profileLoading ? "Saving…" : "Save Changes"}
                            </button>
                        </form>
                    </div>

                    {/* Password Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-100">
                            <h2 className="text-lg font-bold text-slate-900">Change Password</h2>
                            <p className="text-sm text-slate-500 mt-0.5">Keep your account secure</p>
                        </div>

                        <form onSubmit={handlePasswordChange} noValidate className="p-6 space-y-4">

                            {/* Password strength hint */}
                            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700 flex items-start gap-2">
                                <span className="text-base leading-none mt-0.5">🔒</span>
                                <span>Use at least 6 characters with a mix of letters and numbers for a strong password.</span>
                            </div>

                            <PasswordField
                                label="Current Password"
                                placeholder="Enter current password"
                                value={passwordData.current_password}
                                onChange={setPwd("current_password")}
                                error={passwordErrors.current_password}
                            />

                            <PasswordField
                                label="New Password"
                                placeholder="Enter new password"
                                value={passwordData.new_password}
                                onChange={setPwd("new_password")}
                                error={passwordErrors.new_password}
                            />

                            {/* Strength bar */}
                            {passwordData.new_password && (() => {
                                const len = passwordData.new_password.length
                                const strength = len < 6 ? 1 : len < 10 ? 2 : 3
                                const labels = ["", "Weak", "Fair", "Strong"]
                                const colors = ["", "bg-red-400", "bg-amber-400", "bg-emerald-500"]
                                return (
                                    <div className="space-y-1 -mt-1">
                                        <div className="flex gap-1">
                                            {[1, 2, 3].map((s) => (
                                                <div
                                                    key={s}
                                                    className={[
                                                        "h-1.5 flex-1 rounded-full transition-all",
                                                        s <= strength ? colors[strength] : "bg-slate-200",
                                                    ].join(" ")}
                                                />
                                            ))}
                                        </div>
                                        <p className={`text-xs font-medium ${["", "text-red-500", "text-amber-500", "text-emerald-600"][strength]}`}>
                                            {labels[strength]}
                                        </p>
                                    </div>
                                )
                            })()}

                            <PasswordField
                                label="Confirm Password"
                                placeholder="Re-enter new password"
                                value={passwordData.confirm_password}
                                onChange={setPwd("confirm_password")}
                                error={passwordErrors.confirm_password}
                            />

                            <button
                                type="submit"
                                disabled={passwordLoading}
                                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition disabled:opacity-60 cursor-pointer mt-2"
                            >
                                {passwordLoading ? "Updating…" : "Change Password"}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </MainLayout>
    )
}

export default ProfilePage