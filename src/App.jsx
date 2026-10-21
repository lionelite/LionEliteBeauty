import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BrandManifesto from './components/BrandManifesto'
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
import ApplyPage from './pages/ApplyPage'
import SkincarePolicies from './pages/SkincarePolicies'
import ProgramsPolicies from './pages/ProgramsPolicies'
import SkincareTerms from './pages/SkincareTerms'
import ProgramsTerms from './pages/ProgramsTerms'
import ProgramCheckoutPage from './pages/ProgramCheckoutPage'
import AdminPage from './pages/AdminPage'
import AdminOperationsPage from './pages/AdminOperationsPage'
import VIPPage from './pages/VIPPage'
import RepPortalPage from './pages/RepPortalPage'
import OrdersPage from './pages/OrdersPage'
import PeptideCheckInPage from './pages/PeptideCheckInPage'
import SiteEnhancements from './components/SiteEnhancements'
import SEO from './components/SEO'

function SerumRedirect() {
  useEffect(() => { window.location.replace('https://lionelitewellness.com/skincare/ghk-cu-serum') }, [])
  return <p>GHK-Cu serum is now available at <a href="https://lionelitewellness.com/skincare/ghk-cu-serum">Lion Elite Wellness</a>.</p>
}

function HomePage() {
  return (
    <>
      <SEO title="Private Optimization Coaching" description="Personalized coaching for physique, performance and long-term progress. Explore our coaching options and apply for a program." />
      <div style={{ backgroundColor: '#FAF8F4' }}>
        <Navbar />
        <Hero />
        <BrandManifesto />
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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/programs/optimization" element={<OptimizationPage />} />
          <Route path="/programs/muscle" element={<MusclePage />} />
          <Route path="/programs/neuro" element={<NeuroPage />} />
          <Route path="/programs/fertility" element={<FertilityPage />} />
          <Route path="/programs/hair" element={<HairPage />} />
          <Route path="/programs/weight" element={<WeightPage />} />
          <Route path="/programs/longevity" element={<LongevityPage />} />
          <Route path="/skincare" element={<Navigate to="/programs/optimization" replace />}  />
          <Route path="/skincare/ghk-cu-serum" element={<SerumRedirect />} />
          <Route path="/skincare/rejuvenate-serum" element={<SerumRedirect />} />
          <Route path="/skincare/:slug" element={<Navigate to="/programs/optimization" replace />}  />
          <Route path="/start-here" element={<Navigate to="/programs/optimization" replace />}  />
          <Route path="/ingredients" element={<Navigate to="/programs/optimization" replace />}  />
          <Route path="/ingredients/:slug" element={<Navigate to="/programs/optimization" replace />}  />
          <Route path="/skin-system" element={<Navigate to="/programs/optimization" replace />}  />
          <Route path="/apply" element={<ApplyPage />} />
          <Route path="/client-check-in" element={<PeptideCheckInPage />} />
          <Route path="/cart" element={<Navigate to="/programs/optimization" replace />}  />
          <Route path="/checkout" element={<Navigate to="/programs/optimization" replace />}  />
          <Route path="/policies/skincare" element={<SkincarePolicies />} />
          <Route path="/policies/programs" element={<ProgramsPolicies />} />
          <Route path="/terms/skincare" element={<SkincareTerms />} />
          <Route path="/terms/programs" element={<ProgramsTerms />} />
          <Route path="/programs/checkout" element={<ProgramCheckoutPage />} />
          <Route path="/admin" element={<AdminOperationsPage />} />
          <Route path="/admin/orders" element={<OrdersPage />} />
          <Route path="/admin/affiliates" element={<RepPortalPage />} />
          <Route path="/admin/clients" element={<AdminPage />} />
          <Route path="/vip" element={<VIPPage />} />
          <Route path="/rep" element={<RepPortalPage />} />
          <Route path="/rep/login" element={<RepPortalPage />} />
          <Route path="/rep/orders" element={<OrdersPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}
