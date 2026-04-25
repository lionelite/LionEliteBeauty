import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Products from './components/Products'
import BeforeAfter from './components/BeforeAfter'
import SkincareLine from './components/SkincareLine'
import WhyLionElite from './components/WhyLionElite'
import NeuroProgram from './components/NeuroProgram'
import FertilityProgram from './components/FertilityProgram'
import HairProgram from './components/HairProgram'
import Testimonials from './components/Testimonials'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import OptimizationPage from './pages/OptimizationPage'
import NeuroPage from './pages/NeuroPage'
import FertilityPage from './pages/FertilityPage'
import HairPage from './pages/HairPage'

function HomePage() {
  return (
    <div style={{ backgroundColor: '#0D0D0D' }}>
      <Navbar />
      <Hero />
      <Services />
      <Products />
      <BeforeAfter />
      <SkincareLine />
      <WhyLionElite />
      <NeuroProgram />
      <FertilityProgram />
      <HairProgram />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/programs/optimization" element={<OptimizationPage />} />
        <Route path="/programs/neuro" element={<NeuroPage />} />
        <Route path="/programs/fertility" element={<FertilityPage />} />
        <Route path="/programs/hair" element={<HairPage />} />
      </Routes>
    </BrowserRouter>
  )
}
