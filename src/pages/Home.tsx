import HeroSection from '../components/home/HeroSection'
import FeaturesSection from '../components/home/FeaturesSection'
import HowItWorksSection from '../components/home/HowItWorksSection'
import PricingSection from '../components/home/PricingSection'

export default function Home() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
    </div>
  )
}
