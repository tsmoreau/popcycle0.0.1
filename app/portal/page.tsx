'use client'

import { useState } from 'react'
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
import AdminDashboard from './components/AdminDashboard'
import OperationsDashboard from './components/OperationsDashboard'
import CRMDashboard from './components/CRMDashboard'
import PartnerDashboard from './components/PartnerDashboard'
import FinancialDashboard from './components/FinancialDashboard'

type DashboardSection = 'admin' | 'operations' | 'crm' | 'partner' | 'financial'
type OperationsSection = 'collections' | 'processing' | 'inventory' | 'fulfillment'

export default function PortalPage() {
  const [activeSection, setActiveSection] = useState<DashboardSection>('admin')
  const [activeOperationsSection, setActiveOperationsSection] = useState<OperationsSection>('collections')

  const sidebarItems = [
    { id: 'admin' as const, label: 'Admin', icon: Settings, color: 'text-pop-black' },
    { id: 'operations' as const, label: 'Operations', icon: Truck, color: 'text-pop-green' },
    { id: 'crm' as const, label: 'CRM', icon: Phone, color: 'text-pop-blue' },
    { id: 'partner' as const, label: 'Partner', icon: Building2, color: 'text-pop-red' },
    { id: 'financial' as const, label: 'Finance', icon: DollarSign, color: 'text-pop-gray' },
  ]

  const renderDashboard = () => {
    switch (activeSection) {
      case 'admin':
        return <AdminDashboard />
      case 'operations':
        return <OperationsDashboard activeSubSection={activeOperationsSection} setActiveSubSection={setActiveOperationsSection} />
      case 'crm':
        return <CRMDashboard />
      case 'partner':
        return <PartnerDashboard />
      case 'financial':
        return <FinancialDashboard />
    }
  }

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
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-pop-green/10 text-pop-green border border-pop-green/20'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`h-5 w-5 mr-3 ${activeSection === item.id ? 'text-pop-green' : item.color}`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="ml-64 mt-20 min-h-[calc(100vh-5rem)] overflow-y-auto">
        <div className="p-6 pb-12">
          {renderDashboard()}
        </div>
      </main>
    </div>
  )
}