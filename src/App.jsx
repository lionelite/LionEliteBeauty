import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BrandManifesto from './components/BrandManifesto'
import ServicesOverview from './components/ServicesOverview'
import RoutineSection from './components/RoutineSection'
import BeforeAfterResults from './components/BeforeAfterResults'
import SkincareLine from './components/SkincareLine'
import Testimonials from './components/Testimonials'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import OptimizationPage from './pages/OptimizationPage'
import MusclePage from './pages/MusclePage'
import NeuroPage from './pages/NeuroPage'
import FertilityPage from './pages/FertilityPage'
import HairPage from './pages/HairPage'
import WeightPage from './pages/WeightPage'
import LongevityPage from './pages/LongevityPage'
import SkincarePage from './pages/SkincarePage'
import ProductPage from './pages/ProductPage'
import StartHerePage from './pages/StartHerePage'
import SkinSystemPage from './pages/SkinSystemPage'
import ApplyPage from './pages/ApplyPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import SkincarePolicies from './pages/SkincarePolicies'
import ProgramsPolicies from './pages/ProgramsPolicies'
import SkincareTerms from './pages/SkincareTerms'
import ProgramsTerms from './pages/ProgramsTerms'
import ProgramCheckoutPage from './pages/ProgramCheckoutPage'
import AdminPage from './pages/AdminPage'
import VIPPage from './pages/VIPPage'
import RepPortalPage from './pages/RepPortalPage'
import SiteEnhancements from './components/SiteEnhancements'
import ColinDiscountBridge from './components/ColinDiscountBridge'
import SEO from './components/SEO'

function HomePage() {
  return (
    <>
      <SEO title="Premium Peptide Skincare & Wellness" description="Science-backed peptide skincare and personalized wellness programs. Feel good in your own skin with Lion Elite Beauty." />
      <div style={{ backgroundColor: '#0D0D0D' }}>
        <Navbar />
        <Hero />
        <BrandManifesto />
        <RoutineSection />
        <ServicesOverview />
        <BeforeAfterResults />
        <SkincareLine />
        <Testimonials />
        <CTASection />
        <Footer />
      </div>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <SiteEnhancements />
        <ColinDiscountBridge />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/programs/optimization" element={<OptimizationPage />} />
          <Route path="/programs/muscle" element={<MusclePage />} />
          <Route path="/programs/neuro" element={<NeuroPage />} />
          <Route path="/programs/fertility" element={<FertilityPage />} />
          <Route path="/programs/hair" element={<HairPage />} />
          <Route path="/programs/weight" element={<WeightPage />} />
          <Route path="/programs/longevity" element={<LongevityPage />} />
          <Route path="/skincare" element={<SkincarePage />} />
          <Route path="/skincare/:slug" element={<ProductPage />} />
          <Route path="/start-here" element={<StartHerePage />} />
          <Route path="/ingredients" element={<StartHerePage />} />
          <Route path="/skin-system" element={<SkinSystemPage />} />
          <Route path="/apply" element={<ApplyPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/policies/skincare" element={<SkincarePolicies />} />
          <Route path="/policies/programs" element={<ProgramsPolicies />} />
          <Route path="/terms/skincare" element={<SkincareTerms />} />
          <Route path="/terms/programs" element={<ProgramsTerms />} />
          <Route path="/programs/checkout" element={<ProgramCheckoutPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/vip" element={<VIPPage />} />
          <Route path="/rep" element={<RepPortalPage />} />
          <Route path="/rep/login" element={<RepPortalPage />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}
