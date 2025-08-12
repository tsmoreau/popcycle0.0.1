'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from './ui/button'
import { User, LogOut } from 'lucide-react'

export default function AuthButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="w-8 h-8 border-2 border-pop-green border-t-transparent rounded-full animate-spin"></div>
    )
  }

  if (session) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-pop-green border-2 border-pop-black rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-pop-black" />
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-semibold text-pop-black">
              {session.user?.name || 'User'}
            </div>
            <div className="text-xs text-gray-600 systematic-caps">
              {session.user?.userType === 'super_admin' ? 'Admin' : 'Maker'}
            </div>
          </div>
        </div>
        <Button
          onClick={() => signOut()}
          variant="outline"
          size="sm"
          className="border-2 border-pop-black hover:bg-pop-red hover:text-white systematic-caps"
        >
          <LogOut className="w-4 h-4 md:mr-2" />
          <span className="hidden md:inline">Sign Out</span>
        </Button>
      </div>
    )
  }

  return (
    <Button
      onClick={() => signIn()}
      className="bg-pop-blue border-2 border-pop-black text-white hover:bg-pop-black systematic-caps"
    >
      Sign In
    </Button>
  )
}