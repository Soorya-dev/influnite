// Footer.tsx — Premium dark footer for Influnite
//
// Inherits hero visual language exactly:
//   • Background: #050310 (deeper than hero) with violet top-border glow
//   • Cormorant Garamond logo + tagline, Outfit links, DM Mono copyright
//   • 4-column link grid with violet underline hover (same nav-link pattern)
//   • Social icons with violet bloom on hover
//   • Subtle floating violet/indigo bloom orbs (mirrors hero right column)
//   • Corner dot accent grid (same as hero video card)
//   • Animated gradient divider matching hero stat-row border-top

import React, { useEffect } from "react";

const FOOTER_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Outfit:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  @keyframes footer-bloom {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50%       { opacity: 0.55; transform: scale(1.08); }
  }

  .footer-link {
    font-family:     'Outfit', sans-serif;
    font-size:       0.85rem;
    font-weight:     400;
    color:           rgba(255,255,255,0.42);
    text-decoration: none;
    letter-spacing:  0.01em;
    transition:      color 0.2s cubic-bezier(0.22,1,0.36,1);
    position:        relative;
    display:         inline-block;
  }
  .footer-link::after {
    content:          '';
    position:         absolute;
    bottom:           -1px;
    left:             0;
    right:            0;
    height:           1px;
    background:       linear-gradient(90deg, #7c3aed, #6366f1);
    transform:        scaleX(0);
    transform-origin: left;
    transition:       transform 0.3s cubic-bezier(0.22,1,0.36,1);
  }
  .footer-link:hover {
    color: rgba(255,255,255,0.82);
  }
  .footer-link:hover::after {
    transform: scaleX(1);
  }

  .footer-social-btn {
    width:          40px;
    height:         40px;
    border-radius:  50%;
    background:     rgba(124,58,237,0.06);
    border:         1px solid rgba(124,58,237,0.18);
    display:        flex;
    align-items:    center;
    justify-content:center;
    cursor:         pointer;
    transition:     background 0.25s cubic-bezier(0.22,1,0.36,1),
                    border-color 0.25s,
                    box-shadow 0.25s,
                    transform 0.25s cubic-bezier(0.22,1,0.36,1);
    color:          rgba(255,255,255,0.4);
    text-decoration:none;
  }
  .footer-social-btn:hover {
    background:    rgba(124,58,237,0.18);
    border-color:  rgba(124,58,237,0.5);
    box-shadow:    0 0 20px rgba(124,58,237,0.25);
    color:         #a78bfa;
    transform:     translateY(-2px);
  }
`;

// ─── Link columns ──────────────────────────────────────────────────────────
const LINK_COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Features",       href: "#features" },
      { label: "Pricing",        href: "#pricing" },
      { label: "How It Works",   href: "#how-it-works" },
      { label: "Integrations",   href: "#" },
      { label: "Changelog",      href: "#" },
    ],
  },
  {
    heading: "For Creators",
    links: [
      { label: "Join Network",      href: "#" },
      { label: "Creator Dashboard", href: "#" },
      { label: "Brand Deals",       href: "#" },
      { label: "Portfolio Builder", href: "#" },
      { label: "Payments",          href: "#" },
    ],
  },
  {
    heading: "For Brands",
    links: [
      { label: "Find Creators",     href: "#" },
      { label: "Launch Campaign",   href: "#" },
      { label: "Analytics",         href: "#" },
      { label: "Escrow Payments",   href: "#" },
      { label: "Case Studies",      href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us",     href: "#" },
      { label: "Blog",         href: "#" },
      { label: "Careers",      href: "#" },
      { label: "Press Kit",    href: "#" },
      { label: "Contact",      href: "#" },
    ],
  },
];

// ─── Social icon SVGs ──────────────────────────────────────────────────────
const SocialIcons = [
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
  },
];

// ─── Main Footer ───────────────────────────────────────────────────────────
const Footer: React.FC = () => {
  useEffect(() => {
    const id = "footer-styles-v1";
    if (!document.getElementById(id)) {
      const tag = document.createElement("style");
      tag.id = id;
      tag.textContent = FOOTER_STYLES;
      document.head.appendChild(tag);
    }
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  return (
    <footer
      id="footer"
      style={{
        position:  "relative",
        width:     "100%",
        background:"#050310",
        overflow:  "hidden",
      }}
    >
      {/* ── Violet top-border glow (seamless section transition) ──── */}
      <div
        style={{
          position:   "absolute",
          top:        0,
          left:       "50%",
          transform:  "translateX(-50%)",
          width:      "70%",
          height:     1,
          background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.5) 30%, rgba(99,102,241,0.6) 50%, rgba(124,58,237,0.5) 70%, transparent)",
          zIndex:     2,
        }}
      />

      {/* ── Bloom orbs ─────────────────────────────────────────────── */}
      <div
        style={{
          position:     "absolute",
          bottom:       "10%",
          left:         "5%",
          width:        500,
          height:       400,
          borderRadius: "50%",
          background:   "radial-gradient(circle, rgba(109,40,217,0.1) 0%, transparent 70%)",
          filter:       "blur(60px)",
          pointerEvents:"none",
          animation:    "footer-bloom 9s ease-in-out infinite",
          zIndex:       0,
        }}
      />
      <div
        style={{
          position:     "absolute",
          top:          "20%",
          right:        "3%",
          width:        350,
          height:       350,
          borderRadius: "50%",
          background:   "radial-gradient(circle, rgba(79,46,220,0.08) 0%, transparent 70%)",
          filter:       "blur(50px)",
          pointerEvents:"none",
          animation:    "footer-bloom 12s ease-in-out 3s infinite",
          zIndex:       0,
        }}
      />

      {/* ── Corner dot grid (top-right) ────────────────────────────── */}
      <div
        style={{
          position:            "absolute",
          top:                 24,
          right:               24,
          display:             "grid",
          gridTemplateColumns: "repeat(5, 6px)",
          gap:                 5,
          opacity:             0.2,
          zIndex:              1,
        }}
      >
        {Array.from({ length: 25 }).map((_, i) => (
          <span
            key={i}
            style={{
              width:3, height:3, borderRadius:"50%",
              background:"#a78bfa", display:"block",
            }}
          />
        ))}
      </div>

      {/* ── Main content ───────────────────────────────────────────── */}
      <div
        style={{
          position:  "relative",
          zIndex:    1,
          maxWidth:  1280,
          margin:    "0 auto",
          padding:   "5rem 2rem 3rem",
          boxSizing: "border-box",
        }}
      >
        {/* ── Top row: brand + links ─────────────────────────────── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "1fr repeat(4, auto)",
            gap:                 "3rem",
            marginBottom:        "4rem",
            alignItems:          "start",
          }}
          className="footer-top-grid"
        >
          {/* Brand column */}
          <div style={{ maxWidth: 280 }}>
            {/* Logo */}
            <a href="/" style={{ textDecoration:"none", display:"inline-block", marginBottom:"1rem" }}>
              <span
                style={{
                  fontFamily:          "'Cormorant Garamond', serif",
                  fontSize:            "1.8rem",
                  fontWeight:          700,
                  letterSpacing:       "-0.02em",
                  background:          "linear-gradient(135deg, #a78bfa 0%, #7c3aed 45%, #6366f1 100%)",
                  WebkitBackgroundClip:"text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip:      "text",
                }}
              >
                Influnite
              </span>
            </a>

            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize:   "0.85rem",
                color:      "rgba(255,255,255,0.38)",
                lineHeight: 1.7,
                fontWeight: 300,
                margin:     "0 0 1.5rem",
              }}
            >
              The intelligent influencer marketing platform connecting brands and creators through AI-powered matching and secure payments.
            </p>

            {/* Social icons */}
            <div style={{ display:"flex", gap:"0.6rem" }}>
              {SocialIcons.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="footer-social-btn"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {LINK_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4
                style={{
                  fontFamily:    "'DM Mono', monospace",
                  fontSize:      "0.65rem",
                  color:         "rgba(255,255,255,0.3)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom:  "1.25rem",
                  fontWeight:    500,
                }}
              >
                {col.heading}
              </h4>
              <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:"0.65rem" }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="footer-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Newsletter strip ─────────────────────────────────────── */}
        <div
          style={{
            background:    "rgba(124,58,237,0.06)",
            border:        "1px solid rgba(124,58,237,0.15)",
            borderRadius:  "1rem",
            padding:       "1.5rem 2rem",
            display:       "flex",
            alignItems:    "center",
            gap:           "1.5rem",
            flexWrap:      "wrap",
            marginBottom:  "3rem",
            backdropFilter:"blur(12px)",
          }}
        >
          <div style={{ flex:1, minWidth:200 }}>
            <p
              style={{
                fontFamily:  "'Cormorant Garamond', serif",
                fontSize:    "1.15rem",
                fontWeight:  700,
                color:       "#fff",
                margin:      "0 0 0.2rem",
              }}
            >
              Stay ahead of the curve
            </p>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize:   "0.8rem",
                color:      "rgba(255,255,255,0.38)",
                margin:     0,
                fontWeight: 300,
              }}
            >
              Platform updates, creator economy insights, and campaign tips.
            </p>
          </div>
          <div style={{ display:"flex", gap:"0.6rem", flexShrink:0, flexWrap:"wrap" }}>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                fontFamily:    "'Outfit', sans-serif",
                fontSize:      "0.85rem",
                padding:       "0.6rem 1.1rem",
                borderRadius:  999,
                border:        "1px solid rgba(124,58,237,0.25)",
                background:    "rgba(13,8,32,0.6)",
                color:         "#fff",
                outline:       "none",
                width:         220,
                backdropFilter:"blur(8px)",
                transition:    "border-color 0.2s",
              }}
              onFocus={(e)  => e.target.style.borderColor = "rgba(124,58,237,0.6)"}
              onBlur={(e)   => e.target.style.borderColor = "rgba(124,58,237,0.25)"}
            />
            <button
              style={{
                fontFamily:    "'Outfit', sans-serif",
                fontSize:      "0.85rem",
                fontWeight:    600,
                padding:       "0.6rem 1.4rem",
                borderRadius:  999,
                border:        "none",
                background:    "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                color:         "#fff",
                cursor:        "pointer",
                letterSpacing: "0.02em",
                boxShadow:     "0 0 0 1px rgba(124,58,237,0.4), 0 6px 20px rgba(79,46,220,0.35)",
                transition:    "transform 0.15s cubic-bezier(0.22,1,0.36,1), box-shadow 0.15s",
                whiteSpace:    "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 0 0 1px rgba(124,58,237,0.6), 0 10px 28px rgba(79,46,220,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "0 0 0 1px rgba(124,58,237,0.4), 0 6px 20px rgba(79,46,220,0.35)";
              }}
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────────────── */}
        <div
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            paddingTop:     "1.5rem",
            borderTop:      "1px solid rgba(255,255,255,0.06)",
            flexWrap:       "wrap",
            gap:            "1rem",
          }}
        >
          <span
            style={{
              fontFamily:    "'DM Mono', monospace",
              fontSize:      "0.68rem",
              color:         "rgba(255,255,255,0.22)",
              letterSpacing: "0.06em",
            }}
          >
            © {new Date().getFullYear()} Influnite Technologies Pvt. Ltd. — All rights reserved
          </span>

          <div style={{ display:"flex", gap:"1.5rem" }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((label) => (
              <a
                key={label}
                href="#"
                style={{
                  fontFamily:    "'DM Mono', monospace",
                  fontSize:      "0.65rem",
                  color:         "rgba(255,255,255,0.22)",
                  textDecoration:"none",
                  letterSpacing: "0.05em",
                  transition:    "color 0.2s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "rgba(167,139,250,0.7)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.22)"}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive footer grid */}
      <style>{`
        @media (max-width: 900px) {
          .footer-top-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 560px) {
          .footer-top-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;