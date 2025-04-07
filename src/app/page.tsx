import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageSquare, Zap, ImageIcon, Search, CreditCard } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <nav className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6" />
              <span className="text-xl font-bold">Genie</span>
            </div>
            <div className="space-x-2 sm:space-x-4">
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
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
            Your AI Assistant, <span className="text-yellow-300">Unleashed</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto">
            Chat with multiple AI models in one place. Genie gives you access to GPT-4o, Gemini 2.5, Llama 4, and more.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 px-6 py-5 text-base sm:text-lg">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Models Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-16">
            Access the Best AI Models
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { name: "GPT-4o", provider: "OpenAI" },
              { name: "GPT-4o Mini", provider: "OpenAI" },
              { name: "o3-mini", provider: "OpenAI" },
              { name: "GPT-4.5", provider: "OpenAI" },
              { name: "Gemini 2.0 Flash", provider: "Google" },
              { name: "Gemini 2.5 Pro", provider: "Google" },
              { name: "DeepSeek V3", provider: "DeepSeek" },
              { name: "Llama 3.3 70B", provider: "Meta" },
              { name: "Llama 4 Scout", provider: "Meta" },
              { name: "Llama 4 Maverick", provider: "Meta" },
              { name: "Qwen 2.5 32B", provider: "Alibaba" },
              { name: "Qwen QWQ 32B", provider: "Alibaba" },
            ].map((model, index) => (
              <div key={index} className="bg-gray-50 p-3 sm:p-4 rounded-xl">
                <p className="font-medium text-sm sm:text-base">{model.name}</p>
                <p className="text-gray-500 text-xs">{model.provider}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-16">Why Choose Genie?</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-purple-100 p-3 rounded-full w-fit mb-4">
                <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">Multiple AI Models</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Access OpenAI, Google Gemini, Meta Llama, and more from a single interface.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-purple-100 p-3 rounded-full w-fit mb-4">
                <ImageIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">Multi-Modal Support</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Upload images and files to get more accurate and contextual responses.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-purple-100 p-3 rounded-full w-fit mb-4">
                <Search className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">Search & Reasoning</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Switch between search mode for up-to-date info and reasoning mode for complex problems.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-purple-100 p-3 rounded-full w-fit mb-4">
                <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">Credit System</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Simple credit-based usage with easy ways to earn more through social sharing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile-First Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="md:w-1/2 order-2 md:order-1">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Designed for Mobile-First Experience</h2>
              <p className="text-gray-600 mb-6">
                Genie is optimized for mobile devices, allowing you to chat with AI models on the go. The responsive
                design ensures a seamless experience across all devices.
              </p>
              <ul className="space-y-3">
                {[
                  "Responsive UI that works on any screen size",
                  "Touch-friendly interface for mobile users",
                  "Fast loading times for on-the-go usage",
                  "Offline support for uninterrupted conversations",
                ].map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5">
                      <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm sm:text-base">{feature}</span>
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
                  <div className="bg-white h-full rounded-t-2xl p-3 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs">
                          G
                        </div>
                        <span className="ml-2 text-sm font-medium">Genie</span>
                      </div>
                      <div className="text-xs text-gray-500">Mobile View</div>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-3">
                      <div className="bg-gray-100 p-2 rounded-lg text-xs">How can I help you today?</div>
                      <div className="bg-purple-600 text-white p-2 rounded-lg text-xs ml-auto">
                        Tell me about quantum computing
                      </div>
                      <div className="bg-gray-100 p-2 rounded-lg text-xs">
                        Quantum computing uses quantum bits or qubits...
                      </div>
                    </div>
                    <div className="mt-auto pt-2 border-t">
                      <div className="bg-gray-100 rounded-full flex items-center p-1">
                        <input
                          type="text"
                          className="bg-transparent text-xs flex-1 px-2"
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
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Ready to experience the future of AI chat?
          </h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto text-gray-600">
            Join thousands of users who are already using Genie to enhance their productivity with multiple AI models.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-5 text-base sm:text-lg">
              Create Your Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <Zap className="h-6 w-6" />
              <span className="text-xl font-bold">Genie</span>
            </div>
            <div className="flex space-x-6 mb-4 sm:mb-0">
              <Link href="/contact" className="text-gray-400 hover:text-white text-sm">
                Contact
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
                Terms
              </Link>
            </div>
            <div className="text-gray-400 text-sm">© {new Date().getFullYear()} Genie AI. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

