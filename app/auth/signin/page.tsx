'use client'

import { signIn, getProviders } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Mail, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function SignInPage() {
  const [providers, setProviders] = useState<any>(null)
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    (async () => {
      const res = await getProviders()
      setProviders(res)
    })()
  }, [])

  const handleEmailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    await signIn('email', { email, callbackUrl: '/' })
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pop-green via-pop-blue to-pop-red p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center text-white hover:text-white/80 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to PopCycle
        </Link>
        
        <Card className="bg-white border-4 border-pop-black shadow-2xl">
          <CardHeader className="space-y-4 pb-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-pop-green border-4 border-pop-black rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-pop-black helvetica-bold text-2xl">P</span>
              </div>
              <CardTitle className="text-2xl helvetica-bold text-pop-black">Welcome to PopCycle</CardTitle>
              <CardDescription className="systematic-caps text-gray-600">
                Sign in to track your impact and join the circular economy
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Google SSO - Troubleshooting */}
            {providers?.google && (
              <div className="bg-red-50 border-2 border-red-300 p-4 mb-4">
                <h3 className="systematic-caps text-sm text-red-700 mb-2">⚠ Google OAuth Setup Issue</h3>
                <p className="text-xs text-red-600 mb-3">Multiple users getting "invalid_client" - check Google Cloud Console configuration</p>
                <button
                  disabled
                  className="w-full bg-gray-400 border-2 border-gray-600 text-gray-700 systematic-caps text-sm h-12 cursor-not-allowed opacity-60"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  </svg>
                  Google OAuth Disabled
                </button>
                <div className="text-center text-xs systematic-caps text-red-600 mt-2">
                  Use magic link authentication below
                </div>
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500 systematic-caps">Or continue with email</span>
              </div>
            </div>

            {/* Magic Link - Working Alternative */}
            <div className="bg-blue-50 border-2 border-blue-300 p-4">
              <h3 className="systematic-caps text-sm text-blue-600 mb-2">✓ Magic Link (Working Now)</h3>
              <p className="text-xs text-blue-600 mb-3">Use this while we fix Google OAuth</p>
              <form onSubmit={handleEmailSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="systematic-caps text-sm text-gray-700">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="terrencestasse@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-2 border-blue-300 focus:border-blue-500"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 border-2 border-pop-black text-white hover:bg-pop-black systematic-caps text-sm h-12"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {isLoading ? 'Sending Magic Link...' : 'Send Magic Link'}
                </Button>
                <div className="text-center text-xs systematic-caps text-gray-500">
                  Check your email for a secure sign-in link
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}