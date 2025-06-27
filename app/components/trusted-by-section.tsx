import { Card } from "@/components/ui/card"

export function TrustedBySection() {
  const creatorCategories = [
    { name: "Digital Artists", icon: "🎨", count: "2.5K+" },
    { name: "Musicians", icon: "🎵", count: "1.8K+" },
    { name: "Developers", icon: "💻", count: "3.2K+" },
    { name: "Educators", icon: "📚", count: "1.5K+" },
    { name: "Designers", icon: "✨", count: "2.1K+" },
    { name: "Content Creators", icon: "📹", count: "4.3K+" },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Trusted by Creators Worldwide</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of creators who have already built their Web3-enabled storefronts
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {creatorCategories.map((category, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-2">{category.icon}</div>
              <div className="font-semibold text-sm mb-1">{category.name}</div>
              <div className="text-xs text-muted-foreground">{category.count}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
