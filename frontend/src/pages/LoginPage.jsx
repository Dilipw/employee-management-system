import {
    useState
} from "react"

import {
    useNavigate
} from "react-router-dom"

import {
    FaEnvelope,
    FaLock,
    FaShieldAlt
} from "react-icons/fa"

import {
    useAuth
} from "../context/AuthContext"

import {
    loginEmployee
} from "../services/employeeService"


function LoginPage() {

    const navigate = useNavigate()

    const { login } = useAuth()

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState("")


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            setLoading(true)

            setError("")

            const formBody =
                new URLSearchParams()

            formBody.append(
                "username",
                formData.username
            )

            formBody.append(
                "password",
                formData.password
            )

            const response =
                await loginEmployee(formBody)

            await login(response.access_token)

            navigate("/dashboard")
        } catch (error) {

            setError(
                error.response?.data?.detail
                || "Login failed"
            )

        } finally {

            setLoading(false)
        }
    }


    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-6">

            <div className="absolute inset-0 bg-cyan-500 blur-[180px] opacity-10"></div>


            <div className="relative w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl">

                {/* Header */}
                <div className="text-center mb-10">

                    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-xl mb-6">

                        <FaShieldAlt className="text-white text-3xl" />

                    </div>

                    <h1 className="text-4xl font-black text-white mb-3">

                        Welcome Back

                    </h1>

                    <p className="text-slate-400">

                        Sign in to access your dashboard

                    </p>

                </div>


                {/* Error */}
                {
                    error && (

                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl mb-6">

                            {error}

                        </div>
                    )
                }


                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* Email */}
                    <div>

                        <label className="text-slate-300 text-sm block mb-3">

                            Email Address

                        </label>

                        <div className="relative">

                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                            <input
                                type="email"
                                name="username"
                                placeholder="Enter your email"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />

                        </div>

                    </div>


                    {/* Password */}
                    <div>

                        <label className="text-slate-300 text-sm block mb-3">

                            Password

                        </label>

                        <div className="relative">

                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />

                        </div>

                    </div>


                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-2xl font-semibold hover:scale-[1.02] transition shadow-xl"
                    >

                        {
                            loading
                                ? "Authenticating..."
                                : "Sign In"
                        }

                    </button>

                </form>

            </div>

        </div>
    )
}

export default LoginPage