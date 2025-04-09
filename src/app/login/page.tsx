"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Github, Loader2 } from "lucide-react"
import { useTheme } from "next-themes"
import { SunIcon, MoonIcon } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [isLoading, setIsLoading] = useState({
    google: false,
    github: false,
  })

  const handleGoogleLogin = async () => {
    setIsLoading((prev) => ({ ...prev, google: true }))

    // Simulate OAuth login
    setTimeout(() => {
      setIsLoading((prev) => ({ ...prev, google: false }))
      router.push("/chat")
    }, 1500)
  }

  const handleGithubLogin = async () => {
    setIsLoading((prev) => ({ ...prev, github: true }))

    // Simulate OAuth login
    setTimeout(() => {
      setIsLoading((prev) => ({ ...prev, github: false }))
      router.push("/chat")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8 relative">
          <Link href="/" className="inline-flex items-center space-x-2">
            <Zap className="h-6 w-6 text-purple-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">Genie</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 text-gray-500 dark:text-gray-400"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </Button>
        </div>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">Sign in to continue to Genie</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Button
              onClick={handleGoogleLogin}
              disabled={isLoading.google}
              variant="outline"
              className="w-full h-11 relative"
            >
              {isLoading.google ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                  </div>
                  <span>Continue with Google</span>
                </>
              )}
            </Button>

            <Button
              onClick={handleGithubLogin}
              disabled={isLoading.github}
              variant="outline"
              className="w-full h-11 relative"
            >
              {isLoading.github ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Github className="h-5 w-5" />
                  </div>
                  <span>Continue with GitHub</span>
                </>
              )}
            </Button>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link href="/signup" className="text-purple-600 hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
