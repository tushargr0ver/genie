"use client"

import Link from "next/link"
import { getSession } from 'next-auth/react';

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
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const router = useRouter()

  useEffect(() => {
      const checkSession = async () => {
        const session = await getSession();
        if (session) {
          router.push('/chat');
        }        
      };
  
      checkSession();
    }, [router]);

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
  className="border-white text-white bg-white/10 hover:bg-white/20 px-6 py-5 text-base sm:text-lg w-full sm:w-auto"
>
  Explore Features
</Button>
            </Link>
          </div>
          <div className="text-sm text-white/70">No credit card required • Free tier available</div>
        </div>
      </header>

      

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
              { name: "o3 Mini", provider: "OpenAI", new: true },
              { name: "GPT 3.5 Turbo", provider: "OpenAI", new: false },
              { name: "GPT 4o Mini", provider: "OpenAI", new: true },
              { name: "o1 Mini", provider: "OpenAI", new: true },
              { name: "o4 Mini", provider: "OpenAI", new: true },
              { name: "GPT 4.1 Nano", provider: "OpenAI", new: true },
              { name: "GPT 4.1 Mini", provider: "OpenAI", new: true },
              { name: "Gemini 2.5 Pro", provider: "Google", new: true },
              { name: "Gemini 2.0 Flash", provider: "Google", new: true },
              { name: "Gemini 2.0 Flash lite", provider: "Google", new: false },
              { name: "Gemini 1.5 Flash", provider: "Google", new: false },
              { name: "Gemini 1.5 Flash 8b", provider: "Google", new: false },
              { name: "Gemini 1.5 Pro", provider: "Google", new: false },
              { name: "Meta: Llama 4 Scout", provider: "OpenRouter", new: true },
              { name: "Meta: Llama 4 Maverick", provider: "OpenRouter", new: true },
              { name: "Meta: Llama 3.3 70B Instruct", provider: "OpenRouter", new: true },
              { name: "Qwen2.5 Coder 32B Instruct", provider: "OpenRouter", new: true },
              { name: "DeepSeek V3", provider: "OpenRouter", new: true },

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
  className="border-white text-white bg-white/10 hover:bg-white/20 px-6 py-5 text-base sm:text-lg w-full sm:w-auto"
>
  Contact Sales
</Button>

            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-4 sm:py-6">
  <div className="container mx-auto px-4">
    <div className="border-gray-800 pt-4 flex flex-col md:flex-row justify-between items-center">
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
