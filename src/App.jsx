import { useState } from 'react'
import { Home } from './pages/Home'
import {Layout} from './Layout'
import { Catalog } from './pages/Catalog'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Navigation } from './Navigation'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Catalog />} />
      </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
