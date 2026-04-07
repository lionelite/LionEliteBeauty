import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Products from './components/Products'
import BeforeAfter from './components/BeforeAfter'
import WhyLionElite from './components/WhyLionElite'
import Testimonials from './components/Testimonials'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAF8' }}>
      <Navbar />
      <Hero />
      <Products />
      <Services />
      <BeforeAfter />
      <WhyLionElite />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  )
}
