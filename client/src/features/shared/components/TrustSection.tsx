import React from 'react'
import { motion } from 'framer-motion'
import { BadgeCheck, CircleDollarSign, Route } from 'lucide-react'

const cards = [
  {
    title: 'Verified Creators',
    body: 'Creators should be judged by more than a handle and a follower count. Influnite gives brands a clearer view of audience quality, niche fit, and past work before a deal starts.',
    icon: BadgeCheck,
  },
  {
    title: 'Secure Escrow',
    body: 'Money is held before the work begins and released after approval. Brands know what they are paying for. Creators know the payment is real.',
    icon: CircleDollarSign,
  },
  {
    title: 'Transparent Workflow',
    body: 'Briefs, proposals, comments, approvals, and payment status live in one place. Nobody has to reconstruct the campaign from old chats.',
    icon: Route,
  },
]

const TrustSection: React.FC = () => (
  <section id="trust" className="relative px-6 py-24 sm:py-32">
    <div className="mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14 max-w-3xl"
      >
        <p className="mb-5 font-['DM_Mono'] text-[0.68rem] uppercase tracking-[0.18em] text-white/30">
          Built on trust
        </p>
        <h2 className="font-['Cormorant_Garamond'] text-5xl font-bold leading-none text-white sm:text-6xl">
          The platform only works if both sides feel protected.
        </h2>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-3">
        {cards.map((card, index) => {
          const Icon = card.icon

          return (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="min-h-80 border border-white/8 bg-[#111111] p-8 transition hover:border-[#6A0D7D]/40"
            >
              <div className="mb-14 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center bg-[#161616] text-white/65 ring-1 ring-white/10">
                  <Icon size={23} strokeWidth={1.6} />
                </div>
                <span className="font-['Cormorant_Garamond'] text-6xl font-bold leading-none text-white/[0.04]">
                  0{index + 1}
                </span>
              </div>
              <h3 className="font-['Cormorant_Garamond'] text-3xl font-bold leading-tight text-white">
                {card.title}
              </h3>
              <p className="mt-6 font-['Outfit'] text-base font-light leading-7 text-white/42">
                {card.body}
              </p>
            </motion.article>
          )
        })}
      </div>
    </div>
  </section>
)

export default TrustSection
