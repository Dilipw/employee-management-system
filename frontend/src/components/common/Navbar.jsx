function Navbar() {

  return (

    <nav className="bg-black text-white shadow-md">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <h1 className="text-2xl font-bold">
          Employee Management
        </h1>

        <button
          className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition"
        >
          Logout
        </button>

      </div>

    </nav>
  )
}

export default Navbar