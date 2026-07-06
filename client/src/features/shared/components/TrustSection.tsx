// TrustSection.tsx — Built for trust
// 3 large storytelling cards focused on trust, not technology
// Horizontal layout, editorial, generous whitespace
// Answers: "Why should I trust this?"

import React from 'react'
import { motion } from 'framer-motion'

const CARDS = [
  {
    number:  '01',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L4 8v7c0 5.5 4.3 10.7 10 12 5.7-1.3 10-6.5 10-12V8L14 3z"
          stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
        <polyline points="10,14 13,17 18,11"
          stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    headline: 'No one gets paid until the work is done.',
    body:     "Every payment on Influnite goes into escrow before a campaign starts. Creators know the money is real. Brands know work gets delivered. When content is approved, the payment releases — automatically. If something falls through, funds go back. No disputes, no uncomfortable conversations.",
    accent:   '#6A0D7D',
  },
  {
    number:  '02',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="10" r="5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
        <path d="M5 24c0-5 4-9 9-9s9 4 9 9" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="22" cy="8" r="3.5" fill="#111111" stroke="rgba(110,231,183,0.5)" strokeWidth="1.5" />
        <polyline points="20.5,8 21.5,9 23.5,7" stroke="#6ee7b7" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    headline: 'Not everyone who applies gets in.',
    body:     "Every creator goes through a review before they can accept campaigns. We look at engagement patterns, content consistency, and whether their audience is real. A creator with 20K genuine followers and 9% engagement is more valuable than someone with 200K followers and a dead feed. Brands on this platform know that.",
    accent:   '#6ee7b7',
  },
  {
    number:  '03',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="9" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        <circle cx="14" cy="14" r="4" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
        <circle cx="14" cy="14" r="1.5" fill="rgba(255,255,255,0.6)" />
        <line x1="14" y1="5" x2="14" y2="3" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="14" y1="25" x2="14" y2="23" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="5" y1="14" x2="3" y2="14" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="25" y1="14" x2="23" y2="14" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    headline: "Follower count is the wrong metric.",
    body:     "Brands waste money matching with big accounts that have the wrong audience. The platform surfaces creators based on who their followers actually are — age, location, interests — and how genuinely they engage. A campaign that reaches the right 30,000 people outperforms one that reaches the wrong 300,000.",
    accent:   'rgba(167,139,250,0.8)',
  },
]

const TrustSection: React.FC = () => (
  <section
    id="trust"
    style={{
      padding:   '7rem 2rem 8rem',
      boxSizing: 'border-box',
    }}
  >
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: '4.5rem', maxWidth: 560 }}
      >
        <span style={{
          fontFamily:    "'DM Mono', monospace",
          fontSize:      '0.62rem',
          color:         'rgba(255,255,255,0.25)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          display:       'block',
          marginBottom:  '1.25rem',
        }}>
          How We Think About Trust
        </span>
        <h2 style={{
          fontFamily:    "'Cormorant Garamond', serif",
          fontSize:      'clamp(2.2rem, 3.5vw, 3.4rem)',
          fontWeight:    700,
          color:         '#ffffff',
          lineHeight:    1.1,
          letterSpacing: '-0.02em',
          marginBottom:  '1rem',
        }}>
          Collaborations work when<br />
          <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.38)' }}>
            both sides can trust each other.
          </em>
        </h2>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize:   '0.95rem',
          color:      'rgba(255,255,255,0.38)',
          lineHeight: 1.7,
          fontWeight: 300,
        }}>
          We built the platform so that neither brands nor creators have to take things on faith.
        </p>
      </motion.div>

      {/* Three large cards */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap:                 '1.25rem',
      }}
        className="trust-grid"
      >
        {CARDS.map((card, i) => (
          <motion.div
            key={card.number}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background:   '#111111',
              border:       '1px solid rgba(255,255,255,0.07)',
              borderLeft:   `3px solid ${card.accent}`,
              borderRadius: '0.875rem',
              padding:      '2.25rem 2rem',
              display:      'flex',
              flexDirection:'column',
              gap:          '1.25rem',
            }}
          >
            {/* Icon + number */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{
                width:          48,
                height:         48,
                borderRadius:   '0.6rem',
                background:     'rgba(255,255,255,0.03)',
                border:         '1px solid rgba(255,255,255,0.07)',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
              }}>
                {card.icon}
              </div>
              <span style={{
                fontFamily:    "'Cormorant Garamond', serif",
                fontSize:      '3.5rem',
                fontWeight:    700,
                color:         'rgba(255,255,255,0.06)',
                lineHeight:    1,
                userSelect:    'none',
              }}>
                {card.number}
              </span>
            </div>

            {/* Headline */}
            <h3 style={{
              fontFamily:    "'Cormorant Garamond', serif",
              fontSize:      '1.5rem',
              fontWeight:    700,
              color:         '#ffffff',
              lineHeight:    1.2,
              letterSpacing: '-0.01em',
            }}>
              {card.headline}
            </h3>

            {/* Body */}
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize:   '0.88rem',
              color:      'rgba(255,255,255,0.42)',
              lineHeight: 1.75,
              fontWeight: 300,
              flex:       1,
            }}>
              {card.body}
            </p>
          </motion.div>
        ))}
      </div>
    </div>

    <style>{`
      @media (max-width: 900px) {
        .trust-grid { grid-template-columns: 1fr !important; }
      }
      @media (min-width: 600px) and (max-width: 900px) {
        .trust-grid { grid-template-columns: 1fr 1fr !important; }
      }
    `}</style>
  </section>
)

export default TrustSection
