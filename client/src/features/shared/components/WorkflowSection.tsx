import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Check, FileText, HandCoins, MessageSquareText, UserRoundCheck, Users } from 'lucide-react'

const steps = [
  { title: 'Brand creates campaign', icon: FileText },
  { title: 'Creators apply', icon: Users },
  { title: 'Brand reviews proposals', icon: UserRoundCheck },
  { title: 'Content approval', icon: MessageSquareText },
  { title: 'Escrow payment released', icon: HandCoins },
]

const WorkflowSection: React.FC = () => (
  <section id="how-it-works" className="relative px-6 py-24 sm:py-32">
    <div className="mx-auto max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mb-16 max-w-3xl text-center"
      >
        <p className="mb-5 font-['DM_Mono'] text-[0.68rem] uppercase tracking-[0.18em] text-white/30">
          How Influnite works
        </p>
        <h2 className="font-['Cormorant_Garamond'] text-5xl font-bold leading-none text-white sm:text-6xl">
          The collaboration has a clear path.
        </h2>
      </motion.div>

      <div className="mx-auto max-w-3xl">
        {steps.map((step, index) => {
          const Icon = step.icon

          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="grid grid-cols-[56px_1fr_44px] items-center gap-5 border border-white/8 bg-[#111111] p-5 sm:grid-cols-[72px_1fr_56px] sm:p-6">
                <div className="flex h-14 w-14 items-center justify-center bg-[#161616] text-white/70 ring-1 ring-white/10">
                  <Icon size={22} strokeWidth={1.6} />
                </div>
                <div>
                  <p className="font-['DM_Mono'] text-[0.6rem] uppercase tracking-[0.16em] text-white/24">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-2 font-['Outfit'] text-xl font-medium text-white sm:text-2xl">
                    {step.title}
                  </h3>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#6A0D7D]/45 bg-[#6A0D7D]/10 text-[#b567c5]">
                  <Check size={18} strokeWidth={1.8} />
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="flex h-12 items-center justify-center text-white/24">
                  <ArrowDown size={22} strokeWidth={1.4} />
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  </section>
)

export default WorkflowSection
