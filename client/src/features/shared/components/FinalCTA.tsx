import React from 'react'
import { motion } from 'framer-motion'

const FinalCTA: React.FC = () => (
  <section id="start" className="relative overflow-hidden bg-[#080808] px-6 py-24 sm:py-32">
    <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6A0D7D]/10 blur-3xl" />

    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto max-w-4xl text-center"
    >
      <p className="mb-6 font-['DM_Mono'] text-[0.68rem] uppercase tracking-[0.18em] text-white/30">
        Start here
      </p>
      <h2 className="font-['Cormorant_Garamond'] text-5xl font-bold leading-none text-white sm:text-7xl">
        If you are ready to work with creators properly, Influnite is where that starts.
      </h2>
      <p className="mx-auto mt-8 max-w-2xl font-['Outfit'] text-lg font-light leading-8 text-white/46">
        Brands get a cleaner way to run campaigns. Creators get serious opportunities and payment protection. The work is still human. The process is just clearer.
      </p>

      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <motion.button
          whileHover={{ y: -2 }}
          transition={{ duration: 0.15 }}
          className="w-full rounded-full bg-[#6A0D7D] px-8 py-4 font-['Outfit'] text-sm font-semibold tracking-wide text-white shadow-[0_0_0_1px_rgba(106,13,125,0.5),0_12px_34px_rgba(106,13,125,0.32)] sm:w-auto"
        >
          Start as Brand
        </motion.button>
        <motion.button
          whileHover={{ y: -2, borderColor: 'rgba(106,13,125,0.7)', color: '#fff' }}
          transition={{ duration: 0.15 }}
          className="w-full rounded-full border border-white/14 bg-[#111111] px-8 py-4 font-['Outfit'] text-sm font-medium tracking-wide text-white/68 sm:w-auto"
        >
          Become a Creator
        </motion.button>
      </div>
    </motion.div>
  </section>
)

export default FinalCTA
