"use client"
import { useRouter } from "next/navigation"
import type React from "react"
import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowRight, Mail, Lock, User, Eye, EyeOff, Sparkles, Loader2, Coins, ImageIcon, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
type FormData = {
  name: string
  role: "creator" | "consumer"
  email: string
  password: string
}

export default function AuthPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    role: "creator",
    email: "",
    password: "",
  })

  const [activeTab, setActiveTab] = useState("login")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { theme, setTheme } = useTheme()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      role: value as "creator" | "consumer",
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    try {
      const url = activeTab === "login" ? "http://localhost:5000/login" : "http://localhost:5000/signin"
      const payload =
        activeTab === "login"
          ? {
              email: formData.email,
              password: formData.password,
            }
          : formData

      const res = await axios.post(url, payload)
      setMessage(res.data.message || "Success")
      if (res.status == 200) {
        router.push("./Cform")
      }
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-purple-50/20 dark:to-purple-950/20">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="bg-background/80 backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
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
          <ImageIcon className="w-6 h-6 text-pink-400 opacity-30" />
        </div>
        <div className="absolute top-1/2 left-10 animate-float delay-500">
          <Sparkles className="w-7 h-7 text-blue-400 opacity-30" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-sm font-medium text-purple-700 dark:text-purple-300 mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Join the Creator Economy
            </div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                CreatorVault
              </span>
            </h1>
            <p className="text-muted-foreground">Start building your Web3-powered creator business today</p>
          </div>

          <Card className="backdrop-blur-sm bg-background/80 border shadow-2xl">
            <CardHeader className="space-y-1 pb-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {activeTab === "signup" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className="pl-10 h-11"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-medium">I want to join as a:</Label>
                      <RadioGroup value={formData.role} onValueChange={handleRoleChange}>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                            <RadioGroupItem value="creator" id="creator" className="mt-1" />
                            <div className="space-y-1">
                              <Label htmlFor="creator" className="font-medium cursor-pointer">
                                Creator
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                I want to sell digital products, mint NFTs, and build my creator business
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                            <RadioGroupItem value="consumer" id="consumer" className="mt-1" />
                            <div className="space-y-1">
                              <Label htmlFor="consumer" className="font-medium cursor-pointer">
                                Consumer
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                I want to discover and purchase digital products from creators
                              </p>
                            </div>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 h-11"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      {activeTab === "login" ? "Sign In" : "Sign Up"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                {message && (
                  <div
                    className={`p-3 rounded-md text-center ${message.includes("Success") ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"}`}
                  >
                    {message}
                  </div>
                )}
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {activeTab === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                  <Button
                    variant="link"
                    className="px-0 text-sm font-medium"
                    onClick={() => setActiveTab(activeTab === "login" ? "signup" : "login")}
                  >
                    {activeTab === "login" ? "Sign up" : "Sign in"}
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <div className="grid grid-cols-3 gap-8 text-sm text-muted-foreground">
              <div>
                <div className="font-semibold text-purple-600">14-Day</div>
                <div>Free Trial</div>
              </div>
              <div>
                <div className="font-semibold text-pink-600">No Setup</div>
                <div>Fees</div>
              </div>
              <div>
                <div className="font-semibold text-blue-600">24/7</div>
                <div>Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
