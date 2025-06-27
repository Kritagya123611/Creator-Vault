"use client"

import { useState } from "react"
import {
  Wallet,
  TrendingUp,
  Users,
  Coins,
  ImageIcon,
  Bell,
  Settings,
  BarChart3,
  Crown,
  Activity,
  ChevronRight,
  Zap,
  DollarSign,
  Star,
  ArrowUpRight,
  Copy,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Contract addresses (keep as provided)
const CONTRACT_ADDRESSES = {
  NFT: "0x1234567890123456789012345678901234567890",
  EDITION: "0x2345678901234567890123456789012345678901",
  TOKEN: "0x3456789012345678901234567890123456789012",
  ROYALTY: "0x4567890123456789012345678901234567890123",
}

// Sample data for the dashboard
const revenueData = [
  { month: "Jan", revenue: 1200 },
  { month: "Feb", revenue: 1900 },
  { month: "Mar", revenue: 1600 },
  { month: "Apr", revenue: 2400 },
  { month: "May", revenue: 2100 },
  { month: "Jun", revenue: 2800 },
]

const tokenDistribution = [
  { name: "Holders", value: 65, color: "#6366f1" },
  { name: "Staked", value: 25, color: "#8b5cf6" },
  { name: "Available", value: 10, color: "#a855f7" },
]

const sampleNFTs = [
  {
    id: 1,
    title: "Cosmic Dreams #001",
    price: "0.5 ETH",
    image: "/placeholder.svg?height=200&width=200",
    mintDate: "2024-01-15",
  },
  {
    id: 2,
    title: "Digital Sunset #042",
    price: "0.3 ETH",
    image: "/placeholder.svg?height=200&width=200",
    mintDate: "2024-01-12",
  },
  {
    id: 3,
    title: "Abstract Flow #128",
    price: "0.7 ETH",
    image: "/placeholder.svg?height=200&width=200",
    mintDate: "2024-01-10",
  },
  {
    id: 4,
    title: "Neon Vibes #256",
    price: "0.4 ETH",
    image: "/placeholder.svg?height=200&width=200",
    mintDate: "2024-01-08",
  },
]

const recentTransactions = [
  { id: 1, type: "NFT Sale", amount: "0 ETH", buyer: "No Data", time: "No Data" },
  { id: 2, type: "Token Purchase", amount: "0 VAULT", buyer: "No Data", time: "No Data" },
  { id: 3, type: "Royalty", amount: "0 ETH", buyer: "No Data", time: "No Data" },
  { id: 4, type: "NFT Sale", amount: "0 ETH", buyer: "No Data", time: "No Data" },
]

export default function CreatorVaultDashboard() {
  // Web3 State (keep existing logic)
  const [account, setAccount] = useState<string>("")
  const [status, setStatus] = useState<string>("Ready to connect wallet")
  const [loading, setLoading] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState("dashboard")

  // Connect Wallet Function (keep existing logic)
  const connectWallet = async () => {
    setLoading(true)
    setStatus("Connecting wallet...")

    try {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        setAccount(accounts[0])
        setStatus("Wallet connected successfully!")
      } else {
        setStatus("Please install MetaMask!")
      }
    } catch (error) {
      setStatus("Failed to connect wallet")
      console.error("Error connecting wallet:", error)
    } finally {
      setLoading(false)
    }
  }

  // Web3 Functions (keep existing logic)
  const mintNFT = async () => {
    setLoading(true)
    setStatus("Minting NFT...")

    try {
      // Simulate minting process
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setStatus("NFT minted successfully!")
    } catch (error) {
      setStatus("Failed to mint NFT")
      console.error("Error minting NFT:", error)
    } finally {
      setLoading(false)
    }
  }

  const mintEdition = async () => {
    setLoading(true)
    setStatus("Minting Edition...")

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setStatus("Edition minted successfully!")
    } catch (error) {
      setStatus("Failed to mint edition")
      console.error("Error minting edition:", error)
    } finally {
      setLoading(false)
    }
  }

  const buyToken = async () => {
    setLoading(true)
    setStatus("Purchasing tokens...")

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setStatus("Tokens purchased successfully!")
    } catch (error) {
      setStatus("Failed to purchase tokens")
      console.error("Error purchasing tokens:", error)
    } finally {
      setLoading(false)
    }
  }

  const testRoyalty = async () => {
    setLoading(true)
    setStatus("Sending royalty payment...")

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setStatus("Royalty payment sent successfully!")
    } catch (error) {
      setStatus("Failed to send royalty payment")
      console.error("Error sending royalty:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a3a] to-[#0f0f23]">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-black/20 backdrop-blur-xl border-r border-white/10 z-50">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">CreatorVault</h1>
              <p className="text-xs text-gray-400">Web3 Creator Hub</p>
            </div>
          </div>

          <nav className="space-y-2">
            {[
              { id: "dashboard", label: "Dashboard", icon: BarChart3 },
              { id: "nfts", label: "NFT Collection", icon: ImageIcon },
              { id: "tokens", label: "Tokens", icon: Coins },
              { id: "analytics", label: "Analytics", icon: TrendingUp },
              { id: "settings", label: "Settings", icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-indigo-500/20 to-purple-600/20 text-white border border-indigo-500/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 min-h-screen">
        {/* Header */}
        <header className="bg-black/20 backdrop-blur-xl border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Creator Dashboard</h2>
              <p className="text-gray-400">Manage your Web3 creator economy</p>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Bell className="w-5 h-5" />
              </Button>

              {/* Wallet Connection */}
              <div className="flex items-center gap-3">
                {account ? (
                  <div className="flex items-center gap-3 bg-green-500/20 border border-green-500/30 rounded-xl px-4 py-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 font-medium">
                      {account.slice(0, 6)}...{account.slice(-4)}
                    </span>
                  </div>
                ) : (
                  <Button
                    onClick={connectWallet}
                    disabled={loading}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    {loading ? "Connecting..." : "Connect Wallet"}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Status Message */}
          {status && (
            <div className="mt-4 p-3 bg-indigo-500/20 border border-indigo-500/30 rounded-xl">
              <p className="text-indigo-300 text-sm">{status}</p>
            </div>
          )}
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="dashboard" className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-black/20 backdrop-blur-xl border-white/10">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Total NFTs</CardTitle>
                    <ImageIcon className="h-4 w-4 text-indigo-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">0</div>
                    <p className="text-xs text-green-400">0% from last month</p>
                  </CardContent>
                </Card>

                <Card className="bg-black/20 backdrop-blur-xl border-white/10">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-green-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">$0</div>
                    <p className="text-xs text-green-400">+0% from last month</p>
                  </CardContent>
                </Card>

                <Card className="bg-black/20 backdrop-blur-xl border-white/10">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Active Tokens</CardTitle>
                    <Coins className="h-4 w-4 text-purple-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">0</div>
                    <p className="text-xs text-purple-400">VAULT tokens</p>
                  </CardContent>
                </Card>

                <Card className="bg-black/20 backdrop-blur-xl border-white/10">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Community</CardTitle>
                    <Users className="h-4 w-4 text-blue-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">0</div>
                    <p className="text-xs text-blue-400">0% this week</p>
                  </CardContent>
                </Card>
              </div>

              {/* Web3 Actions Panel */}
              <Card className="bg-black/20 backdrop-blur-xl border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    Web3 Actions
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage your NFTs, tokens, and smart contracts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button
                      onClick={mintNFT}
                      disabled={loading || !account}
                      className="h-24 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 border border-indigo-500/30 hover:from-indigo-500/30 hover:to-purple-600/30"
                    >
                      <ImageIcon className="w-6 h-6" />
                      <span>Mint NFT</span>
                    </Button>

                    <Button
                      onClick={mintEdition}
                      disabled={loading || !account}
                      className="h-24 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-600/20 border border-purple-500/30 hover:from-purple-500/30 hover:to-pink-600/30"
                    >
                      <Copy className="w-6 h-6" />
                      <span>Mint Edition</span>
                    </Button>

                    <Button
                      onClick={buyToken}
                      disabled={loading || !account}
                      className="h-24 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30 hover:from-green-500/30 hover:to-emerald-600/30"
                    >
                      <Coins className="w-6 h-6" />
                      <span>Buy Tokens</span>
                    </Button>

                    <Button
                      onClick={testRoyalty}
                      disabled={loading || !account}
                      className="h-24 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-yellow-500/20 to-orange-600/20 border border-yellow-500/30 hover:from-yellow-500/30 hover:to-orange-600/30"
                    >
                      <Star className="w-6 h-6" />
                      <span>Send Royalty</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-black/20 backdrop-blur-xl border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Revenue Analytics</CardTitle>
                    <CardDescription className="text-gray-400">Monthly revenue over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="month" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1F2937",
                            border: "1px solid #374151",
                            borderRadius: "8px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          stroke="#6366f1"
                          strokeWidth={3}
                          dot={{ fill: "#6366f1", strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-black/20 backdrop-blur-xl border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Token Distribution</CardTitle>
                    <CardDescription className="text-gray-400">How your tokens are distributed</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={tokenDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {tokenDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-4 mt-4">
                      {tokenDistribution.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-sm text-gray-400">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* NFT Collection Preview & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-black/20 backdrop-blur-xl border-white/10">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-white">NFT Collection</CardTitle>
                      <CardDescription className="text-gray-400">Your latest creations</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" className="text-indigo-400 hover:text-indigo-300">
                      View All <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {sampleNFTs.slice(0, 4).map((nft) => (
                        <div key={nft.id} className="group cursor-pointer">
                          <div className="aspect-square bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-xl mb-2 flex items-center justify-center border border-white/10 group-hover:border-indigo-500/50 transition-all">
                            <ImageIcon className="w-8 h-8 text-gray-400" />
                          </div>
                          <h4 className="text-sm font-medium text-white truncate">{nft.title}</h4>
                          <p className="text-xs text-indigo-400">{nft.price}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/20 backdrop-blur-xl border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Activity className="w-5 h-5 text-green-400" />
                      Recent Activity
                    </CardTitle>
                    <CardDescription className="text-gray-400">Latest transactions and events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentTransactions.map((tx) => (
                        <div
                          key={tx.id}
                          className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                              <ArrowUpRight className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">{tx.type}</p>
                              <p className="text-xs text-gray-400">{tx.buyer}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-green-400">{tx.amount}</p>
                            <p className="text-xs text-gray-400">{tx.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Other tabs content would go here */}
            <TabsContent value="nfts">
              <Card className="bg-black/20 backdrop-blur-xl border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">NFT Collection Management</CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage your NFT collection and mint new pieces
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">NFT collection management coming soon...</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tokens">
              <Card className="bg-black/20 backdrop-blur-xl border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Token Management</CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage your creator tokens and distribution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Coins className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">Token management features coming soon...</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card className="bg-black/20 backdrop-blur-xl border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Advanced Analytics</CardTitle>
                  <CardDescription className="text-gray-400">Deep insights into your creator economy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">Advanced analytics coming soon...</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="bg-black/20 backdrop-blur-xl border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Settings</CardTitle>
                  <CardDescription className="text-gray-400">Configure your creator dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">Settings panel coming soon...</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
