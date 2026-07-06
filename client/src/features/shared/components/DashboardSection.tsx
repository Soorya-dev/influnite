import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type Tab = 'brand' | 'creator'

const brandRows = [
  ['Summer Glow', '18 proposals', 'Reviewing'],
  ['Coffee Launch', '7 creators', 'Content due'],
  ['Festive Drop', 'INR 2.5L', 'Brief open'],
]

const creatorRows = [
  ['Nourish Organics', 'INR 18K-25K', 'Apply'],
  ['Pureblend Coffee', 'INR 8K-12K', 'Shortlisted'],
  ['Arya Skincare', 'INR 30K', 'In escrow'],
]

const tabs: { id: Tab; label: string }[] = [
  { id: 'brand', label: 'Brand Dashboard' },
  { id: 'creator', label: 'Creator Dashboard' },
]

const BrowserShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="overflow-hidden border border-white/10 bg-[#080808] shadow-[0_34px_90px_rgba(0,0,0,0.65)]">
    <div className="flex h-11 items-center gap-2 border-b border-white/8 bg-[#161616] px-4">
      {['#ff5f57', '#ffbd2e', '#28c840'].map((color) => (
        <span key={color} className="h-2.5 w-2.5 rounded-full opacity-80" style={{ backgroundColor: color }} />
      ))}
      <div className="mx-auto hidden rounded-full border border-white/8 bg-white/[0.03] px-8 py-1 font-['DM_Mono'] text-[0.58rem] tracking-[0.08em] text-white/25 sm:block">
        app.influnite.io
      </div>
    </div>
    {children}
  </div>
)

const Metric: React.FC<{ label: string; value: string; active?: boolean }> = ({ label, value, active }) => (
  <div className={`border p-4 ${active ? 'border-[#6A0D7D]/35 bg-[#6A0D7D]/10' : 'border-white/8 bg-[#111111]'}`}>
    <p className="font-['DM_Mono'] text-[0.58rem] uppercase tracking-[0.14em] text-white/28">{label}</p>
    <p className="mt-3 font-['Outfit'] text-2xl font-semibold text-white">{value}</p>
  </div>
)

const BrandDashboard = () => (
  <div className="grid min-h-[520px] bg-[#0b0b0b] lg:grid-cols-[190px_1fr]">
    <aside className="hidden border-r border-white/8 bg-[#111111] p-5 lg:block">
      <p className="font-['Cormorant_Garamond'] text-2xl font-bold text-white">Influnite</p>
      <div className="mt-8 space-y-2">
        {['Campaigns', 'Creators', 'Approvals', 'Payments'].map((item, index) => (
          <div key={item} className={`px-3 py-2 font-['Outfit'] text-sm ${index === 0 ? 'bg-[#6A0D7D]/16 text-white' : 'text-white/36'}`}>
            {item}
          </div>
        ))}
      </div>
    </aside>
    <main className="p-5 sm:p-7">
      <div className="flex flex-col gap-5 border-b border-white/8 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-['DM_Mono'] text-[0.6rem] uppercase tracking-[0.16em] text-white/28">Brand workspace</p>
          <h3 className="mt-2 font-['Outfit'] text-2xl font-semibold text-white">Good morning, Meera.</h3>
        </div>
        <button className="w-fit rounded-full bg-[#6A0D7D] px-5 py-2.5 font-['Outfit'] text-sm font-semibold text-white shadow-[0_0_28px_rgba(106,13,125,0.25)]">
          New Campaign
        </button>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Metric label="Active campaigns" value="12" />
        <Metric label="Creators hired" value="47" />
        <Metric label="In escrow" value="INR 2.4L" active />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_260px]">
        <div className="border border-white/8 bg-[#111111] p-5">
          <p className="font-['DM_Mono'] text-[0.6rem] uppercase tracking-[0.14em] text-white/28">Campaign pipeline</p>
          <div className="mt-6 space-y-3">
            {brandRows.map(([name, meta, status]) => (
              <div key={name} className="grid grid-cols-[1fr_auto] gap-4 border-b border-white/6 pb-3 last:border-0">
                <div>
                  <p className="font-['Outfit'] text-base text-white/82">{name}</p>
                  <p className="font-['DM_Mono'] text-[0.6rem] text-white/30">{meta}</p>
                </div>
                <p className="font-['DM_Mono'] text-[0.62rem] text-[#b567c5]">{status}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-white/8 bg-[#111111] p-5">
          <p className="font-['DM_Mono'] text-[0.6rem] uppercase tracking-[0.14em] text-white/28">Needs approval</p>
          <div className="mt-6 aspect-[4/5] bg-[#161616] p-4">
            <div className="h-full border border-white/8 bg-[#0d0d0d] p-4">
              <div className="h-44 bg-white/[0.04]" />
              <p className="mt-4 font-['Outfit'] text-sm text-white/70">Reel draft from Priya</p>
              <p className="mt-2 font-['Outfit'] text-xs leading-5 text-white/36">Caption, brand mention, and product angle are waiting for review.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
)

const CreatorDashboard = () => (
  <div className="grid min-h-[520px] bg-[#0b0b0b] lg:grid-cols-[1fr_300px]">
    <main className="p-5 sm:p-7">
      <div className="border-b border-white/8 pb-6">
        <p className="font-['DM_Mono'] text-[0.6rem] uppercase tracking-[0.16em] text-white/28">Creator workspace</p>
        <h3 className="mt-2 font-['Outfit'] text-2xl font-semibold text-white">Campaigns that fit your audience.</h3>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Metric label="Available" value="31" />
        <Metric label="Applications" value="8" />
        <Metric label="In escrow" value="INR 48K" active />
      </div>

      <div className="mt-6 border border-white/8 bg-[#111111] p-5">
        <p className="font-['DM_Mono'] text-[0.6rem] uppercase tracking-[0.14em] text-white/28">Campaign feed</p>
        <div className="mt-6 space-y-3">
          {creatorRows.map(([brand, budget, status], index) => (
            <div key={brand} className="grid grid-cols-[38px_1fr_auto] items-center gap-4 border-b border-white/6 pb-3 last:border-0">
              <div className="flex h-9 w-9 items-center justify-center bg-[#161616] font-['Outfit'] text-sm font-semibold text-white/70 ring-1 ring-white/8">
                {brand[0]}
              </div>
              <div>
                <p className="font-['Outfit'] text-base text-white/82">{brand}</p>
                <p className="font-['DM_Mono'] text-[0.6rem] text-white/30">{budget}</p>
              </div>
              <span className={`rounded-full px-3 py-1 font-['DM_Mono'] text-[0.58rem] ${index === 0 ? 'bg-[#6A0D7D] text-white' : 'border border-white/10 text-white/45'}`}>
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>

    <aside className="border-t border-white/8 bg-[#111111] p-5 lg:border-l lg:border-t-0">
      <p className="font-['DM_Mono'] text-[0.6rem] uppercase tracking-[0.14em] text-white/28">Credibility profile</p>
      <div className="mt-6 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#161616] font-['Outfit'] text-lg font-semibold text-white ring-1 ring-white/10">
          KD
        </div>
        <div>
          <p className="font-['Outfit'] text-lg font-medium text-white">Karan Dev</p>
          <p className="font-['DM_Mono'] text-[0.6rem] text-white/30">Food and lifestyle</p>
        </div>
      </div>
      <div className="mt-8 space-y-4">
        {['Verified audience', 'Portfolio complete', '3 payments completed'].map((item) => (
          <div key={item} className="border-l-2 border-[#6A0D7D] bg-[#161616] px-4 py-3 font-['Outfit'] text-sm text-white/68">
            {item}
          </div>
        ))}
      </div>
    </aside>
  </div>
)

const DashboardSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('brand')

  return (
    <section id="dashboard" className="relative bg-[#111111]/92 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"
        >
          <div className="max-w-3xl">
            <p className="mb-5 font-['DM_Mono'] text-[0.68rem] uppercase tracking-[0.18em] text-white/30">
              Explore the platform
            </p>
            <h2 className="font-['Cormorant_Garamond'] text-5xl font-bold leading-none text-white sm:text-6xl">
              One marketplace. Two workspaces.
            </h2>
          </div>

          <div className="flex w-full gap-2 border border-white/10 bg-[#080808] p-1 sm:w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-2.5 font-['Outfit'] text-sm font-medium transition sm:flex-none ${
                  activeTab === tab.id
                    ? 'bg-[#6A0D7D] text-white shadow-[0_0_24px_rgba(106,13,125,0.25)]'
                    : 'text-white/48 hover:bg-[#161616] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        <BrowserShell>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === 'brand' ? <BrandDashboard /> : <CreatorDashboard />}
            </motion.div>
          </AnimatePresence>
        </BrowserShell>
      </div>
    </section>
  )
}

export default DashboardSection
