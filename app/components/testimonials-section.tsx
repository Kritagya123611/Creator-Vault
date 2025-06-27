"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { useState, useEffect } from "react"

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: "Alex Chen",
      role: "Digital Artist",
      avatar: "/placeholder.svg?height=60&width=60",
      content:
        "I launched my NFT collection in 10 minutes! CreatorVault made the entire process seamless and profitable.",
      rating: 5,
    },
    {
      name: "Sarah Johnson",
      role: "Music Producer",
      avatar: "/placeholder.svg?height=60&width=60",
      content:
        "The token-gated communities feature has revolutionized how I connect with my fans and monetize my music.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Developer",
      avatar: "/placeholder.svg?height=60&width=60",
      content: "Finally, a platform that understands creators. The revenue sharing through smart contracts is genius.",
      rating: 5,
    },
    {
      name: "Emma Thompson",
      role: "Educator",
      avatar: "/placeholder.svg?height=60&width=60",
      content:
        "CreatorVault helped me build a sustainable business around my educational content. The analytics are incredible.",
      rating: 5,
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            What Creators{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of creators who have transformed their passion into profit
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl text-muted-foreground mb-6 italic">
                  "{testimonials[currentIndex].content}"
                </blockquote>
                <div className="flex items-center justify-center">
                  <img
                    src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold">{testimonials[currentIndex].name}</div>
                    <div className="text-sm text-muted-foreground">{testimonials[currentIndex].role}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-purple-600" : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
