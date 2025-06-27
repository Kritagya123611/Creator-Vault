import { Card, CardContent } from "@/components/ui/card"
import { Palette, Music, Layers, Code, BookOpen, Package, Users, Handshake } from "lucide-react"

export function WhatYouCanSellSection() {
  const sellableItems = [
    {
      icon: Palette,
      title: "Digital Art & NFTs",
      description: "Mint and sell unique digital artwork as NFTs with full ownership rights",
    },
    {
      icon: Music,
      title: "Music & Audio",
      description: "Distribute music, beats, and audio content with token-gated access",
    },
    {
      icon: Layers,
      title: "Design Assets & Templates",
      description: "Sell design templates, UI kits, and creative resources",
    },
    {
      icon: Code,
      title: "Code & App Resources",
      description: "Monetize your code, plugins, and development resources",
    },
    {
      icon: BookOpen,
      title: "Premium Content & Consultations",
      description: "Offer exclusive content, courses, and one-on-one consultations",
    },
    {
      icon: Package,
      title: "Physical Merchandise with NFT Add-ons",
      description: "Combine physical products with digital collectibles",
    },
    {
      icon: Users,
      title: "Subscriptions & Memberships",
      description: "Create recurring revenue with token-gated communities",
    },
    {
      icon: Handshake,
      title: "Services & Collaborations",
      description: "Offer mentoring, reviews, and collaborative services",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            What You Can{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Sell</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From digital art to physical merchandise, CreatorVault supports every type of creative product
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sellableItems.map((item, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
