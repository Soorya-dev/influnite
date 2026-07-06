// LandingPage.tsx — Fixed version
//
// Layering order (bottom → top):
//   z-0  : ShapeGrid canvas  (fixed, full-screen)
//   z-10 : Overlay gradients (pointer-events-none)
//   z-20 : Page content      (pointer-events-none on wrapper → re-enabled per-section)
//
// WHY pointer-events-none on the content wrapper?
//   The canvas now listens at the window level, so no interaction is lost.
//   Interactive children (Navbar, buttons, links) re-enable pointer events via
//   the [&_a],[&_button] selector below — or you can add `pointer-events-auto`
//   directly to those components.

import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import ShapeGrid from "../../../components/ui/ShapeGrid";

export const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f] overflow-hidden">
      {/* ── Layer 0: Animated canvas background ─────────────────────────── */}
      {/* fixed + inset-0 so it truly fills the viewport at all scroll depths */}
      <div className="fixed inset-0 z-0">
        <ShapeGrid
          direction="left"
          speed={0.22} // slower = premium feel
          borderColor="rgba(255,255,255,0.08)"
          // subtle indigo tint (instead of plain white)

          squareSize={34} // slightly bigger = less noisy
          hoverFillColor="rgba(255,255,255,0.25)"
          // richer glow instead of dull white

          shape="hexagon"
          hoverTrailAmount={6}
          // smoother trailing effect

          vignetteColor="transparent"
        />
      </div>

      {/* ── Layer 10a: Radial center glow — keeps center readable ────────── */}
      {/* pointer-events-none so the canvas still gets window mouse events   */}
      <div
        className="fixed inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(80,40,160,0.18) 0%, transparent 70%)",
        }}
      />

      {/* ── Layer 10b: Edge vignette — depth without killing the grid ──────── */}
      <div
        className="fixed inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(5,3,15,0.75) 100%)",
        }}
      />

      {/* ── Layer 10c: Top & bottom fades so text sections feel grounded ──── */}
      <div
        className="fixed inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,15,0.6) 0%, transparent 18%, transparent 80%, rgba(10,10,15,0.8) 100%)",
        }}
      />

      {/* ── Layer 20: Page content ─────────────────────────────────────────── */}
      {/*                                                                       */}
      {/* pointer-events-none on the WRAPPER means the canvas keeps receiving  */}
      {/* window-level mouse events even over the content area.                */}
      {/*                                                                       */}
      {/* Re-enable pointer events on the sections that need clicks:           */}
      {/*   Option A (below): add pointer-events-auto to each section/component */}
      {/*   Option B: add `pointer-events-auto` class inside your components   */}
      <div className="relative z-20 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 text-white">
          {/* Each section gets pointer-events-auto so links/buttons still work */}
          <div className="pointer-events-auto">
            <Navbar />
          </div>

          <div className="pointer-events-auto">
            <Hero />
          </div>

          <div className="pointer-events-auto">
            <Features />
          </div>

          <div className="pointer-events-auto">
            <CTA />
          </div>

          <div className="pointer-events-auto">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};
