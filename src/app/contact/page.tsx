"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Send, Loader2, CheckCircle2, Github, Linkedin, Twitter, Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"

export default function ContactPage() {
  const router = useRouter()
  const { theme } = useTheme()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Redirect back to chat after a delay
      setTimeout(() => {
        router.push("/chat")
      }, 3000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <Button variant="ghost" className="mb-4 dark:text-gray-300" onClick={() => router.push("/chat")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Chat
        </Button>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Contact Us</CardTitle>
            <CardDescription className="dark:text-gray-400">
              Have a question or feedback? We'd love to hear from you.
            </CardDescription>
          </CardHeader>

          {isSubmitted ? (
            <CardContent className="pt-6 pb-8 text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
              </div>
              <h3 className="text-lg font-medium mb-2 dark:text-white">Message Sent!</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Thank you for reaching out. We'll get back to you as soon as possible.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">Redirecting you back to chat...</p>
            </CardContent>
          ) : (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="dark:text-gray-300">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="dark:text-gray-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="dark:text-gray-300">
                    Subject
                  </Label>
                  <Select value={formData.subject} onValueChange={handleSelectChange}>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700">
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="billing">Billing Question</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="dark:text-gray-300">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="How can we help you?"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"
                  />
                </div>
              </CardContent>

              <CardFooter className="flex-col space-y-4">
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>

                <div className="w-full pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-center text-gray-500 dark:text-gray-400 mb-3">
                    Connect with us directly:
                  </div>
                  <div className="flex justify-center space-x-4">
                    <a
                      href="https://github.com/tushargr0ver"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href="https://linkedin.com/in/tushargr0ver"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href="https://x.com/tushargr0ver"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a
                      href="mailto:your.tushar.grover2004@gmail.com"
                      className="text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </CardFooter>
            </form>
          )}
        </Card>
      </div>
    </div>
  )
}
