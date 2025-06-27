"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import axios from "axios"
import { Check, X, Upload, ArrowLeft, ArrowRight, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTheme } from "next-themes";


// Custom Progress component with theme-aware color
function Progress({
  value,
  className,
  indicatorColor,
}: {
  value: number
  className?: string
  indicatorColor?: string
}) {
  const { theme } = useTheme()
  const defaultColor = theme === "dark" ? "bg-amber-500" : "bg-amber-400"

  return (
    <div className={`w-full bg-white/20 dark:bg-gray-700/50 rounded-full overflow-hidden ${className}`}>
      <div
        className={`h-full ${indicatorColor || defaultColor} transition-all duration-300 ease-in-out`}
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

export default function CformPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [formData, setFormData] = useState({
    name: "",
    profilePicture: "",
    subdomain: "",
    bio: "",
    category: "Art", // Default category
  })
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [subdomainStatus, setSubdomainStatus] = useState<"available" | "unavailable" | "checking" | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // Check subdomain availability with debounce
  useEffect(() => {
    if (!formData.subdomain) {
      setSubdomainStatus(null)
      return
    }

    const timer = setTimeout(() => {
      setSubdomainStatus("checking")
      // Simulate checking - in a real app, this would be an API call
      setTimeout(() => {
        // Random availability for demo purposes
        setSubdomainStatus(Math.random() > 0.3 ? "available" : "unavailable")
      }, 600)
    }, 500)

    return () => clearTimeout(timer)
  }, [formData.subdomain])

  // Generate subdomain suggestion based on store name
  useEffect(() => {
    if (formData.name && !formData.subdomain) {
      const suggestion = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .substring(0, 20)

      if (suggestion) {
        setFormData((prev) => ({ ...prev, subdomain: suggestion }))
      }
    }
  }, [formData.name])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageFile(file)
    }
  }

  const handleImageFile = (file: File) => {
    // For demo purposes, we'll create a data URL
    // In production, you'd upload to a storage service
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setImagePreview(result)
      setFormData((prev) => ({ ...prev, profilePicture: result }))
    }
    reader.readAsDataURL(file)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setLoading(true)

    try {
      const res = await axios.post("http://localhost:5000/store", formData)
      setMessage(res.data.message || "Success! Your store has been created.")
      router.push("./dashCreator")
    } catch (error: any) {
        console.error("Error:", error);
      setMessage(error.response?.data?.error || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-violet-800 dark:from-gray-900 dark:to-indigo-950 flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-7xl bg-white/15 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20 dark:border-indigo-500/20">
        {/* Header with Progress indicator and Theme Toggle */}
        <div className="p-6 border-b border-white/20 dark:border-indigo-500/20 flex justify-between items-center">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-white font-medium">Step 2 of 5</h2>
              <span className="text-white/70 text-sm">Store Details</span>
            </div>
            <Progress value={40} className="h-1.5" />
          </div>

          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-full bg-white/10 dark:bg-gray-800/40 hover:bg-white/20 dark:hover:bg-gray-800/60 text-white transition-colors"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Form Section (Left) */}
          <div className="lg:w-3/5 p-6 md:p-10">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Create Your Digital Storefront</h1>
              <p className="text-white/80">Set up your branded space to sell digital assets and NFTs</p>
            </div>

            <Card className="bg-white/95 dark:bg-gray-800/90 backdrop-blur p-6 rounded-xl border-0 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Store Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Store Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g., Your Digital Art"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-500 focus:border-transparent transition"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Subdomain */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Store URL</label>
                  <div className="flex items-center">
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 px-3 py-3 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600">
                      creatorvault.com/
                    </span>
                    <div className="relative flex-1">
                      <input
                        type="text"
                        name="subdomain"
                        placeholder="your-store-name"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-r-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-500 focus:border-transparent transition"
                        value={formData.subdomain}
                        onChange={handleChange}
                        required
                      />
                      {subdomainStatus && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          {subdomainStatus === "checking" ? (
                            <div className="h-5 w-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                          ) : subdomainStatus === "available" ? (
                            <Check className="h-5 w-5 text-green-500" />
                          ) : (
                            <X className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  {subdomainStatus === "unavailable" && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400">This subdomain is already taken</p>
                  )}
                  {subdomainStatus === "available" && (
                    <p className="mt-1 text-sm text-green-500 dark:text-green-400">Subdomain is available!</p>
                  )}
                </div>

                {/* Profile Picture */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Profile Picture
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-4 transition-all ${
                      dragActive
                        ? "border-amber-400 dark:border-amber-500 bg-amber-50 dark:bg-amber-900/20"
                        : "border-gray-300 dark:border-gray-600"
                    } dark:bg-gray-800/50`}
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center justify-center py-4">
                      {imagePreview ? (
                        <div className="relative mb-4">
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Profile preview"
                            className="w-24 h-24 rounded-full object-cover border-2 border-indigo-200 dark:border-indigo-700"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview(null)
                              setFormData((prev) => ({ ...prev, profilePicture: "" }))
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <Upload className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-2" />
                      )}

                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {imagePreview ? "Replace image" : "Drag & drop your image here"}
                      </p>

                      <label className="cursor-pointer bg-indigo-100 dark:bg-indigo-900/40 hover:bg-indigo-200 dark:hover:bg-indigo-800/60 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-md transition text-sm">
                        Browse Files
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                      </label>
                    </div>

                    <div className="mt-4">
                      <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-2">Or paste an image URL</p>
                      <input
                        type="url"
                        name="profilePicture"
                        placeholder="https://example.com/your-image.jpg"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                        value={!imagePreview ? formData.profilePicture : ""}
                        onChange={(e) => {
                          setFormData({ ...formData, profilePicture: e.target.value })
                          if (e.target.value) {
                            setImagePreview(e.target.value)
                          } else {
                            setImagePreview(null)
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Store Bio */}
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Store Bio</label>
                    <span
                      className={`text-xs ${
                        formData.bio.length > 180
                          ? "text-amber-500 dark:text-amber-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {formData.bio.length}/200
                    </span>
                  </div>
                  <textarea
                    name="bio"
                    placeholder="Describe what makes your store unique..."
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-500 focus:border-transparent transition"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={3}
                    maxLength={200}
                    required
                  ></textarea>
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Store Category
                  </label>
                  <select
                    name="category"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-500 focus:border-transparent transition"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="Art">Digital Art</option>
                    <option value="Music">Music & Audio</option>
                    <option value="Design">Design Resources</option>
                    <option value="Code">Code & Development</option>
                    <option value="Photography">Photography</option>
                    <option value="Writing">Writing & Publishing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-indigo-700 to-violet-800 hover:from-indigo-800 hover:to-violet-900 dark:from-indigo-600 dark:to-violet-700 dark:hover:from-indigo-700 dark:hover:to-violet-800 text-white font-medium py-3 rounded-lg transition-all shadow-md"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Creating Store...
                      </>
                    ) : (
                      "Create My Store"
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                  >
                    Save Draft
                  </Button>
                </div>

                {message && (
                  <div
                    className={`text-center text-sm p-3 rounded-lg ${
                      message.includes("Success")
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
                        : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
                    }`}
                  >
                    {message}
                  </div>
                )}
              </form>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <Button variant="ghost" className="text-white hover:bg-white/10 dark:hover:bg-gray-800/40">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>

              <Button variant="ghost" className="text-white hover:bg-white/10 dark:hover:bg-gray-800/40">
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Preview Section (Right) */}
          <div className="lg:w-2/5 bg-gray-50 dark:bg-gray-900 p-6 md:p-10 border-t lg:border-t-0 lg:border-l border-white/20 dark:border-indigo-500/20">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Live Preview</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">This is how your store will look</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              {/* Store Header */}
              <div className="bg-gradient-to-r from-indigo-700 to-violet-800 dark:from-indigo-800 dark:to-violet-900 h-24 relative">
                <div className="absolute -bottom-10 left-6">
                  <div className="h-20 w-20 rounded-full border-4 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    {formData.profilePicture ? (
                      <img
                        src={formData.profilePicture || "/placeholder.svg"}
                        alt="Profile"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=80&width=80"
                        }}
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500">
                        <Upload className="h-8 w-8" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-12 px-6 pb-6">
                <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  {formData.name || "Your Store Name"}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  {formData.subdomain ? `creatorvault.com/${formData.subdomain}` : "creatorvault.com/your-store"}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm">
                  {formData.bio ||
                    "Your store description will appear here. Add a bio to tell visitors about your digital creations."}
                </p>

                {/* Category Badge */}
                {formData.category && (
                  <div className="mt-3">
                    <span className="inline-block bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-xs px-2 py-1 rounded-full">
                      {formData.category}
                    </span>
                  </div>
                )}

                {/* Sample Products */}
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Featured Products</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className="bg-gray-100 dark:bg-gray-700 rounded-lg aspect-square overflow-hidden relative group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-violet-700/20 dark:from-indigo-500/30 dark:to-violet-600/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="h-full w-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                          <span className="text-xs">Product {item}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
