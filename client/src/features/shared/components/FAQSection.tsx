import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'

const faqs = [
  {
    q: 'Is Influnite for brands or creators?',
    a: 'Both. Brands use it to create campaigns and review creators. Creators use it to find paid work, apply with their rate, submit content, and track payment.',
  },
  {
    q: 'What happens after a brand posts a campaign?',
    a: 'Creators who fit the brief can apply. The brand reviews proposals, shortlists the right people, approves content before it goes live, and releases escrow payment once the work is approved.',
  },
  {
    q: 'How does escrow help?',
    a: 'It removes the awkward part. The brand funds the campaign before work starts, so the creator knows payment is available. The money is released only after approval, so the brand stays protected too.',
  },
  {
    q: 'Can small brands use it?',
    a: 'Yes. The point is not to make influencer marketing feel enterprise-heavy. A small brand can run a focused creator campaign with a clear budget, a clear brief, and a clean approval trail.',
  },
  {
    q: 'Can creators choose what to apply for?',
    a: 'Yes. Creators see the campaign details and decide where they want to spend their time. They can apply with a proposal instead of waiting for random messages.',
  },
]

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="relative bg-[#111111]/92 px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.75fr_1.25fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:sticky lg:top-28 lg:h-fit"
        >
          <p className="mb-5 font-['DM_Mono'] text-[0.68rem] uppercase tracking-[0.18em] text-white/30">
            FAQ
          </p>
          <h2 className="font-['Cormorant_Garamond'] text-5xl font-bold leading-none text-white sm:text-6xl">
            A few things people ask before they start.
          </h2>
        </motion.div>

        <div className="border-t border-white/10">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="border-b border-white/10"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className={`font-['Outfit'] text-lg font-medium leading-7 ${isOpen ? 'text-white' : 'text-white/68'}`}>
                    {faq.q}
                  </span>
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition ${isOpen ? 'rotate-45 border-[#6A0D7D] bg-[#6A0D7D] text-white' : 'border-white/14 text-white/45'}`}>
                    <Plus size={16} strokeWidth={1.8} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 font-['Outfit'] text-base font-light leading-7 text-white/44">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
