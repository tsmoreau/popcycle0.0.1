'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { AlertTriangle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const errorMessages: { [key: string]: string } = {
  Configuration: 'There is a problem with the server configuration.',
  AccessDenied: 'You do not have permission to sign in.',
  Verification: 'The verification token has expired or has already been used.',
  Default: 'Unable to sign in.',
}

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const errorMessage = errorMessages[error as string] || errorMessages.Default

  return (
    <div className="min-h-screen bg-gradient-to-br from-pop-red via-orange-500 to-red-600 p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center text-white hover:text-white/80 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to PopCycle
        </Link>
        
        <Card className="bg-white border-4 border-pop-black shadow-2xl">
          <CardHeader className="space-y-4 pb-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-pop-red border-4 border-pop-black rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="text-white w-8 h-8" />
              </div>
              <CardTitle className="text-2xl helvetica-bold text-pop-black">Sign In Error</CardTitle>
              <CardDescription className="systematic-caps text-gray-600">
                {errorMessage}
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600">
                If this problem persists, please contact support.
              </p>
              <div className="space-y-2">
                <Link href="/auth/signin">
                  <Button className="w-full bg-pop-blue border-2 border-pop-black text-white hover:bg-pop-black hover:text-pop-blue systematic-caps">
                    Try Again
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full border-2 border-pop-black systematic-caps">
                    Go Home
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-pop-red border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <AuthErrorContent />
    </Suspense>
  )
}