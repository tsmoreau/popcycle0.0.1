'use client'

import { useState, useRef, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Button } from './ui/button'
import { User, LogOut, Settings, ChevronDown } from 'lucide-react'
import SignInModal from '../app/components/SignInModal'

export default function AuthButton() {
  const { data: session, status } = useSession()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [signInModalOpen, setSignInModalOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  if (status === 'loading') {
    return (
      <div className="w-8 h-8 border-2 border-pop-green border-t-transparent rounded-full animate-spin"></div>
    )
  }

  if (session) {
    const hasPortalAccess = session?.user?.userType === 'super_admin' || 
      (session?.user?.permissions && session.user.permissions.length > 0);

    return (
      <div className="relative" ref={dropdownRef}>
        {/* User Button */}
        <Button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          variant="outline"
          className="flex items-center space-x-2 border-2 border-pop-black hover:bg-pop-green systematic-caps"
        >
          <div className="w-6 h-6 bg-pop-green border-2 border-pop-black rounded-full flex items-center justify-center">
            <User className="w-3 h-3 text-pop-black" />
          </div>
          <span className="hidden md:inline text-sm font-semibold">
            {session.user?.name?.split(' ')[0] || 'User'}
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
        </Button>
        
        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-pop-black shadow-lg z-50">
            <div className="p-2">
              <div className="px-3 py-2 text-sm font-semibold text-pop-black border-b border-gray-200">
                {session.user?.email}
              </div>
              <div className="px-3 py-1 text-xs text-gray-500 systematic-caps border-b border-gray-200">
                {session.user?.userType === 'super_admin' ? 'Super Admin' : 'Maker'}
              </div>
              
              {/* Profile Link */}
              <a
                href="/profile"
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-pop-green hover:text-white systematic-caps"
                onClick={() => setDropdownOpen(false)}
              >
                <User className="w-4 h-4 mr-3" />
                Profile
              </a>
              
              {/* Portal Access */}
              {hasPortalAccess && (
                <a
                  href="/portal"
                  className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-pop-blue hover:text-white systematic-caps"
                  onClick={() => setDropdownOpen(false)}
                >
                  <Settings className="w-4 h-4 mr-3" />
                  Portal Dashboard
                </a>
              )}
              
              {/* Sign Out */}
              <button
                onClick={() => {
                  signOut()
                  setDropdownOpen(false)
                }}
                className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-pop-red hover:text-white systematic-caps text-left"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <Button
        onClick={() => setSignInModalOpen(true)}
        className="bg-pop-blue border-2 border-pop-black text-white hover:bg-pop-black systematic-caps"
      >
        Sign In
      </Button>
      
      <SignInModal 
        isOpen={signInModalOpen} 
        onClose={() => setSignInModalOpen(false)} 
      />
    </>
  )
}