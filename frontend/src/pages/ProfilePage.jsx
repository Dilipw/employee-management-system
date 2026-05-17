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


    const [profileData, setProfileData] =
        useState({
            full_name: user?.full_name || "",
            phone: user?.phone || "",
            department: user?.department || "",
            designation: user?.designation || ""
        })


    const [passwordData, setPasswordData] =
        useState({
            current_password: "",
            new_password: ""
        })


    const [loading, setLoading] =
        useState(false)

    const [passwordLoading, setPasswordLoading] =
        useState(false)

    const [successMessage, setSuccessMessage] =
        useState("")

    const [error, setError] =
        useState("")


    // Update Profile
    const handleProfileUpdate =
        async (e) => {

            e.preventDefault()

            try {

                setLoading(true)

                setError("")

                await updateMyProfile(
                    profileData
                )

                setSuccessMessage(
                    "Profile updated successfully"
                )

            } catch (error) {

                setError(
                    error.response?.data?.detail
                    || "Profile update failed"
                )

            } finally {

                setLoading(false)

                setTimeout(() => {

                    setSuccessMessage("")

                }, 3000)
            }
        }


    // Change Password
    const handlePasswordChange =
        async (e) => {

            e.preventDefault()

            try {

                setPasswordLoading(true)

                setError("")

                await changePassword(
                    passwordData
                )

                setSuccessMessage(
                    "Password changed successfully"
                )

                setPasswordData({
                    current_password: "",
                    new_password: ""
                })

            } catch (error) {

                setError(
                    error.response?.data?.detail
                    || "Password update failed"
                )

            } finally {

                setPasswordLoading(false)

                setTimeout(() => {

                    setSuccessMessage("")

                }, 3000)
            }
        }


    return (

        <MainLayout>

            <div className="space-y-10">


                {/* Success */}
                {
                    successMessage && (

                        <div className="bg-green-100 text-green-600 p-5 rounded-2xl">

                            {successMessage}

                        </div>
                    )
                }


                {/* Error */}
                {
                    error && (

                        <div className="bg-red-100 text-red-600 p-5 rounded-2xl">

                            {error}

                        </div>
                    )
                }


                {/* Header */}
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-10 text-white shadow-2xl">

                    <h1 className="text-5xl font-black mb-4">

                        My Profile

                    </h1>

                    <p className="text-cyan-100 text-lg">

                        Manage your account settings and security

                    </p>

                </div>


                <div className="grid lg:grid-cols-2 gap-8">


                    {/* Update Profile */}
                    <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8">

                        <h2 className="text-3xl font-bold mb-8">

                            Update Profile

                        </h2>


                        <form
                            onSubmit={handleProfileUpdate}
                            className="space-y-5"
                        >

                            <input
                                type="text"
                                placeholder="Full Name"
                                value={profileData.full_name}
                                onChange={(e) =>
                                    setProfileData({
                                        ...profileData,
                                        full_name: e.target.value
                                    })
                                }
                                className="w-full border border-slate-300 p-4 rounded-2xl"
                            />


                            <input
                                type="text"
                                placeholder="Phone Number"
                                value={profileData.phone}
                                onChange={(e) =>
                                    setProfileData({
                                        ...profileData,
                                        phone: e.target.value
                                    })
                                }
                                className="w-full border border-slate-300 p-4 rounded-2xl"
                            />


                            <input
                                type="text"
                                placeholder="Department"
                                value={profileData.department}
                                onChange={(e) =>
                                    setProfileData({
                                        ...profileData,
                                        department: e.target.value
                                    })
                                }
                                className="w-full border border-slate-300 p-4 rounded-2xl"
                            />


                            <input
                                type="text"
                                placeholder="Designation"
                                value={profileData.designation}
                                onChange={(e) =>
                                    setProfileData({
                                        ...profileData,
                                        designation: e.target.value
                                    })
                                }
                                className="w-full border border-slate-300 p-4 rounded-2xl"
                            />


                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-2xl font-semibold shadow-lg"
                            >

                                {
                                    loading
                                        ? "Updating..."
                                        : "Update Profile"
                                }

                            </button>

                        </form>

                    </div>


                    {/* Change Password */}
                    <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8">

                        <h2 className="text-3xl font-bold mb-8">

                            Change Password

                        </h2>


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
                                className="w-full border border-slate-300 p-4 rounded-2xl"
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
                                className="w-full border border-slate-300 p-4 rounded-2xl"
                            />


                            <button
                                type="submit"
                                disabled={passwordLoading}
                                className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-4 rounded-2xl font-semibold shadow-lg"
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