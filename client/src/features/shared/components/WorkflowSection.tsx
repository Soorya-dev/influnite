// WorkflowSection.tsx — Visual product workflow
// Shows exactly what happens inside Influnite, step by step
// Each card is a realistic mini product UI mockup
// Vertical timeline with alternating left/right cards on desktop
// Answers: "What happens next?"

import React from 'react'
import { motion } from 'framer-motion'

// ─── Shared mini-UI building blocks ─────────────────────────────────────────

const UICard: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{
    background:    '#111111',
    border:        '1px solid rgba(255,255,255,0.09)',
    borderRadius:  '0.875rem',
    overflow:      'hidden',
    ...style,
  }}>
    {children}
  </div>
)

const UIHeader: React.FC<{ title: string; badge?: string; badgeColor?: string }> = ({ title, badge, badgeColor = '#6A0D7D' }) => (
  <div style={{
    padding:        '0.85rem 1.1rem',
    borderBottom:   '1px solid rgba(255,255,255,0.07)',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'space-between',
    background:     'rgba(255,255,255,0.02)',
  }}>
    <span style={{
      fontFamily:    "'DM Mono', monospace",
      fontSize:      '0.65rem',
      color:         'rgba(255,255,255,0.4)',
      letterSpacing: '0.06em',
    }}>
      {title}
    </span>
    {badge && (
      <span style={{
        fontFamily:    "'DM Mono', monospace",
        fontSize:      '0.58rem',
        color:         badgeColor,
        background:    `${badgeColor}1a`,
        border:        `1px solid ${badgeColor}44`,
        borderRadius:  999,
        padding:       '2px 8px',
        letterSpacing: '0.06em',
      }}>
        {badge}
      </span>
    )}
  </div>
)

const UIField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div style={{ marginBottom: '0.85rem' }}>
    <div style={{
      fontFamily:    "'DM Mono', monospace",
      fontSize:      '0.58rem',
      color:         'rgba(255,255,255,0.28)',
      letterSpacing: '0.08em',
      marginBottom:  4,
      textTransform: 'uppercase',
    }}>
      {label}
    </div>
    <div style={{
      background:   'rgba(255,255,255,0.04)',
      border:       '1px solid rgba(255,255,255,0.09)',
      borderRadius: 6,
      padding:      '0.5rem 0.75rem',
      fontFamily:   "'Outfit', sans-serif",
      fontSize:     '0.85rem',
      color:        'rgba(255,255,255,0.75)',
    }}>
      {value}
    </div>
  </div>
)

const UIButton: React.FC<{ children: React.ReactNode; accent?: boolean; small?: boolean }> = ({
  children, accent = false, small = false,
}) => (
  <button style={{
    fontFamily:    "'Outfit', sans-serif",
    fontSize:      small ? '0.75rem' : '0.82rem',
    fontWeight:    accent ? 600 : 400,
    padding:       small ? '0.4rem 0.85rem' : '0.6rem 1.1rem',
    borderRadius:  999,
    border:        accent ? 'none' : '1px solid rgba(255,255,255,0.14)',
    background:    accent ? '#6A0D7D' : 'transparent',
    color:         accent ? '#fff' : 'rgba(255,255,255,0.55)',
    cursor:        'pointer',
    letterSpacing: '0.01em',
  }}>
    {children}
  </button>
)

// ─── Step 1: Create Campaign ─────────────────────────────────────────────────
const Step1Card: React.FC = () => (
  <UICard>
    <UIHeader title="New Campaign" badge="Draft" />
    <div style={{ padding: '1.1rem' }}>
      <UIField label="Campaign name" value="Summer Glow 2025" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
        <UIField label="Niche" value="Beauty & Skincare" />
        <UIField label="Budget" value="₹ 75,000" />
      </div>
      <UIButton accent>Continue →</UIButton>
    </div>
  </UICard>
)

// ─── Step 2: Creators Apply ──────────────────────────────────────────────────
const APPLICANTS = [
  { name: 'Priya Sharma',   followers: '94.2K',  rate: '₹12K',  engagement: '8.4%' },
  { name: 'Karan Dev',      followers: '148K',   rate: '₹20K',  engagement: '6.2%' },
  { name: 'Meera Nair',     followers: '67.8K',  rate: '₹8K',   engagement: '9.1%' },
]

const Step2Card: React.FC = () => (
  <UICard>
    <UIHeader title="Applicants" badge="24 new" badgeColor="#6ee7b7" />
    <div style={{ padding: '0.5rem 0' }}>
      {APPLICANTS.map((a, i) => (
        <div key={a.name} style={{
          display:      'flex',
          alignItems:   'center',
          gap:          '0.75rem',
          padding:      '0.65rem 1.1rem',
          borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
        }}>
          {/* Avatar circle */}
          <div style={{
            width:        30,
            height:       30,
            borderRadius: '50%',
            background:   `hsl(${[280, 200, 150][i]}, 40%, 25%)`,
            flexShrink:   0,
            display:      'flex',
            alignItems:   'center',
            justifyContent:'center',
            fontFamily:   "'Outfit', sans-serif",
            fontSize:     '0.6rem',
            color:        'rgba(255,255,255,0.7)',
            fontWeight:   600,
          }}>
            {a.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize:   '0.82rem',
              color:      'rgba(255,255,255,0.78)',
              fontWeight: 500,
            }}>
              {a.name}
            </div>
            <div style={{
              fontFamily:    "'DM Mono', monospace",
              fontSize:      '0.6rem',
              color:         'rgba(255,255,255,0.28)',
              letterSpacing: '0.04em',
              marginTop:     2,
            }}>
              {a.followers} · {a.engagement}
            </div>
          </div>
          <div style={{
            fontFamily:    "'DM Mono', monospace",
            fontSize:      '0.68rem',
            color:         '#6ee7b7',
          }}>
            {a.rate}
          </div>
        </div>
      ))}
      <div style={{
        padding:    '0.6rem 1.1rem',
        fontFamily: "'Outfit', sans-serif",
        fontSize:   '0.78rem',
        color:      'rgba(255,255,255,0.25)',
      }}>
        + 21 more applicants
      </div>
    </div>
  </UICard>
)

// ─── Step 3: Review Profiles ─────────────────────────────────────────────────
const STATS_3 = [
  { label: 'Followers',          value: '94,200'    },
  { label: 'Avg. Engagement',    value: '8.4%'      },
  { label: 'Female Audience',    value: '76%'       },
  { label: 'Rate per post',      value: '₹10K–₹15K' },
]

const Step3Card: React.FC = () => (
  <UICard>
    <UIHeader title="Creator Profile" />
    <div style={{ padding: '1.1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.1rem' }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: 'hsl(280, 40%, 25%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Outfit', sans-serif",
          fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600,
        }}>PS</div>
        <div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.88rem', color: '#fff', fontWeight: 500 }}>
            Priya Sharma
          </div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em', marginTop: 2 }}>
            Beauty Creator · Mumbai
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '1rem' }}>
        {STATS_3.map(s => (
          <div key={s.label} style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 6, padding: '0.5rem 0.7rem',
          }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.06em', marginBottom: 3 }}>
              {s.label}
            </div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.88rem', color: '#fff', fontWeight: 500 }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '0.6rem' }}>
        <UIButton small>Skip</UIButton>
        <UIButton small accent>Shortlist →</UIButton>
      </div>
    </div>
  </UICard>
)

// ─── Step 4: Approve Content ─────────────────────────────────────────────────
const Step4Card: React.FC = () => (
  <UICard>
    <UIHeader title="Content Review" />
    <div style={{ padding: '1.1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.9rem' }}>
        <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'hsl(280, 40%, 25%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Outfit', sans-serif", fontSize: '0.55rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>PS</div>
        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)' }}>
          Priya Sharma · Instagram Reel
        </span>
      </div>

      {/* Content preview box */}
      <div style={{
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 8, padding: '1rem', marginBottom: '0.9rem',
        display: 'flex', alignItems: 'center', gap: '0.75rem',
      }}>
        <div style={{
          width: 38, height: 38, borderRadius: 8,
          background: 'rgba(106,13,125,0.25)', border: '1px solid rgba(106,13,125,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,0.8)" strokeWidth="2">
            <polygon points="5,3 19,12 5,21" fill="rgba(167,139,250,0.5)" />
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', color: 'rgba(255,255,255,0.55)' }}>
            summer_collab_v2.mp4
          </div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', color: 'rgba(255,255,255,0.25)', marginTop: 2 }}>
            Duration: 0:32
          </div>
        </div>
      </div>

      {/* Checks */}
      {['Caption approved', 'Hashtags approved', 'Brand mention verified'].map(c => (
        <div key={c} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5.5" fill="rgba(110,231,183,0.15)" stroke="rgba(110,231,183,0.4)" />
            <polyline points="3,6 5,8 9,4" stroke="#6ee7b7" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.78rem', color: 'rgba(255,255,255,0.42)' }}>
            {c}
          </span>
        </div>
      ))}

      <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem' }}>
        <UIButton small>Request changes</UIButton>
        <UIButton small accent>Approve ✓</UIButton>
      </div>
    </div>
  </UICard>
)

// ─── Step 5: Release Payment ─────────────────────────────────────────────────
const Step5Card: React.FC = () => (
  <UICard>
    <UIHeader title="Escrow Release" badge="Ready" badgeColor="#6ee7b7" />
    <div style={{ padding: '1.25rem 1.1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.1rem' }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="6.5" fill="rgba(110,231,183,0.12)" stroke="rgba(110,231,183,0.5)" />
          <polyline points="4,7 6,9 10,5" stroke="#6ee7b7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.8rem', color: '#6ee7b7' }}>
          Content approved 2 hours ago
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'hsl(280, 40%, 25%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Outfit', sans-serif", fontSize: '0.6rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>PS</div>
        <div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.85rem', color: '#fff', fontWeight: 500 }}>
            Priya Sharma
          </div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>
            Summer Glow 2025
          </div>
        </div>
      </div>

      <div style={{
        fontFamily:    "'Cormorant Garamond', serif",
        fontSize:      '2.4rem',
        fontWeight:    700,
        color:         '#ffffff',
        lineHeight:    1,
        marginBottom:  '0.35rem',
      }}>
        ₹12,000
      </div>
      <div style={{
        fontFamily:    "'DM Mono', monospace",
        fontSize:      '0.6rem',
        color:         'rgba(255,255,255,0.28)',
        letterSpacing: '0.06em',
        marginBottom:  '1.25rem',
      }}>
        HELD IN ESCROW
      </div>

      <UIButton accent>Release Payment →</UIButton>
    </div>
  </UICard>
)

// ─── Steps data ──────────────────────────────────────────────────────────────
const STEPS = [
  {
    num:    '01',
    title:  'Create a campaign brief',
    desc:   "Set your budget, niche, and what you need from creators. The brief stays structured so everyone's on the same page.",
    Card:   Step1Card,
    right:  false,
  },
  {
    num:    '02',
    title:  'Creators apply directly',
    desc:   'Creators on the platform apply to campaigns that match their niche. No cold outreach. No spreadsheets of contacts.',
    Card:   Step2Card,
    right:  true,
  },
  {
    num:    '03',
    title:  'Review and shortlist',
    desc:   "See engagement rate, audience breakdown, and rate — not just follower count. Pick who actually fits.",
    Card:   Step3Card,
    right:  false,
  },
  {
    num:    '04',
    title:  'Approve content before it goes live',
    desc:   'Creators upload content for review inside the platform. You approve it, request changes, or decline — all in one thread.',
    Card:   Step4Card,
    right:  true,
  },
  {
    num:    '05',
    title:  'Release payment on approval',
    desc:   "Funds sit in escrow until you're satisfied. One click to release. No bank transfers, no chasing invoices.",
    Card:   Step5Card,
    right:  false,
  },
]

// ─── Main component ──────────────────────────────────────────────────────────
const WorkflowSection: React.FC = () => (
  <section
    id="how-it-works"
    style={{
      position:  'relative',
      padding:   '7rem 2rem 8rem',
      boxSizing: 'border-box',
      background:'rgba(6,6,6,0.92)',
    }}
  >
    {/* Top border */}
    <div style={{
      position:   'absolute',
      top:        0,
      left:       '50%',
      transform:  'translateX(-50%)',
      width:      '60%',
      height:     1,
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)',
    }} />

    <div style={{ maxWidth: 1100, margin: '0 auto' }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: 'center', marginBottom: '5rem' }}
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
          How It Works
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
          Five steps from brief to payment
        </h2>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize:   '0.95rem',
          color:      'rgba(255,255,255,0.38)',
          maxWidth:   460,
          margin:     '0 auto',
          lineHeight: 1.7,
          fontWeight: 300,
        }}>
          No middlemen. No guessing. The platform handles the workflow so you can focus on the work.
        </p>
      </motion.div>

      {/* Timeline */}
      <div style={{ position: 'relative' }}>
        {/* Center line */}
        <div style={{
          position:   'absolute',
          left:       '50%',
          top:        0,
          bottom:     0,
          width:      1,
          background: 'rgba(255,255,255,0.07)',
          transform:  'translateX(-50%)',
        }} />

        {STEPS.map((step, idx) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display:       'grid',
              gridTemplateColumns: '1fr 56px 1fr',
              gap:           '2rem',
              alignItems:    'center',
              marginBottom:  idx < STEPS.length - 1 ? '3.5rem' : 0,
            }}
            className="workflow-step"
          >
            {/* Left slot */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {!step.right && (
                <div style={{ maxWidth: 340 }}>
                  <div style={{
                    fontFamily:    "'DM Mono', monospace",
                    fontSize:      '0.6rem',
                    color:         'rgba(106,13,125,0.7)',
                    letterSpacing: '0.1em',
                    marginBottom:  '0.6rem',
                  }}>
                    {step.num}
                  </div>
                  <h3 style={{
                    fontFamily:    "'Cormorant Garamond', serif",
                    fontSize:      '1.45rem',
                    fontWeight:    700,
                    color:         '#ffffff',
                    lineHeight:    1.2,
                    marginBottom:  '0.65rem',
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize:   '0.85rem',
                    color:      'rgba(255,255,255,0.4)',
                    lineHeight: 1.7,
                    fontWeight: 300,
                  }}>
                    {step.desc}
                  </p>
                </div>
              )}
              {step.right && (
                <div style={{ maxWidth: 320 }}>
                  <step.Card />
                </div>
              )}
            </div>

            {/* Center dot */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width:         40,
                height:        40,
                borderRadius:  '50%',
                background:    '#080808',
                border:        '2px solid rgba(106,13,125,0.5)',
                display:       'flex',
                alignItems:    'center',
                justifyContent:'center',
                flexShrink:    0,
                boxShadow:     '0 0 20px rgba(106,13,125,0.2)',
              }}>
                <span style={{
                  fontFamily:    "'DM Mono', monospace",
                  fontSize:      '0.7rem',
                  color:         '#6A0D7D',
                  letterSpacing: '0.04em',
                }}>
                  {idx + 1}
                </span>
              </div>
            </div>

            {/* Right slot */}
            <div>
              {step.right && (
                <div style={{ maxWidth: 340 }}>
                  <div style={{
                    fontFamily:    "'DM Mono', monospace",
                    fontSize:      '0.6rem',
                    color:         'rgba(106,13,125,0.7)',
                    letterSpacing: '0.1em',
                    marginBottom:  '0.6rem',
                  }}>
                    {step.num}
                  </div>
                  <h3 style={{
                    fontFamily:    "'Cormorant Garamond', serif",
                    fontSize:      '1.45rem',
                    fontWeight:    700,
                    color:         '#ffffff',
                    lineHeight:    1.2,
                    marginBottom:  '0.65rem',
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize:   '0.85rem',
                    color:      'rgba(255,255,255,0.4)',
                    lineHeight: 1.7,
                    fontWeight: 300,
                  }}>
                    {step.desc}
                  </p>
                </div>
              )}
              {!step.right && (
                <div style={{ maxWidth: 320 }}>
                  <step.Card />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    <style>{`
      @media (max-width: 860px) {
        .workflow-step {
          grid-template-columns: 1fr !important;
          gap: 1.5rem !important;
        }
        .workflow-step > :nth-child(2) { display: none; }
      }
    `}</style>
  </section>
)

export default WorkflowSection
