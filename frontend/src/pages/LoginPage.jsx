function LoginPage() {

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold text-center mb-6">

          Login

        </h1>

        <form className="space-y-4">

          <input
            type="email"
            placeholder="Enter email"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Enter password"
            className="w-full border p-3 rounded-lg"
          />

          <button
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  )
}

export default LoginPage