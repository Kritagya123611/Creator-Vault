import { HeroSection } from "./components/hero-section"
import { TrustedBySection } from "./components/trusted-by-section"
import { WhatYouCanSellSection } from "./components/what-you-can-sell-section"
import { FeaturesSection } from "./components/features-section"
import { HowItWorksSection } from "./components/how-it-works-section"
import { PricingSection } from "./components/pricing-section"
import { TestimonialsSection } from "./components/testimonials-section"
import { FAQSection } from "./components/faq-section"
import { FinalCTASection } from "./components/final-cta-section"
import { Footer } from "./components/footer"
import { Header } from "./components/header"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TrustedBySection />
        <WhatYouCanSellSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  )
}
