// FinalCTA.tsx — Conversion section
// Clean, centered, generous whitespace
// Two clear conversion paths: brand and creator
// No marketing clichés — direct, confident copy

import React from 'react'
import { motion } from 'framer-motion'

const FinalCTA: React.FC = () => (
  <section
    id="start"
    style={{
      position:   'relative',
      padding:    '8rem 2rem 9rem',
      boxSizing:  'border-box',
      overflow:   'hidden',
      background: '#050505',
    }}
  >
    {/* Top border glow */}
    <div style={{
      position:   'absolute',
      top:        0,
      left:       '50%',
      transform:  'translateX(-50%)',
      width:      '50%',
      height:     1,
      background: 'linear-gradient(90deg, transparent, rgba(106,13,125,0.5) 30%, rgba(106,13,125,0.6) 50%, rgba(106,13,125,0.5) 70%, transparent)',
    }} />

    {/* Single centered glow — minimal, not flashy */}
    <div style={{
      position:     'absolute',
      top:          '50%',
      left:         '50%',
      transform:    'translate(-50%, -50%)',
      width:        600,
      height:       400,
      borderRadius: '50%',
      background:   'radial-gradient(ellipse, rgba(106,13,125,0.12) 0%, transparent 70%)',
      filter:       'blur(40px)',
      pointerEvents:'none',
    }} />

    <div style={{
      position:       'relative',
      zIndex:         1,
      maxWidth:       680,
      margin:         '0 auto',
      textAlign:      'center',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <span style={{
          fontFamily:    "'DM Mono', monospace",
          fontSize:      '0.62rem',
          color:         'rgba(255,255,255,0.22)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          display:       'block',
          marginBottom:  '2rem',
        }}>
          Get Started
        </span>

        <h2 style={{
          fontFamily:    "'Cormorant Garamond', serif",
          fontSize:      'clamp(2.6rem, 5vw, 4.2rem)',
          fontWeight:    700,
          color:         '#ffffff',
          lineHeight:    1.06,
          letterSpacing: '-0.025em',
          marginBottom:  '1.5rem',
        }}>
          Your next successful collaboration<br />starts here.
        </h2>

        <p style={{
          fontFamily:   "'Outfit', sans-serif",
          fontSize:     '1rem',
          color:        'rgba(255,255,255,0.38)',
          lineHeight:   1.72,
          fontWeight:   300,
          maxWidth:     480,
          margin:       '0 auto 2.75rem',
        }}>
          Brands find creators who fit. Creators find brands worth working with.
          Everyone gets paid on time.
        </p>

        <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {/* Primary — Brand */}
          <motion.button
            whileHover={{ y: -2, boxShadow: '0 0 0 1px rgba(106,13,125,0.6), 0 12px 32px rgba(106,13,125,0.4)' }}
            transition={{ duration: 0.15 }}
            style={{
              fontFamily:    "'Outfit', sans-serif",
              fontSize:      '0.92rem',
              fontWeight:    600,
              padding:       '0.9rem 2.2rem',
              borderRadius:  999,
              border:        'none',
              background:    '#6A0D7D',
              color:         '#fff',
              cursor:        'pointer',
              letterSpacing: '0.025em',
              boxShadow:     '0 0 0 1px rgba(106,13,125,0.4), 0 8px 24px rgba(106,13,125,0.3)',
            }}
          >
            Start as Brand
          </motion.button>

          {/* Secondary — Creator */}
          <motion.button
            whileHover={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}
            transition={{ duration: 0.15 }}
            style={{
              fontFamily:    "'Outfit', sans-serif",
              fontSize:      '0.92rem',
              fontWeight:    500,
              padding:       '0.9rem 2.2rem',
              borderRadius:  999,
              border:        '1px solid rgba(255,255,255,0.14)',
              background:    'transparent',
              color:         'rgba(255,255,255,0.6)',
              cursor:        'pointer',
              letterSpacing: '0.025em',
              transition:    'border-color 0.2s, color 0.2s',
            }}
          >
            Become a Creator ↗
          </motion.button>
        </div>

        {/* Social proof micro-strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            display:        'flex',
            gap:            '2rem',
            justifyContent: 'center',
            marginTop:      '3rem',
            paddingTop:     '2.5rem',
            borderTop:      '1px solid rgba(255,255,255,0.06)',
            flexWrap:       'wrap',
          }}
        >
          {[
            { value: '10,000+', label: 'Creators & Brands' },
            { value: '₹4Cr+',   label: 'Deals facilitated'  },
            { value: '98%',     label: 'On-time payments'   },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily:    "'Cormorant Garamond', serif",
                fontSize:      '1.6rem',
                fontWeight:    700,
                color:         '#ffffff',
                lineHeight:    1,
                marginBottom:  4,
              }}>
                {s.value}
              </div>
              <div style={{
                fontFamily:    "'DM Mono', monospace",
                fontSize:      '0.58rem',
                color:         'rgba(255,255,255,0.25)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  </section>
)

export default FinalCTA
