import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/shared/Navbar'
import Footer from './components/shared/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import LoginPage from './pages/LoginPage'
import CartPage from './pages/CartPage'
import OrderPage from './pages/OrderPage'
import ContactPage from './pages/ContactPage'
import TeamPage from './pages/TeamPage'
import ProductPage from './pages/ProductPage'
import BlogPage from './pages/BlogPage'
import ProjectsPage from './pages/ProjectsPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

const STANDALONE: string[] = []

export default function App() {
  const { pathname } = useLocation()
  const isStandalone = STANDALONE.includes(pathname)

  return (
    <div className="overflow-x-hidden">
      <ScrollToTop />
      {!isStandalone && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
      {!isStandalone && <Footer />}
    </div>
  )
}
