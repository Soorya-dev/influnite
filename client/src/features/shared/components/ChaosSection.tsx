// ChaosSection.tsx — The Problem section
// Editorial, text-forward layout showing the fragmented status quo
// No fake app screenshots — honest numbered list + strong copy
// Answers: "Why is this easier?"

import React from 'react'
import { motion } from 'framer-motion'

const STEPS = [
  { num: '01', action: 'Find potential creators',               tool: 'Instagram / TikTok'    },
  { num: '02', action: 'Reach out to each one manually',        tool: 'Instagram DMs'          },
  { num: '03', action: 'Agree on pricing and scope',            tool: 'WhatsApp'               },
  { num: '04', action: 'Send the campaign brief',               tool: 'Email'                  },
  { num: '05', action: 'Get contracts reviewed and signed',     tool: 'DocuSign / Docs'        },
  { num: '06', action: 'Track who has posted what',             tool: 'Google Sheets'          },
  { num: '07', action: 'Follow up on missing content',          tool: 'WhatsApp (again)'       },
  { num: '08', action: 'Request revisions',                     tool: 'DMs, Email, calls'      },
  { num: '09', action: 'Transfer payment manually',             tool: 'PayPal / Bank Transfer' },
  { num: '10', action: 'Try to measure what actually worked',   tool: 'Manually'               },
]

const rowVar = {
  hidden:  { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
}

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.055 } },
}

const ChaosSection: React.FC = () => (
  <section
    id="why-influnite"
    style={{
      position:  'relative',
      padding:   '9rem 2rem 7rem',
      boxSizing: 'border-box',
    }}
  >
    <div style={{ maxWidth: 1120, margin: '0 auto' }}>

      {/* ── Top label ────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: '4.5rem' }}
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
          The Current Reality
        </span>
        <h2 style={{
          fontFamily:    "'Cormorant Garamond', serif",
          fontSize:      'clamp(2.2rem, 3.8vw, 3.6rem)',
          fontWeight:    700,
          color:         '#ffffff',
          lineHeight:    1.08,
          letterSpacing: '-0.02em',
          marginBottom:  '1.2rem',
          maxWidth:      640,
        }}>
          A single campaign.<br />
          <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.38)' }}>
            Way too many apps.
          </em>
        </h2>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize:   '1rem',
          color:      'rgba(255,255,255,0.42)',
          lineHeight: 1.75,
          fontWeight: 300,
          maxWidth:   520,
        }}>
          Most brands manage creator campaigns across five or six different tools.
          Every handoff is a chance for something to get lost.
        </p>
      </motion.div>

      {/* ── Two-column: Steps list + Right copy ──────────────────────── */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: '1fr 1fr',
        gap:                 '5rem',
        alignItems:          'start',
      }}
        className="chaos-grid"
      >
        {/* Left: numbered step list */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {STEPS.map((step) => (
            <motion.div
              key={step.num}
              variants={rowVar}
              style={{
                display:       'flex',
                alignItems:    'baseline',
                gap:           '1rem',
                padding:       '0.85rem 0',
                borderBottom:  '1px solid rgba(255,255,255,0.055)',
              }}
            >
              <span style={{
                fontFamily:    "'DM Mono', monospace",
                fontSize:      '0.58rem',
                color:         'rgba(255,255,255,0.18)',
                letterSpacing: '0.06em',
                flexShrink:    0,
                width:         22,
                paddingTop:    2,
              }}>
                {step.num}
              </span>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize:   '0.9rem',
                color:      'rgba(255,255,255,0.68)',
                flex:       1,
                fontWeight: 400,
                lineHeight: 1.4,
              }}>
                {step.action}
              </span>
              <span style={{
                fontFamily:    "'DM Mono', monospace",
                fontSize:      '0.62rem',
                color:         'rgba(255,255,255,0.22)',
                letterSpacing: '0.04em',
                flexShrink:    0,
                textAlign:     'right',
                maxWidth:      160,
              }}>
                {step.tool}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Right: editorial closing copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ paddingTop: '3rem' }}
        >
          {/* Stat callout */}
          <div style={{
            background:    'rgba(17,17,17,0.9)',
            border:        '1px solid rgba(255,255,255,0.08)',
            borderRadius:  '0.75rem',
            padding:       '1.75rem 2rem',
            marginBottom:  '2.5rem',
          }}>
            <div style={{
              fontFamily:    "'Cormorant Garamond', serif",
              fontSize:      '3.2rem',
              fontWeight:    700,
              color:         '#ffffff',
              lineHeight:    1,
              marginBottom:  '0.5rem',
            }}>
              6
            </div>
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize:   '0.88rem',
              color:      'rgba(255,255,255,0.42)',
              lineHeight: 1.6,
              fontWeight: 300,
            }}>
              The average number of apps a brand uses to manage one influencer campaign.
              Before a single post goes live.
            </div>
          </div>

          {/* Divider + closing */}
          <div style={{
            borderLeft:  '2px solid #6A0D7D',
            paddingLeft: '1.5rem',
          }}>
            <p style={{
              fontFamily:    "'Cormorant Garamond', serif",
              fontSize:      'clamp(1.4rem, 2vw, 1.75rem)',
              fontWeight:    600,
              color:         '#ffffff',
              lineHeight:    1.3,
              marginBottom:  '0.9rem',
            }}>
              Influnite brings it into one workspace.
            </p>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize:   '0.88rem',
              color:      'rgba(255,255,255,0.38)',
              lineHeight: 1.7,
              fontWeight: 300,
            }}>
              Discovery, briefing, contracts, content approval, and payments — handled in one place,
              with a clear record of everything.
            </p>
          </div>
        </motion.div>
      </div>
    </div>

    <style>{`
      @media (max-width: 800px) {
        .chaos-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
      }
    `}</style>
  </section>
)

export default ChaosSection
