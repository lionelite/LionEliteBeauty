import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Products from './components/Products'
import BeforeAfter from './components/BeforeAfter'
import SkincareLine from './components/SkincareLine'
import WhyLionElite from './components/WhyLionElite'
import NeuroProgram from './components/NeuroProgram'
import FertilityProgram from './components/FertilityProgram'
import Testimonials from './components/Testimonials'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0D0D0D' }}>
      <Navbar />
      <Hero />
      <Services />
      <Products />
      <BeforeAfter />
      <SkincareLine />
      <WhyLionElite />
      <NeuroProgram />
      <FertilityProgram />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  )
}
