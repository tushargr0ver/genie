"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Zap, Github, Linkedin, ArrowLeft, Check } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"

export default function RewardsPage() {
  const [credits, setCredits] = useState(10)
  const [githubFollowed, setGithubFollowed] = useState(false)
  const [linkedinFollowed, setLinkedinFollowed] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    // Check if user came from a specific action
    const action = searchParams.get("action")
    if (action === "github" && !githubFollowed) {
      setGithubFollowed(true)
      setCredits((prev) => prev + 5)
    } else if (action === "linkedin" && !linkedinFollowed) {
      setLinkedinFollowed(true)
      setCredits((prev) => prev + 5)
    }
  }, [searchParams, githubFollowed, linkedinFollowed])

  const handleGithubFollow = () => {
    window.open("https://github.com/yourusername", "_blank")
    if (!githubFollowed) {
      setGithubFollowed(true)
      setCredits((prev) => prev + 5)
    }
  }

  const handleLinkedinFollow = () => {
    window.open("https://linkedin.com/in/yourprofile", "_blank")
    if (!linkedinFollowed) {
      setLinkedinFollowed(true)
      setCredits((prev) => prev + 5)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <Button variant="ghost" className="mb-4" onClick={() => router.push("/chat")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Chat
          </Button>

          <div className="flex items-center space-x-2 mb-2">
            <Zap className="h-6 w-6 text-purple-600" />
            <h1 className="text-2xl font-bold">Genie Rewards</h1>
          </div>
          <p className="text-gray-600 text-sm">
            Earn more credits by following us on social media and sharing Genie with your friends.
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Your Credits</CardTitle>
            <CardDescription>Use credits to chat with AI models</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Available Credits</span>
              <Badge variant={credits > 5 ? "default" : "outline"} className="bg-purple-600">
                {credits} credits
              </Badge>
            </div>
            <Progress value={credits * 5} className="h-2" />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-lg font-medium">Earn More Credits</h2>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Follow on GitHub</CardTitle>
              <CardDescription>Get 5 credits</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-gray-600">
                Follow our GitHub repository to stay updated with the latest features and improvements.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleGithubFollow}
                className={`w-full ${githubFollowed ? "bg-green-600 hover:bg-green-700" : "bg-purple-600 hover:bg-purple-700"}`}
                disabled={githubFollowed}
              >
                {githubFollowed ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Followed
                  </>
                ) : (
                  <>
                    <Github className="mr-2 h-4 w-4" />
                    Follow on GitHub
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Connect on LinkedIn</CardTitle>
              <CardDescription>Get 5 credits</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-gray-600">
                Connect with us on LinkedIn to network and learn about AI advancements.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleLinkedinFollow}
                className={`w-full ${linkedinFollowed ? "bg-green-600 hover:bg-green-700" : "bg-purple-600 hover:bg-purple-700"}`}
                disabled={linkedinFollowed}
              >
                {linkedinFollowed ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Connected
                  </>
                ) : (
                  <>
                    <Linkedin className="mr-2 h-4 w-4" />
                    Connect on LinkedIn
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

