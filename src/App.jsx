import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SkincareLine from './components/SkincareLine'
import NeuroProgram from './components/NeuroProgram'
import FertilityProgram from './components/FertilityProgram'
import HairProgram from './components/HairProgram'
import MuscleProgram from './components/MuscleProgram'
import LongevityProgram from './components/LongevityProgram'
import WeightProgram from './components/WeightProgram'
import Testimonials from './components/Testimonials'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import OptimizationPage from './pages/OptimizationPage'
import NeuroPage from './pages/NeuroPage'
import FertilityPage from './pages/FertilityPage'
import HairPage from './pages/HairPage'
import WeightPage from './pages/WeightPage'
import LongevityPage from './pages/LongevityPage'

function HomePage() {
  return (
    <div style={{ backgroundColor: '#0D0D0D' }}>
      <Navbar />
      <Hero />
      <MuscleProgram />
      <SkincareLine />
      <NeuroProgram />
      <FertilityProgram />
      <HairProgram />
      <WeightProgram />
      <LongevityProgram />
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
        <Route path="/programs/weight" element={<WeightPage />} />
        <Route path="/programs/longevity" element={<LongevityPage />} />
      </Routes>
    </BrowserRouter>
  )
}
