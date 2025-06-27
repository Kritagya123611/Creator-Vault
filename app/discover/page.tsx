"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Filter,
  Star,
  Users,
  Coins,
  TrendingUp,
  ChevronDown,
  Heart,
  ExternalLink,
  Verified,
  Flame,
  Sparkles,
  Music,
  Code,
  Palette,
  Gamepad2,
  Camera,
  X,
  ArrowUp,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

// Sample data - REPLACE THESE IMAGE URLS WITH YOUR OWN IMAGES
const featuredCreators = [
  {
    id: 1,
    name: "Artistic Alice",
    handle: "@artisticalice",
    category: "Digital Artist",
    followers: "12.5K",
    tokenHolders: "3.2K",
    tokenSymbol: "ALICE",
    achievement: "Just dropped Genesis Collection",
    // REPLACE WITH YOUR IMAGE URL:
    profileImage: "data:image/jpeg;base64,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", // or "/images/alice-profile.jpg" if stored locally
    verified: true,
    totalSales: "$125K",
  },
  {
    id: 2,
    name: "BeatMaker Ben",
    handle: "@beatmakerben",
    category: "Music Producer",
    followers: "8.3K",
    tokenHolders: "2.1K",
    tokenSymbol: "BEAT",
    achievement: "New album hitting #1",
    // REPLACE WITH YOUR IMAGE URL:
    profileImage: "data:image/jpeg;base64,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", // or "/images/ben-profile.jpg"
    verified: true,
    totalSales: "$89K",
  },
  {
    id: 3,
    name: "CodeCraft Carl",
    handle: "@codecraftcarl",
    category: "Developer",
    followers: "15.2K",
    tokenHolders: "4.7K",
    tokenSymbol: "CODE",
    achievement: "React template bestseller",
    // REPLACE WITH YOUR IMAGE URL:
    profileImage: "https://your-image-url.com/carl-profile.jpg", // or "/images/carl-profile.jpg"
    verified: true,
    totalSales: "$203K",
  },
]

const creators = [
  {
    id: 4,
    name: "Pixel Pioneer",
    handle: "@pixelpioneer",
    category: "Digital Artist",
    followers: "3.2K",
    products: 45,
    nfts: 67,
    tokenHolders: "1.2K",
    tokenSymbol: "PIXEL",
    tokenPrice: "$2.45",
    totalSales: "$50K",
    badge: "Trending",
    verified: false,
    online: true,
    // REPLACE THESE IMAGE URLS WITH YOUR OWN:
    profileImage: "https://your-image-url.com/pixel-profile.jpg", // Main profile image
    bannerImage: "https://your-image-url.com/pixel-banner.jpg", // Banner image (optional)
    portfolioImages: [
      "https://your-image-url.com/pixel-work1.jpg", // Portfolio image 1
      "https://your-image-url.com/pixel-work2.jpg", // Portfolio image 2
      "https://your-image-url.com/pixel-work3.jpg", // Portfolio image 3
    ],
  },
  {
    id: 5,
    name: "Synth Sarah",
    handle: "@synthsarah",
    category: "Musician",
    followers: "5.7K",
    products: 23,
    nfts: 34,
    tokenHolders: "2.3K",
    tokenSymbol: "SYNTH",
    tokenPrice: "$1.89",
    totalSales: "$78K",
    badge: "Rising Star",
    verified: true,
    online: false,
    // REPLACE THESE IMAGE URLS:
    profileImage: "https://your-image-url.com/sarah-profile.jpg",
    bannerImage: "https://your-image-url.com/sarah-banner.jpg",
    portfolioImages: [
      "https://your-image-url.com/sarah-work1.jpg",
      "https://your-image-url.com/sarah-work2.jpg",
      "https://your-image-url.com/sarah-work3.jpg",
    ],
  },
  {
    id: 6,
    name: "Design Duke",
    handle: "@designduke",
    category: "UI Designer",
    followers: "4.1K",
    products: 67,
    nfts: 12,
    tokenHolders: "1.8K",
    tokenSymbol: "DUKE",
    tokenPrice: "$3.21",
    totalSales: "$92K",
    badge: "Trending",
    verified: true,
    online: true,
    // REPLACE THESE IMAGE URLS:
    profileImage: "https://your-image-url.com/duke-profile.jpg",
    bannerImage: "https://your-image-url.com/duke-banner.jpg",
    portfolioImages: [
      "https://your-image-url.com/duke-work1.jpg",
      "https://your-image-url.com/duke-work2.jpg",
      "https://your-image-url.com/duke-work3.jpg",
    ],
  },
  {
    id: 7,
    name: "GameDev Guru",
    handle: "@gamedevguru",
    category: "Game Developer",
    followers: "6.8K",
    products: 12,
    nfts: 89,
    tokenHolders: "3.1K",
    tokenSymbol: "GAME",
    tokenPrice: "$4.56",
    totalSales: "$156K",
    badge: "Rising Star",
    verified: true,
    online: true,
    // REPLACE THESE IMAGE URLS:
    profileImage: "https://your-image-url.com/guru-profile.jpg",
    bannerImage: "https://your-image-url.com/guru-banner.jpg",
    portfolioImages: [
      "https://your-image-url.com/guru-work1.jpg",
      "https://your-image-url.com/guru-work2.jpg",
      "https://your-image-url.com/guru-work3.jpg",
    ],
  },
  {
    id: 8,
    name: "Photo Phenom",
    handle: "@photophenom",
    category: "Photographer",
    followers: "2.9K",
    products: 89,
    nfts: 45,
    tokenHolders: "987",
    tokenSymbol: "PHOTO",
    tokenPrice: "$1.23",
    totalSales: "$34K",
    badge: "New Creator",
    verified: false,
    online: false,
    // REPLACE THESE IMAGE URLS:
    profileImage: "https://your-image-url.com/phenom-profile.jpg",
    bannerImage: "https://your-image-url.com/phenom-banner.jpg",
    portfolioImages: [
      "https://your-image-url.com/phenom-work1.jpg",
      "https://your-image-url.com/phenom-work2.jpg",
      "https://your-image-url.com/phenom-work3.jpg",
    ],
  },
  {
    id: 9,
    name: "Crypto Canvas",
    handle: "@cryptocanvas",
    category: "Digital Artist",
    followers: "7.3K",
    products: 34,
    nfts: 123,
    tokenHolders: "2.8K",
    tokenSymbol: "CANVAS",
    tokenPrice: "$5.67",
    totalSales: "$189K",
    badge: "Trending",
    verified: true,
    online: true,
    // REPLACE THESE IMAGE URLS:
    profileImage: "https://your-image-url.com/canvas-profile.jpg",
    bannerImage: "https://your-image-url.com/canvas-banner.jpg",
    portfolioImages: [
      "https://your-image-url.com/canvas-work1.jpg",
      "https://your-image-url.com/canvas-work2.jpg",
      "https://your-image-url.com/canvas-work3.jpg",
    ],
  },
]

const categories = [
  { id: "all", label: "All", icon: Sparkles, count: 1247 },
  { id: "digital-art", label: "Digital Art", icon: Palette, count: 423 },
  { id: "music", label: "Music", icon: Music, count: 298 },
  { id: "code", label: "Code", icon: Code, count: 187 },
  { id: "design", label: "Design", icon: Palette, count: 156 },
  { id: "gaming", label: "Gaming", icon: Gamepad2, count: 134 },
  { id: "photography", label: "Photography", icon: Camera, count: 89 },
]

const quickFilters = [
  { id: "trending", label: "Trending", icon: TrendingUp },
  { id: "new", label: "New Creators", icon: Sparkles },
  { id: "followed", label: "Most Followed", icon: Users },
  { id: "active", label: "Recently Active", icon: Flame },
]

export default function DiscoverCreators() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedQuickFilters, setSelectedQuickFilters] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [followedCreators, setFollowedCreators] = useState<number[]>([])

  // Handle scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleFollow = (creatorId: number) => {
    setFollowedCreators((prev) =>
      prev.includes(creatorId) ? prev.filter((id) => id !== creatorId) : [...prev, creatorId],
    )
  }

  const toggleQuickFilter = (filterId: string) => {
    setSelectedQuickFilters((prev) =>
      prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId],
    )
  }

  const clearAllFilters = () => {
    setSelectedCategory("all")
    setSelectedQuickFilters([])
    setSearchQuery("")
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const FeaturedCreatorCard = ({ creator }: { creator: any }) => (
    <div className="bg-gradient-to-r from-purple-900/90 to-blue-900/90 rounded-2xl p-6 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="w-16 h-16 border-2 border-white/20">
            <AvatarImage
              src={creator.profileImage || "/placeholder.svg"}
              alt={creator.name}
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                e.currentTarget.src = "/placeholder.svg?height=64&width=64"
              }}
            />
            <AvatarFallback>{creator.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-2xl font-bold">{creator.name}</h3>
              {creator.verified && <Verified className="w-6 h-6 text-blue-400" />}
            </div>
            <p className="text-purple-200">{creator.handle}</p>
          </div>
        </div>
        <Badge className="bg-purple-500/30 text-purple-100 mb-4">{creator.category}</Badge>
        <p className="text-lg mb-6">{creator.achievement}</p>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <p className="text-2xl font-bold">{creator.followers}</p>
            <p className="text-purple-200 text-sm">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{creator.tokenHolders}</p>
            <p className="text-purple-200 text-sm">Token Holders</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{creator.totalSales}</p>
            <p className="text-purple-200 text-sm">Total Sales</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button className="bg-white text-purple-900 hover:bg-gray-100">
            <ExternalLink className="w-4 h-4 mr-2" />
            Visit Store
          </Button>
          <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
            <Coins className="w-4 h-4 mr-2" />
            Buy ${creator.tokenSymbol}
          </Button>
        </div>
      </div>
    </div>
  )

  const CreatorCard = ({ creator }: { creator: any }) => {
    const isFollowed = followedCreators.includes(creator.id)

    return (
      <Card className="group hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            {/* Banner Image (optional) */}
            {creator.bannerImage && (
              <div className="relative overflow-hidden h-32">
                <img
                  src={creator.bannerImage || "/placeholder.svg"}
                  alt={`${creator.name} banner`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Hide banner if image fails to load
                    e.currentTarget.style.display = "none"
                  }}
                />
              </div>
            )}

            {/* Main Profile Image */}
            <div className="relative overflow-hidden">
              <img
                src={creator.profileImage || "/placeholder.svg"}
                alt={creator.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  e.currentTarget.src = "/placeholder.svg?height=192&width=300"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Online status */}
              {creator.online && (
                <div className="absolute top-3 right-3 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              )}

              {/* Badge */}
              {creator.badge && (
                <div className="absolute top-3 left-3">
                  <Badge
                    className={`${
                      creator.badge === "Trending"
                        ? "bg-orange-500 text-white"
                        : creator.badge === "Rising Star"
                          ? "bg-purple-500 text-white"
                          : "bg-green-500 text-white"
                    }`}
                  >
                    {creator.badge === "Trending" && <TrendingUp className="w-3 h-3 mr-1" />}
                    {creator.badge === "Rising Star" && <Star className="w-3 h-3 mr-1" />}
                    {creator.badge === "New Creator" && <Sparkles className="w-3 h-3 mr-1" />}
                    {creator.badge}
                  </Badge>
                </div>
              )}

              {/* Quick actions overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex space-x-2">
                  <Button size="sm" className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={isFollowed ? "default" : "outline"}
                    onClick={() => toggleFollow(creator.id)}
                    className={`backdrop-blur-sm ${
                      isFollowed
                        ? "bg-purple-600 text-white hover:bg-purple-700"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFollowed ? "fill-current" : ""}`} />
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-white">{creator.name}</h3>
                  {creator.verified && <Verified className="w-4 h-4 text-blue-400" />}
                </div>
                <Badge variant="outline" className="text-xs border-purple-500 text-purple-300">
                  {creator.category}
                </Badge>
              </div>

              <p className="text-gray-400 text-sm mb-3">{creator.handle}</p>

              <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                <div>
                  <p className="text-white font-semibold text-sm">{creator.followers}</p>
                  <p className="text-gray-400 text-xs">Followers</p>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{creator.products}</p>
                  <p className="text-gray-400 text-xs">Products</p>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{creator.nfts}</p>
                  <p className="text-gray-400 text-xs">NFTs</p>
                </div>
              </div>

              <Separator className="my-3 bg-gray-700" />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Coins className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-gray-300">${creator.tokenSymbol}</span>
                  <span className="text-sm font-semibold text-green-400">{creator.tokenPrice}</span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">{creator.tokenHolders} holders</p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Total Sales</span>
                  <span className="text-sm font-semibold text-green-400">{creator.totalSales}</span>
                </div>
              </div>

              {/* Portfolio Images (optional) */}
              {creator.portfolioImages && creator.portfolioImages.length > 0 && (
                <div className="mt-3">
                  <p className="text-gray-400 text-xs mb-2">Recent Work</p>
                  <div className="grid grid-cols-3 gap-1">
                    {creator.portfolioImages.map((image: string, index: number) => (
                      <img
                        key={index}
                        src={image || "/placeholder.svg"}
                        alt={`${creator.name} work ${index + 1}`}
                        className="w-full h-12 object-cover rounded"
                        onError={(e) => {
                          // Hide portfolio image if it fails to load
                          e.currentTarget.style.display = "none"
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section - Featured Creators */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Discover Amazing{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Creators
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore the most innovative creators in the Web3 space. Find digital artists, musicians, developers, and
              more building the future of the creator economy.
            </p>
          </div>

          {/* Featured Creators Grid - Static */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {featuredCreators.map((creator) => (
              <FeaturedCreatorCard key={creator.id} creator={creator} />
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search creators, categories, or products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 h-12"
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-gray-700 text-gray-300 hover:bg-gray-800 h-12"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </Button>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-3 mt-6">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                    selectedCategory === category.id
                      ? "bg-purple-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.label}</span>
                  <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                    {category.count}
                  </Badge>
                </button>
              )
            })}
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-3 mt-4">
            {quickFilters.map((filter) => {
              const Icon = filter.icon
              const isSelected = selectedQuickFilters.includes(filter.id)
              return (
                <button
                  key={filter.id}
                  onClick={() => toggleQuickFilter(filter.id)}
                  className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm transition-colors ${
                    isSelected
                      ? "bg-orange-600 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-300"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{filter.label}</span>
                </button>
              )
            })}
          </div>

          {/* Active Filters */}
          {(selectedCategory !== "all" || selectedQuickFilters.length > 0 || searchQuery) && (
            <div className="flex items-center space-x-3 mt-4">
              <span className="text-sm text-gray-400">Active filters:</span>
              <div className="flex flex-wrap gap-2">
                {selectedCategory !== "all" && (
                  <Badge variant="outline" className="border-purple-500 text-purple-300">
                    {categories.find((c) => c.id === selectedCategory)?.label}
                    <button onClick={() => setSelectedCategory("all")} className="ml-2">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {selectedQuickFilters.map((filterId) => (
                  <Badge key={filterId} variant="outline" className="border-orange-500 text-orange-300">
                    {quickFilters.find((f) => f.id === filterId)?.label}
                    <button onClick={() => toggleQuickFilter(filterId)} className="ml-2">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                {searchQuery && (
                  <Badge variant="outline" className="border-blue-500 text-blue-300">
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery("")} className="ml-2">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-gray-400 hover:text-white">
                Clear all
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Creator Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {searchQuery ? `Search results for "${searchQuery}"` : "All Creators"}
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>{creators.length} creators found</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {creators.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">Load More Creators</Button>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
