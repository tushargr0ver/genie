"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  MessageSquare,
  Zap,
  PaperclipIcon,
  Search,
  MoonIcon,
  SunIcon,
  BrainCircuit,
  Sparkles,
  Shield,
  Rocket,
  Cpu,
  Layers,
  Smartphone,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"

export default function LandingPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure theme toggle only renders client-side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 transition-colors duration-200">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <nav className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6" />
              <span className="text-xl font-bold">Genie</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-white hover:bg-white/20"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                </Button>
              )}
              <Link href="/login">
                <Button variant="ghost" className="text-white hover:text-white hover:bg-white/20 text-sm sm:text-base">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-white text-purple-600 hover:bg-white/90 text-sm sm:text-base">Sign Up</Button>
              </Link>
            </div>
          </nav>
        </div>

        <div className="container mx-auto px-4 py-12 sm:py-20 text-center">
          <Badge className="mb-4 px-3 py-1 bg-white/20 text-white border-none">
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            Next-Gen AI Assistant
          </Badge>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
            Your AI Assistant, <span className="text-yellow-300">Unleashed</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto">
            Harness the power of cutting-edge AI models in one intuitive interface. Experience the future of
            conversational AI today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-white/90 px-6 py-5 text-base sm:text-lg w-full sm:w-auto"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-6 py-5 text-base sm:text-lg w-full sm:w-auto"
              >
                Explore Features
              </Button>
            </Link>
          </div>
          <div className="text-sm text-white/70">No credit card required • Free tier available</div>
        </div>
      </header>

      {/* Trusted By Section */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
            TRUSTED BY INNOVATIVE TEAMS WORLDWIDE
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 opacity-70">
            {["Acme Inc", "TechCorp", "Innovate AI", "FutureLabs", "DataSphere"].map((company, i) => (
              <div key={i} className="text-gray-400 dark:text-gray-500 font-semibold text-lg">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section className="py-12 sm:py-20 bg-white dark:bg-gray-950" id="models">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
              <Cpu className="h-3.5 w-3.5 mr-1" />
              AI Models
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 dark:text-white">
              Access the Most Advanced AI Models
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Genie connects you to the world's most powerful AI models through a unified, intuitive interface.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { name: "GPT-4o", provider: "OpenAI", new: true },
              { name: "GPT-4o Mini", provider: "OpenAI", new: true },
              { name: "o3-mini", provider: "OpenAI", new: true },
              { name: "GPT-4.5", provider: "OpenAI", new: true },
              { name: "Gemini 2.0 Flash", provider: "Google", new: false },
              { name: "Gemini 2.5 Pro", provider: "Google", new: true },
              { name: "DeepSeek V3", provider: "DeepSeek", new: false },
              { name: "Llama 3.3 70B", provider: "Meta", new: false },
              { name: "Llama 4 Scout", provider: "Meta", new: true },
              { name: "Llama 4 Maverick", provider: "Meta", new: true },
              { name: "Qwen 2.5 32B", provider: "Alibaba", new: false },
              { name: "Qwen QWQ 32B", provider: "Alibaba", new: true },
            ].map((model, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 rounded-xl relative">
                {model.new && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    New
                  </span>
                )}
                <p className="font-medium text-sm sm:text-base dark:text-white">{model.name}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">{model.provider}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 bg-gray-50 dark:bg-gray-900" id="features">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              Features
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 dark:text-white">
              Supercharge Your AI Experience
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Genie combines powerful features with an intuitive interface to deliver an unmatched AI experience.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-fit mb-4">
                <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 dark:text-white">Unified AI Interface</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Access multiple AI providers through a single, seamless interface designed for productivity.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-fit mb-4">
                <PaperclipIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 dark:text-white">Multi-Modal Support</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Share images, documents, and more for context-aware AI responses that understand your content.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-fit mb-4">
                <BrainCircuit className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 dark:text-white">Advanced Reasoning</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Enable reasoning mode for complex problem-solving with step-by-step explanations and analysis.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-fit mb-4">
                <Search className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 dark:text-white">Real-time Search</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Get up-to-date information with our search capability that keeps responses current and accurate.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-fit mb-4">
                <MoonIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 dark:text-white">Dark Mode</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Customize your experience with light and dark themes for comfortable usage day or night.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-fit mb-4">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 dark:text-white">Enterprise Security</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Bank-level encryption and privacy controls keep your conversations and data secure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile-First Section */}
      <section className="py-12 sm:py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="md:w-1/2 order-2 md:order-1">
              <Badge className="mb-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                <Smartphone className="h-3.5 w-3.5 mr-1" />
                Mobile-First
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 dark:text-white">AI Power in Your Pocket</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Genie is built from the ground up for mobile devices, giving you the full power of advanced AI models
                wherever you go. Our responsive design ensures a seamless experience across all your devices.
              </p>
              <ul className="space-y-3">
                {[
                  "Optimized for touch interfaces and mobile screens",
                  "Lightning-fast performance even on slower connections",
                  "Dark mode for comfortable night-time usage",
                  "Offline capabilities for uninterrupted conversations",
                  "Syncs seamlessly across all your devices",
                ].map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <div className="bg-green-100 dark:bg-green-900 p-1 rounded-full mr-3 mt-0.5">
                      <svg
                        className="h-3 w-3 text-green-600 dark:text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm sm:text-base dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 order-1 md:order-2 flex justify-center">
              <div className="relative w-64 h-[500px] bg-gray-900 rounded-3xl overflow-hidden border-8 border-gray-800">
                <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 flex items-center justify-center">
                  <div className="w-16 h-1 bg-gray-600 rounded-full"></div>
                </div>
                <div className="h-full w-full bg-purple-100 pt-6">
                  <div className="bg-white dark:bg-gray-800 h-full rounded-t-2xl p-3 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs">
                          G
                        </div>
                        <span className="ml-2 text-sm font-medium dark:text-white">Genie</span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Mobile View</div>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-3">
                      <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg text-xs dark:text-gray-200">
                        How can I help you today?
                      </div>
                      <div className="bg-purple-600 text-white p-2 rounded-lg text-xs ml-auto">
                        Tell me about quantum computing
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg text-xs dark:text-gray-200">
                        Quantum computing uses quantum bits or qubits...
                      </div>
                    </div>
                    <div className="mt-auto pt-2 border-t dark:border-gray-700">
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-full flex items-center p-1">
                        <input
                          type="text"
                          className="bg-transparent text-xs flex-1 px-2 dark:text-gray-200 dark:placeholder-gray-400"
                          placeholder="Type a message..."
                        />
                        <div className="h-6 w-6 bg-purple-600 rounded-full flex items-center justify-center">
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 12h14M12 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              Testimonials
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 dark:text-white">
              Loved by Professionals Worldwide
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              See what our users are saying about how Genie has transformed their workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "Genie has completely transformed how I research and write content. The ability to switch between reasoning and search modes is a game-changer.",
                author: "Sarah J.",
                role: "Content Strategist",
                company: "CreativeHub",
              },
              {
                quote:
                  "As a developer, I need accurate technical information fast. Genie's multi-model approach means I always get the best answer, not just one model's perspective.",
                author: "Michael T.",
                role: "Senior Developer",
                company: "TechInnovate",
              },
              {
                quote:
                  "The mobile experience is flawless. I can chat with advanced AI models on the go, and the dark mode is perfect for late-night brainstorming sessions.",
                author: "Elena R.",
                role: "UX Designer",
                company: "DesignForward",
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <div className="mb-4 text-yellow-500 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-medium dark:text-white">{testimonial.author}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 sm:py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
              <Layers className="h-3.5 w-3.5 mr-1" />
              Pricing
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 dark:text-white">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose the plan that works best for you, from free to enterprise.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Free",
                price: "$0",
                description: "Perfect for trying out Genie",
                features: [
                  "Access to basic models",
                  "10 messages per day",
                  "Mobile app access",
                  "Standard response time",
                ],
                cta: "Get Started",
                popular: false,
              },
              {
                name: "Pro",
                price: "$19",
                period: "/month",
                description: "For professionals and power users",
                features: [
                  "Access to all AI models",
                  "Unlimited messages",
                  "Priority response time",
                  "Advanced reasoning & search",
                  "Multi-modal uploads",
                  "Dark mode",
                ],
                cta: "Upgrade to Pro",
                popular: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For teams and organizations",
                features: [
                  "Custom AI model integration",
                  "Team collaboration features",
                  "Admin dashboard",
                  "API access",
                  "Dedicated support",
                  "Custom branding",
                ],
                cta: "Contact Sales",
                popular: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`
                  bg-white dark:bg-gray-800 rounded-xl overflow-hidden border 
                  ${
                    plan.popular
                      ? "border-purple-500 dark:border-purple-400 shadow-lg relative"
                      : "border-gray-200 dark:border-gray-700"
                  }
                `}
              >
                {plan.popular && (
                  <div className="bg-purple-500 text-white text-xs font-medium py-1 text-center">MOST POPULAR</div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 dark:text-white">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold dark:text-white">{plan.price}</span>
                    {plan.period && <span className="text-gray-500 dark:text-gray-400">{plan.period}</span>}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${plan.popular ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600"}`}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 px-3 py-1 bg-white/20 text-white border-none">
            <Rocket className="h-3.5 w-3.5 mr-1" />
            Get Started Today
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Ready to transform your AI experience?
          </h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto text-white/80">
            Join thousands of professionals who are already using Genie to enhance their productivity with
            state-of-the-art AI.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-white/90 px-6 py-5 text-base sm:text-lg w-full sm:w-auto"
              >
                Create Your Free Account
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-6 py-5 text-base sm:text-lg w-full sm:w-auto"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="h-6 w-6" />
                <span className="text-xl font-bold">Genie</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Harness the power of AI with our intuitive, mobile-first platform that connects you to the world's most
                advanced AI models.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#features" className="text-gray-400 hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#models" className="text-gray-400 hover:text-white">
                    AI Models
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Data Processing
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Genie AI. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
                Terms
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white text-sm">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
