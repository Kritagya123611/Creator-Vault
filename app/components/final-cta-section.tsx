import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function FinalCTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full"></div>
        <div className="absolute top-40 right-20 w-16 h-16 border border-white rounded-lg rotate-45"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-white rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 border border-white rounded-lg rotate-12"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
            Join the Creator Revolution
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Your Economy. Your Rules.</h2>

          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join a decentralized platform built for creators, not platforms. Take control of your creative economy and
            build lasting wealth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
              Start Building Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg">
              Schedule Demo
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">14-Day</div>
              <div className="text-sm opacity-80">Free Trial</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">No Setup</div>
              <div className="text-sm opacity-80">Fees</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-sm opacity-80">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
