import React from 'react'
import { motion } from 'framer-motion'

const brandProblems = [
  'Finding the right creators',
  'Managing campaigns',
  'Tracking approvals',
  'Delayed communication',
]

const creatorProblems = [
  'Finding quality campaigns',
  'Waiting for replies',
  'Payment uncertainty',
  'Building credibility',
]

const eras = [
  { label: 'Before', title: 'TV, newspapers, billboards', detail: 'Brands bought attention in fixed places.' },
  { label: 'Then', title: 'Social feeds changed discovery', detail: 'People started trusting voices they chose to follow.' },
  { label: 'Now', title: 'Creators shape decisions', detail: 'A good creator partnership can feel more human than an ad.' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const ProblemList: React.FC<{ title: string; items: string[]; align?: 'left' | 'right' }> = ({
  title,
  items,
  align = 'left',
}) => (
  <motion.div
    variants={fadeUp}
    className="border-t border-white/10 pt-8"
  >
    <p className="mb-8 font-['DM_Mono'] text-[0.68rem] uppercase tracking-[0.18em] text-white/30">
      {title}
    </p>
    <div className="space-y-5">
      {items.map((item) => (
        <div
          key={item}
          className={`flex items-center gap-4 ${align === 'right' ? 'lg:flex-row-reverse lg:text-right' : ''}`}
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#6A0D7D] shadow-[0_0_18px_rgba(106,13,125,0.75)]" />
          <span className="font-['Outfit'] text-lg text-white/72 sm:text-xl">{item}</span>
        </div>
      ))}
    </div>
  </motion.div>
)

const ChaosSection: React.FC = () => (
  <>
    <section id="why-influnite" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ staggerChildren: 0.12 }}
          className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"
        >
          <motion.div variants={fadeUp}>
            <p className="mb-5 font-['DM_Mono'] text-[0.68rem] uppercase tracking-[0.18em] text-white/30">
              Marketing has changed
            </p>
            <h2 className="font-['Cormorant_Garamond'] text-5xl font-bold leading-[0.98] text-white sm:text-6xl lg:text-7xl">
              People do not discover brands the way they used to.
            </h2>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="max-w-2xl font-['Outfit'] text-lg font-light leading-8 text-white/48 sm:text-xl"
          >
            For a long time, marketing meant buying space: a newspaper column, a TV slot, a billboard on a busy road. Today, people discover products through creators they already watch on Instagram and YouTube. That shift is simple, but it changes the whole working relationship.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ staggerChildren: 0.12, delayChildren: 0.12 }}
          className="mt-16 grid gap-4 md:grid-cols-3"
        >
          {eras.map((era) => (
            <motion.div
              key={era.label}
              variants={fadeUp}
              className="min-h-64 border border-white/8 bg-[#111111] p-7"
            >
              <p className="font-['DM_Mono'] text-[0.62rem] uppercase tracking-[0.18em] text-white/24">
                {era.label}
              </p>
              <div className="my-10 h-px w-full bg-white/8" />
              <h3 className="max-w-xs font-['Cormorant_Garamond'] text-3xl font-bold leading-tight text-white">
                {era.title}
              </h3>
              <p className="mt-5 font-['Outfit'] text-sm font-light leading-6 text-white/42">{era.detail}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    <section className="relative bg-[#111111]/92 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ staggerChildren: 0.14 }}
        >
          <motion.div variants={fadeUp} className="mb-16 max-w-3xl">
            <p className="mb-5 font-['DM_Mono'] text-[0.68rem] uppercase tracking-[0.18em] text-white/30">
              Two different problems
            </p>
            <h2 className="font-['Cormorant_Garamond'] text-5xl font-bold leading-none text-white sm:text-6xl">
              Brands and creators are trying to meet, but the work gets messy in the middle.
            </h2>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <ProblemList title="Brand problems" items={brandProblems} />
            <ProblemList title="Creator problems" items={creatorProblems} align="right" />
          </div>

          <motion.div
            variants={fadeUp}
            className="mt-20 border-l-2 border-[#6A0D7D] pl-6"
          >
            <p className="font-['Cormorant_Garamond'] text-4xl font-bold leading-tight text-white sm:text-5xl">
              Different problems.
              <br />
              <span className="text-white/45">One platform.</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  </>
)

export default ChaosSection
