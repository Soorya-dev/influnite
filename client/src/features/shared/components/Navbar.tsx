// Navbar.tsx — Premium glassmorphic navbar for Influnite
//
// Inherits hero visual language:
//   • Cormorant Garamond logo + Outfit nav links + DM Mono badge
//   • Scroll-aware: transparent → glass backdrop on scroll
//   • Violet gradient brand text
//   • Hero-identical CTA buttons (filled + ghost)
//   • Animated underline hover on nav links
//   • Mobile hamburger with slide-down menu

import React, { useState, useEffect } from "react";

const NAVBAR_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Outfit:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  @keyframes nav-slide-down {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes nav-link-underline {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }

  .nav-mounted {
    animation: nav-slide-down 0.6s cubic-bezier(0.22,1,0.36,1) both;
  }

  .nav-link {
    position: relative;
    font-family: 'Outfit', sans-serif;
    font-size: 0.88rem;
    font-weight: 400;
    color: rgba(255,255,255,0.55);
    text-decoration: none;
    letter-spacing: 0.02em;
    transition: color 0.2s cubic-bezier(0.22,1,0.36,1);
    padding-bottom: 2px;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 1px;
    background: #6A0D7D;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
  }
  .nav-link:hover {
    color: rgba(255,255,255,0.92);
  }
  .nav-link:hover::after {
    transform: scaleX(1);
  }

  .mobile-menu {
    animation: nav-slide-down 0.4s cubic-bezier(0.22,1,0.36,1) both;
  }

  .hamburger-line {
    display: block;
    width: 22px;
    height: 1.5px;
    background: rgba(255,255,255,0.7);
    transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.3s;
    transform-origin: center;
  }
  .hamburger-open .hamburger-line:nth-child(1) { transform: translateY(5px) rotate(45deg); }
  .hamburger-open .hamburger-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .hamburger-open .hamburger-line:nth-child(3) { transform: translateY(-5px) rotate(-45deg); }
`;

const NAV_LINKS = [
  { label: "Why now",      href: "#why-influnite" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Platform",     href: "#dashboard" },
  { label: "Trust",        href: "#trust" },
];

const Navbar: React.FC = () => {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [mounted,     setMounted]     = useState(false);

  useEffect(() => {
    // inject styles
    const id = "nav-styles-v1";
    if (!document.getElementById(id)) {
      const tag = document.createElement("style");
      tag.id = id;
      tag.textContent = NAVBAR_STYLES;
      document.head.appendChild(tag);
    }
    setTimeout(() => setMounted(true), 50);
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBg = scrolled
    ? "rgba(8,8,8,0.92)"
    : "rgba(8,8,8,0.0)";

  const navBorder = scrolled
    ? "rgba(255,255,255,0.08)"
    : "rgba(255,255,255,0.0)";

  return (
    <header
      className={mounted ? "nav-mounted" : ""}
      style={{
        position:        "fixed",
        top:             0,
        left:            0,
        right:           0,
        zIndex:          50,
        background:      navBg,
        backdropFilter:  scrolled ? "blur(14px)" : "none",
        borderBottom:    `1px solid ${navBorder}`,
        transition:      "background 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.4s cubic-bezier(0.22,1,0.36,1), backdrop-filter 0.4s",
        boxShadow:       scrolled ? "0 4px 32px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <div
        style={{
          maxWidth:       1280,
          margin:         "0 auto",
          padding:        "0 2rem",
          height:         72,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          gap:            "2rem",
        }}
      >
        {/* ── Brand logo ─────────────────────────────────────────────── */}
        <a
          href="/"
          style={{ textDecoration: "none", flexShrink: 0 }}
          aria-label="Influnite home"
        >
          <span
            style={{
              fontFamily:      "'Cormorant Garamond', serif",
              fontSize:        "1.65rem",
              fontWeight:      700,
              letterSpacing:   "-0.02em",
              color:           "#ffffff",
            }}
          >
            Influnite
          </span>
          {/* Beta pill */}
          <span
            style={{
              marginLeft:      8,
              fontFamily:      "'DM Mono', monospace",
              fontSize:        "0.56rem",
              color:           "#a78bfa",
              background:      "rgba(167,139,250,0.1)",
              border:          "1px solid rgba(167,139,250,0.3)",
              borderRadius:    999,
              padding:         "2px 7px",
              letterSpacing:   "0.1em",
              textTransform:   "uppercase",
              verticalAlign:   "middle",
            }}
          >
            beta
          </span>
        </a>

        {/* ── Desktop nav links ──────────────────────────────────────── */}
        <nav
          style={{
            display:    "flex",
            alignItems: "center",
            gap:        "2rem",
            flex:       1,
            justifyContent: "center",
          }}
          className="desktop-nav"
        >
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        {/* ── Desktop CTAs ───────────────────────────────────────────── */}
        <div
          style={{
            display:    "flex",
            alignItems: "center",
            gap:        "0.75rem",
            flexShrink: 0,
          }}
          className="desktop-ctas"
        >
          {/* Ghost Sign In */}
          <button
            style={{
              fontFamily:    "'Outfit', sans-serif",
              fontSize:      "0.85rem",
              fontWeight:    500,
              padding:       "0.55rem 1.4rem",
              borderRadius:  999,
              border:        "1px solid rgba(167,139,250,0.25)",
              background:    "rgba(167,139,250,0.05)",
              color:         "rgba(255,255,255,0.65)",
              cursor:        "pointer",
              letterSpacing: "0.02em",
              backdropFilter:"blur(8px)",
              transition:    "border-color 0.2s, color 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(167,139,250,0.6)";
              e.currentTarget.style.color       = "#fff";
              e.currentTarget.style.background  = "rgba(167,139,250,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(167,139,250,0.25)";
              e.currentTarget.style.color       = "rgba(255,255,255,0.65)";
              e.currentTarget.style.background  = "rgba(167,139,250,0.05)";
            }}
          >
            Sign In
          </button>

          {/* Filled Get Started */}
          <button
            style={{
              fontFamily:    "'Outfit', sans-serif",
              fontSize:      "0.85rem",
              fontWeight:    600,
              padding:       "0.55rem 1.4rem",
              borderRadius:  999,
              border:        "none",
              background:    "#6A0D7D",
              color:         "#fff",
              cursor:        "pointer",
              letterSpacing: "0.025em",
              boxShadow:     "0 0 0 1px rgba(124,58,237,0.4), 0 6px 20px rgba(79,46,220,0.4)",
              transition:    "transform 0.15s cubic-bezier(0.22,1,0.36,1), box-shadow 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform  = "translateY(-1px)";
              e.currentTarget.style.boxShadow  = "0 0 0 1px rgba(124,58,237,0.6), 0 10px 28px rgba(79,46,220,0.55)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform  = "";
              e.currentTarget.style.boxShadow  = "0 0 0 1px rgba(124,58,237,0.4), 0 6px 20px rgba(79,46,220,0.4)";
            }}
          >
            Get Started →
          </button>
        </div>

        {/* ── Hamburger (mobile) ─────────────────────────────────────── */}
        <button
          className={mobileOpen ? "hamburger-open" : ""}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          style={{
            display:        "none",
            flexDirection:  "column",
            gap:            4.5,
            background:     "none",
            border:         "none",
            cursor:         "pointer",
            padding:        8,
            borderRadius:   8,
          }}
          id="nav-hamburger"
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </div>

      {/* ── Mobile menu ─────────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="mobile-menu"
          style={{
            background:    "rgba(8,8,8,0.98)",
            backdropFilter:"blur(14px)",
            borderTop:     "1px solid rgba(255,255,255,0.08)",
            padding:       "1.5rem 2rem 2rem",
          }}
        >
          <nav
            style={{
              display:       "flex",
              flexDirection: "column",
              gap:           "1.25rem",
              marginBottom:  "1.5rem",
            }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link"
                onClick={() => setMobileOpen(false)}
                style={{ fontSize: "1rem" }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <button
              style={{
                fontFamily:  "'Outfit', sans-serif",
                fontSize:    "0.9rem",
                fontWeight:  500,
                padding:     "0.75rem",
                borderRadius:999,
                border:      "1px solid rgba(167,139,250,0.3)",
                background:  "rgba(167,139,250,0.06)",
                color:       "rgba(255,255,255,0.75)",
                cursor:      "pointer",
                width:       "100%",
              }}
            >
              Sign In
            </button>
            <button
              style={{
                fontFamily:  "'Outfit', sans-serif",
                fontSize:    "0.9rem",
                fontWeight:  600,
                padding:     "0.75rem",
                borderRadius:999,
                border:      "none",
                background:  "#6A0D7D",
                color:       "#fff",
                cursor:      "pointer",
                boxShadow:   "0 0 0 1px rgba(124,58,237,0.4), 0 6px 20px rgba(79,46,220,0.4)",
                width:       "100%",
              }}
            >
              Get Started →
            </button>
          </div>
        </div>
      )}

      {/* Responsive: hide desktop elements on mobile */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav  { display: none !important; }
          .desktop-ctas { display: none !important; }
          #nav-hamburger { display: flex !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
