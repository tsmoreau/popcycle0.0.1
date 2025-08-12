'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to home page since we now use a modal for sign-in
    router.push('/')
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pop-green via-pop-blue to-pop-red p-4 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="w-16 h-16 bg-white border-4 border-pop-black rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-pop-black helvetica-bold text-2xl">P</span>
        </div>
        <p className="systematic-caps">Redirecting to PopCycle...</p>
      </div>
    </div>
  )
}