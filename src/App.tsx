import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from "./components/theme-provider"
import { HelmetProvider } from 'react-helmet-async'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import Home from './pages/Home'
import './index.css'
import { getVehicles } from '@/hooks/getVehicles'
import { getBrands } from './hooks/getBrands'
import { getCategories } from './hooks/getCategories'
import Dealers from './pages/Dealers'
import Catalog from './pages/Catalog'
import Financing from './pages/Financing'
import AboutPage from './pages/About'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Warranty from './pages/Warranty'
import Returns from './pages/Returns'
import { useAuthState } from './context/useAuthState'
import { FIREBASE_AUTH } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { AdminTopBar } from './components/Admin/AdminTopBar'
import { LoginDialog } from './components/Auth/LoginDialog'
import { useGlobalState } from './hooks/context/global/useGlobalState'

function App() {
  const { vehicles, setVehicles, brands, setBrands, categories, setCategories } = useGlobalState()
  const { setUser, setLoading } = useAuthState()

  // Handle authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setLoading(true)
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [setUser, setLoading])

  useEffect(() => {
    const fetchData = async () => {
      if (!vehicles || vehicles.length === 0) {
        const vehiclesData = await getVehicles()
        setVehicles(vehiclesData)
      }

      if (!brands || brands.length === 0) {
        const brandsData = await getBrands()
        setBrands(brandsData)
      }

      if (!categories || categories.length === 0) {
        const categoriesData = await getCategories()
        setCategories(categoriesData)
      }
    }
    fetchData()
  }, [vehicles, brands, categories, setVehicles, setBrands, setCategories])

  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Router>
          <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
            <AdminTopBar />
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sucursales" element={<Dealers />} />
                <Route path="/catalogo" element={<Catalog />} />
                <Route path="/financiamiento" element={<Financing />} />
                <Route path="/nosotros" element={<AboutPage />} />
                <Route path="/privacidad" element={<Privacy />} />
                <Route path="/terminos" element={<Terms />} />
                <Route path="/garantia" element={<Warranty />} />
                <Route path="/devoluciones" element={<Returns />} />
              </Routes>
            </main>
            <Footer />
            <LoginDialog />
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App

