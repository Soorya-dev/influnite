// DashboardSection.tsx — Brand dashboard preview
// Full-width realistic dashboard wrapped in browser chrome
// Shows the actual product, not a marketing description
// Answers: "What will I gain?"

import React from 'react'
import { motion } from 'framer-motion'

// ─── Bar chart data ───────────────────────────────────────────────────────────
const CHART_DATA = [
  { week: 'W1', reach: 58, eng: 34 },
  { week: 'W2', reach: 74, eng: 50 },
  { week: 'W3', reach: 66, eng: 44 },
  { week: 'W4', reach: 88, eng: 62 },
  { week: 'W5', reach: 80, eng: 68 },
  { week: 'W6', reach: 94, eng: 76 },
  { week: 'W7', reach: 84, eng: 63 },
  { week: 'W8', reach: 100, eng: 84 },
]

const CHART_H   = 120
const BAR_W     = 18
const BAR_GAP   = 14
const STEP_W    = BAR_W + BAR_GAP

const BarChart: React.FC = () => (
  <svg
    viewBox={`0 0 ${STEP_W * 8 + 4} ${CHART_H + 28}`}
    style={{ width: '100%', display: 'block' }}
  >
    {CHART_DATA.map((d, i) => {
      const x   = i * STEP_W + 2
      const rH  = (d.reach / 100) * CHART_H
      const eH  = (d.eng   / 100) * CHART_H
      return (
        <g key={d.week}>
          {/* Reach bar */}
          <rect
            x={x} y={CHART_H - rH} width={BAR_W} height={rH}
            fill="rgba(255,255,255,0.07)" rx={3}
          />
          {/* Engagement bar */}
          <rect
            x={x} y={CHART_H - eH} width={BAR_W} height={eH}
            fill="rgba(106,13,125,0.55)" rx={3}
          />
          <text
            x={x + BAR_W / 2} y={CHART_H + 18}
            textAnchor="middle"
            fill="rgba(255,255,255,0.2)"
            fontSize={8}
            fontFamily="DM Mono, monospace"
          >
            {d.week}
          </text>
        </g>
      )
    })}
  </svg>
)

// ─── Sidebar nav ──────────────────────────────────────────────────────────────
const NAV_ITEMS = ['Campaigns', 'Creators', 'Messages', 'Payments', 'Analytics', 'Settings']

const Sidebar: React.FC = () => (
  <div style={{
    width:         168,
    flexShrink:    0,
    borderRight:   '1px solid rgba(255,255,255,0.07)',
    background:    'rgba(10,10,10,0.6)',
    display:       'flex',
    flexDirection: 'column',
    padding:       '1rem 0',
  }}>
    {/* Logo */}
    <div style={{
      padding:       '0 1rem 1rem',
      borderBottom:  '1px solid rgba(255,255,255,0.06)',
      marginBottom:  '0.75rem',
    }}>
      <span style={{
        fontFamily:    "'Cormorant Garamond', serif",
        fontSize:      '1rem',
        fontWeight:    700,
        background:    'linear-gradient(135deg, #a78bfa 0%, #6A0D7D 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        Influnite
      </span>
    </div>

    {NAV_ITEMS.map((item, i) => (
      <div key={item} style={{
        padding:         '0.45rem 1rem',
        margin:          '0 0.5rem',
        borderRadius:    6,
        background:      i === 0 ? 'rgba(106,13,125,0.2)' : 'transparent',
        display:         'flex',
        alignItems:      'center',
        gap:             '0.5rem',
        cursor:          'default',
        marginBottom:    2,
      }}>
        <div style={{
          width: 5, height: 5, borderRadius: '50%',
          background: i === 0 ? '#6A0D7D' : 'rgba(255,255,255,0.2)',
          flexShrink: 0,
        }} />
        <span style={{
          fontFamily:    "'Outfit', sans-serif",
          fontSize:      '0.75rem',
          color:         i === 0 ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.35)',
          fontWeight:    i === 0 ? 500 : 400,
        }}>
          {item}
        </span>
      </div>
    ))}

    {/* User profile */}
    <div style={{ marginTop: 'auto', padding: '0.75rem 1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{
          width: 26, height: 26, borderRadius: '50%',
          background: 'rgba(106,13,125,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Outfit', sans-serif", fontSize: '0.58rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600,
        }}>MA</div>
        <div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)' }}>
            Meera Arora
          </div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.55rem', color: 'rgba(255,255,255,0.25)', marginTop: 1 }}>
            Admin
          </div>
        </div>
      </div>
    </div>
  </div>
)

// ─── Stat card ────────────────────────────────────────────────────────────────
const StatCard: React.FC<{ label: string; value: string; sub?: string; accent?: boolean }> = ({
  label, value, sub, accent,
}) => (
  <div style={{
    background:   '#111111',
    border:       `1px solid ${accent ? 'rgba(106,13,125,0.3)' : 'rgba(255,255,255,0.07)'}`,
    borderRadius: 8,
    padding:      '0.85rem 1rem',
    flex:         1,
    minWidth:     0,
  }}>
    <div style={{
      fontFamily:    "'DM Mono', monospace",
      fontSize:      '0.58rem',
      color:         'rgba(255,255,255,0.3)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      marginBottom:  6,
    }}>
      {label}
    </div>
    <div style={{
      fontFamily: "'Outfit', sans-serif",
      fontSize:   '1.4rem',
      fontWeight: 600,
      color:      accent ? 'rgba(167,139,250,0.9)' : '#ffffff',
      lineHeight: 1,
      marginBottom: sub ? 4 : 0,
    }}>
      {value}
    </div>
    {sub && (
      <div style={{
        fontFamily: "'DM Mono', monospace",
        fontSize:   '0.58rem',
        color:      'rgba(255,255,255,0.22)',
        marginTop:  2,
      }}>
        {sub}
      </div>
    )}
  </div>
)

// ─── Campaigns table ──────────────────────────────────────────────────────────
const CAMPAIGNS = [
  { name: 'Summer Glow 2025',   creators: 8,  budget: '₹45,000',   status: 'Active',    color: '#6ee7b7'   },
  { name: 'Brand Launch — Q3',  creators: 3,  budget: '₹1,20,000', status: 'In Review', color: '#fbbf24'   },
  { name: 'Festive Push 2025',  creators: 12, budget: '₹2,50,000', status: 'Planning',  color: 'rgba(255,255,255,0.3)' },
]

const CampaignsTable: React.FC = () => (
  <div>
    {/* Table header */}
    <div style={{
      display:       'grid',
      gridTemplateColumns: '1fr 80px 100px 90px',
      padding:       '0.4rem 0.75rem',
      borderBottom:  '1px solid rgba(255,255,255,0.06)',
    }}>
      {['Campaign', 'Creators', 'Budget', 'Status'].map(h => (
        <span key={h} style={{
          fontFamily:    "'DM Mono', monospace",
          fontSize:      '0.55rem',
          color:         'rgba(255,255,255,0.22)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}>
          {h}
        </span>
      ))}
    </div>
    {CAMPAIGNS.map((c, i) => (
      <div key={c.name} style={{
        display:             'grid',
        gridTemplateColumns: '1fr 80px 100px 90px',
        padding:             '0.6rem 0.75rem',
        borderBottom:        i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none',
        alignItems:          'center',
      }}>
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize:   '0.8rem',
          color:      'rgba(255,255,255,0.7)',
          fontWeight: 400,
        }}>{c.name}</span>
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize:   '0.7rem',
          color:      'rgba(255,255,255,0.35)',
        }}>{c.creators}</span>
        <span style={{
          fontFamily:    "'DM Mono', monospace",
          fontSize:      '0.72rem',
          color:         'rgba(255,255,255,0.5)',
          letterSpacing: '0.02em',
        }}>{c.budget}</span>
        <span style={{
          fontFamily:    "'DM Mono', monospace",
          fontSize:      '0.6rem',
          color:         c.color,
          letterSpacing: '0.06em',
        }}>{c.status}</span>
      </div>
    ))}
  </div>
)

// ─── Needs attention panel ────────────────────────────────────────────────────
const ATTENTION = [
  { label: 'Content waiting for review', count: 3, color: '#fbbf24' },
  { label: 'Escrow ready to release',    count: 1, color: '#6ee7b7' },
  { label: 'Contracts pending sign',     count: 2, color: 'rgba(167,139,250,0.8)' },
]

const AttentionPanel: React.FC = () => (
  <div>
    {ATTENTION.map((a, i) => (
      <div key={a.label} style={{
        display:       'flex',
        alignItems:    'center',
        gap:           '0.65rem',
        padding:       '0.6rem 0',
        borderBottom:  i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
      }}>
        <div style={{
          width:         28,
          height:        28,
          borderRadius:  6,
          background:    `${a.color}1a`,
          border:        `1px solid ${a.color}33`,
          display:       'flex',
          alignItems:    'center',
          justifyContent:'center',
          flexShrink:    0,
          fontFamily:    "'DM Mono', monospace",
          fontSize:      '0.7rem',
          color:         a.color,
        }}>
          {a.count}
        </div>
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize:   '0.78rem',
          color:      'rgba(255,255,255,0.45)',
          lineHeight: 1.35,
        }}>
          {a.label}
        </span>
      </div>
    ))}
  </div>
)

// ─── Main component ───────────────────────────────────────────────────────────
const DashboardSection: React.FC = () => (
  <section
    id="dashboard"
    style={{
      padding:   '7rem 2rem 8rem',
      boxSizing: 'border-box',
    }}
  >
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: '3rem', maxWidth: 580 }}
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
          Brand Dashboard
        </span>
        <h2 style={{
          fontFamily:    "'Cormorant Garamond', serif",
          fontSize:      'clamp(2rem, 3.2vw, 3.2rem)',
          fontWeight:    700,
          color:         '#ffffff',
          lineHeight:    1.1,
          letterSpacing: '-0.02em',
          marginBottom:  '0.9rem',
        }}>
          Your campaigns, your creators,<br />
          <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.42)' }}>
            your budget — in one view.
          </em>
        </h2>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize:   '0.95rem',
          color:      'rgba(255,255,255,0.38)',
          lineHeight: 1.7,
          fontWeight: 300,
        }}>
          No exports. No status meetings. Everything your team needs to run campaigns is visible from the moment you log in.
        </p>
      </motion.div>

      {/* Dashboard preview */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Browser chrome */}
        <div style={{
          borderRadius: '1rem',
          overflow:     'hidden',
          border:       '1px solid rgba(255,255,255,0.1)',
          boxShadow:    '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)',
        }}>
          {/* Top chrome bar */}
          <div style={{
            height:      40,
            background:  '#1a1a1a',
            borderBottom:'1px solid rgba(255,255,255,0.07)',
            display:     'flex',
            alignItems:  'center',
            padding:     '0 1rem',
            gap:         '0.5rem',
          }}>
            {['#FF5F57','#FFBD2E','#28C840'].map(c => (
              <span key={c} style={{
                width: 10, height: 10, borderRadius: '50%',
                background: c, opacity: 0.8, flexShrink: 0,
              }} />
            ))}
            <div style={{
              flex:          1,
              display:       'flex',
              justifyContent:'center',
            }}>
              <div style={{
                background:    'rgba(255,255,255,0.05)',
                border:        '1px solid rgba(255,255,255,0.08)',
                borderRadius:  999,
                padding:       '3px 20px',
                fontFamily:    "'DM Mono', monospace",
                fontSize:      '0.6rem',
                color:         'rgba(255,255,255,0.25)',
                letterSpacing: '0.04em',
              }}>
                app.influnite.io/dashboard
              </div>
            </div>
          </div>

          {/* Dashboard body */}
          <div style={{ display: 'flex', height: 460, background: '#0d0d0d' }}>
            <Sidebar />

            {/* Main content */}
            <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {/* Greeting bar */}
              <div style={{
                padding:       '0.85rem 1.25rem',
                borderBottom:  '1px solid rgba(255,255,255,0.06)',
                display:       'flex',
                alignItems:    'center',
                justifyContent:'space-between',
              }}>
                <div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.88rem', color: '#fff', fontWeight: 500 }}>
                    Good morning, Meera.
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', color: 'rgba(255,255,255,0.25)', marginTop: 2 }}>
                    Monday, 7 July 2025 · 3 items need your attention
                  </div>
                </div>
                <div style={{
                  fontFamily:    "'Outfit', sans-serif",
                  fontSize:      '0.75rem',
                  fontWeight:    600,
                  padding:       '0.38rem 0.9rem',
                  borderRadius:  999,
                  border:        'none',
                  background:    '#6A0D7D',
                  color:         '#fff',
                  cursor:        'default',
                }}>
                  + New Campaign
                </div>
              </div>

              {/* Scroll content */}
              <div style={{ flex: 1, overflow: 'auto', padding: '1rem 1.25rem' }}>
                {/* Stat cards */}
                <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '1rem' }}>
                  <StatCard label="Active Campaigns"  value="12" />
                  <StatCard label="Creators Working"  value="47"   sub="+8 this month" />
                  <StatCard label="Budget Used"       value="₹2.4L" sub="of ₹5L total" accent />
                  <StatCard label="Pending Reviews"   value="3" />
                </div>

                {/* Middle row: chart + attention */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '0.65rem', marginBottom: '1rem' }}>
                  {/* Chart panel */}
                  <div style={{
                    background:   '#111111',
                    border:       '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 8,
                    padding:      '0.75rem 0.85rem',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em' }}>
                        CAMPAIGN PERFORMANCE
                      </span>
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        {[{ label: 'Reach', color: 'rgba(255,255,255,0.3)' }, { label: 'Engagement', color: 'rgba(106,13,125,0.8)' }].map(l => (
                          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <div style={{ width: 8, height: 8, borderRadius: 2, background: l.color }} />
                            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.55rem', color: 'rgba(255,255,255,0.25)' }}>
                              {l.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <BarChart />
                  </div>

                  {/* Needs attention panel */}
                  <div style={{
                    background:   '#111111',
                    border:       '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 8,
                    padding:      '0.75rem 0.85rem',
                  }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em', display: 'block', marginBottom: '0.5rem' }}>
                      NEEDS ATTENTION
                    </span>
                    <AttentionPanel />
                  </div>
                </div>

                {/* Recent campaigns table */}
                <div style={{
                  background:   '#111111',
                  border:       '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 8,
                  padding:      '0.75rem 0',
                }}>
                  <div style={{ padding: '0 0.75rem 0.5rem', fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em' }}>
                    RECENT CAMPAIGNS
                  </div>
                  <CampaignsTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
)

export default DashboardSection
