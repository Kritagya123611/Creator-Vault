"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "What blockchain networks does CreatorVault support?",
      answer:
        "CreatorVault supports Ethereum, Polygon, Solana, and other major blockchain networks. We continuously add support for new networks based on creator demand.",
    },
    {
      question: "Do I need technical knowledge to use CreatorVault?",
      answer:
        "Not at all! CreatorVault is designed for creators, not developers. Our drag-and-drop interface and guided setup process make it easy for anyone to launch their Web3 storefront.",
    },
    {
      question: "What are the transaction fees?",
      answer:
        "Transaction fees vary by plan: Basic (5%), Pro (3%), and Enterprise (2%). These fees cover platform maintenance, security, and continuous feature development.",
    },
    {
      question: "Can I use my own custom domain?",
      answer:
        "Yes! All plans support custom domains. You can use your existing domain or purchase a new one through our integrated domain service.",
    },
    {
      question: "How do NFT royalties work?",
      answer:
        "CreatorVault automatically handles NFT royalties through smart contracts. You can set royalty percentages and receive payments whenever your NFTs are resold on secondary markets.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes! We offer a 14-day free trial on all plans. No credit card required to get started. You can explore all features and build your storefront risk-free.",
    },
  ]

  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about CreatorVault
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <button
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-semibold pr-4">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
