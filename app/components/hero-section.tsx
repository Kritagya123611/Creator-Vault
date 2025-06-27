"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles, Coins, ShoppingBag, Users } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-purple-50/20 dark:to-purple-950/20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg opacity-20 animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-14 h-14 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg opacity-20 animate-bounce delay-500"></div>

        {/* Floating Icons */}
        <div className="absolute top-32 right-1/4 animate-float">
          <Coins className="w-8 h-8 text-purple-400 opacity-30" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-float delay-1000">
          <ShoppingBag className="w-6 h-6 text-pink-400 opacity-30" />
        </div>
        <div className="absolute top-1/2 left-10 animate-float delay-500">
          <Sparkles className="w-7 h-7 text-blue-400 opacity-30" />
        </div>
        <div className="absolute top-1/3 left-1/3 animate-float delay-700">
          <Users className="w-6 h-6 text-green-400 opacity-30" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-sm font-medium text-purple-700 dark:text-purple-300 mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
            The Complete Creator & Consumer Platform
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Create, Discover & Own
            </span>
            <br />
            <span className="text-foreground">Your Digital World</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Whether you're creating art, music, or digital content - or discovering amazing creators and their work. 
            Traditional payments meet Web3 innovation in one seamless platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg"
              >
                Start Creating
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            
            <Link href="/explore">
            <Link href="/discover"><Button size="lg" variant="outline" className="px-8 py-3 text-lg">
                <ShoppingBag className="mr-2 w-5 h-5" />
                Discover Creators
              </Button></Link>
              
            </Link>
          </div>

          {/* Feature highlights for both audiences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left max-w-3xl mx-auto">
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-200/50">
              <h3 className="font-semibold text-lg mb-2 text-purple-600">For Creators</h3>
              <p className="text-sm text-muted-foreground">Launch your branded store, accept payments (card or crypto), mint NFTs, and build your community</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-pink-200/50">
              <h3 className="font-semibold text-lg mb-2 text-pink-600">For Collectors</h3>
              <p className="text-sm text-muted-foreground">Discover unique digital art, music, and content. Pay with card or wallet. Support your favorite creators</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600">5K+</div>
              <div className="text-sm text-muted-foreground">Active Creators</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-600">$500K+</div>
              <div className="text-sm text-muted-foreground">Creator Earnings</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">25K+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">Both</div>
              <div className="text-sm text-muted-foreground">Web2 & Web3</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}