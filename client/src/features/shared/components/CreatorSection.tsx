// CreatorSection.tsx — Creator perspective
// Switches from brand view to creator view
// Left: strong editorial copy, Right: realistic creator UI mockup
// Answers: "What will I gain?" (for creators)

import React from 'react'
import { motion } from 'framer-motion'

// ─── Campaign feed item ───────────────────────────────────────────────────────
const CAMPAIGNS = [
  {
    brand:    'Nourish Organics',
    niche:    'Wellness',
    budget:   '₹15K–₹25K',
    deadline: '15 Jul',
    slots:    '3 slots left',
    nicho:    'hsl(150, 40%, 20%)',
    nichoText:'#6ee7b7',
  },
  {
    brand:    'Pureblend Coffee',
    niche:    'Food & Bev',
    budget:   '₹8K–₹12K',
    deadline: '20 Jul',
    slots:    '7 slots left',
    nicho:    'hsl(40, 40%, 18%)',
    nichoText:'#fbbf24',
  },
  {
    brand:    'ARYA Skincare',
    niche:    'Beauty',
    budget:   '₹18K–₹30K',
    deadline: '25 Jul',
    slots:    '2 slots left',
    nicho:    'hsl(280, 30%, 20%)',
    nichoText:'rgba(167,139,250,0.9)',
  },
]

const APPLICATIONS = [
  { name: 'Summer Glow',    status: 'Shortlisted',   color: '#6ee7b7'           },
  { name: 'FitLife Q3',     status: 'Under Review',  color: '#fbbf24'           },
  { name: 'AyurBliss',      status: 'Applied',       color: 'rgba(255,255,255,0.35)' },
]

const CreatorUI: React.FC = () => (
  <div style={{
    background:   '#111111',
    border:       '1px solid rgba(255,255,255,0.09)',
    borderRadius: '1rem',
    overflow:     'hidden',
  }}>
    {/* Top bar */}
    <div style={{
      background:    'rgba(10,10,10,0.6)',
      borderBottom:  '1px solid rgba(255,255,255,0.07)',
      padding:       '0.65rem 1rem',
      display:       'flex',
      alignItems:    'center',
      justifyContent:'space-between',
    }}>
      <span style={{
        fontFamily:    "'DM Mono', monospace",
        fontSize:      '0.62rem',
        color:         'rgba(255,255,255,0.3)',
        letterSpacing: '0.06em',
      }}>
        Creator Dashboard
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{
          width: 24, height: 24, borderRadius: '50%',
          background: 'hsl(200, 40%, 22%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Outfit', sans-serif", fontSize: '0.55rem', color: 'rgba(255,255,255,0.65)', fontWeight: 600,
        }}>KD</div>
        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)' }}>
          Karan Dev
        </span>
      </div>
    </div>

    {/* Earnings strip */}
    <div style={{
      padding:       '0.85rem 1rem',
      background:    'rgba(106,13,125,0.06)',
      borderBottom:  '1px solid rgba(106,13,125,0.15)',
      display:       'flex',
      alignItems:    'center',
      justifyContent:'space-between',
    }}>
      <div>
        <div style={{
          fontFamily:    "'DM Mono', monospace",
          fontSize:      '0.55rem',
          color:         'rgba(255,255,255,0.25)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom:  3,
        }}>
          Earned this month
        </div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize:   '1.55rem',
          fontWeight: 700,
          color:      '#fff',
          lineHeight: 1,
        }}>
          ₹48,500
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{
          fontFamily:    "'DM Mono', monospace",
          fontSize:      '0.55rem',
          color:         'rgba(255,255,255,0.25)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom:  3,
        }}>
          In escrow
        </div>
        <div style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize:   '1rem',
          fontWeight: 600,
          color:      '#6ee7b7',
        }}>
          ₹20,000
        </div>
      </div>
    </div>

    {/* Campaign feed header */}
    <div style={{
      padding:    '0.7rem 1rem 0.4rem',
      fontFamily: "'DM Mono', monospace",
      fontSize:   '0.58rem',
      color:      'rgba(255,255,255,0.25)',
      letterSpacing:'0.1em',
      textTransform:'uppercase',
    }}>
      Available Campaigns
    </div>

    {/* Campaign cards */}
    {CAMPAIGNS.map((c, i) => (
      <div key={c.brand} style={{
        padding:      '0.75rem 1rem',
        borderTop:    '1px solid rgba(255,255,255,0.05)',
        display:      'flex',
        alignItems:   'center',
        gap:          '0.75rem',
      }}>
        {/* Brand initial */}
        <div style={{
          width: 32, height: 32, borderRadius: 6,
          background: c.nicho, border: `1px solid ${c.nichoText}33`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Outfit', sans-serif", fontSize: '0.6rem', fontWeight: 700,
          color: c.nichoText, flexShrink: 0,
        }}>
          {c.brand[0]}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: 2 }}>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {c.brand}
            </span>
            <span style={{
              fontFamily:    "'DM Mono', monospace",
              fontSize:      '0.55rem',
              color:         c.nichoText,
              background:    `${c.nichoText}15`,
              borderRadius:  999,
              padding:       '1px 7px',
              flexShrink:    0,
            }}>
              {c.niche}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', color: 'rgba(255,255,255,0.38)' }}>{c.budget}</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', color: 'rgba(255,255,255,0.22)' }}>Due {c.deadline}</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', color: 'rgba(255,255,255,0.2)' }}>{c.slots}</span>
          </div>
        </div>
        <button style={{
          fontFamily:  "'Outfit', sans-serif",
          fontSize:    '0.7rem',
          fontWeight:  600,
          padding:     '0.35rem 0.75rem',
          borderRadius:999,
          border:      '1px solid rgba(106,13,125,0.5)',
          background:  'rgba(106,13,125,0.12)',
          color:       'rgba(167,139,250,0.85)',
          cursor:      'default',
          flexShrink:  0,
        }}>
          Apply
        </button>
      </div>
    ))}

    {/* Applications section */}
    <div style={{ padding: '0.5rem 1rem 0.3rem', borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: '0.25rem' }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
        My Applications ({APPLICATIONS.length})
      </div>
      {APPLICATIONS.map(a => (
        <div key={a.name} style={{
          display:      'flex',
          alignItems:   'center',
          justifyContent:'space-between',
          padding:      '0.35rem 0',
        }}>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)' }}>
            {a.name}
          </span>
          <span style={{
            fontFamily:    "'DM Mono', monospace",
            fontSize:      '0.58rem',
            color:         a.color,
            letterSpacing: '0.04em',
          }}>
            {a.status}
          </span>
        </div>
      ))}
    </div>
  </div>
)

// ─── Main component ───────────────────────────────────────────────────────────
const CreatorSection: React.FC = () => (
  <section
    id="for-creators"
    style={{
      padding:   '7rem 2rem 8rem',
      boxSizing: 'border-box',
      background:'rgba(6,6,6,0.92)',
    }}
  >
    {/* Top border */}
    <div style={{
      position:   'absolute',
      left:       '50%',
      transform:  'translateX(-50%)',
      width:      '60%',
      height:     1,
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)',
    }} />

    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div style={{
        display:             'grid',
        gridTemplateColumns: '1fr 1fr',
        gap:                 '5rem',
        alignItems:          'center',
      }}
        className="creator-grid"
      >
        {/* Left: UI mockup */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <CreatorUI />
        </motion.div>

        {/* Right: copy */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <span style={{
            fontFamily:    "'DM Mono', monospace",
            fontSize:      '0.62rem',
            color:         'rgba(255,255,255,0.25)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            display:       'block',
            marginBottom:  '1.5rem',
          }}>
            For Creators
          </span>
          <h2 style={{
            fontFamily:    "'Cormorant Garamond', serif",
            fontSize:      'clamp(2rem, 3.2vw, 3.2rem)',
            fontWeight:    700,
            color:         '#ffffff',
            lineHeight:    1.1,
            letterSpacing: '-0.02em',
            marginBottom:  '1.5rem',
          }}>
            Work with brands<br />
            <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.38)' }}>
              on your own terms.
            </em>
          </h2>

          {[
            {
              title: 'Browse campaigns that fit you',
              body: "See budgets, timelines, and brand expectations upfront. Apply to what makes sense for your audience — not whatever lands in your DMs.",
            },
            {
              title: 'Negotiate without awkwardness',
              body: "Set your rate when you apply. Brands see it. If they want to work with you, they accept. No back-and-forth over WhatsApp.",
            },
            {
              title: 'Get paid on time, every time',
              body: "Payment is in escrow before you start. Once you deliver approved content, the money releases. You'll never chase an invoice again.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display:      'flex',
                gap:          '1rem',
                marginBottom: '1.5rem',
              }}
            >
              <div style={{
                width:         20,
                height:        20,
                borderRadius:  '50%',
                background:    'rgba(106,13,125,0.2)',
                border:        '1px solid rgba(106,13,125,0.4)',
                display:       'flex',
                alignItems:    'center',
                justifyContent:'center',
                flexShrink:    0,
                marginTop:     3,
              }}>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <polyline points="1.5,4 3,5.5 6.5,2" stroke="#6A0D7D" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div style={{
                  fontFamily:    "'Outfit', sans-serif",
                  fontSize:      '0.92rem',
                  fontWeight:    600,
                  color:         'rgba(255,255,255,0.82)',
                  marginBottom:  '0.3rem',
                }}>
                  {item.title}
                </div>
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize:   '0.85rem',
                  color:      'rgba(255,255,255,0.38)',
                  lineHeight: 1.65,
                  fontWeight: 300,
                }}>
                  {item.body}
                </div>
              </div>
            </motion.div>
          ))}

          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{
              marginTop:     '0.5rem',
              fontFamily:    "'Outfit', sans-serif",
              fontSize:      '0.88rem',
              fontWeight:    600,
              padding:       '0.75rem 1.8rem',
              borderRadius:  999,
              border:        '1px solid rgba(106,13,125,0.5)',
              background:    'rgba(106,13,125,0.1)',
              color:         'rgba(167,139,250,0.9)',
              cursor:        'pointer',
              letterSpacing: '0.02em',
              transition:    'border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(106,13,125,0.8)'
              e.currentTarget.style.background  = 'rgba(106,13,125,0.18)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(106,13,125,0.5)'
              e.currentTarget.style.background  = 'rgba(106,13,125,0.1)'
            }}
          >
            Join as Creator ↗
          </motion.button>
        </motion.div>
      </div>
    </div>

    <style>{`
      @media (max-width: 800px) {
        .creator-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
      }
    `}</style>
  </section>
)

export default CreatorSection
