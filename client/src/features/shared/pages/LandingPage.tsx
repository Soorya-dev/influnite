// LandingPage.tsx — Unified full-bleed landing experience
//
// Layering order (bottom → top):
//   z-0  : ShapeGrid canvas  (fixed, full-screen)
//   z-10 : Overlay gradients (pointer-events-none)
//   z-20 : Navbar (fixed, handled internally)
//   z-20 : Page content (full-width, each section self-contained)
//
// Every section is full-bleed (no max-w wrapper here).
// Each component manages its own maxWidth: 1280 internally.

import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import ShapeGrid from "../../../components/ui/ShapeGrid";

export const LandingPage = () => {
  return (
    <div
      style={{
        position:        "relative",
        minHeight:       "100vh",
        background:      "#0a0a0f",
        overflowX:       "hidden",
      }}
    >
      {/* ── Layer 0: Animated canvas background (fixed, full-screen) ── */}
      <div style={{ position:"fixed", inset:0, zIndex:0 }}>
        <ShapeGrid
          direction="left"
          speed={0.22}
          borderColor="rgba(255,255,255,0.08)"
          squareSize={34}
          hoverFillColor="rgba(255,255,255,0.25)"
          shape="hexagon"
          hoverTrailAmount={6}
          vignetteColor="transparent"
        />
      </div>

      {/* ── Layer 10a: Radial center glow ──────────────────────────── */}
      <div
        style={{
          position:      "fixed",
          inset:         0,
          zIndex:        10,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(80,40,160,0.18) 0%, transparent 70%)",
        }}
      />

      {/* ── Layer 10b: Edge vignette ────────────────────────────────── */}
      <div
        style={{
          position:      "fixed",
          inset:         0,
          zIndex:        10,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(5,3,15,0.75) 100%)",
        }}
      />

      {/* ── Layer 10c: Top & bottom fades ──────────────────────────── */}
      <div
        style={{
          position:      "fixed",
          inset:         0,
          zIndex:        10,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, rgba(10,10,15,0.6) 0%, transparent 18%, transparent 80%, rgba(10,10,15,0.8) 100%)",
        }}
      />

      {/* ── Layer 50: Fixed Navbar ──────────────────────────────────── */}
      {/* Navbar is fixed internally (position: fixed, z-index: 50)     */}
      <Navbar />

      {/* ── Layer 20: Page content (full-bleed sections) ────────────── */}
      <div style={{ position:"relative", zIndex:20 }}>

        {/* Hero section — has its own max-width centering */}
        <div style={{ paddingTop: 72 /* navbar height offset */ }}>
          <Hero />
        </div>

        {/* Features — full-bleed, handles its own max-width */}
        <Features />

        {/* CTA — full-bleed, handles its own max-width */}
        <CTA />

        {/* Footer — full-bleed, handles its own max-width */}
        <Footer />
      </div>
    </div>
  );
};
