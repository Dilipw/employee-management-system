import axios from "axios"

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        "Content-Type": "application/json",
    },
})

// ── Request: attach token ─────────────────────────────────────────────────────
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)


const AUTH_ROUTES = ["/employees/login", "/employees/register"]

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status
        const requestUrl = error.config?.url || ""

        const isAuthRoute = AUTH_ROUTES.some((route) => requestUrl.includes(route))

        // Only auto-logout + redirect on 401 for protected routes, not login/register
        if (status === 401 && !isAuthRoute) {
            localStorage.removeItem("token")
            window.location.href = "/"
        }

        return Promise.reject(error)
    }
)

export default api