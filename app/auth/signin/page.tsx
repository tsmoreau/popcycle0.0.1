'use client'

import { signIn, getProviders } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
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
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    (async () => {
      const res = await getProviders()
      setProviders(res)
    })()
  }, [])

  // Auto-redirect if user cancelled OAuth (came here with error=Callback)
  useEffect(() => {
    const error = searchParams.get('error')
    const callbackUrl = searchParams.get('callbackUrl')
    
    if (error === 'Callback' && callbackUrl) {
      // User cancelled OAuth, redirect back to the original page immediately
      window.location.href = callbackUrl
      return
    }
  }, [searchParams])

  // Don't render the page if we're redirecting due to cancelled OAuth
  const error = searchParams.get('error')
  const callbackUrl = searchParams.get('callbackUrl')
  if (error === 'Callback' && callbackUrl) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pop-green via-pop-blue to-pop-red flex items-center justify-center">
        <div className="text-white text-lg">Redirecting...</div>
      </div>
    )
  }

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
            {/* Google SSO - Primary Method */}
            {providers?.google && (
              <div className="bg-pop-green/10 border-2 border-pop-green p-4 mb-4">
                <h3 className="systematic-caps text-sm text-pop-green mb-2">Google SSO</h3>
                <Button
                  onClick={() => signIn('google', { callbackUrl: '/' })}
                  className="w-full bg-pop-blue border-2 border-pop-black text-white hover:bg-pop-black hover:text-pop-blue systematic-caps text-sm h-12"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </Button>
              </div>
            )}

            <div className="text-center text-xs systematic-caps text-gray-500 pt-4">
              Google OAuth is the primary authentication method for PopCycle
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}