// Features.tsx — Platform features + How It Works
//
// Inherits hero visual language exactly:
//   • Cormorant Garamond headlines, Outfit body, DM Mono badges
//   • Glassmorphic cards: rgba(13,8,32,0.6) + violet border glow
//   • Bloom orbs (purple/indigo) on hover matching hero
//   • Animated entrance via IntersectionObserver (same cubic-bezier easing)
//   • Violet/amber/emerald accent trio
//   • Corner dot grids (same as hero video card)
//   • Seamless section transition via top gradient dissolve

import React, { useEffect, useRef, useState } from "react";

const FEATURES_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Outfit:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  @keyframes feat-bloom-pulse {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50%       { opacity: 0.7; transform: scale(1.1); }
  }

  @keyframes feat-fade-up {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes feat-line-grow {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }

  @keyframes step-number-in {
    from { opacity: 0; transform: scale(0.6); }
    to   { opacity: 1; transform: scale(1); }
  }

  .feat-card {
    background:     rgba(13,8,32,0.6);
    border:         1px solid rgba(124,58,237,0.12);
    border-radius:  1.2rem;
    padding:        2rem;
    backdrop-filter: blur(16px);
    position:       relative;
    overflow:       hidden;
    transition:     border-color 0.35s cubic-bezier(0.22,1,0.36,1),
                    transform   0.35s cubic-bezier(0.22,1,0.36,1),
                    box-shadow  0.35s cubic-bezier(0.22,1,0.36,1);
    cursor:         default;
  }
  .feat-card:hover {
    border-color:  rgba(124,58,237,0.4);
    transform:     translateY(-4px);
    box-shadow:    0 0 0 1px rgba(124,58,237,0.2),
                   0 24px 60px rgba(0,0,0,0.5),
                   0 0 80px rgba(109,40,217,0.12);
  }
  .feat-card-glow {
    position:      absolute;
    width:         200px;
    height:        200px;
    border-radius: 50%;
    background:    radial-gradient(circle, rgba(109,40,217,0.25) 0%, transparent 70%);
    filter:        blur(24px);
    top:           -60px;
    right:         -60px;
    pointer-events: none;
    opacity:       0;
    transition:    opacity 0.4s cubic-bezier(0.22,1,0.36,1);
    animation:     feat-bloom-pulse 5s ease-in-out infinite;
  }
  .feat-card:hover .feat-card-glow {
    opacity: 1;
  }

  .feat-reveal {
    opacity:   0;
    transform: translateY(32px);
    transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1),
                transform 0.7s cubic-bezier(0.22,1,0.36,1);
  }
  .feat-reveal.visible {
    opacity:   1;
    transform: translateY(0);
  }

  .step-connector {
    position:        absolute;
    top:             28px;
    left:            calc(50% + 28px);
    right:           calc(-50% + 28px);
    height:          1px;
    background:      linear-gradient(90deg, rgba(124,58,237,0.4) 0%, rgba(99,102,241,0.15) 100%);
    transform-origin: left;
    transform:       scaleX(0);
    transition:      transform 1s cubic-bezier(0.22,1,0.36,1);
  }
  .step-connector.visible {
    transform: scaleX(1);
  }
`;

// ─── Feature card data ─────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="10" cy="10" r="6" stroke="#a78bfa" strokeWidth="1.5"/>
        <circle cx="20" cy="18" r="5" stroke="#6ee7b7" strokeWidth="1.5"/>
        <line x1="15" y1="12" x2="16" y2="14" stroke="rgba(167,139,250,0.5)" strokeWidth="1.5"/>
        <circle cx="10" cy="10" r="2" fill="#a78bfa"/>
        <circle cx="20" cy="18" r="2" fill="#6ee7b7"/>
      </svg>
    ),
    accent:   "#a78bfa",
    title:    "Smart AI Matching",
    desc:     "Our algorithm analyzes 50+ data points — audience demographics, engagement rate, niche alignment, and brand safety — to surface creators that actually convert.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="8" width="20" height="14" rx="3" stroke="#fbbf24" strokeWidth="1.5"/>
        <path d="M10 14h8M10 17h5" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 8V6a5 5 0 0 1 10 0v2" stroke="rgba(251,191,36,0.5)" strokeWidth="1.5"/>
        <circle cx="14" cy="14" r="2" fill="#fbbf24"/>
      </svg>
    ),
    accent:   "#fbbf24",
    title:    "Escrow-Protected Payments",
    desc:     "Funds are held securely until campaign deliverables are approved. Creators get guaranteed payment. Brands get guaranteed results. Zero disputes.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <polyline points="4,20 10,13 15,16 22,8" stroke="#6ee7b7" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
        <circle cx="10" cy="13" r="2" fill="#6ee7b7"/>
        <circle cx="15" cy="16" r="2" fill="#6ee7b7" opacity="0.6"/>
        <circle cx="22" cy="8"  r="2" fill="#6ee7b7"/>
        <rect x="4" y="22" width="20" height="1.5" rx="0.75" fill="rgba(110,231,183,0.25)"/>
      </svg>
    ),
    accent:   "#6ee7b7",
    title:    "Real-Time Analytics",
    desc:     "Track impressions, reach, engagement, conversions, and ROI live as campaigns run. Export detailed reports for your stakeholders in one click.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="6" width="22" height="16" rx="3" stroke="#7c3aed" strokeWidth="1.5"/>
        <path d="M3 11h22" stroke="rgba(124,58,237,0.4)" strokeWidth="1"/>
        <circle cx="8"  cy="8.5" r="1" fill="#7c3aed"/>
        <circle cx="12" cy="8.5" r="1" fill="rgba(124,58,237,0.5)"/>
        <circle cx="16" cy="8.5" r="1" fill="rgba(124,58,237,0.3)"/>
        <rect x="7" y="15" width="6" height="4" rx="1" fill="rgba(124,58,237,0.3)" stroke="rgba(124,58,237,0.5)" strokeWidth="1"/>
        <rect x="15" y="15" width="6" height="2" rx="1" fill="rgba(124,58,237,0.2)"/>
      </svg>
    ),
    accent:   "#7c3aed",
    title:    "Campaign Management",
    desc:     "Brief creators, review content, manage timelines, and approve deliverables — all from a single streamlined dashboard. No email chains, no chaos.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="10" r="5" stroke="#a78bfa" strokeWidth="1.5"/>
        <path d="M6 24c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M19 7l2 2-2 2" stroke="#6ee7b7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="22" cy="9" r="1.5" fill="#6ee7b7"/>
      </svg>
    ),
    accent:   "#a78bfa",
    title:    "Verified Creator Network",
    desc:     "Every creator is manually vetted for authenticity — no bot followers, no inflated metrics. 10,000+ verified influencers across 150+ niches, ready to partner.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="9" stroke="#fbbf24" strokeWidth="1.5"/>
        <ellipse cx="14" cy="14" rx="4" ry="9" stroke="rgba(251,191,36,0.4)" strokeWidth="1"/>
        <line x1="5" y1="14" x2="23" y2="14" stroke="rgba(251,191,36,0.3)" strokeWidth="1"/>
        <line x1="14" y1="5" x2="14" y2="23" stroke="rgba(251,191,36,0.2)" strokeWidth="1"/>
      </svg>
    ),
    accent:   "#fbbf24",
    title:    "Global Reach",
    desc:     "Connect with creators across 60+ countries in every major language. Localized campaigns, global impact — with built-in multi-currency payment support.",
  },
];

// ─── How It Works steps ────────────────────────────────────────────────────
const STEPS = [
  {
    num:    "01",
    color:  "#7c3aed",
    bg:     "rgba(124,58,237,0.12)",
    border: "rgba(124,58,237,0.35)",
    title:  "Create Your Brief",
    desc:   "Define your campaign goals, budget, and target audience. Our AI instantly surfaces the most relevant creator profiles.",
  },
  {
    num:    "02",
    color:  "#a78bfa",
    bg:     "rgba(167,139,250,0.1)",
    border: "rgba(167,139,250,0.3)",
    title:  "Match & Connect",
    desc:   "Review AI-ranked creator shortlists, analyze audience overlap, and send collaboration requests with a single click.",
  },
  {
    num:    "03",
    color:  "#6ee7b7",
    bg:     "rgba(110,231,183,0.08)",
    border: "rgba(110,231,183,0.25)",
    title:  "Launch & Track",
    desc:   "Content goes live with escrow protection active. Monitor real-time performance and release payment on approval.",
  },
];

// ─── Intersection observer hook ────────────────────────────────────────────
const useReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
};

// ─── FeatureCard ───────────────────────────────────────────────────────────
const FeatureCard: React.FC<{
  feature: typeof FEATURES[0];
  delay:   number;
  visible: boolean;
}> = ({ feature, delay, visible }) => (
  <div
    className="feat-card"
    style={{
      opacity:        visible ? 1 : 0,
      transform:      visible ? "translateY(0)" : "translateY(32px)",
      transition:     `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    }}
  >
    {/* Hover bloom */}
    <div className="feat-card-glow" />

    {/* Icon container */}
    <div
      style={{
        width:          52,
        height:         52,
        borderRadius:   "0.9rem",
        background:     `${feature.accent}14`,
        border:         `1px solid ${feature.accent}33`,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        marginBottom:   "1.25rem",
        flexShrink:     0,
      }}
    >
      {feature.icon}
    </div>

    {/* Title */}
    <h3
      style={{
        fontFamily:   "'Cormorant Garamond', serif",
        fontSize:     "1.35rem",
        fontWeight:   700,
        color:        "#fff",
        marginBottom: "0.65rem",
        lineHeight:   1.2,
      }}
    >
      {feature.title}
    </h3>

    {/* Description */}
    <p
      style={{
        fontFamily:  "'Outfit', sans-serif",
        fontSize:    "0.88rem",
        color:       "rgba(255,255,255,0.45)",
        lineHeight:  1.7,
        fontWeight:  300,
        margin:      0,
      }}
    >
      {feature.desc}
    </p>

    {/* Accent bottom border */}
    <div
      style={{
        position:   "absolute",
        bottom:     0,
        left:       "1.5rem",
        right:      "1.5rem",
        height:     1,
        background: `linear-gradient(90deg, transparent, ${feature.accent}44, transparent)`,
      }}
    />
  </div>
);

// ─── Main Features component ───────────────────────────────────────────────
const Features: React.FC = () => {
  const headerReveal = useReveal(0.1);
  const gridReveal   = useReveal(0.05);
  const stepsReveal  = useReveal(0.1);

  useEffect(() => {
    const id = "features-styles-v1";
    if (!document.getElementById(id)) {
      const tag = document.createElement("style");
      tag.id = id;
      tag.textContent = FEATURES_STYLES;
      document.head.appendChild(tag);
    }
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  return (
    <section
      id="features"
      style={{
        position:  "relative",
        width:     "100%",
        padding:   "8rem 2rem 6rem",
        boxSizing: "border-box",
      }}
    >
      {/* Seamless section transition bloom */}
      <div
        style={{
          position:  "absolute",
          top:       -120,
          left:      "50%",
          transform: "translateX(-50%)",
          width:     800,
          height:    400,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(109,40,217,0.08) 0%, transparent 70%)",
          filter:    "blur(40px)",
          pointerEvents: "none",
          zIndex:    0,
        }}
      />

      {/* Ambient side blooms */}
      <div
        style={{
          position:  "absolute",
          top:       "20%",
          left:      "-10%",
          width:     400,
          height:    400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(79,46,220,0.06) 0%, transparent 70%)",
          filter:    "blur(60px)",
          pointerEvents: "none",
          animation: "feat-bloom-pulse 8s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position:  "absolute",
          top:       "40%",
          right:     "-8%",
          width:     350,
          height:    350,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
          filter:    "blur(60px)",
          pointerEvents: "none",
          animation: "feat-bloom-pulse 10s ease-in-out 2s infinite",
        }}
      />

      <div
        style={{
          position:  "relative",
          zIndex:    1,
          maxWidth:  1280,
          margin:    "0 auto",
        }}
      >
        {/* ── Section header ───────────────────────────────────────────── */}
        <div
          ref={headerReveal.ref}
          style={{
            textAlign:  "center",
            marginBottom: "5rem",
            opacity:    headerReveal.visible ? 1 : 0,
            transform:  headerReveal.visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {/* DM Mono badge */}
          <div
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              gap:            8,
              background:     "rgba(124,58,237,0.1)",
              border:         "1px solid rgba(124,58,237,0.3)",
              borderRadius:   999,
              padding:        "5px 14px",
              marginBottom:   "1.5rem",
            }}
          >
            <span
              style={{
                width:        6,
                height:       6,
                borderRadius: "50%",
                background:   "#7c3aed",
                boxShadow:    "0 0 8px rgba(124,58,237,0.8)",
                flexShrink:   0,
              }}
            />
            <span
              style={{
                fontFamily:    "'DM Mono', monospace",
                fontSize:      "0.67rem",
                color:         "#a78bfa",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Platform Features
            </span>
          </div>

          {/* Main headline */}
          <h2
            style={{
              fontFamily:   "'Cormorant Garamond', serif",
              fontSize:     "clamp(2.4rem, 4vw, 3.8rem)",
              fontWeight:   700,
              color:        "#fff",
              lineHeight:   1.1,
              letterSpacing:"-0.015em",
              marginBottom: "1.1rem",
              margin:       "0 0 1.1rem",
            }}
          >
            Everything you need to{" "}
            <em style={{ fontStyle: "italic", color: "#a78bfa" }}>
              run great campaigns
            </em>
          </h2>

          <p
            style={{
              fontFamily:  "'Outfit', sans-serif",
              fontSize:    "1.05rem",
              color:       "rgba(255,255,255,0.45)",
              lineHeight:  1.72,
              fontWeight:  300,
              maxWidth:    520,
              margin:      "0 auto",
            }}
          >
            One platform. End-to-end. From discovery to payment — every tool a brand or creator needs to collaborate effectively.
          </p>
        </div>

        {/* ── Feature cards grid ───────────────────────────────────────── */}
        <div
          ref={gridReveal.ref}
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap:                 "1.25rem",
            marginBottom:        "7rem",
          }}
        >
          {FEATURES.map((feat, i) => (
            <FeatureCard
              key={feat.title}
              feature={feat}
              delay={i * 80}
              visible={gridReveal.visible}
            />
          ))}
        </div>

        {/* ── How It Works ─────────────────────────────────────────────── */}
        <div
          ref={stepsReveal.ref}
          style={{
            opacity:    stepsReveal.visible ? 1 : 0,
            transform:  stepsReveal.visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {/* "How It Works" header */}
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div
              style={{
                display:        "inline-flex",
                alignItems:     "center",
                gap:            8,
                background:     "rgba(110,231,183,0.07)",
                border:         "1px solid rgba(110,231,183,0.22)",
                borderRadius:   999,
                padding:        "5px 14px",
                marginBottom:   "1.25rem",
              }}
            >
              <span
                style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "#6ee7b7", boxShadow: "0 0 8px rgba(110,231,183,0.6)",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Mono', monospace", fontSize: "0.67rem",
                  color: "#6ee7b7", letterSpacing: "0.12em", textTransform: "uppercase",
                }}
              >
                How It Works
              </span>
            </div>

            <h2
              style={{
                fontFamily:   "'Cormorant Garamond', serif",
                fontSize:     "clamp(2rem, 3.2vw, 3rem)",
                fontWeight:   700,
                color:        "#fff",
                lineHeight:   1.1,
                letterSpacing:"-0.015em",
                margin:       "0 0 1rem",
              }}
            >
              Live in{" "}
              <em style={{ fontStyle: "italic", color: "#6ee7b7" }}>three steps</em>
            </h2>
          </div>

          {/* Steps */}
          <div
            style={{
              display:             "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap:                 "2rem",
              position:            "relative",
            }}
          >
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                style={{
                  position:  "relative",
                  opacity:   stepsReveal.visible ? 1 : 0,
                  transform: stepsReveal.visible ? "translateY(0)" : "translateY(24px)",
                  transition:`opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 120 + 200}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 120 + 200}ms`,
                }}
              >
                {/* Step number circle */}
                <div
                  style={{
                    width:          56,
                    height:         56,
                    borderRadius:   "50%",
                    background:     step.bg,
                    border:         `1px solid ${step.border}`,
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    marginBottom:   "1.5rem",
                    boxShadow:      `0 0 24px ${step.color}22`,
                  }}
                >
                  <span
                    style={{
                      fontFamily:   "'DM Mono', monospace",
                      fontSize:     "0.95rem",
                      fontWeight:   500,
                      color:        step.color,
                      letterSpacing:"0.05em",
                    }}
                  >
                    {step.num}
                  </span>
                </div>

                {/* Connector line (between steps) */}
                {i < STEPS.length - 1 && (
                  <div
                    style={{
                      position:        "absolute",
                      top:             28,
                      left:            "calc(56px + 16px)",
                      right:           "-2rem",
                      height:          1,
                      background:      `linear-gradient(90deg, ${step.color}44, transparent)`,
                      transform:       stepsReveal.visible ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "left",
                      transition:      `transform 1s cubic-bezier(0.22,1,0.36,1) ${i * 200 + 600}ms`,
                    }}
                  />
                )}

                <h3
                  style={{
                    fontFamily:   "'Cormorant Garamond', serif",
                    fontSize:     "1.4rem",
                    fontWeight:   700,
                    color:        "#fff",
                    marginBottom: "0.6rem",
                    lineHeight:   1.2,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize:   "0.88rem",
                    color:      "rgba(255,255,255,0.45)",
                    lineHeight: 1.7,
                    fontWeight: 300,
                    margin:     0,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;