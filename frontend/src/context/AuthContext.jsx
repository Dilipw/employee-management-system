import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react"

const AuthContext = createContext(null)


function AuthProvider({ children }) {

  const [token, setToken] = useState(null)

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [loading, setLoading] = useState(true)


  useEffect(() => {

    const storedToken = localStorage.getItem("token")

    if (storedToken) {

      setToken(storedToken)

      setIsAuthenticated(true)
    }

    setLoading(false)

  }, [])


  const login = (newToken) => {

    localStorage.setItem(
      "token",
      newToken
    )

    setToken(newToken)

    setIsAuthenticated(true)
  }


  const logout = () => {

    localStorage.removeItem("token")

    setToken(null)

    setIsAuthenticated(false)
  }


  const value = useMemo(() => ({
    token,
    isAuthenticated,
    loading,
    login,
    logout
  }), [
    token,
    isAuthenticated,
    loading
  ])


  return (

    <AuthContext.Provider value={value}>

      {children}

    </AuthContext.Provider>
  )
}


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