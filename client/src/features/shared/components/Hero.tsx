// Hero.tsx — Premium animated hero for influencer/brand platform
//
// Features:
//  • Word-by-word split headline cycling (enter/hold/exit phase machine)
//  • 6 quote pairs, each balanced for brand + creator audiences
//  • Synced subtext cycling with fade crossfade
//  • 3D perspective-tilted floating video card (right side)
//  • Violet bloom glow that tints ShapeGrid hexagons behind it
//  • Dual CTAs: "Start as a Brand" / "Join as Creator"
//  • Cormorant Garamond display + Outfit body
//  • No marquee strip — video is the only right-side element

import React, { useState, useEffect, useCallback, useRef } from "react";
import bannerVideo from "../../../assets/banner-video.mp4";

// ─── Styles injected once ────────────────────────────────────────────────────
const HERO_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Outfit:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  @keyframes hero-float {
    0%, 100% { transform: perspective(1000px) rotateY(-6deg) rotateX(3deg) translateY(0px); }
    50%       { transform: perspective(1000px) rotateY(-6deg) rotateX(3deg) translateY(-12px); }
  }

  @keyframes hero-bloom-pulse {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50%       { opacity: 0.75; transform: scale(1.06); }
  }

  @keyframes hero-badge-in {
    from { opacity: 0; transform: translateY(-10px) scale(0.92); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes hero-stat-in {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes hero-cta-in {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes hero-scan-line {
    0%   { transform: translateY(-100%); opacity: 0; }
    10%  { opacity: 0.06; }
    90%  { opacity: 0.06; }
    100% { transform: translateY(200%); opacity: 0; }
  }

  @keyframes hero-corner-glow {
    0%, 100% { opacity: 0.4; }
    50%       { opacity: 0.9; }
  }

  @keyframes dot-ping {
    0%   { transform: scale(1); opacity: 1; }
    100% { transform: scale(2.4); opacity: 0; }
  }

  .hero-float    { animation: hero-float 7s ease-in-out infinite; }
  .hero-bloom    { animation: hero-bloom-pulse 5s ease-in-out infinite; }
  .hero-scan     { animation: hero-scan-line 4s linear infinite; }
  .corner-glow   { animation: hero-corner-glow 3s ease-in-out infinite; }
  .dot-ping-ring { animation: dot-ping 1.5s ease-out infinite; }

  .word-clip {
    display: inline-block;
    overflow: hidden;
    vertical-align: bottom;
    line-height: 1.15;
  }

  .word-inner {
    display: inline-block;
    transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
                opacity  0.45s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: transform, opacity;
  }

  .word-inner.state-hidden-below {
    transform: translateY(72px);
    opacity: 0;
  }
  .word-inner.state-visible {
    transform: translateY(0);
    opacity: 1;
  }
  .word-inner.state-hidden-above {
    transform: translateY(-72px);
    opacity: 0;
  }

  .subtext-inner {
    transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1);
    will-change: opacity, transform;
  }
  .subtext-inner.state-hidden-below {
    opacity: 0;
    transform: translateY(18px);
  }
  .subtext-inner.state-visible {
    opacity: 1;
    transform: translateY(0);
  }
  .subtext-inner.state-hidden-above {
    opacity: 0;
    transform: translateY(-18px);
  }

  .hero-cta-brand {
    animation: hero-cta-in 0.7s cubic-bezier(0.22,1,0.36,1) 1.1s both;
  }
  .hero-cta-creator {
    animation: hero-cta-in 0.7s cubic-bezier(0.22,1,0.36,1) 1.25s both;
  }
  .hero-stats {
    animation: hero-stat-in 0.7s cubic-bezier(0.22,1,0.36,1) 1.5s both;
  }
`;

// ─── Quote data ──────────────────────────────────────────────────────────────
const QUOTES = [
  {
    headline: "Not just any creators — the right creators",
    sub: "Discover verified influencers matched to your brand's audience, niche, and budget. Guaranteed ROI.",
    audience: "brands" as const,
  },
  {
    headline: "Your Content is Currency. Start Cashing In.",
    sub: "Turn your audience into income. Join 10,000+ creators earning through secure, high-value brand deals.",
    audience: "creators" as const,
  },
  {
    headline: "Campaigns that convert. Payments that protect.",
    sub: "End-to-end campaign management with escrow payments, real-time analytics, and performance tracking.",
    audience: "brands" as const,
  },
  {
    headline: "Find. Collaborate. Grow.",
    sub: "Trusted by marketing teams and creators worldwide. Partnerships that last beyond a single post.",
    audience: "both" as const,
  },
  {
    headline: "Your Next Viral Campaign Starts Here",
    sub: "Reach the right audience — through the right influencers. Discover Creators. Launch Campaigns. Drive Impact.",
    audience: "brands" as const,
  },
  {
    headline: "Connect. Create. Convert.",
    sub: "Join 10,000+ brands and influencers creating successful partnerships with secure payments.",
    audience: "both" as const,
  },
];

const AUDIENCE_LABELS: Record<string, { label: string; color: string; bg: string; border: string }> = {
  brands: {
    label: "For Brands",
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.1)",
    border: "rgba(251,191,36,0.3)",
  },
  creators: {
    label: "For Creators",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.1)",
    border: "rgba(167,139,250,0.3)",
  },
  both: {
    label: "Brands & Creators",
    color: "#6ee7b7",
    bg: "rgba(110,231,183,0.08)",
    border: "rgba(110,231,183,0.25)",
  },
};

// ─── Word-split animated headline ────────────────────────────────────────────
type WordState = "state-hidden-below" | "state-visible" | "state-hidden-above";
type Phase = "entering" | "visible" | "exiting";

const STAGGER_MS = 45;
const ENTER_MS   = 600;
const HOLD_MS    = 3600;
const EXIT_MS    = 450;

interface AnimatedHeadlineProps {
  text: string;
  phase: Phase;
}

const AnimatedHeadline: React.FC<AnimatedHeadlineProps> = ({ text, phase }) => {
  const words = text.split(" ");

  const getWordState = (i: number): WordState => {
    if (phase === "visible") return "state-visible";
    if (phase === "entering") return "state-hidden-below";
    return "state-hidden-above";
  };

  const getDelay = (i: number, total: number): string => {
    if (phase === "entering") return `${i * STAGGER_MS}ms`;
    if (phase === "exiting")  return `${(total - 1 - i) * STAGGER_MS * 0.6}ms`;
    return "0ms";
  };

  return (
    <span aria-label={text} style={{ display: "block" }}>
      {words.map((word, i) => (
        <React.Fragment key={`${i}-${word}`}>
          <span className="word-clip">
            <span
              className={`word-inner ${getWordState(i)}`}
              style={{ transitionDelay: getDelay(i, words.length) }}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 && (
            <span style={{ display: "inline-block", width: "0.28em" }} />
          )}
        </React.Fragment>
      ))}
    </span>
  );
};

// ─── Stat chip ───────────────────────────────────────────────────────────────
const Stat: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div style={{ textAlign: "center" }}>
    <div
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "2.1rem",
        fontWeight: 700,
        color: "#fff",
        lineHeight: 1,
      }}
    >
      {value}
    </div>
    <div
      style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: "0.72rem",
        color: "rgba(255,255,255,0.42)",
        letterSpacing: "0.09em",
        textTransform: "uppercase",
        marginTop: 5,
        fontWeight: 400,
      }}
    >
      {label}
    </div>
  </div>
);

// ─── Main component ──────────────────────────────────────────────────────────
const Hero: React.FC = () => {
  const [quoteIndex, setQuoteIndex]   = useState(0);
  const [phase, setPhase]             = useState<Phase>("entering");
  const [subtextPhase, setSubtextPhase] = useState<Phase>("entering");
  const [mounted, setMounted]         = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Inject styles once ───────────────────────────────────────────────────
  useEffect(() => {
    const id = "hero-styles-v2";
    if (!document.getElementById(id)) {
      const tag = document.createElement("style");
      tag.id = id;
      tag.textContent = HERO_STYLES;
      document.head.appendChild(tag);
    }
    // tiny delay so initial animation fires
    const t = setTimeout(() => {
      setMounted(true);
      setPhase("visible");
      setSubtextPhase("visible");
    }, 80);
    return () => {
      clearTimeout(t);
      document.getElementById(id)?.remove();
    };
  }, []);


useEffect(() => {
  if (!mounted) return;

  const runCycle = () => {
    // HOLD phase
    timerRef.current = setTimeout(() => {
      // EXIT
      setPhase("exiting");
      setSubtextPhase("exiting");

      // After exit → change content
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
        setPhase("entering");
        setSubtextPhase("entering");

        // Small delay → ENTER animation
        setTimeout(() => {
          setPhase("visible");
          setSubtextPhase("visible");

          // 🔁 Restart loop
          runCycle();
        }, 60);

      }, EXIT_MS);

    }, HOLD_MS);
  };

  runCycle();

  return () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };
}, [mounted]);

  const quote    = QUOTES[quoteIndex];
  const audience = AUDIENCE_LABELS[quote.audience];

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "6rem 2rem 4rem",
        boxSizing: "border-box",
        maxWidth: 1280,
        margin: "0 auto",
        gap: "3rem",
      }}
    >
      {/* ── LEFT COLUMN ──────────────────────────────────────────────────── */}
      <div
        style={{
          flex: "0 0 52%",
          maxWidth: "52%",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Audience badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: audience.bg,
            border: `1px solid ${audience.border}`,
            borderRadius: 999,
            padding: "6px 14px 6px 10px",
            marginBottom: "2rem",
            backdropFilter: "blur(8px)",
            transition: "background 0.4s, border-color 0.4s",
          }}
        >
          {/* Live dot */}
          <span style={{ position: "relative", width: 10, height: 10, display: "flex", flexShrink: 0 }}>
            <span
              className="dot-ping-ring"
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: audience.color,
                opacity: 0.4,
              }}
            />
            <span
              style={{
                position: "absolute",
                inset: 2,
                borderRadius: "50%",
                background: audience.color,
              }}
            />
          </span>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.68rem",
              color: audience.color,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 500,
              transition: "color 0.4s",
            }}
          >
            {audience.label}
          </span>
        </div>

        {/* ── Animated Headline ────────────────────────────────────────── */}
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.8rem, 4.2vw, 4.4rem)",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.05,
            letterSpacing: "-0.015em",
       minHeight: "4.2em",
marginBottom: "1rem",
          }}
        >
          <AnimatedHeadline text={quote.headline} phase={phase} />
        </div>

        {/* ── Animated subtext ────────────────────────────────────────── */}
        <div style={{ position: "relative", minHeight: "2.4em", marginBottom: "1.6rem" }}>
          <p
            className={`subtext-inner ${subtextPhase === "visible" ? "state-visible" : subtextPhase === "entering" ? "state-hidden-below" : "state-hidden-above"}`}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.72,
              fontWeight: 300,
              margin: 0,
              maxWidth: 460,
            }}
          >
            {quote.sub}
          </p>
        </div>

        {/* ── CTAs ────────────────────────────────────────────────────── */}
        <div
          className="hero-cta-brand"
          style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}
        >
          {/* Primary — Brand */}
          <button
            className="hero-cta-brand"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 600,
              padding: "0.9rem 2.1rem",
              borderRadius: 999,
              border: "none",
              background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
              color: "#fff",
              cursor: "pointer",
              letterSpacing: "0.025em",
              boxShadow: "0 0 0 1px rgba(124,58,237,0.45), 0 8px 28px rgba(79,46,220,0.45)",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 0 0 1px rgba(124,58,237,0.65), 0 14px 36px rgba(79,46,220,0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "0 0 0 1px rgba(124,58,237,0.45), 0 8px 28px rgba(79,46,220,0.45)";
            }}
          >
            Start as a Brand
          </button>

          {/* Secondary — Creator */}
          <button
            className="hero-cta-creator"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 500,
              padding: "0.9rem 2.1rem",
              borderRadius: 999,
              border: "1px solid rgba(167,139,250,0.3)",
              background: "rgba(167,139,250,0.06)",
              color: "rgba(255,255,255,0.75)",
              cursor: "pointer",
              letterSpacing: "0.025em",
              backdropFilter: "blur(8px)",
              transition: "border-color 0.15s, color 0.15s, background 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(167,139,250,0.7)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.background = "rgba(167,139,250,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(167,139,250,0.3)";
              e.currentTarget.style.color = "rgba(255,255,255,0.75)";
              e.currentTarget.style.background = "rgba(167,139,250,0.06)";
            }}
          >
            Join as Creator ↗
          </button>
        </div>

        {/* ── Stats row ───────────────────────────────────────────────── */}
        <div
          className="hero-stats"
          style={{
            display: "flex",
            gap: "2rem",
            marginTop: "3rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <Stat value="10K+" label="Brands & Creators" />
          <div style={{ width: 1, background: "rgba(255,255,255,0.08)", alignSelf: "stretch" }} />
          <Stat value="$4M+" label="Deals facilitated" />
          <div style={{ width: 1, background: "rgba(255,255,255,0.08)", alignSelf: "stretch" }} />
          <Stat value="98%" label="Match accuracy" />
          <div style={{ width: 1, background: "rgba(255,255,255,0.08)", alignSelf: "stretch" }} />
          <Stat value="150+" label="Niches covered" />
        </div>

        {/* ── Quote dot indicators ─────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            gap: 7,
            marginTop: "2rem",
            alignItems: "center",
          }}
        >
          {QUOTES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (timerRef.current) clearTimeout(timerRef.current);
                setPhase("exiting");
                setSubtextPhase("exiting");
                setTimeout(() => {
                  setQuoteIndex(i);
                  setPhase("entering");
                  setSubtextPhase("entering");
                  setTimeout(() => {
                    setPhase("visible");
                    setSubtextPhase("visible");
                  }, 60);
                }, EXIT_MS + 80);
              }}
              style={{
                width: i === quoteIndex ? 22 : 7,
                height: 7,
                borderRadius: 999,
                border: "none",
                background:
                  i === quoteIndex
                    ? "linear-gradient(90deg, #7c3aed, #6366f1)"
                    : "rgba(255,255,255,0.2)",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.4s cubic-bezier(0.22,1,0.36,1), background 0.3s",
              }}
              aria-label={`Go to quote ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── RIGHT COLUMN: Video ───────────────────────────────────────────── */}
      <div
        style={{
          flex: "0 0 46%",
          maxWidth: "46%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 540,
        }}
      >
        {/* Bloom glow — tints ShapeGrid hexagons behind */}
        <div
          className="hero-bloom"
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(109,40,217,0.3) 0%, rgba(79,20,180,0.12) 50%, transparent 70%)",
            filter: "blur(28px)",
            zIndex: 0,
          }}
        />

        {/* Secondary warm accent bloom */}
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            right: "5%",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)",
            filter: "blur(20px)",
            zIndex: 0,
            animation: "hero-bloom-pulse 6s ease-in-out 1s infinite",
          }}
        />

        {/* Floating video card */}
        <div
          className="hero-float"
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: 460,
          }}
        >
          {/* Outer glow ring */}
          <div
            style={{
              position: "absolute",
              inset: -2,
              borderRadius: "1.6rem",
              background: "linear-gradient(135deg, rgba(124,58,237,0.6) 0%, rgba(99,102,241,0.3) 50%, rgba(109,40,217,0.6) 100%)",
              zIndex: 0,
              filter: "blur(1px)",
            }}
          />

          {/* Card shell */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              borderRadius: "1.5rem",
              overflow: "hidden",
              background: "#0d0820",
              boxShadow:
                "0 0 0 1px rgba(124,58,237,0.2), 0 32px 80px rgba(0,0,0,0.7), 0 0 120px rgba(109,40,217,0.15)",
            }}
          >
            {/* Top bar — fake app chrome */}
            <div
              style={{
                height: 44,
                background: "rgba(15,10,32,0.95)",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                display: "flex",
                alignItems: "center",
                padding: "0 16px",
                gap: 8,
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Traffic lights */}
              {["#ff5f57", "#ffbd2e", "#28c840"].map((c) => (
                <span
                  key={c}
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: "50%",
                    background: c,
                    opacity: 0.8,
                    flexShrink: 0,
                  }}
                />
              ))}
              <div style={{ flex: 1 }} />
              {/* "LIVE" badge */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  background: "rgba(239,68,68,0.12)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  borderRadius: 999,
                  padding: "3px 10px",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#ef4444",
                    flexShrink: 0,
                    boxShadow: "0 0 6px #ef4444",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.62rem",
                    color: "#ef4444",
                    letterSpacing: "0.12em",
                    fontWeight: 500,
                  }}
                >
                  LIVE
                </span>
              </div>
              <div style={{ flex: 1 }} />
              {/* Platform name */}
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.62rem",
                  color: "rgba(255,255,255,0.3)",
                  letterSpacing: "0.06em",
                }}
              >
                influenz.io / discover
              </span>
            </div>

            {/* Video */}
            <div style={{ position: "relative", aspectRatio: "1 / 1", width: "100%" }}>
              <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              >
                <source src={bannerVideo} type="video/mp4" />
              </video>

              {/* Scan-line sweep effect — very subtle, cinematic */}
              <div
                className="hero-scan"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
                  pointerEvents: "none",
                }}
              />

              {/* Glare overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 45%)",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Bottom stats bar */}
            <div
              style={{
                padding: "14px 20px",
                background: "rgba(12,8,28,0.97)",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                gap: 16,
                backdropFilter: "blur(12px)",
              }}
            >
              {[
                { label: "Active Campaigns", value: "1,248", color: "#a78bfa" },
                { label: "Avg. Engagement", value: "8.4%",  color: "#6ee7b7" },
                { label: "Deals Today",     value: "37",    color: "#fbbf24" },
              ].map((s) => (
                <div key={s.label} style={{ flex: 1, textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.3rem",
                      fontWeight: 700,
                      color: s.color,
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.62rem",
                      color: "rgba(255,255,255,0.35)",
                      marginTop: 3,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Corner accent dots — top-right */}
          <div
            style={{
              position: "absolute",
              top: -20,
              right: -20,
              display: "grid",
              gridTemplateColumns: "repeat(4, 6px)",
              gap: 5,
              zIndex: 3,
              opacity: 0.4,
            }}
          >
            {Array.from({ length: 16 }).map((_, i) => (
              <span
                key={i}
                className="corner-glow"
                style={{
                  width: 3,
                  height: 3,
                  borderRadius: "50%",
                  background: "#a78bfa",
                  display: "block",
                  animationDelay: `${i * 0.12}s`,
                }}
              />
            ))}
          </div>

          {/* Corner accent dots — bottom-left */}
          <div
            style={{
              position: "absolute",
              bottom: -20,
              left: -20,
              display: "grid",
              gridTemplateColumns: "repeat(4, 6px)",
              gap: 5,
              zIndex: 3,
              opacity: 0.3,
            }}
          >
            {Array.from({ length: 16 }).map((_, i) => (
              <span
                key={i}
                className="corner-glow"
                style={{
                  width: 3,
                  height: 3,
                  borderRadius: "50%",
                  background: "#6366f1",
                  display: "block",
                  animationDelay: `${i * 0.15 + 0.5}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;