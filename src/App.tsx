import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from "./components/theme-provider"
import { HelmetProvider } from 'react-helmet-async'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import Home from './pages/Home'
import './index.css'
import { useGlobalState } from './hooks/context/global/useGlobalState'
import { getVehicles } from '@/hooks/getVehicles'
import { getBrands } from './hooks/getBrands'
import { getCategories } from './hooks/getCategories'
import Dealers from './pages/Dealers'
import Catalog from './pages/Catalog'
import Financing from './pages/Financing'

function App() {
  const { vehicles, setVehicles, brands, setBrands, categories, setCategories } = useGlobalState()

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
          <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sucursales" element={<Dealers />} />
                <Route path="/catalogo" element={<Catalog />} />
                <Route path="/financiamiento" element={<Financing />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App

