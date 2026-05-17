import {
    useState
} from "react"

import {
    useNavigate
} from "react-router-dom"

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


            login(response.access_token)

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

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

                <h1 className="text-3xl font-bold text-center mb-6">

                    Login

                </h1>


                {
                    error && (

                        <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">

                            {error}

                        </div>
                    )
                }


                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="email"
                        name="username"
                        placeholder="Enter email"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
                    >

                        {
                            loading
                                ? "Please wait..."
                                : "Login"
                        }

                    </button>

                </form>

            </div>

        </div>
    )
}

export default LoginPage