import { Github, Twitter, DiscIcon as Discord, Mail } from "lucide-react"

export function Footer() {
  const techStack = [
    { name: "Next.js 14", logo: "⚡" },
    { name: "Supabase", logo: "🗄️" },
    { name: "Solidity", logo: "💎" },
    { name: "RainbowKit", logo: "🌈" },
    { name: "Prisma", logo: "🔺" },
    { name: "IPFS", logo: "🌐" },
    { name: "Thirdweb", logo: "🔗" },
    { name: "Tailwind CSS", logo: "🎨" },
    { name: "Framer Motion", logo: "🎭" },
  ]

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CV</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                CreatorVault
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Empowering creators to build their own Web3-enabled storefronts and take control of their creative
              economy.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-purple-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-purple-600 transition-colors">
                <Discord className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-purple-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-purple-600 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Templates
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8">
          <div className="mb-6">
            <h4 className="font-semibold mb-4 text-center">Built with Modern Tech Stack</h4>
            <div className="flex flex-wrap justify-center gap-4">
              {techStack.map((tech, index) => (
                <div key={index} className="flex items-center space-x-2 bg-muted rounded-full px-3 py-1">
                  <span className="text-sm">{tech.logo}</span>
                  <span className="text-xs font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2024 CreatorVault. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
