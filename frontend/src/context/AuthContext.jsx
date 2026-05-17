import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react"

import {
    getLoggedInEmployee
} from "../services/employeeService"


const AuthContext = createContext(null)


function AuthProvider({ children }) {

    const [token, setToken] = useState(null)

    const [user, setUser] = useState(null)

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const [loading, setLoading] = useState(true)


    // Initialize Authentication
    useEffect(() => {

        const initializeAuth = async () => {

            const storedToken =
                localStorage.getItem("token")

            // No token found
            if (!storedToken) {

                setLoading(false)

                return
            }

            try {

                // Restore token
                setToken(storedToken)

                // Fetch logged in user
                const userData =
                    await getLoggedInEmployee()

                // Store user data
                setUser(userData)

                // Mark authenticated
                setIsAuthenticated(true)

            } catch (error) {

                // Invalid token cleanup
                localStorage.removeItem("token")

                setToken(null)

                setUser(null)

                setIsAuthenticated(false)

            } finally {

                setLoading(false)
            }
        }

        initializeAuth()

    }, [])


    // Login Function
    const login = async (newToken) => {

        // Store token
        localStorage.setItem(
            "token",
            newToken
        )

        setToken(newToken)

        try {

            // Fetch logged in employee
            const userData =
                await getLoggedInEmployee()

            // Save user
            setUser(userData)

            // Update auth state
            setIsAuthenticated(true)

        } catch (error) {

            // Logout if token invalid
            logout()
        }
    }


    // Logout Function
    const logout = () => {

        localStorage.removeItem("token")

        setToken(null)

        setUser(null)

        setIsAuthenticated(false)
    }


    // Shared Context Value
    const value = useMemo(() => ({
        token,
        user,
        isAuthenticated,
        loading,
        login,
        logout
    }), [
        token,
        user,
        isAuthenticated,
        loading
    ])


    return (

        <AuthContext.Provider value={value}>

            {children}

        </AuthContext.Provider>
    )
}


// Custom Hook
function useAuth() {

    const context = useContext(AuthContext)

    if (!context) {

        throw new Error(
            "useAuth must be used inside AuthProvider"
        )
    }

    return context
}


export {
    AuthProvider,
    useAuth
}