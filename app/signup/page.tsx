"use client"
import type React from "react"
import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  ArrowRight,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Sparkles,
  Loader2,
  Coins,
  ImageIcon,
  CheckCircle,
} from "lucide-react"
import { useRouter } from "next/navigation";
export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    role: "creator",
    email: "",
    password: "",
  })

  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if(name==="name"){
      localStorage.setItem("name", value);
    }
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setMessage("");
  setLoading(true);
  setIsSuccess(false);

  try {
    console.log("Submitting to backend...");
    const response = await axios.post("http://localhost:5000/signin", formData);
    console.log("Response:", response);

    setMessage(response.data.message);
    setIsSuccess(true);

    setFormData({
      name: "",
      role: "creator",
      email: "",
      password: "",
    });

    console.log("Redirecting...");

    // Conditional redirect based on role
    if (formData.role === "creator") {
      router.push("./Cform"); // store setup for creators
    } else {
      router.push("./dashboard"); // or any consumer landing page
    }

  } catch (err: any) {
    console.error("Error during sign up:", err.response?.data || err);
    setMessage(err.response?.data?.error || "Something went wrong");
    setIsSuccess(false);
  } finally {
    setLoading(false);
  }
};


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
              Start Your Creator Journey
            </div>
            <h1 className="text-3xl font-bold mb-2">
              Join{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                CreatorVault
              </span>
            </h1>
            <p className="text-muted-foreground">Create your account and unlock the power of Web3 commerce</p>
          </div>

          <Card className="backdrop-blur-sm bg-background/80 border shadow-2xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
              <p className="text-sm text-muted-foreground">Get started with your free account</p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
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

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
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
                      placeholder="Create a secure password"
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
                      Create Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                {message && (
                  <div
                    className={`p-4 rounded-lg text-center flex items-center justify-center space-x-2 ${
                      isSuccess
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {isSuccess && <CheckCircle className="w-4 h-4" />}
                    <span>{message}</span>
                  </div>
                )}
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Button variant="link" className="px-0 text-sm font-medium">
                    Sign in here
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-4">What you get with CreatorVault:</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2 p-3 bg-background/60 rounded-lg border">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-background/60 rounded-lg border">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-background/60 rounded-lg border">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>NFT minting tools</span>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-background/60 rounded-lg border">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
