"use client"

import type React from "react"

import { getSession } from 'next-auth/react';
import { signOut } from "next-auth/react" // ✅ Use next-auth signIn

import { useState, useRef, useEffect } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
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
  PlusCircle,
  MessageSquare,
  X,
  Search,
  BrainCircuit,
  AlertCircle,
  Info,
  PaperclipIcon,
  SunIcon,
  MoonIcon,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"


// Define the available AI models
const AI_MODELS = [
  { id: "o3-mini", name: "o3 Mini", provider: "OpenAI" },
  { id: "gpt-3.5-turbo", name: "GPT 3.5 Turbo", provider: "OpenAI" },
  { id: "gpt-4o-mini", name: "GPT 4o Mini", provider: "OpenAI" },
  { id: "o1-mini", name: "o1 Mini", provider: "OpenAI" },
  { id: "o4-mini", name: "o4 Mini", provider: "OpenAI" },
  { id: "gpt-4.1-nano", name: "GPT 4.1 Nano", provider: "OpenAI" },
  { id: "gpt-4.1-mini", name: "GPT 4.1 Mini", provider: "OpenAI" },
  { id: "gemini-2.5-pro-exp-03-25", name: "Gemini 2.5 Pro", provider: "Google" },
  { id: "gemini-2.0-flash-exp", name: "Gemini 2.0 Flash", provider: "Google" },
  { id: "gemini-2.0-flash-lite-preview-02-05", name: "Gemini 2.0 Flash lite", provider: "Google" },
  { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash", provider: "Google" },
  { id: "gemini-1.5-flash-8b-latest", name: "Gemini 1.5 Flash 8b", provider: "Google" },
  { id: "gemini-1.5-pro-latest", name: "Gemini 1.5 Pro", provider: "Google" },
  { id: "meta-llama/llama-4-scout:free", name: "Meta: Llama 4 Scout", provider: "OpenRouter" },
  { id: "meta-llama/llama-4-maverick:free", name: "Meta: Llama 4 Maverick", provider: "OpenRouter" },
  { id: "meta-llama/llama-3.3-70b-instruct:free", name: "Meta: Llama 3.3 70B Instruct", provider: "OpenRouter" },
  { id: "qwen/qwen-2.5-coder-32b-instruct:free", name: "Qwen2.5 Coder 32B Instruct", provider: "OpenRouter" },
  { id: "deepseek/deepseek-chat:free", name: "DeepSeek V3", provider: "OpenRouter" },

  
]

export default function ChatPage() {
  const router = useRouter()

  

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (!session) {
        router.push('/');
      }
      console.log(session);
      
    };

    checkSession();
  }, [router]);

  const { theme, setTheme } = useTheme()
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0].id)
  const [conversations, setConversations] = useState([{ id: "default", name: "New conversation", messages: [] }])
  const [activeConversation, setActiveConversation] = useState("default")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [mediaFiles, setMediaFiles] = useState<File[]>([])
  const [mediaPreviewUrls, setMediaPreviewUrls] = useState<string[]>([])
  // Change the reasoning/search mode state and UI
  // Replace the isSearchMode state with separate states for each mode
  const [isReasoningMode, setIsReasoningMode] = useState(false)
  const [isSearchMode, setIsSearchMode] = useState(false)
  const [credits, setCredits] = useState(10)
  const [showLimitDialog, setShowLimitDialog] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  
  // Initialize chat with AI SDK
  const { messages,setMessages, input, handleInputChange, handleSubmit, isLoading, append, stop } = useChat({
    api: "/api/chat",
    body: {
      model: selectedModel,
      isReasoningMode,
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

       // ✅ pass messages array only
    },
  })

  useEffect(()=>{
    (async () => {
      try {
        const res = await fetch(`/api/reward`);
        const data = await res.json();
        if (res.ok) {
          if (data.credits !== undefined) {
            setCredits(data.credits);
          } else {
            console.error('Credits not found in response');
          }
        } else {
          console.error('Error:', data.error);
        }
      } catch (err) {
        console.error('Fetch failed:', err);
      }
    })();
    
    },[])

  useEffect(()=>{

    if (firstRun.current) {
      firstRun.current = false;
      return; // Skip on initial render
    }
    if(credits<10){
      (async () => {
        try{
          const response = await fetch('/api/reward', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ credits }),
        });
      }catch(err){
        console.error("Post failed");
        
      }
      })()
    }
    
  },[credits])

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
  const handleLogout = async() => {
    await signOut({ redirect: false })
    
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

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Boost credits
  const boostCredits = () => {
    // setCredits((prev) => prev + 5)
    setShowLimitDialog(false)
  }

  useEffect(() => {
    
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/message`);
        const data = await res.json();        
  
        if (Array.isArray(data)) {
          const formatted = data.map((msg: any, i: number) => ({
            id: msg._id || `msg-${i}`,
            role: msg.role,
            content: msg.content,
          }));
          setMessages(formatted);
        }
      } catch (err) {
        console.error("Failed to load messages:", err);
      }
    };
  
    fetchMessages();
  }, []);
     // Empty dependency array to only run once when the component mounts
  
     const firstRun = useRef(true);
useEffect(() => {

  if (firstRun.current) {
    firstRun.current = false;
    return; // Skip on initial render
  }

  if (!messages || messages.length === 0) {
    return; // Skip if messages is empty
  }
  const saveMessagesToDB = async (rawMessages: any[]) => {
    const cleanedMessages = rawMessages.map(({ id, ...rest }) => rest);
  
    try {
      const res = await fetch("/api/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: cleanedMessages }),
      });
  
      if (!res.ok) throw new Error("Failed to save messages");
      console.log("Messages saved!");
    } catch (err) {
      console.error("Error saving messages:", err);
    }
  };
  

  saveMessagesToDB(messages);
}, [messages])


  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`bg-gray-900 dark:bg-gray-950 text-white w-full max-w-[280px] flex-shrink-0 flex flex-col 
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
          <Button disabled
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
          <div className="bg-gray-800 dark:bg-gray-800 p-3 rounded-lg">
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

          <div className="border-t border-gray-800 pt-4 flex items-center justify-between">
            <Button variant="ghost" size="sm" className="text-gray-400" onClick={toggleTheme}>
              {theme === "dark" ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
              <span className="ml-2">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </Button>
          </div>

          <Button variant="ghost" className="w-full justify-start text-gray-300" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-3 flex items-center justify-between md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-purple-600" />
            <span className="font-bold">Genie</span>
          </div>
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => router.push("/rewards")}>
                    <Badge className="px-1.5 py-0.5 absolute -top-1 -right-1 text-xs">{credits}</Badge>
                    <Zap className="h-5 w-5 text-yellow-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Credits remaining: {credits}/30</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </Button>
          </div>
        </header>

        {/* Model selector */}
        <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-3 flex flex-col sm:flex-row gap-3 items-center">
          <Select value={selectedModel} onValueChange={handleModelChange}>
            <SelectTrigger className="w-full sm:w-[250px] dark:bg-gray-700 dark:border-gray-600">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-700">
              {AI_MODELS.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name} ({model.provider})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-4 ml-auto">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Info className="h-4 w-4 text-gray-500 dark:text-gray-400" />
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
        <div className="flex-1 overflow-y-auto p-3 bg-white dark:bg-gray-800">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-4 sm:p-8">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full mb-4">
                <Zap className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 dark:text-white">How can I help you today?</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6 sm:mb-8 text-sm sm:text-base">
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
                    className="justify-start h-auto py-2 px-3 text-left text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    onClick={() => handleInputChange({ target: { value: suggestion } } as any)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>

              {/* Update the welcome screen mode indicator */}
              <div className="mt-8 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div className={`flex items-center ${isReasoningMode ? "text-purple-600 dark:text-purple-400" : ""}`}>
                  <BrainCircuit className="h-4 w-4 mr-1" />
                  <span>Reasoning: {isReasoningMode ? "On" : "Off"}</span>
                </div>
                <div className={`flex items-center ${isSearchMode ? "text-purple-600 dark:text-purple-400" : ""}`}>
                  <Search className="h-4 w-4 mr-1" />
                  <span>Search: {isSearchMode ? "On" : "Off"}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 max-w-3xl mx-auto">
              {messages.map((message, i) => (
                // Improve chat message formatting and add copy button
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
                      ${
                        message.role === "user"
                          ? "bg-purple-100 dark:bg-purple-900 ml-2"
                          : "bg-gray-100 dark:bg-gray-700 mr-2"
                      }
                    `}
                    >
                      {message.role === "user" ? (
                        <User className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      ) : (
                        <Bot className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      )}
                    </div>
                    <div className="group relative">
                      <div
                        className={`
                        p-3 rounded-lg 
                        ${
                          message.role === "user"
                            ? "bg-purple-600 text-white rounded-br-none"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none"
                        }
                      `}
                      >
                        
                          <div className="whitespace-pre-wrap">
                                {message.content}
                                </div>
                      </div>
                      <div
                        className={`
                        text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center
                        ${message.role === "user" ? "justify-end" : "justify-start"}
                      `}
                      >
                        <span>{formatTime()}</span>
                        {message.role === "assistant" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => {
                              navigator.clipboard.writeText(message.content)
                              // You could add a toast notification here
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-gray-500 dark:text-gray-400"
                            >
                              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                            </svg>
                          </Button>
                        )}
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
        <div className="border-t dark:border-gray-700 bg-white dark:bg-gray-800 p-3">
          {/* Media preview */}
          {mediaPreviewUrls.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3 max-w-3xl mx-auto">
              {mediaPreviewUrls.map((url, index) => (
                <div key={index} className="relative">
                  <div className="h-16 w-16 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
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

          {/* Mode selector buttons */}
          <div className="flex justify-center mb-3">
            <div className="flex space-x-2" role="group">
              <Button
                variant={isReasoningMode ? "default" : "outline"}
                size="sm"
                className={`${
                  isReasoningMode
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                }`}
                onClick={() => setIsReasoningMode(!isReasoningMode)}
              >
                <BrainCircuit className="h-4 w-4 mr-2" />
                Reasoning {isReasoningMode ? "On" : "Off"}
              </Button>
              <Button
                variant={isSearchMode ? "default" : "outline"}
                size="sm"
                className={`${
                  isSearchMode
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                }`}
                onClick={() => setIsSearchMode(!isSearchMode)}
              >
                <Search className="h-4 w-4 mr-2" />
                Search {isSearchMode ? "On" : "Off"}
              </Button>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="flex flex-col gap-2 max-w-3xl mx-auto">
            <div className="flex items-end gap-2">
              <div className="flex-1 relative">
                <Textarea
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  className="resize-none min-h-[50px] pr-12 py-3 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"
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
                {/* Add stop button to the input area */}
                <div className="absolute right-2 bottom-2 flex space-x-1">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading || isUploading}
                  >
                    <PaperclipIcon className="h-4 w-4" />
                  </Button>
                  {isLoading ? (
                    <Button type="button" size="icon" onClick={stop} className="h-8 w-8 bg-red-600 hover:bg-red-700">
                      <X className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      size="icon"
                      disabled={(!input.trim() && mediaFiles.length === 0) || credits <= 0}
                      className="h-8 w-8 bg-purple-600 hover:bg-purple-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
                  onChange={handleFileSelect}
                  multiple
                />
              </div>
            </div>

            <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
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
        <DialogContent className="sm:max-w-md dark:bg-gray-800 dark:text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
              You've reached your credit limit
            </DialogTitle>
            <DialogDescription className="dark:text-gray-400">
              You've used all your available credits. Follow us on social media to get more credits.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium mb-2 dark:text-gray-200">Get 5 more credits by following:</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/rewards?action=github" onClick={boostCredits}>
                  <Button variant="outline" className="w-full dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500">
                    <svg
                      className="mr-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    GitHub
                  </Button>
                </Link>
                <Link href="/rewards?action=linkedin" onClick={boostCredits}>
                  <Button variant="outline" className="w-full dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500">
                    <svg
                      className="mr-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
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
