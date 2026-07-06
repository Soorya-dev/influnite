// LandingPage.tsx — Full story-driven landing experience
//
// Layering:
//   z-0  : ShapeGrid canvas (fixed, full-screen) — kept for product identity
//   z-10 : Overlay gradients (adjusted: darker, less purple)
//   z-50 : Navbar (fixed, self-managed)
//   z-20 : All page sections (full-bleed, each handles its own max-width)
//
// Section order:
//   Hero → ChaosSection → WorkflowSection → DashboardSection →
//   CreatorSection → TrustSection → FAQSection → FinalCTA → Footer

import React from 'react'
import Navbar          from '../components/Navbar'
import Hero            from '../components/Hero'
import ChaosSection    from '../components/ChaosSection'
import WorkflowSection from '../components/WorkflowSection'
import DashboardSection from '../components/DashboardSection'
import CreatorSection  from '../components/CreatorSection'
import TrustSection    from '../components/TrustSection'
import FAQSection      from '../components/FAQSection'
import FinalCTA        from '../components/FinalCTA'
import Footer          from '../components/Footer'
import ShapeGrid       from '../../../components/ui/ShapeGrid'

export const LandingPage = () => (
  <div style={{ position: 'relative', minHeight: '100vh', background: '#080808', overflowX: 'hidden' }}>

    {/* ── Layer 0: ShapeGrid (fixed, full-screen) ────────────────────── */}
    <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
      <ShapeGrid
        direction="left"
        speed={0.2}
        borderColor="rgba(255,255,255,0.055)"
        squareSize={34}
        hoverFillColor="rgba(255,255,255,0.18)"
        shape="hexagon"
        hoverTrailAmount={5}
        vignetteColor="transparent"
      />
    </div>

    {/* ── Layer 10: Overlays — darker, less purple, more premium ──────── */}
    {/* Radial center glow — subtle, not purple flood */}
    <div style={{
      position:      'fixed',
      inset:         0,
      zIndex:        10,
      pointerEvents: 'none',
      background:    'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(40,15,60,0.12) 0%, transparent 70%)',
    }} />
    {/* Edge vignette — deep black edges */}
    <div style={{
      position:      'fixed',
      inset:         0,
      zIndex:        10,
      pointerEvents: 'none',
      background:    'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, rgba(4,4,4,0.85) 100%)',
    }} />
    {/* Top fade — blends navbar into page */}
    <div style={{
      position:      'fixed',
      inset:         0,
      zIndex:        10,
      pointerEvents: 'none',
      background:    'linear-gradient(to bottom, rgba(8,8,8,0.65) 0%, transparent 12%)',
    }} />

    {/* ── Layer 50: Navbar (fixed) ────────────────────────────────────── */}
    <Navbar />

    {/* ── Layer 20: Page content ──────────────────────────────────────── */}
    <div style={{ position: 'relative', zIndex: 20 }}>

      {/* Hero — untouched, occupies full viewport height */}
      <div style={{ paddingTop: 72 }}>
        <Hero />
      </div>

      {/* Story-driven sections — each handles its own background + max-width */}
      <ChaosSection />
      <WorkflowSection />
      <DashboardSection />
      <CreatorSection />
      <TrustSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </div>
  </div>
)
