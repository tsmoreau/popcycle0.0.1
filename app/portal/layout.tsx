'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { 
  Users, 
  Truck, 
  Phone, 
  Building2, 
  DollarSign,
  Settings,
  Home,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import Link from 'next/link'

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const sidebarItems = [
    { id: 'admin', label: 'Admin', icon: Settings, color: 'text-pop-black', href: '/portal/admin' },
    { id: 'operations', label: 'Operations', icon: Truck, color: 'text-pop-green', href: '/portal/operations' },
    { id: 'crm', label: 'CRM', icon: Phone, color: 'text-pop-blue', href: '/portal/crm' },
    { id: 'partner', label: 'Partner', icon: Building2, color: 'text-pop-red', href: '/portal/partner' },
    { id: 'financial', label: 'Finance', icon: DollarSign, color: 'text-pop-gray', href: '/portal/financial' },
  ]

  return (
    <div className="h-screen bg-gray-50">
      {/* Header - Fixed */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 h-16 z-50">
        <div className="px-6 py-4 flex items-center justify-between h-full">
          <div className="flex items-center space-x-4">
            {/* Desktop sidebar toggle */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden md:flex"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            
            {/* Mobile menu toggle */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
            
            <h1 className="text-xl md:text-2xl font-bold text-pop-black">PopCycle Portal</h1>
            <Badge variant="outline" className="hidden sm:flex bg-pop-green/10 text-pop-green border-pop-green">
              Admin Access
            </Badge>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button variant="ghost" size="sm" onClick={() => window.location.href = '/'}>
              <Home className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Public Site</span>
            </Button>
            <Button variant="ghost" size="sm">
              <LogOut className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/20" onClick={() => setMobileMenuOpen(false)} />
          <nav className="fixed top-20 left-0 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-6">
              <div className="space-y-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link key={item.id} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                      <button
                        className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                          isActive
                            ? 'bg-pop-green/10 text-pop-green border border-pop-green/20'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-pop-green' : item.color}`} />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    </Link>
                  )
                })}
              </div>
            </div>
          </nav>
        </div>
      )}

      {/* Desktop Sidebar - Collapsible */}
      <nav className={`hidden md:block fixed top-20 left-0 h-[calc(100vh-5rem)] bg-white border-r border-gray-200 overflow-y-auto z-40 transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      }`}>
        <div className={`${sidebarCollapsed ? 'p-2' : 'p-6'}`}>
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.id} href={item.href}>
                  <button
                    className={`w-full flex items-center ${sidebarCollapsed ? 'px-2 py-3 justify-center' : 'px-4 py-3'} text-left rounded-lg transition-colors ${
                      isActive
                        ? 'bg-pop-green/10 text-pop-green border border-pop-green/20'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <Icon className={`h-5 w-5 ${sidebarCollapsed ? '' : 'mr-3'} ${isActive ? 'text-pop-green' : item.color}`} />
                    {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
                  </button>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className={`mt-20 min-h-[calc(100vh-5rem)] overflow-y-auto transition-all duration-300 ${
        sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
      } ml-0`}>
        <div className="p-4 md:p-6 pb-12">
          {children}
        </div>
      </main>
    </div>
  )
}