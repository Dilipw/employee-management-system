import {
    useState
} from "react"

import MainLayout from "../layouts/MainLayout"

import {
    useAuth
} from "../context/AuthContext"

import {
    updateMyProfile,
    changePassword
} from "../services/employeeService"


function ProfilePage() {

    const {
        user
    } = useAuth()


    // Profile State
    const [profileData, setProfileData] =
        useState({
            full_name: user?.full_name || "",
            email: user?.email || "",
            phone: user?.phone || "",
            department: user?.department || "",
            designation: user?.designation || ""
        })


    // Password State
    const [passwordData, setPasswordData] =
        useState({
            current_password: "",
            new_password: "",
            confirm_password: ""
        })


    // Validation Errors
    const [validationErrors, setValidationErrors] =
        useState({})


    // Loading States
    const [loading, setLoading] =
        useState(false)

    const [passwordLoading, setPasswordLoading] =
        useState(false)


    // Popup Messages
    const [successMessage, setSuccessMessage] =
        useState("")

    const [error, setError] =
        useState("")


    // ==========================================
    // Update Profile
    // ==========================================
    const handleProfileUpdate =
        async (e) => {

            e.preventDefault()

            const errors = {}

            // Full Name Validation
            if (
                !profileData.full_name.trim()
            ) {

                errors.full_name =
                    "Full name is required"
            }
            // Email Validation
            if (
                !profileData.email.trim()
            ) {

                errors.email =
                    "Email is required"

            } else if (
                !/\S+@\S+\.\S+/.test(
                    profileData.email
                )
            ) {

                errors.email =
                    "Invalid email address"
            }
            // Phone Validation
            if (
                !profileData.phone.trim()
            ) {

                errors.phone =
                    "Phone number is required"

            } else if (
                profileData.phone.length !== 10
            ) {

                errors.phone =
                    "Phone number must be 10 digits"
            }

            // Department Validation
            if (
                !profileData.department.trim()
            ) {

                errors.department =
                    "Department is required"
            }

            // Designation Validation
            if (
                !profileData.designation.trim()
            ) {

                errors.designation =
                    "Designation is required"
            }

            // Stop if validation fails
            if (
                Object.keys(errors).length > 0
            ) {

                setValidationErrors(errors)

                return
            }

            setValidationErrors({})

            try {

                setLoading(true)

                setError("")

                await updateMyProfile(
                    profileData
                )

                setSuccessMessage(
                    "Profile updated successfully"
                )

                setTimeout(() => {

                    setSuccessMessage("")

                }, 3000)

            } catch (error) {

                const apiError =
                    error.response?.data?.detail

                if (
                    Array.isArray(apiError)
                ) {

                    setError(
                        apiError[0]?.msg
                    )

                } else {

                    setError(
                        apiError
                        || "Profile update failed"
                    )
                }

                setTimeout(() => {

                    setError("")

                }, 3000)

            } finally {

                setLoading(false)
            }
        }


    // ==========================================
    // Change Password
    // ==========================================
    const handlePasswordChange =
        async (e) => {

            e.preventDefault()

            // Password Match Validation
            if (
                passwordData.new_password !==
                passwordData.confirm_password
            ) {

                setError(
                    "New password and confirm password do not match"
                )

                setTimeout(() => {

                    setError("")

                }, 3000)

                return
            }

            // Password Length
            if (
                passwordData.new_password.length < 6
            ) {

                setError(
                    "Password must be at least 6 characters"
                )

                setTimeout(() => {

                    setError("")

                }, 3000)

                return
            }

            try {

                setPasswordLoading(true)

                setError("")

                await changePassword({
                    current_password:
                        passwordData.current_password,

                    new_password:
                        passwordData.new_password
                })

                setSuccessMessage(
                    "Password changed successfully"
                )

                setPasswordData({
                    current_password: "",
                    new_password: "",
                    confirm_password: ""
                })

                setTimeout(() => {

                    setSuccessMessage("")

                }, 3000)

            } catch (error) {

                const apiError =
                    error.response?.data?.detail

                if (
                    Array.isArray(apiError)
                ) {

                    setError(
                        apiError[0]?.msg
                    )

                } else {

                    setError(
                        apiError
                        || "Password update failed"
                    )
                }

                setTimeout(() => {

                    setError("")

                }, 3000)

            } finally {

                setPasswordLoading(false)
            }
        }


    return (

        <MainLayout>

            <div className="space-y-10">


                {/* Success Popup */}
                {
                    successMessage && (

                        <div className="fixed top-6 right-6 z-50">

                            <div className="bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl min-w-[320px]">

                                <div className="flex items-center gap-3">

                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">

                                        ✓

                                    </div>

                                    <div>

                                        <h3 className="font-bold text-lg">

                                            Success

                                        </h3>

                                        <p className="text-sm text-green-50">

                                            {successMessage}

                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>
                    )
                }


                {/* Error Popup */}
                {
                    error && (

                        <div className="fixed top-6 right-6 z-50">

                            <div className="bg-red-500 text-white px-6 py-4 rounded-2xl shadow-2xl min-w-[320px]">

                                <div className="flex items-center gap-3">

                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">

                                        !

                                    </div>

                                    <div>

                                        <h3 className="font-bold text-lg">

                                            Error

                                        </h3>

                                        <p className="text-sm text-red-50">

                                            {error}

                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>
                    )
                }


                {/* Header */}
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-10 shadow-2xl text-white">

                    <h1 className="text-5xl font-black mb-4">

                        My Profile

                    </h1>

                    <p className="text-cyan-100 text-lg">

                        Manage your account information and security settings

                    </p>

                </div>


                <div className="grid lg:grid-cols-2 gap-8">


                    {/* Profile Card */}
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">

                        <div className="mb-8">

                            <h2 className="text-3xl font-bold text-slate-800 mb-2">

                                Update Profile

                            </h2>

                            <p className="text-slate-500">

                                Update your personal information

                            </p>

                        </div>


                        <form
                            onSubmit={handleProfileUpdate}
                            className="space-y-5"
                        >


                            {/* Full Name */}
                            <div>

                                <label className="block text-sm font-semibold text-slate-600 mb-2">

                                    Full Name

                                </label>

                                <input
                                    type="text"
                                    value={profileData.full_name}
                                    onChange={(e) =>
                                        setProfileData({
                                            ...profileData,
                                            full_name: e.target.value
                                        })
                                    }
                                    className="w-full border border-slate-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                />

                                {
                                    validationErrors.full_name && (

                                        <p className="text-red-500 text-sm mt-2">

                                            {validationErrors.full_name}

                                        </p>
                                    )
                                }

                            </div>
                            {/* Email */}
                            <div>

                                <label className="block text-sm font-semibold text-slate-600 mb-2">

                                    Email Address

                                </label>

                                <input
                                    type="email"
                                    value={profileData.email}
                                    onChange={(e) =>
                                        setProfileData({
                                            ...profileData,
                                            email: e.target.value
                                        })
                                    }
                                    className="w-full border border-slate-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                />

                                {
                                    validationErrors.email && (

                                        <p className="text-red-500 text-sm mt-2">

                                            {validationErrors.email}

                                        </p>
                                    )
                                }

                            </div>

                            {/* Phone */}
                            <div>

                                <label className="block text-sm font-semibold text-slate-600 mb-2">

                                    Phone Number

                                </label>

                                <input
                                    type="text"
                                    value={profileData.phone}
                                    onChange={(e) =>
                                        setProfileData({
                                            ...profileData,
                                            phone: e.target.value
                                        })
                                    }
                                    className="w-full border border-slate-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                />

                                {
                                    validationErrors.phone && (

                                        <p className="text-red-500 text-sm mt-2">

                                            {validationErrors.phone}

                                        </p>
                                    )
                                }

                            </div>


                            {/* Department */}
                            <div>

                                <label className="block text-sm font-semibold text-slate-600 mb-2">

                                    Department

                                </label>

                                <input
                                    type="text"
                                    value={profileData.department}
                                    onChange={(e) =>
                                        setProfileData({
                                            ...profileData,
                                            department: e.target.value
                                        })
                                    }
                                    className="w-full border border-slate-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                />

                                {
                                    validationErrors.department && (

                                        <p className="text-red-500 text-sm mt-2">

                                            {validationErrors.department}

                                        </p>
                                    )
                                }

                            </div>


                            {/* Designation */}
                            <div>

                                <label className="block text-sm font-semibold text-slate-600 mb-2">

                                    Designation

                                </label>

                                <input
                                    type="text"
                                    value={profileData.designation}
                                    onChange={(e) =>
                                        setProfileData({
                                            ...profileData,
                                            designation: e.target.value
                                        })
                                    }
                                    className="w-full border border-slate-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                />

                                {
                                    validationErrors.designation && (

                                        <p className="text-red-500 text-sm mt-2">

                                            {validationErrors.designation}

                                        </p>
                                    )
                                }

                            </div>


                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-2xl font-semibold shadow-lg hover:opacity-90 transition"
                            >

                                {
                                    loading
                                        ? "Updating..."
                                        : "Update Profile"
                                }

                            </button>

                        </form>

                    </div>


                    {/* Password Card */}
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">

                        <div className="mb-8">

                            <h2 className="text-3xl font-bold text-slate-800 mb-2">

                                Change Password

                            </h2>

                            <p className="text-slate-500">

                                Keep your account secure

                            </p>

                        </div>


                        <form
                            onSubmit={handlePasswordChange}
                            className="space-y-5"
                        >

                            <input
                                type="password"
                                placeholder="Current Password"
                                value={passwordData.current_password}
                                onChange={(e) =>
                                    setPasswordData({
                                        ...passwordData,
                                        current_password: e.target.value
                                    })
                                }
                                className="w-full border border-slate-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500"
                            />


                            <input
                                type="password"
                                placeholder="New Password"
                                value={passwordData.new_password}
                                onChange={(e) =>
                                    setPasswordData({
                                        ...passwordData,
                                        new_password: e.target.value
                                    })
                                }
                                className="w-full border border-slate-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500"
                            />


                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={passwordData.confirm_password}
                                onChange={(e) =>
                                    setPasswordData({
                                        ...passwordData,
                                        confirm_password: e.target.value
                                    })
                                }
                                className="w-full border border-slate-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500"
                            />


                            <button
                                type="submit"
                                disabled={passwordLoading}
                                className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-4 rounded-2xl font-semibold shadow-lg hover:opacity-90 transition"
                            >

                                {
                                    passwordLoading
                                        ? "Updating Password..."
                                        : "Change Password"
                                }

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </MainLayout>
    )
}

export default ProfilePage