import { Outlet } from 'react-router-dom'
import { Navbar } from './component/Navbar'
import Footer from './component/Footer'

function App() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto min-h-162.5">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default App
