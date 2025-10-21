'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import { User, LogOut, Settings } from 'lucide-react'

function AuthButtonContent() {
  const { data: session, status } = useSession()
  const [signInModalOpen, setSignInModalOpen] = useState(false)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Check for auth errors and reopen modal
  useEffect(() => {
    const error = searchParams.get('error')
    if (error === 'Callback') {
      setSignInModalOpen(true)
      // Clean up URL without triggering a page reload
      const url = new URL(window.location.href)
      url.searchParams.delete('error')
      window.history.replaceState({}, '', url.toString())
    }
  }, [searchParams])

  if (status === 'loading') {
    return <div className="w-8 h-8"></div>
  }

  if (session) {
    const hasPortalAccess = session?.user?.userType === 'super_admin' || 
      (session?.user?.permissions && session.user.permissions.length > 0);

    return (
      <div className="-mt-2 border-pop-green ">
        <div className="text-xs systematic-caps text-pop-gray pb-3 border-gray-200">
          {session.user?.email}
        </div>
        <div className=" flex mx-auto py-1 border-t text-xs  systematic-caps border-b border-gray-200">
        <div>  {session.user?.userType === 'super_admin' ? 'Super Admin' : 'Maker'}</div>
        </div>
        
        {/* Profile Link */}
        <a
          href="/profile"
          className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-pop-green hover:text-white "
        >
          <User className="w-4 h-4 mr-3" />
          Profile
        </a>
        
        {/* Portal Access */}
        {hasPortalAccess && (
          <a
            href="/portal"
            className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-pop-green hover:text-white "
          >
            <Settings className="w-4 h-4 mr-3" />
            Portal Dashboard
          </a>
        )}
        
        {/* Sign Out */}
        <button
          onClick={() => {
            signOut({ callbackUrl: '/' })
          }}
          className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-pop-green hover:text-white "
        >
          <LogOut className="w-4 h-4 mr-3" />
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <>
      <button
        onClick={() => setSignInModalOpen(true)}
        className="w-full px-6 py-2 bg-pop-green text-white font-jost rounded-md hover:bg-opacity-90 transition-colors"
        data-testid="button-signin"
      >
        Login
      </button>

      {/* Sign In Modal */}
      <Dialog open={signInModalOpen} onOpenChange={setSignInModalOpen}>
        <DialogContent className="sm:max-w-md bg-white border border-gray-200">
          <DialogHeader className="space-y-4 pb-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-pop-green border border-gray-200  flex items-center justify-center mx-auto mb-4">
                <span className="text-pop-black helvetica-bold text-2xl">P</span>
              </div>
              <DialogTitle className="text-xl helvetica-bold text-pop-black">
                Welcome to PopCycle
              </DialogTitle>
              <DialogDescription className="systematic-caps text-gray-600">
                Sign in to track your impact and join the circular economy
              </DialogDescription>
            </div>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-pop-green/10 border border-pop-green p-4">
              <h3 className="systematic-caps text-sm text-pop-green mb-2">Google SSO</h3>
              <Button
                onClick={async () => {
                  setIsSigningIn(true)
                  try {
                    // Use current domain + path for callback URL
                    const callbackUrl = window.location.origin + window.location.pathname
                    await signIn('google', { callbackUrl })
                  } catch (error) {
                    console.error('Sign in error:', error)
                  } finally {
                    setIsSigningIn(false)
                    setSignInModalOpen(false)
                  }
                }}
                disabled={isSigningIn}
                className="w-full bg-pop-blue border border-gray-300 text-white hover:bg-pop-black hover:text-pop-blue systematic-caps text-sm h-12"
              >
                {isSigningIn ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                ) : (
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
                Continue with Google
              </Button>
            </div>

            <div className="text-center text-xs systematic-caps text-gray-500">
              Google OAuth is the primary authentication method for PopCycle
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default function AuthButton() {
  return (
    <Suspense fallback={<div className="w-8 h-8"></div>}>
      <AuthButtonContent />
    </Suspense>
  )
}