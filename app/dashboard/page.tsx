"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DollarSign,
  Gem,
  Users,
  Coins,
  TrendingUp,
  Download,
  ExternalLink,
  Star,
  Bell,
  Search,
  Moon,
  Sun,
  User,
  Zap,
  Gift,
  HelpCircle,
  Play,
  Eye,
  ShoppingBag,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"

export default function CreatorVaultDashboard() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications] = useState(3)
  const [storedname, setStoredName] = useState("")

    useEffect(()=>{
        const storedName = localStorage.getItem("name");
        if (storedName) {
            setStoredName(storedName);
        }
    })

  const stats = [
    {
      title: "Total Purchases",
      value: "$2,450",
      icon: DollarSign,
      change: "+12%",
      changeType: "positive",
      description: "This month",
    },
    {
      title: "NFTs Owned",
      value: "23",
      icon: Gem,
      change: "+3",
      changeType: "positive",
      description: "New this week",
    },
    {
      title: "Active Subscriptions",
      value: "5",
      icon: Users,
      change: "2 new",
      changeType: "neutral",
      description: "Premium tiers",
    },
    {
      title: "Creator Tokens",
      value: "12",
      icon: Coins,
      change: "+$156",
      changeType: "positive",
      description: "Portfolio value",
    },
  ]

  const recentActivity = [
    {
      type: "purchase",
      title: "Neon Dreams Collection",
      creator: "@PixelArtist",
      amount: "$89",
      time: "2 hours ago",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "completed",
    },
    {
      type: "nft",
      title: "Cyberpunk Avatar #1247",
      creator: "@CyberCreator",
      amount: "0.5 ETH",
      time: "1 day ago",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "minted",
    },
    {
      type: "reward",
      title: "Staking Rewards Claimed",
      creator: "PIXEL Token",
      amount: "+125 PIXEL",
      time: "2 days ago",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "claimed",
    },
    {
      type: "subscription",
      title: "Premium Subscription Renewed",
      creator: "@MusicProducer",
      amount: "$49",
      time: "3 days ago",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "active",
    },
  ]

  const recentPurchases = [
    {
      title: "Lo-Fi Beats Vol. 3",
      creator: "@ChillProducer",
      price: "$25",
      downloads: "12 tracks + stems",
      image: "/placeholder.svg?height=80&width=80",
      category: "Music",
      downloadCount: "3/10",
    },
    {
      title: "React Dashboard Kit",
      creator: "@CodeMaster",
      price: "$149",
      downloads: "Templates + docs",
      image: "/placeholder.svg?height=80&width=80",
      category: "Code",
      downloadCount: "2/3",
    },
    {
      title: "Photography Masterclass",
      creator: "@PhotoPro",
      price: "$199",
      downloads: "Video course + presets",
      image: "/placeholder.svg?height=80&width=80",
      category: "Education",
      downloadCount: "1/1",
    },
  ]

  const trendingCreators = [
    {
      name: "@DigitalArtist",
      category: "Digital Art",
      followers: "12.5K",
      avatar: "/placeholder.svg?height=40&width=40",
      trending: "+15%",
      newReleases: 2,
    },
    {
      name: "@BeatMaker",
      category: "Music",
      followers: "8.3K",
      avatar: "/placeholder.svg?height=40&width=40",
      trending: "+8%",
      newReleases: 1,
    },
    {
      name: "@CodeGuru",
      category: "Development",
      followers: "15.2K",
      avatar: "/placeholder.svg?height=40&width=40",
      trending: "+22%",
      newReleases: 3,
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "purchase":
        return <ShoppingBag className="h-4 w-4 text-blue-600" />
      case "nft":
        return <Gem className="h-4 w-4 text-purple-600" />
      case "reward":
        return <Gift className="h-4 w-4 text-green-600" />
      case "subscription":
        return <Users className="h-4 w-4 text-orange-600" />
      default:
        return <Star className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "minted":
        return "bg-purple-100 text-purple-800"
      case "claimed":
        return "bg-blue-100 text-blue-800"
      case "active":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              CreatorVault
            </h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search your collection..." className="pl-10 w-80" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {notifications}
                </Badge>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@cryptocollector23" />
                    <AvatarFallback>CC</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="p-6 space-y-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {storedname} 👋</h1>
            <p className="text-gray-600 dark:text-gray-400">Here's what's happening with your collection today</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">Member since</p>
              <p className="font-semibold">March 2024</p>
            </div>
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Profile" />
              <AvatarFallback>CC</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                        <span
                          className={`text-sm ${stat.changeType === "positive" ? "text-green-600" : "text-gray-600"}`}
                        >
                          {stat.change}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">{stat.description}</span>
                      </div>
                    </div>
                    <div className="h-12 w-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Activity
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex-shrink-0">{getActivityIcon(activity.type)}</div>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={activity.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{activity.creator.slice(1, 3)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{activity.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {activity.creator} • {activity.time}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                      <span className="text-sm font-medium">{activity.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Trending in Your Network */}
          <Card>
            <CardHeader>
              <CardTitle>Trending in Your Network</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendingCreators.map((creator, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={creator.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{creator.name.slice(1, 3)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{creator.name}</p>
                      <p className="text-xs text-gray-500">{creator.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-green-600 text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {creator.trending}
                      </div>
                      {creator.newReleases > 0 && (
                        <Badge variant="secondary" className="text-xs mt-1">
                          {creator.newReleases} new
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Purchases */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Purchases
              <Button variant="ghost" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Library
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentPurchases.map((purchase, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 rounded-lg border hover:shadow-md transition-shadow"
                >
                  <img
                    src={purchase.image || "/placeholder.svg"}
                    alt={purchase.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">{purchase.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{purchase.creator}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {purchase.category}
                      </Badge>
                      <span className="text-xs text-gray-500">{purchase.downloadCount}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-medium">{purchase.price}</span>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                        <Button size="sm" variant="ghost" className="h-6 px-2">
                          <Play className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-20 flex-col space-y-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Star className="h-6 w-6" />
                <span>Discover Creators</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2 hover:bg-gray-50">
                <Download className="h-6 w-6" />
                <span>Browse Library</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2 hover:bg-gray-50 relative">
                <Coins className="h-6 w-6" />
                <span>Claim Rewards</span>
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2 hover:bg-gray-50">
                <ExternalLink className="h-6 w-6" />
                <span>Marketplace</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Access Sidebar Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Button variant="outline" className="flex-1">
                <Zap className="h-4 w-4 mr-2" />
                Getting Started Guide
              </Button>
              <Button variant="outline" className="flex-1">
                <HelpCircle className="h-4 w-4 mr-2" />
                Support Center
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
