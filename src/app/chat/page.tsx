"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Switch,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Badge,
  Progress,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui"
import {
  Zap,
  Send,
  User,
  Bot,
  Menu,
  LogOut,
  Settings,
  PlusCircle,
  MessageSquare,
  ImageIcon,
  type File,
  X,
  Search,
  BrainCircuit,
  Github,
  Linkedin,
  AlertCircle,
  Info,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

// Define the available AI models
const AI_MODELS = [
  { id: "gpt-4o", name: "OpenAI GPT-4o", provider: "OpenAI" },
  { id: "gpt-4o-mini", name: "OpenAI GPT-4o Mini", provider: "OpenAI" },
  { id: "o3-mini", name: "OpenAI o3-mini", provider: "OpenAI" },
  { id: "gpt-4.5", name: "OpenAI GPT-4.5", provider: "OpenAI" },
  { id: "gemini-2.0-flash", name: "Google Gemini 2.0 Flash", provider: "Google" },
  { id: "gemini-2.0-flash-lite", name: "Google Gemini 2.0 Flash Lite", provider: "Google" },
  { id: "gemini-2.5-pro", name: "Google Gemini 2.5 Pro", provider: "Google" },
  { id: "deepseek-v3", name: "DeepSeek V3", provider: "DeepSeek" },
  { id: "deepseek-r1", name: "DeepSeek R1", provider: "DeepSeek" },
  { id: "llama-3.3-70b", name: "Llama 3.3 70B", provider: "Meta" },
  { id: "llama-4-scout", name: "Llama 4 Scout", provider: "Meta" },
  { id: "llama-4-maverick", name: "Llama 4 Maverick", provider: "Meta" },
  { id: "qwen-2.5-32b", name: "Qwen 2.5 32B", provider: "Alibaba" },
  { id: "qwen-qwq-32b", name: "Qwen QWQ 32B", provider: "Alibaba" },
]

export default function ChatPage() {
  const router = useRouter()
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0].id)
  const [conversations, setConversations] = useState([{ id: "default", name: "New conversation", messages: [] }])
  const [activeConversation, setActiveConversation] = useState("default")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [mediaFiles, setMediaFiles] = useState<File[]>([])
  const [mediaPreviewUrls, setMediaPreviewUrls] = useState<string[]>([])
  const [isSearchMode, setIsSearchMode] = useState(false)
  const [credits, setCredits] = useState(10)
  const [showLimitDialog, setShowLimitDialog] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  // Initialize chat with AI SDK
  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    api: "/api/chat",
    body: {
      model: selectedModel,
      isSearchMode,
    },
    onFinish: () => {
      // Decrease credits after each message
      if (credits > 0) {
        setCredits((prev) => prev - 1)
      }

      // Show limit dialog when credits reach 0
      if (credits === 1) {
        setShowLimitDialog(true)
      }
    },
  })

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Create a new conversation
  const createNewConversation = () => {
    const newId = `conv-${Date.now()}`
    setConversations([...conversations, { id: newId, name: "New conversation", messages: [] }])
    setActiveConversation(newId)
  }

  // Handle model change
  const handleModelChange = (value: string) => {
    setSelectedModel(value)
  }

  // Handle logout
  const handleLogout = () => {
    router.push("/")
  }

  // Format message timestamp
  const formatTime = () => {
    const now = new Date()
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true)
      const newFiles = Array.from(e.target.files)
      setMediaFiles((prev) => [...prev, ...newFiles])

      // Create preview URLs for the files
      const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file))
      setMediaPreviewUrls((prev) => [...prev, ...newPreviewUrls])
      setIsUploading(false)
    }
  }

  // Remove a file
  const removeFile = (index: number) => {
    URL.revokeObjectURL(mediaPreviewUrls[index])
    setMediaFiles((prev) => prev.filter((_, i) => i !== index))
    setMediaPreviewUrls((prev) => prev.filter((_, i) => i !== index))
  }

  // Handle form submission with files
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (credits <= 0) {
      setShowLimitDialog(true)
      return
    }

    if (!input.trim() && mediaFiles.length === 0) return

    // Prepare message content
    let content = input

    // If there are files, we would normally upload them and get URLs
    // For this example, we'll just mention them in the message
    if (mediaFiles.length > 0) {
      const fileDescriptions = mediaFiles
        .map((file) => `[Attached file: ${file.name} (${(file.size / 1024).toFixed(2)} KB)]`)
        .join("\n")

      content = `${content}\n\n${fileDescriptions}`
    }

    // Add user message to chat
    await append({
      role: "user",
      content,
    })

    // Clear input and files
    handleInputChange({ target: { value: "" } } as any)
    setMediaFiles([])
    setMediaPreviewUrls([])
  }

  // Boost credits
  const boostCredits = () => {
    setCredits((prev) => prev + 5)
    setShowLimitDialog(false)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white w-full max-w-[280px] flex-shrink-0 flex flex-col 
                   ${isMobileMenuOpen ? "fixed inset-y-0 left-0 z-50" : "hidden md:flex"}`}
      >
        <div className="p-4 border-b border-gray-800 flex items-center space-x-2">
          <Zap className="h-6 w-6 text-purple-400" />
          <span className="text-xl font-bold">Genie</span>
          {isMobileMenuOpen && (
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto text-gray-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        <div className="p-4">
          <Button
            onClick={createNewConversation}
            className="w-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveConversation(conv.id)}
              className={`w-full text-left p-3 rounded-lg mb-1 flex items-center space-x-2 
                        ${activeConversation === conv.id ? "bg-gray-700" : "hover:bg-gray-800"}`}
            >
              <MessageSquare className="h-4 w-4 text-gray-400" />
              <span className="truncate">{conv.name}</span>
            </button>
          ))}
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Credits Remaining</span>
              <Badge variant={credits > 3 ? "default" : "destructive"}>{credits}/10</Badge>
            </div>
            <Progress value={credits * 10} className="h-2" />
            <div className="mt-2 text-xs text-gray-400 text-center">
              <Link href="/rewards" className="text-purple-400 hover:underline">
                Get more credits
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-4">
            <div className="grid grid-cols-2 gap-2">
              <Link href="/contact">
                <Button variant="outline" size="sm" className="w-full text-gray-300 border-gray-700">
                  Contact Us
                </Button>
              </Link>
              <Link href="/rewards">
                <Button variant="outline" size="sm" className="w-full text-gray-300 border-gray-700">
                  Rewards
                </Button>
              </Link>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start text-gray-300">
                <User className="mr-2 h-4 w-4" />
                <span>John Doe</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => router.push("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <header className="bg-white border-b p-3 flex items-center justify-between md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-purple-600" />
            <span className="font-bold">Genie</span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => router.push("/rewards")}>
                  <Badge className="px-1.5 py-0.5 absolute -top-1 -right-1 text-xs">{credits}</Badge>
                  <Zap className="h-5 w-5 text-yellow-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Credits remaining: {credits}/10</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </header>

        {/* Model selector and mode toggle */}
        <div className="bg-white border-b p-3 flex flex-col sm:flex-row gap-3 items-center">
          <Select value={selectedModel} onValueChange={handleModelChange}>
            <SelectTrigger className="w-full sm:w-[250px]">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              {AI_MODELS.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name} ({model.provider})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-4 ml-auto">
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${isSearchMode ? "text-gray-500" : "text-purple-600 font-medium"}`}>
                Reasoning
              </span>
              <Switch checked={isSearchMode} onCheckedChange={setIsSearchMode} />
              <span className={`text-sm ${isSearchMode ? "text-purple-600 font-medium" : "text-gray-500"}`}>
                Search
              </span>
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Info className="h-4 w-4 text-gray-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    <strong>Reasoning mode:</strong> AI uses its knowledge to answer questions.
                    <br />
                    <strong>Search mode:</strong> AI searches the web for up-to-date information.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-3 bg-white">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-4 sm:p-8">
              <div className="bg-purple-100 p-3 rounded-full mb-4">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">How can I help you today?</h2>
              <p className="text-gray-500 max-w-md mb-6 sm:mb-8 text-sm sm:text-base">
                Ask me anything! I can answer questions, write content, generate ideas, and more.
              </p>
              <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                {[
                  "Explain quantum computing in simple terms",
                  "Write a short story about a robot learning to love",
                  "What are the best practices for React development?",
                  "Create a meal plan for a vegetarian diet",
                ].map((suggestion, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className="justify-start h-auto py-2 px-3 text-left text-sm"
                    onClick={() => handleInputChange({ target: { value: suggestion } } as any)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>

              <div className="mt-8 flex items-center space-x-2 text-sm text-gray-500">
                {isSearchMode ? (
                  <>
                    <Search className="h-4 w-4" />
                    <span>Search mode is active. I'll search the web for answers.</span>
                  </>
                ) : (
                  <>
                    <BrainCircuit className="h-4 w-4" />
                    <span>Reasoning mode is active. I'll use my knowledge to answer.</span>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4 max-w-3xl mx-auto">
              {messages.map((message, i) => (
                <div key={i} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`
                    flex max-w-[85%] sm:max-w-[75%] 
                    ${message.role === "user" ? "flex-row-reverse items-end" : "items-start"}
                  `}
                  >
                    <div
                      className={`
                      flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center
                      ${message.role === "user" ? "bg-purple-100 ml-2" : "bg-gray-100 mr-2"}
                    `}
                    >
                      {message.role === "user" ? (
                        <User className="h-4 w-4 text-purple-600" />
                      ) : (
                        <Bot className="h-4 w-4 text-gray-600" />
                      )}
                    </div>
                    <div>
                      <div
                        className={`
                        p-3 rounded-lg 
                        ${
                          message.role === "user"
                            ? "bg-purple-600 text-white rounded-br-none"
                            : "bg-gray-100 text-gray-800 rounded-bl-none"
                        }
                      `}
                      >
                        {message.content}
                      </div>
                      <div
                        className={`
                        text-xs text-gray-500 mt-1
                        ${message.role === "user" ? "text-right" : "text-left"}
                      `}
                      >
                        {formatTime()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="border-t bg-white p-3">
          {/* Media preview */}
          {mediaPreviewUrls.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3 max-w-3xl mx-auto">
              {mediaPreviewUrls.map((url, index) => (
                <div key={index} className="relative">
                  <div className="h-16 w-16 rounded-md overflow-hidden border border-gray-200">
                    <Image
                      src={url || "/placeholder.svg"}
                      alt="Media preview"
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="flex flex-col gap-2 max-w-3xl mx-auto">
            <div className="flex items-end gap-2">
              <div className="flex-1 relative">
                <Textarea
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  className="resize-none min-h-[50px] pr-12 py-3 text-sm"
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      if (input.trim() || mediaFiles.length > 0) {
                        handleFormSubmit(e)
                      }
                    }
                  }}
                />
                <div className="absolute right-2 bottom-2 flex space-x-1">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-gray-500 hover:text-purple-600"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading || isUploading}
                  >
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading || (!input.trim() && mediaFiles.length === 0) || credits <= 0}
                    className="h-8 w-8 bg-purple-600 hover:bg-purple-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileSelect}
                  multiple
                />
              </div>
            </div>

            <div className="flex justify-between items-center text-xs text-gray-500">
              <div>Genie may produce inaccurate information.</div>
              <div className="flex items-center">
                <Zap className="h-3 w-3 mr-1 text-yellow-500" />
                <span>{credits} credits left</span>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Credit limit dialog */}
      <Dialog open={showLimitDialog} onOpenChange={setShowLimitDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
              You've reached your credit limit
            </DialogTitle>
            <DialogDescription>
              You've used all your available credits. Follow us on social media to get more credits.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Get 5 more credits by following:</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/rewards?action=github" onClick={boostCredits}>
                  <Button variant="outline" className="w-full">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </Link>
                <Link href="/rewards?action=linkedin" onClick={boostCredits}>
                  <Button variant="outline" className="w-full">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Link href="/rewards">
              <Button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700">Go to Rewards Page</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

