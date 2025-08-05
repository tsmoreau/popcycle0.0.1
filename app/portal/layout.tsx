'use client'

import { usePathname } from 'next/navigation'
import { 
  Users, 
  Truck, 
  Phone, 
  Building2, 
  DollarSign,
  Settings,
  Home,
  LogOut
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
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 h-20 z-50">
        <div className="px-6 py-4 flex items-center justify-between h-full">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-pop-black">PopCycle Portal</h1>
            <Badge variant="outline" className="bg-pop-green/10 text-pop-green border-pop-green">
              Admin Access
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => window.location.href = '/'}>
              <Home className="h-4 w-4 mr-2" />
              Public Site
            </Button>
            <Button variant="ghost" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Sidebar - Fixed */}
      <nav className="fixed top-20 left-0 w-64 h-[calc(100vh-5rem)] bg-white border-r border-gray-200 overflow-y-auto z-40">
        <div className="p-6">
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.id} href={item.href}>
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

      {/* Main Content */}
      <main className="ml-64 mt-20 min-h-[calc(100vh-5rem)] overflow-y-auto">
        <div className="p-6 pb-12">
          {children}
        </div>
      </main>
    </div>
  )
}