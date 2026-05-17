import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer"

function MainLayout({ children }) {

  return (

    <div className="min-h-screen flex flex-col bg-gray-100">



      <main className="flex-grow p-6">

        {children}

      </main>

      <Footer />

    </div>
  )
}

export default MainLayout