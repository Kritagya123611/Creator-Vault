"use client"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import type React from "react"
import { use, useEffect } from "react";
import { useAccount } from "wagmi"; // for MetaMask
import { useWallet } from "@solana/wallet-adapter-react"; // for Phantom
import { useState } from "react"
import Link from 'next/link';
import {
  Home,
  Store,
  Package,
  Coins,
  Users,
  BarChart3,
  Plus,
  Search,
  Bell,
  Menu,
  DollarSign,
  TrendingUp,
  Activity,
  Sparkles,
  Sun,
  Moon,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Crown,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "next-themes"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Add this interface after the imports
interface StatCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ComponentType<{ className?: string }>
}

// Sample data
const stats = [
  { title: "Total Revenue", value: "$0", change: "0%", trend: "null", icon: DollarSign },
  { title: "NFTs Sold", value: "0", change: "no changes this week", trend: "null", icon: Coins },
  { title: "Active Followers", value: "0", change: "0 this month", trend: "null", icon: Users },
  { title: "Products Listed", value: "0", change: "0 new", trend: "null", icon: Package },
]

const revenueData = [
  { month: "Jan", revenue: 0, nft: 0 },
  { month: "Feb", revenue: 0, nft: 0 },
  { month: "Mar", revenue: 0, nft: 0 },
  { month: "Apr", revenue: 0, nft: 0 },
  { month: "May", revenue: 0, nft: 0 },
  { month: "Jun", revenue: 0, nft: 0 },
]

const audienceData = [
  { name: "NFT Collectors", value: 45, color: "#8B5CF6" },
  { name: "Digital Art Fans", value: 30, color: "#06B6D4" },
  { name: "Music Lovers", value: 15, color: "#10B981" },
  { name: "Developers", value: 10, color: "#F59E0B" },
]

const recentSales = [
  { item: "Cosmic Dreams #47", price: "$0", buyer: "CryptoCollector", time: "2h ago", type: "nft" },
  { item: "UI Template Pack", price: "$0", buyer: "DesignStudio", time: "4h ago", type: "digital" },
  { item: "Ambient Music Vol.1", price: "$0", buyer: "MusicLover", time: "6h ago", type: "audio" },
  { item: "React Components", price: "$0", buyer: "DevTeam", time: "1d ago", type: "code" },
]

const products = [
  { name: "Cosmic Dreams Collection", type: "NFT", price: "$0", sales: 0, status: "active" },
  { name: "UI Design Templates", type: "Digital", price: "$0", sales: 0, status: "active" },
  { name: "Ambient Music Pack", type: "Audio", price: "$0", sales: 0, status: "active" },
  { name: "Code Snippets Library", type: "Digital", price: "$0", sales: 0, status: "active" },
  { name: "3D Model Collection", type: "NFT", price: "$0", sales: 0, status: "draft" },
  { name: "Photography Presets", type: "Digital", price: "$0", sales: 0, status: "active" },
]

export default function CreatorDashboard() {
  const [activeSection, setActiveSection] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { theme, setTheme } = useTheme()
  const { isConnected: isEvmConnected } = useAccount();
const { connected: isSolanaConnected } = useWallet();
const [showWalletModal, setShowWalletModal] = useState(false);
const [storedname, setStoredName] = useState("");

useEffect(() => {
  if (!isEvmConnected && !isSolanaConnected) {
    setShowWalletModal(true);
  }
}, [isEvmConnected, isSolanaConnected]);

useEffect(() => {
  const loadName = () => {
    const stored = localStorage.getItem("name");
    setStoredName(stored ? stored : "Creator");
  };

  loadName();

  // Optional: Listen for localStorage updates across tabs/components
  window.addEventListener("storage", loadName);
  return () => window.removeEventListener("storage", loadName);
}, []);


  const menuItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "products", label: "Products", icon: Package },
    { id: "nft", label: "NFT Collections", icon: Coins },
    { id: "store", label: "Store Settings", icon: Store },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "community", label: "Community", icon: Users },
  ]

  type StatCardProps = {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ElementType
}
    const stats: StatCardProps[] = [
  { title: "Total Revenue", value: "$0", change: "0%", trend: "up", icon: TrendingUp },
  { title: "Products Sold", value: "0", change: "0%", trend: "up", icon: Package },
  { title: "NFTs Minted", value: "0", change: "0%", trend: "down", icon: Coins },
  { title: "Active Users", value: "0", change: "0%", trend: "up", icon: Users },
]
  const StatCard = ({ title, value, change, trend, icon: Icon }: StatCardProps) => (
  <Card className="hover:shadow-lg transition-all duration-300 dark:hover:shadow-purple-500/10">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          <div
            className={`flex items-center mt-2 text-sm ${
              trend === "up"
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {trend === "up" ? (
              <ArrowUpRight className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDownRight className="w-4 h-4 mr-1" />
            )}
            {change}
          </div>
        </div>
        <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
      </div>
    </CardContent>
  </Card>
)


  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, {storedname}! 👋</h2>
            <p className="text-purple-100 mb-4">Your creator business is growing. Here's your latest performance.</p>
          </div>
          <div className="flex space-x-3">
            <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
              <Plus className="w-4 h-4 mr-2" />
              Create Product
            </Button>
            <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
              <Coins className="w-4 h-4 mr-2" />
              Mint NFT
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
              Revenue Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" className="text-sm" />
                <YAxis className="text-sm" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.2} />
                <Area type="monotone" dataKey="nft" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
              Audience Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={audienceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {audienceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {audienceData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
              Recent Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSales.map((sale, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-full ${
                        sale.type === "nft"
                          ? "bg-purple-100 dark:bg-purple-900/30"
                          : sale.type === "digital"
                            ? "bg-blue-100 dark:bg-blue-900/30"
                            : sale.type === "audio"
                              ? "bg-green-100 dark:bg-green-900/30"
                              : "bg-orange-100 dark:bg-orange-900/30"
                      }`}
                    >
                      {sale.type === "nft" ? (
                        <Coins className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      ) : sale.type === "digital" ? (
                        <Package className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      ) : sale.type === "audio" ? (
                        <Zap className="w-4 h-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <Settings className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{sale.item}</p>
                      <p className="text-sm text-muted-foreground">
                        {sale.buyer} • {sale.time}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-green-600 dark:text-green-400">{sale.price}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Crown className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
              Top Performing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.slice(0, 4).map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {product.type}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{product.sales} sales</span>
                    </div>
                  </div>
                  <p className="font-bold">{product.price}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Products & Inventory</h2>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add New Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 dark:hover:shadow-purple-500/10">
            <CardContent className="p-4">
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg h-32 mb-3 flex items-center justify-center">
                <Package className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{product.name}</h3>
                <Badge variant={product.status === "active" ? "default" : "secondary"}>{product.status}</Badge>
              </div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline">{product.type}</Badge>
                <span className="font-bold">{product.price}</span>
              </div>
              <p className="text-sm text-muted-foreground">{product.sales} sales</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderNFT = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">NFT Collections</h2>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create Collection
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Coins className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
            <h3 className="font-bold text-2xl">247</h3>
            <p className="text-muted-foreground">Total Minted</p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">+15 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
            <h3 className="font-bold text-2xl">1,234</h3>
            <p className="text-muted-foreground">Collectors</p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">+89 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-3" />
            <h3 className="font-bold text-2xl">2.4 ETH</h3>
            <p className="text-muted-foreground">Floor Price</p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">+0.3 ETH</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Collections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Cosmic Dreams", minted: 47, total: 100, floor: "2.4 ETH", volume: "156 ETH" },
              { name: "Digital Abstracts", minted: 89, total: 150, floor: "1.8 ETH", volume: "89 ETH" },
              { name: "Future Visions", minted: 111, total: 200, floor: "3.2 ETH", volume: "234 ETH" },
            ].map((collection, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{collection.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {collection.minted}/{collection.total} minted
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{collection.floor}</p>
                  <p className="text-sm text-muted-foreground">{collection.volume} volume</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return renderOverview()
      case "products":
        return renderProducts()
      case "nft":
        return renderNFT()
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Coming soon...</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      {showWalletModal && (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
    <div className="relative bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-md shadow-xl text-center">
      
      {/* ❌ Close Button */}
      <button
        onClick={() => setShowWalletModal(false)}
        className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
      <p className="mb-4 text-muted-foreground">
        To continue using Creator Dashboard, you can connect a wallet — or skip for now.
      </p>

      <div className="flex justify-center gap-4">
        <ConnectButton showBalance={false} />
        <WalletMultiButton className="phantom-button bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg" />
      </div>
    </div>
  </div>
)}

      <div className={`${sidebarOpen ? "w-64" : "w-16"} bg-card border-r transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && <span className="font-bold text-lg">CreatorVault</span>}
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {sidebarOpen && <span>{item.label}</span>}
                </button>
              )
            })}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="font-medium">{storedname}</p>
                <p className="text-sm text-muted-foreground">Pro Creator</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-semibold capitalize">{activeSection.replace("-", " ")}</h1>
            </div>

            <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-10 w-64" />
            </div>
            <Link href='./FrontendSOL'>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">Mint / Buy / Royalty Tools</Button>
            </Link>
            
            <Button
              onClick={() => setShowWalletModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Connect Wallet
            </Button>

            <Button variant="ghost" size="sm">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
