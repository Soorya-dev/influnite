// CTA.tsx — Dual Brand / Creator call-to-action section
//
// Inherits hero visual language exactly:
//   • Deep violet radial bloom background (mirrors hero right-column glow)
//   • Cormorant Garamond headlines, Outfit body, DM Mono labels
//   • Glassmorphic split cards for Brand + Creator audiences
//   • Primary (filled gradient) + secondary (ghost) buttons — identical to hero CTAs
//   • Floating stat chips matching hero stat row (10K+, $4M+, 98%)
//   • Animated pulsing border gradient around section
//   • Corner dot accent grids (same as hero video card)
//   • Scroll-reveal via IntersectionObserver

import React, { useEffect, useRef, useState } from "react";

const CTA_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Outfit:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  @keyframes cta-bloom-pulse {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50%       { opacity: 0.8; transform: scale(1.08); }
  }

  @keyframes cta-border-rotate {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  @keyframes cta-stat-count {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes cta-dot-ping {
    0%   { transform: scale(1); opacity: 1; }
    100% { transform: scale(2.4); opacity: 0; }
  }

  .cta-bloom-1 { animation: cta-bloom-pulse 6s ease-in-out infinite; }
  .cta-bloom-2 { animation: cta-bloom-pulse 8s ease-in-out 1.5s infinite; }
  .cta-dot-ring { animation: cta-dot-ping 1.5s ease-out infinite; }

  .cta-card {
    position:       relative;
    background:     rgba(13,8,32,0.65);
    border:         1px solid rgba(124,58,237,0.15);
    border-radius:  1.4rem;
    padding:        2.5rem;
    backdrop-filter: blur(18px);
    overflow:       hidden;
    transition:     border-color 0.35s cubic-bezier(0.22,1,0.36,1),
                    box-shadow   0.35s cubic-bezier(0.22,1,0.36,1),
                    transform    0.35s cubic-bezier(0.22,1,0.36,1);
  }
  .cta-card:hover {
    transform:    translateY(-3px);
    border-color: rgba(124,58,237,0.35);
    box-shadow:   0 0 0 1px rgba(124,58,237,0.15),
                  0 32px 80px rgba(0,0,0,0.55),
                  0 0 100px rgba(109,40,217,0.1);
  }

  .cta-stat-chip {
    display:        inline-flex;
    flex-direction: column;
    align-items:    center;
    background:     rgba(13,8,32,0.7);
    border:         1px solid rgba(255,255,255,0.07);
    border-radius:  0.8rem;
    padding:        0.75rem 1.25rem;
    backdrop-filter: blur(12px);
    flex:           1;
    min-width:      80px;
  }
`;

// ─── IntersectionObserver hook ─────────────────────────────────────────────
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

// ─── Stat chip ─────────────────────────────────────────────────────────────
const StatChip: React.FC<{ value: string; label: string; color: string; visible: boolean; delay: number }> =
  ({ value, label, color, visible, delay }) => (
  <div
    className="cta-stat-chip"
    style={{
      opacity:    visible ? 1 : 0,
      transform:  visible ? "translateY(0)" : "translateY(12px)",
      transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    }}
  >
    <span
      style={{
        fontFamily:   "'Cormorant Garamond', serif",
        fontSize:     "1.8rem",
        fontWeight:   700,
        color,
        lineHeight:   1,
      }}
    >
      {value}
    </span>
    <span
      style={{
        fontFamily:    "'Outfit', sans-serif",
        fontSize:      "0.65rem",
        color:         "rgba(255,255,255,0.38)",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        marginTop:     4,
        fontWeight:    400,
        textAlign:     "center",
      }}
    >
      {label}
    </span>
  </div>
);

// ─── Corner dot grid (matches hero video card) ─────────────────────────────
const CornerDots: React.FC<{ color: string; position: React.CSSProperties }> = ({ color, position }) => (
  <div
    style={{
      position:            "absolute",
      display:             "grid",
      gridTemplateColumns: "repeat(4, 6px)",
      gap:                 5,
      opacity:             0.35,
      zIndex:              3,
      ...position,
    }}
  >
    {Array.from({ length: 16 }).map((_, i) => (
      <span
        key={i}
        style={{
          width:           3,
          height:          3,
          borderRadius:    "50%",
          background:      color,
          display:         "block",
          animation:       `hero-corner-glow 3s ease-in-out ${i * 0.12}s infinite`,
        }}
      />
    ))}
  </div>
);

// ─── Main CTA component ────────────────────────────────────────────────────
const CTA: React.FC = () => {
  const sectionReveal = useReveal(0.08);
  const statsReveal   = useReveal(0.15);

  useEffect(() => {
    const id = "cta-styles-v1";
    if (!document.getElementById(id)) {
      const tag = document.createElement("style");
      tag.id = id;
      tag.textContent = CTA_STYLES;
      document.head.appendChild(tag);
    }
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  return (
    <section
      id="get-started"
      style={{
        position:  "relative",
        width:     "100%",
        padding:   "6rem 2rem 8rem",
        boxSizing: "border-box",
        overflow:  "hidden",
      }}
    >
      {/* ── Bloom background (mirrors hero right-column) ──────────────── */}
      <div
        className="cta-bloom-1"
        style={{
          position:     "absolute",
          top:          "50%",
          left:         "50%",
          transform:    "translate(-50%, -50%)",
          width:        900,
          height:       600,
          borderRadius: "50%",
          background:   "radial-gradient(ellipse, rgba(109,40,217,0.18) 0%, rgba(79,20,180,0.06) 40%, transparent 70%)",
          filter:       "blur(40px)",
          pointerEvents:"none",
          zIndex:       0,
        }}
      />
      <div
        className="cta-bloom-2"
        style={{
          position:     "absolute",
          bottom:       "10%",
          right:        "5%",
          width:        400,
          height:       400,
          borderRadius: "50%",
          background:   "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
          filter:       "blur(40px)",
          pointerEvents:"none",
          zIndex:       0,
        }}
      />

      <div
        ref={sectionReveal.ref}
        style={{
          position:  "relative",
          zIndex:    1,
          maxWidth:  1280,
          margin:    "0 auto",
        }}
      >
        {/* ── Section header ───────────────────────────────────────────── */}
        <div
          style={{
            textAlign:  "center",
            marginBottom:"4rem",
            opacity:    sectionReveal.visible ? 1 : 0,
            transform:  sectionReveal.visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div
            style={{
              display:      "inline-flex",
              alignItems:   "center",
              gap:          8,
              background:   "rgba(167,139,250,0.08)",
              border:       "1px solid rgba(167,139,250,0.25)",
              borderRadius: 999,
              padding:      "5px 14px",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                position: "relative", width: 10, height: 10,
                display: "flex", flexShrink: 0,
              }}
            >
              <span
                className="cta-dot-ring"
                style={{
                  position: "absolute", inset: 0,
                  borderRadius: "50%", background: "#a78bfa", opacity: 0.4,
                }}
              />
              <span
                style={{
                  position: "absolute", inset: 2,
                  borderRadius: "50%", background: "#a78bfa",
                }}
              />
            </span>
            <span
              style={{
                fontFamily:    "'DM Mono', monospace",
                fontSize:      "0.67rem",
                color:         "#a78bfa",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Start Today
            </span>
          </div>

          <h2
            style={{
              fontFamily:    "'Cormorant Garamond', serif",
              fontSize:      "clamp(2.4rem, 4vw, 3.8rem)",
              fontWeight:    700,
              color:         "#fff",
              lineHeight:    1.08,
              letterSpacing: "-0.015em",
              margin:        "0 0 1rem",
            }}
          >
            One platform.{" "}
            <em style={{ fontStyle: "italic", color: "#a78bfa" }}>Two audiences.</em>
            <br />Infinite possibilities.
          </h2>

          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize:   "1.05rem",
              color:      "rgba(255,255,255,0.45)",
              lineHeight: 1.72,
              fontWeight: 300,
              maxWidth:   480,
              margin:     "0 auto",
            }}
          >
            Whether you're scaling a brand or monetizing your audience — Influnite is built for you.
          </p>
        </div>

        {/* ── Dual cards ───────────────────────────────────────────────── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap:                 "1.5rem",
            marginBottom:        "4rem",
          }}
        >
          {/* ── Brand Card ─────────────────────────────────────────── */}
          <div
            className="cta-card"
            style={{
              opacity:    sectionReveal.visible ? 1 : 0,
              transform:  sectionReveal.visible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1) 100ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) 100ms, border-color 0.35s, box-shadow 0.35s",
            }}
          >
            {/* Card inner bloom */}
            <div
              style={{
                position:     "absolute",
                top:          -60,
                right:        -60,
                width:        240,
                height:       240,
                borderRadius: "50%",
                background:   "radial-gradient(circle, rgba(251,191,36,0.1) 0%, transparent 70%)",
                filter:       "blur(20px)",
                pointerEvents:"none",
              }}
            />

            {/* Corner dots */}
            <CornerDots color="#fbbf24" position={{ top: -12, right: -12 }} />

            {/* Badge */}
            <div
              style={{
                display:      "inline-flex",
                alignItems:   "center",
                gap:          6,
                background:   "rgba(251,191,36,0.1)",
                border:       "1px solid rgba(251,191,36,0.3)",
                borderRadius: 999,
                padding:      "4px 12px",
                marginBottom: "1.5rem",
              }}
            >
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#fbbf24", boxShadow:"0 0 6px #fbbf24" }} />
              <span
                style={{
                  fontFamily:    "'DM Mono', monospace",
                  fontSize:      "0.64rem",
                  color:         "#fbbf24",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                For Brands
              </span>
            </div>

            <h3
              style={{
                fontFamily:    "'Cormorant Garamond', serif",
                fontSize:      "2rem",
                fontWeight:    700,
                color:         "#fff",
                lineHeight:    1.15,
                letterSpacing: "-0.01em",
                marginBottom:  "0.9rem",
              }}
            >
              Launch campaigns that actually convert
            </h3>

            <p
              style={{
                fontFamily:  "'Outfit', sans-serif",
                fontSize:    "0.9rem",
                color:       "rgba(255,255,255,0.45)",
                lineHeight:  1.7,
                fontWeight:  300,
                marginBottom:"2rem",
              }}
            >
              Access 10,000+ verified influencers, AI-matched to your campaign goals. Set budgets, track ROI, and release payments only when results are delivered.
            </p>

            {/* Feature list */}
            {[
              "AI-powered creator matching",
              "Escrow-protected payments",
              "Real-time campaign analytics",
              "Dedicated brand dashboard",
            ].map((item) => (
              <div
                key={item}
                style={{
                  display:      "flex",
                  alignItems:   "center",
                  gap:          10,
                  marginBottom: "0.6rem",
                }}
              >
                <span
                  style={{
                    width:        16,
                    height:       16,
                    borderRadius: "50%",
                    background:   "rgba(251,191,36,0.15)",
                    border:       "1px solid rgba(251,191,36,0.4)",
                    display:      "flex",
                    alignItems:   "center",
                    justifyContent:"center",
                    flexShrink:   0,
                  }}
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <polyline points="1,4 3,6 7,2" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize:   "0.85rem",
                    color:      "rgba(255,255,255,0.6)",
                    fontWeight: 400,
                  }}
                >
                  {item}
                </span>
              </div>
            ))}

            <div style={{ marginTop: "2rem" }}>
              <button
                style={{
                  fontFamily:    "'Outfit', sans-serif",
                  fontSize:      "0.9rem",
                  fontWeight:    600,
                  padding:       "0.9rem 2.1rem",
                  borderRadius:  999,
                  border:        "none",
                  background:    "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                  color:         "#fff",
                  cursor:        "pointer",
                  letterSpacing: "0.025em",
                  boxShadow:     "0 0 0 1px rgba(124,58,237,0.45), 0 8px 28px rgba(79,46,220,0.45)",
                  transition:    "transform 0.15s cubic-bezier(0.22,1,0.36,1), box-shadow 0.15s",
                  width:         "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform  = "translateY(-2px)";
                  e.currentTarget.style.boxShadow  = "0 0 0 1px rgba(124,58,237,0.65), 0 14px 36px rgba(79,46,220,0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform  = "";
                  e.currentTarget.style.boxShadow  = "0 0 0 1px rgba(124,58,237,0.45), 0 8px 28px rgba(79,46,220,0.45)";
                }}
              >
                Start as a Brand →
              </button>
            </div>
          </div>

          {/* ── Creator Card ────────────────────────────────────────── */}
          <div
            className="cta-card"
            style={{
              opacity:    sectionReveal.visible ? 1 : 0,
              transform:  sectionReveal.visible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1) 200ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) 200ms, border-color 0.35s, box-shadow 0.35s",
            }}
          >
            {/* Card inner bloom */}
            <div
              style={{
                position:     "absolute",
                top:          -60,
                right:        -60,
                width:        240,
                height:       240,
                borderRadius: "50%",
                background:   "radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)",
                filter:       "blur(20px)",
                pointerEvents:"none",
              }}
            />

            {/* Corner dots */}
            <CornerDots color="#a78bfa" position={{ bottom: -12, left: -12 }} />

            {/* Badge */}
            <div
              style={{
                display:      "inline-flex",
                alignItems:   "center",
                gap:          6,
                background:   "rgba(167,139,250,0.1)",
                border:       "1px solid rgba(167,139,250,0.3)",
                borderRadius: 999,
                padding:      "4px 12px",
                marginBottom: "1.5rem",
              }}
            >
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#a78bfa", boxShadow:"0 0 6px #a78bfa" }} />
              <span
                style={{
                  fontFamily:    "'DM Mono', monospace",
                  fontSize:      "0.64rem",
                  color:         "#a78bfa",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                For Creators
              </span>
            </div>

            <h3
              style={{
                fontFamily:    "'Cormorant Garamond', serif",
                fontSize:      "2rem",
                fontWeight:    700,
                color:         "#fff",
                lineHeight:    1.15,
                letterSpacing: "-0.01em",
                marginBottom:  "0.9rem",
              }}
            >
              Turn your audience into a thriving business
            </h3>

            <p
              style={{
                fontFamily:  "'Outfit', sans-serif",
                fontSize:    "0.9rem",
                color:       "rgba(255,255,255,0.45)",
                lineHeight:  1.7,
                fontWeight:  300,
                marginBottom:"2rem",
              }}
            >
              Connect with brands that respect your craft. Negotiate fair rates, receive secure escrow payments, and grow your creator business on your own terms.
            </p>

            {/* Feature list */}
            {[
              "Instant brand deal discovery",
              "Guaranteed escrow payments",
              "Portfolio & media kit builder",
              "Performance insight dashboard",
            ].map((item) => (
              <div
                key={item}
                style={{ display:"flex", alignItems:"center", gap:10, marginBottom:"0.6rem" }}
              >
                <span
                  style={{
                    width:16, height:16, borderRadius:"50%",
                    background:"rgba(167,139,250,0.12)",
                    border:"1px solid rgba(167,139,250,0.35)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    flexShrink:0,
                  }}
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <polyline points="1,4 3,6 7,2" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span
                  style={{
                    fontFamily:"'Outfit', sans-serif",
                    fontSize:"0.85rem",
                    color:"rgba(255,255,255,0.6)",
                    fontWeight:400,
                  }}
                >
                  {item}
                </span>
              </div>
            ))}

            <div style={{ marginTop:"2rem" }}>
              <button
                style={{
                  fontFamily:    "'Outfit', sans-serif",
                  fontSize:      "0.9rem",
                  fontWeight:    500,
                  padding:       "0.9rem 2.1rem",
                  borderRadius:  999,
                  border:        "1px solid rgba(167,139,250,0.35)",
                  background:    "rgba(167,139,250,0.08)",
                  color:         "rgba(255,255,255,0.8)",
                  cursor:        "pointer",
                  letterSpacing: "0.025em",
                  backdropFilter:"blur(8px)",
                  transition:    "border-color 0.2s, color 0.2s, background 0.2s, transform 0.15s cubic-bezier(0.22,1,0.36,1)",
                  width:         "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(167,139,250,0.7)";
                  e.currentTarget.style.color       = "#fff";
                  e.currentTarget.style.background  = "rgba(167,139,250,0.14)";
                  e.currentTarget.style.transform   = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(167,139,250,0.35)";
                  e.currentTarget.style.color       = "rgba(255,255,255,0.8)";
                  e.currentTarget.style.background  = "rgba(167,139,250,0.08)";
                  e.currentTarget.style.transform   = "";
                }}
              >
                Join as Creator ↗
              </button>
            </div>
          </div>
        </div>

        {/* ── Stats row (mirrors hero stats) ───────────────────────────── */}
        <div
          ref={statsReveal.ref}
          style={{
            display:        "flex",
            alignItems:     "stretch",
            gap:            "1rem",
            justifyContent: "center",
            flexWrap:       "wrap",
            padding:        "2rem 0 0",
            borderTop:      "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <StatChip value="10K+"  label="Brands & Creators"  color="#fff"    visible={statsReveal.visible} delay={0}   />
          <div style={{ width:1, background:"rgba(255,255,255,0.07)", alignSelf:"stretch", flexShrink:0 }} />
          <StatChip value="$4M+"  label="Deals facilitated"  color="#fbbf24" visible={statsReveal.visible} delay={80}  />
          <div style={{ width:1, background:"rgba(255,255,255,0.07)", alignSelf:"stretch", flexShrink:0 }} />
          <StatChip value="98%"   label="Match accuracy"     color="#a78bfa" visible={statsReveal.visible} delay={160} />
          <div style={{ width:1, background:"rgba(255,255,255,0.07)", alignSelf:"stretch", flexShrink:0 }} />
          <StatChip value="150+"  label="Niches covered"     color="#6ee7b7" visible={statsReveal.visible} delay={240} />
          <div style={{ width:1, background:"rgba(255,255,255,0.07)", alignSelf:"stretch", flexShrink:0 }} />
          <StatChip value="60+"   label="Countries active"   color="#fff"    visible={statsReveal.visible} delay={320} />
        </div>
      </div>
    </section>
  );
};

export default CTA;