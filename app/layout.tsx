import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "./components/theme-provider"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CreatorVault - Empower Your Creative Economy with Web3",
  description:
    "Launch your own branded storefront. Sell digital assets. Mint NFTs. Own your audience. Build the creator economy of tomorrow with CreatorVault.",
  keywords: "Web3, NFT, creator economy, digital storefront, blockchain, cryptocurrency",
  openGraph: {
    title: "CreatorVault - Empower Your Creative Economy with Web3",
    description: "Launch your own branded storefront. Sell digital assets. Mint NFTs. Own your audience.",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Providers> {/* 👈 Wrap here */}
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
