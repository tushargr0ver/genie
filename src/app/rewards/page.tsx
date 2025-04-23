"use client"

import { useState, useEffect } from "react"
import { getSession } from 'next-auth/react';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Zap, Github, Linkedin, ArrowLeft, Check, Twitter, Share2 } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { useTheme } from "next-themes"

export default function RewardsPage() {
  const [credits, setCredits] = useState(31)
  const [githubFollowed, setGithubFollowed] = useState(false)
  const [linkedinFollowed, setLinkedinFollowed] = useState(false)
  const [twitterFollowed, setTwitterFollowed] = useState(false)
  const [shared, setShared] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const { theme } = useTheme()


  useEffect(() => {
      const checkSession = async () => {
        const session = await getSession();
        if (!session) {
          router.push('/');
        }
        
      };
  
      checkSession();
    }, [router]);


    useEffect(()=>{
        //setCredits from db once
        (async () => {
          try {
            const res = await fetch(`/api/reward`);
            const data = await res.json();
            if (res.ok) {
              if (data.credits !== undefined) {
                setCredits(data.credits);
                setLinkedinFollowed(data.linkedin)
                setGithubFollowed(data.github)
                setTwitterFollowed(data.x)
                setShared(data.share)
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
            if(credits<31){
              (async () => {
                try{
                  const response = await fetch('/api/add-credits', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ credits, githubFollowed, twitterFollowed, linkedinFollowed, shared }),
                });
                console.log({ credits, githubFollowed, twitterFollowed, linkedinFollowed, shared });
                
              }catch(err){
                console.error("Post failed");
                
              }
              })()
            }
            
          },[credits,githubFollowed, linkedinFollowed, twitterFollowed, shared])
  useEffect(() => {
    // Check if user came from a specific action
    const action = searchParams.get("action")
    if (action === "github" && !githubFollowed) {
      setGithubFollowed(true)      
      setCredits((prev) => prev + 5)
    } else if (action === "linkedin" && !linkedinFollowed) {
      setLinkedinFollowed(true)
      setCredits((prev) => prev + 5)
    } else if (action === "twitter" && !twitterFollowed) {
      setTwitterFollowed(true)
      setCredits((prev) => prev + 5)
    } else if (action === "share" && !shared) {
      setShared(true)
      setCredits((prev) => prev + 5)
    }
  }, [searchParams, githubFollowed, linkedinFollowed, twitterFollowed, shared])

  const handleGithubFollow = () => {
    window.open("https://github.com/tushargr0ver/genie", "_blank")
    if (!githubFollowed) {
      setGithubFollowed(true)      
      setCredits((prev) => prev + 5)
    }
  }

  const handleLinkedinFollow = () => {
    window.open("https://linkedin.com/in/tushargr0ver", "_blank")
    if (!linkedinFollowed) {
      setLinkedinFollowed(true)
      setCredits((prev) => prev + 5)
    }
  }

  const handleTwitterFollow = () => {
    window.open("https://x.com/tushargr0ver", "_blank")
    if (!twitterFollowed) {
      setTwitterFollowed(true)
      setCredits((prev) => prev + 5)
    }
  }

  const handleShare = () => {
    // Share functionality - in a real app, this would open a share dialog
    if (navigator.share) {
      navigator.share({
        title: "Genie AI Chat",
        text: "Check out this amazing AI chat app!",
        url: window.location.origin,
      })
    }

    if (!shared) {
      setShared(true)
      setCredits((prev) => prev + 5)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <Button variant="ghost" className="mb-4 dark:text-gray-300" onClick={() => router.push("/chat")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Chat
        </Button>

        <div className="flex items-center space-x-2 mb-2">
          <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          <h1 className="text-2xl font-bold dark:text-white">Genie Rewards</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Earn more credits by following us on social media and sharing Genie with your friends.
        </p>

        <Card className="mb-6 mt-6 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg dark:text-white">Your Credits</CardTitle>
            <CardDescription className="dark:text-gray-400">Use credits to chat with AI models</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Available Credits</span>
              <Badge variant={credits > 5 ? "default" : "outline"} className="bg-purple-600">
                {credits} credits
              </Badge>
            </div>
            <Progress value={credits * 5} className="h-2" />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-lg font-medium dark:text-white">Earn More Credits</h2>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-base dark:text-white">Follow on GitHub</CardTitle>
              <CardDescription className="dark:text-gray-400">Get 5 credits</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
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

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-base dark:text-white">Connect on LinkedIn</CardTitle>
              <CardDescription className="dark:text-gray-400">Get 5 credits</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
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

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-base dark:text-white">Follow on X (Twitter)</CardTitle>
              <CardDescription className="dark:text-gray-400">Get 5 credits</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Follow us on X to get the latest updates and AI news.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleTwitterFollow}
                className={`w-full ${twitterFollowed ? "bg-green-600 hover:bg-green-700" : "bg-purple-600 hover:bg-purple-700"}`}
                disabled={twitterFollowed}
              >
                {twitterFollowed ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Followed
                  </>
                ) : (
                  <>
                    <Twitter className="mr-2 h-4 w-4" />
                    Follow on X
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-base dark:text-white">Share with Friends</CardTitle>
              <CardDescription className="dark:text-gray-400">Get 5 credits</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Share Genie with your friends and colleagues to help them discover AI.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleShare}
                className={`w-full ${shared ? "bg-green-600 hover:bg-green-700" : "bg-purple-600 hover:bg-purple-700"}`}
                disabled={shared}
              >
                {shared ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Shared
                  </>
                ) : (
                  <>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Genie
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
