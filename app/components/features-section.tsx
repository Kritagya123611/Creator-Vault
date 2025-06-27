import { Card, CardContent } from "@/components/ui/card"
import { Globe, Link, Coins, Scale, CreditCard, Wrench, BarChart3, Shield, Cloud, Users } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Globe,
      title: "Multi-Tenant Storefronts with Custom Domains",
      description: "Create branded storefronts with your own domain and complete customization control",
    },
    {
      icon: Link,
      title: "NFT Minting & Management",
      description: "Support for ERC-721, ERC-1155, reveal drops, and dynamic NFTs with advanced metadata",
    },
    {
      icon: Coins,
      title: "Creator Token Economics",
      description: "Launch your own ERC-20 tokens with built-in utility and reward mechanisms",
    },
    {
      icon: Scale,
      title: "Smart Contract Revenue Sharing",
      description: "Automated revenue distribution through transparent smart contracts",
    },
    {
      icon: CreditCard,
      title: "Web3 + Traditional Payments",
      description: "Accept Stripe, Razorpay, ETH, SOL, USDC, and other cryptocurrencies seamlessly",
    },
    {
      icon: Wrench,
      title: "Drag & Drop Store Customizer",
      description: "Build beautiful storefronts without code using our intuitive visual editor",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics & Creator Insights",
      description: "Track sales, engagement, and community growth with detailed analytics",
    },
    {
      icon: Shield,
      title: "Token-Gated Communities",
      description: "Create exclusive communities accessible only to token or NFT holders",
    },
    {
      icon: Cloud,
      title: "Global CDN, IPFS, and Cloud Storage",
      description: "Fast, decentralized content delivery with redundant storage solutions",
    },
  ]

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Powerful{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to build, launch, and scale your Web3 creator business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-3 text-lg">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
