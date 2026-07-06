import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ChaosSection from '../components/ChaosSection'
import WorkflowSection from '../components/WorkflowSection'
import DashboardSection from '../components/DashboardSection'
import TrustSection from '../components/TrustSection'
import FAQSection from '../components/FAQSection'
import FinalCTA from '../components/FinalCTA'
import Footer from '../components/Footer'
import ShapeGrid from '../../../components/ui/ShapeGrid'

export const LandingPage = () => (
  <div className="relative min-h-screen overflow-x-hidden bg-[#080808] text-white">
    <div className="fixed inset-0 z-0 opacity-45">
      <ShapeGrid
        direction="left"
        speed={0.16}
        borderColor="rgba(255,255,255,0.05)"
        squareSize={34}
        hoverFillColor="rgba(106,13,125,0.16)"
        shape="hexagon"
        hoverTrailAmount={5}
        vignetteColor="transparent"
      />
    </div>

    <div className="pointer-events-none fixed inset-0 z-10 bg-[radial-gradient(ellipse_70%_45%_at_50%_18%,rgba(106,13,125,0.09),transparent_68%)]" />
    <div className="pointer-events-none fixed inset-0 z-10 bg-[radial-gradient(ellipse_100%_100%_at_50%_45%,transparent_28%,rgba(0,0,0,0.88)_100%)]" />
    <div className="pointer-events-none fixed inset-0 z-10 bg-[linear-gradient(to_bottom,rgba(8,8,8,0.76)_0%,transparent_14%,rgba(8,8,8,0.36)_100%)]" />

    <Navbar />

    <div className="relative z-20">
      <div className="pt-[72px]">
        <Hero />
      </div>
      <ChaosSection />
      <WorkflowSection />
      <DashboardSection />
      <TrustSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </div>
  </div>
)
