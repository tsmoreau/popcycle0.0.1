'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bot, Home, Wrench, BookOpen, Users, Zap } from 'lucide-react'

const navigation = [
  { name: 'Control', href: '/rovers', icon: Bot },
  { name: 'Build', href: '/rovers/build', icon: Wrench },
  { name: 'Docs', href: '/rovers/docs', icon: BookOpen },
  { name: 'Community', href: '/rovers/community', icon: Users },
  { name: 'Systems', href: '/rovers/systems', icon: Zap },
]

export default function RoverNavigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm rover-border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/rovers" className="flex items-center space-x-2 text-lg font-bold text-blue-600">
            <Bot className="w-6 h-6" />
            <span className="rover-mono">INSIGHT_ROVERS</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/rovers' && pathname.startsWith(item.href))
              const Icon = item.icon
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors flex items-center space-x-1 ${
                    isActive
                      ? 'rover-status-online border-b-2 border-current'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="rover-mono">{item.name.toUpperCase()}</span>
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="rover-btn p-2">
              <span className="sr-only">Open menu</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="md:hidden border-t border-gray-200">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/rovers' && pathname.startsWith(item.href))
            const Icon = item.icon
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 text-base font-medium transition-colors flex items-center space-x-2 ${
                  isActive
                    ? 'rover-status-online bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="rover-mono">{item.name.toUpperCase()}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}