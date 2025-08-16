'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { 
  Users, 
  Truck,
  QrCode,
  Phone, 
  Building2, 
  DollarSign,
  Settings,
  Home,
  LogOut,
  Menu,
  X,
  Warehouse,
  Shield,
  User,
  BarChart3,
  ChevronDown
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { QRScanner } from '../components/operations/QRScanner'
import Link from 'next/link'

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showScanModal, setShowScanModal] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

  const sidebarItems = [
    { id: 'admin', label: 'Admin', icon: Shield, color: 'text-pop-black', activeColor: 'text-pop-black', activeBg: 'bg-pop-black/10', activeBorder: 'border-pop-black/20', href: '/portal/admin' },
    { id: 'operations', label: 'Operations', icon: BarChart3, color: 'text-pop-green', activeColor: 'text-pop-green', activeBg: 'bg-pop-green/10', activeBorder: 'border-pop-green/20', href: '/portal/operations' },
    { id: 'crm', label: 'CRM', icon: Phone, color: 'text-pop-blue', activeColor: 'text-pop-blue', activeBg: 'bg-pop-blue/10', activeBorder: 'border-pop-blue/20', href: '/portal/crm' },
    { id: 'partner', label: 'Partner', icon: Building2, color: 'text-pop-red', activeColor: 'text-pop-red', activeBg: 'bg-pop-red/10', activeBorder: 'border-pop-red/20', href: '/portal/partner' },
    { id: 'financial', label: 'Finance', icon: DollarSign, color: 'text-orange-600', activeColor: 'text-orange-600', activeBg: 'bg-orange-600/10', activeBorder: 'border-orange-600/20', href: '/portal/financial' },
  ]

  return (
    <div className="h-screen bg-gray-50">
      {/* Header - Fixed */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 h-16 z-50">
        <div className="px-2 md:px-6 py-4 flex items-center justify-between h-full w-full">
          <div className="flex items-center space-x-2 md:space-x-4">
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
            
            <h1 className="text-lg md:text-2xl font-bold text-pop-black">PopCycle Portal</h1>
            <Badge variant="outline" className="hidden sm:flex bg-pop-green/10 text-pop-green border-pop-green">
              Admin Access
            </Badge>
          </div>
          
          <div className="flex items-center space-x-1 md:space-x-4">
            <Button variant="ghost" size="sm" onClick={() => setShowScanModal(true)}>
              <QrCode className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">QR Scanner</span>
            </Button>
            
            {/* Profile Dropdown */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-1"
              >
                <User className="h-4 w-4" />
                <span className="hidden md:inline">Profile</span>
                <ChevronDown className={`h-3 w-3 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
              </Button>
              
              {/* Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="py-1">
                    <Link 
                      href="/portal/profile" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-purple-600"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <User className="h-4 w-4 mr-3 text-purple-600" />
                      Profile
                    </Link>
                    <button 
                      onClick={() => {
                        window.location.href = '/'
                        setProfileDropdownOpen(false)
                      }}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-pop-black text-left"
                    >
                      <Home className="h-4 w-4 mr-3 text-pop-black" />
                      Public Site
                    </button>
                    <button 
                      onClick={() => {
                        // Add actual logout functionality here
                        setProfileDropdownOpen(false)
                      }}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 text-left"
                    >
                      <LogOut className="h-4 w-4 mr-3 text-red-600" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/20" onClick={() => setMobileMenuOpen(false)} />
          <nav className="fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto">
            {/* Close button in top corner */}
            <div className="flex justify-start items-center p-4 pb-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="px-6 pt-2">
              <div className="space-y-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link key={item.id} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                      <button
                        className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                          isActive
                            ? `${item.activeBg} ${item.activeColor} border ${item.activeBorder}`
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className={`h-5 w-5 mr-3 ${isActive ? item.activeColor : item.color}`} />
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
      <nav className={`hidden md:block fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 overflow-y-auto z-40 transition-all duration-300 ${
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
                        ? `${item.activeBg} ${item.activeColor} border ${item.activeBorder}`
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <Icon className={`h-5 w-5 ${sidebarCollapsed ? '' : 'mr-3'} ${isActive ? item.activeColor : item.color}`} />
                    {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
                  </button>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className={`mt-16 min-h-[calc(100vh-4rem)] overflow-y-auto transition-all duration-300 ${
        sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
      } ml-0`}>
        <div className="p-4 md:p-6 pb-12">
          {children}
        </div>
      </main>

      {/* QR Scanner Modal */}
      <QRScanner open={showScanModal} onOpenChange={setShowScanModal} />
    </div>
  )
}