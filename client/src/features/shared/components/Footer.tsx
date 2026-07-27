// Footer.tsx — Premium minimal footer
// Darker palette: #050505 background, accent #6A0D7D used sparingly
// Same typography: Cormorant Garamond, Outfit, DM Mono

import React, { useEffect } from 'react'

const FOOTER_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Outfit:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  .footer-link {
    font-family:     'Outfit', sans-serif;
    font-size:       0.82rem;
    font-weight:     400;
    color:           rgba(255,255,255,0.35);
    text-decoration: none;
    transition:      color 0.2s;
    display:         inline-block;
  }
  .footer-link:hover { color: rgba(255,255,255,0.7); }

  .footer-social {
    width:           34px;
    height:          34px;
    border-radius:   50%;
    border:          1px solid rgba(255,255,255,0.1);
    background:      transparent;
    display:         flex;
    align-items:     center;
    justify-content: center;
    text-decoration: none;
    color:           rgba(255,255,255,0.35);
    transition:      border-color 0.2s, color 0.2s, background 0.2s;
    cursor:          pointer;
  }
  .footer-social:hover {
    border-color: rgba(106,13,125,0.5);
    background:   rgba(106,13,125,0.1);
    color:        rgba(167,139,250,0.8);
  }
`

const LINK_COLS = [
  {
    heading: 'Product',
    links: ['Features', 'How It Works', 'Pricing', 'Changelog'],
  },
  {
    heading: 'For Creators',
    links: ['Join Network', 'Campaign Feed', 'Payments', 'Portfolio Builder'],
  },
  {
    heading: 'For Brands',
    links: ['Find Creators', 'Launch Campaign', 'Analytics', 'Escrow'],
  },
  {
    heading: 'Company',
    links: ['About', 'Blog', 'Careers', 'Contact'],
  },
]

const SOCIAL = [
  {
    label: 'Twitter / X',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
]

const Footer: React.FC = () => {
  useEffect(() => {
    const id = 'footer-styles-v2'
    if (!document.getElementById(id)) {
      const tag    = document.createElement('style')
      tag.id       = id
      tag.textContent = FOOTER_STYLES
      document.head.appendChild(tag)
    }
    return () => { document.getElementById(id)?.remove() }
  }, [])

  return (
    <footer
      id="footer"
      style={{
        position:  'relative',
        background:'#050505',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Top gradient line */}
      <div style={{
        position:   'absolute',
        top:        -1,
        left:       '50%',
        transform:  'translateX(-50%)',
        width:      '40%',
        height:     1,
        background: 'linear-gradient(90deg, transparent, rgba(106,13,125,0.6) 50%, transparent)',
      }} />

      <div style={{
        maxWidth:  1280,
        margin:    '0 auto',
        padding:   '4.5rem 2rem 2.5rem',
        boxSizing: 'border-box',
      }}>
        {/* Top row */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: '280px repeat(4, 1fr)',
          gap:                 '2.5rem',
          marginBottom:        '4rem',
        }}
          className="footer-top-grid"
        >
          {/* Brand col */}
          <div>
            <a href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '0.85rem' }}>
              <span style={{
                fontFamily:          "'Cormorant Garamond', serif",
                fontSize:            '1.6rem',
                fontWeight:          700,
                letterSpacing:       '-0.02em',
                background:          'linear-gradient(135deg, rgba(167,139,250,0.9) 0%, #6A0D7D 100%)',
                WebkitBackgroundClip:'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip:      'text',
              }}>
                Influnite
              </span>
            </a>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize:   '0.82rem',
              color:      'rgba(255,255,255,0.3)',
              lineHeight: 1.7,
              fontWeight: 300,
              marginBottom:'1.25rem',
            }}>
              Influencer marketing without the chaos. Brands find the right creators. Creators get paid on time.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {SOCIAL.map(s => (
                <a key={s.label} href="#" aria-label={s.label} className="footer-social">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {LINK_COLS.map(col => (
            <div key={col.heading}>
              <h4 style={{
                fontFamily:    "'DM Mono', monospace",
                fontSize:      '0.58rem',
                color:         'rgba(255,255,255,0.22)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom:  '1rem',
                fontWeight:    500,
              }}>
                {col.heading}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" className="footer-link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          paddingTop:     '1.5rem',
          borderTop:      '1px solid rgba(255,255,255,0.05)',
          flexWrap:       'wrap',
          gap:            '0.75rem',
        }}>
          <span style={{
            fontFamily:    "'DM Mono', monospace",
            fontSize:      '0.62rem',
            color:         'rgba(255,255,255,0.18)',
            letterSpacing: '0.05em',
          }}>
            © {new Date().getFullYear()} Influnite — All rights reserved
          </span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(label => (
              <a
                key={label}
                href="#"
                style={{
                  fontFamily:    "'DM Mono', monospace",
                  fontSize:      '0.58rem',
                  color:         'rgba(255,255,255,0.18)',
                  textDecoration:'none',
                  letterSpacing: '0.04em',
                  transition:    'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.18)'}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-top-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 540px) {
          .footer-top-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}

export default Footer