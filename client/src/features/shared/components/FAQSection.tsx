// FAQSection.tsx — Frequently asked questions
// Two-column: header left, accordion right
// Real questions with direct founder-voice answers
// Answers: removes objections to conversion

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQS = [
  {
    q: 'How do creators get selected for campaigns?',
    a: "We review every creator before they can accept paid campaigns. Follower count alone doesn't qualify anyone. We look at engagement rate, audience authenticity, and niche fit. Once they're on the platform, brands can filter further by category, location, budget range, and audience demographics.",
  },
  {
    q: 'Who controls the payment, and when is it released?',
    a: "The brand deposits funds into escrow when a campaign brief is accepted. The creator receives payment only after the content is reviewed and explicitly approved — not before. If a campaign falls through before any work is delivered, funds are returned. Neither side is left exposed.",
  },
  {
    q: 'Can small businesses use Influnite?',
    a: "Yes. There's no minimum campaign spend. You define the budget, the scope, and the timeline. A brand running a ₹15,000 micro-campaign gets the same workflow and protections as one running ₹15L. The platform scales with you.",
  },
  {
    q: 'Can creators negotiate their rates?',
    a: "Always. A campaign brief shows the budgeted range. When creators apply, they can propose their own rate. You see the proposal, decide if it fits your budget, and either accept or move to the next applicant. It's transparent and there's no obligation on either side.",
  },
  {
    q: 'How does content approval work?',
    a: "Creators upload content through the platform before it goes live — not after. You review it inside Influnite, where you can approve it, request specific changes, or decline. Every revision and comment is logged in the same thread. There's no emailing files or losing feedback in group chats.",
  },
  {
    q: 'Can a creator work with multiple brands at the same time?',
    a: "Yes. Each campaign has its own workspace — brief, messages, content, and payment — completely separate from other campaigns. A creator can manage five active brand deals from one dashboard without any of them bleeding into each other.",
  },
]

const FAQItem: React.FC<{ faq: typeof FAQS[0]; isOpen: boolean; onToggle: () => void; index: number }> = ({
  faq, isOpen, onToggle, index
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-20px' }}
    transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
  >
    <button
      onClick={onToggle}
      style={{
        width:          '100%',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        gap:            '1rem',
        padding:        '1.2rem 0',
        background:     'none',
        border:         'none',
        cursor:         'pointer',
        textAlign:      'left',
      }}
    >
      <span style={{
        fontFamily:    "'Outfit', sans-serif",
        fontSize:      '0.95rem',
        fontWeight:    isOpen ? 600 : 400,
        color:         isOpen ? '#ffffff' : 'rgba(255,255,255,0.65)',
        lineHeight:    1.4,
        transition:    'color 0.2s',
      }}>
        {faq.q}
      </span>
      <span style={{
        width:          22,
        height:         22,
        borderRadius:   '50%',
        border:         '1px solid rgba(255,255,255,0.15)',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        flexShrink:     0,
        transition:     'border-color 0.2s, transform 0.35s cubic-bezier(0.22,1,0.36,1)',
        transform:      isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
      }}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <line x1="5" y1="1" x2="5" y2="9" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="1" y1="5" x2="9" y2="5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </span>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="answer"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: 'hidden' }}
        >
          <p style={{
            fontFamily:   "'Outfit', sans-serif",
            fontSize:     '0.88rem',
            color:        'rgba(255,255,255,0.42)',
            lineHeight:   1.75,
            fontWeight:   300,
            paddingBottom:'1.1rem',
            margin:       0,
          }}>
            {faq.a}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
)

const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section
      id="faq"
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
          gridTemplateColumns: '1fr 1.6fr',
          gap:                 '6rem',
          alignItems:          'start',
        }}
          className="faq-grid"
        >
          {/* Left: header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'sticky', top: 120 }}
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
              Questions
            </span>
            <h2 style={{
              fontFamily:    "'Cormorant Garamond', serif",
              fontSize:      'clamp(2rem, 3vw, 3rem)',
              fontWeight:    700,
              color:         '#ffffff',
              lineHeight:    1.1,
              letterSpacing: '-0.02em',
              marginBottom:  '1rem',
            }}>
              Before you<br />
              <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.38)' }}>
                get started.
              </em>
            </h2>
            <p style={{
              fontFamily:   "'Outfit', sans-serif",
              fontSize:     '0.88rem',
              color:        'rgba(255,255,255,0.35)',
              lineHeight:   1.7,
              fontWeight:   300,
              marginBottom: '2rem',
            }}>
              Honest answers to the questions we hear most.
            </p>

            <a
              href="mailto:hello@influnite.io"
              style={{
                fontFamily:    "'DM Mono', monospace",
                fontSize:      '0.65rem',
                color:         'rgba(106,13,125,0.8)',
                letterSpacing: '0.08em',
                textDecoration:'none',
                transition:    'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#6A0D7D'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(106,13,125,0.8)'}
            >
              Something else? Email us →
            </a>
          </motion.div>

          {/* Right: accordion */}
          <div>
            {FAQS.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .faq-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  )
}

export default FAQSection
