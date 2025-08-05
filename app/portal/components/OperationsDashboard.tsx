'use client'

import { Truck, Package, BarChart3, Users } from 'lucide-react'
import CollectionsSection from './operations/CollectionsSection'
import ProcessingSection from './operations/ProcessingSection'
import InventorySection from './operations/InventorySection'
import FulfillmentSection from './operations/FulfillmentSection'

type OperationsSection = 'collections' | 'processing' | 'inventory' | 'fulfillment'

interface OperationsDashboardProps {
  activeSubSection: OperationsSection
  setActiveSubSection: (section: OperationsSection) => void
}

export default function OperationsDashboard({ activeSubSection, setActiveSubSection }: OperationsDashboardProps) {
  const operationsSubSections = [
    { id: 'collections' as const, label: 'Collections', icon: Truck, color: 'text-pop-green' },
    { id: 'processing' as const, label: 'Processing', icon: Package, color: 'text-pop-blue' },
    { id: 'inventory' as const, label: 'Inventory', icon: BarChart3, color: 'text-pop-red' },
    { id: 'fulfillment' as const, label: 'Fulfillment', icon: Users, color: 'text-pop-gray' },
  ]

  const renderOperationsSubSection = () => {
    switch (activeSubSection) {
      case 'collections':
        return <CollectionsSection />
      case 'processing':
        return <ProcessingSection />
      case 'inventory':
        return <InventorySection />
      case 'fulfillment':
        return <FulfillmentSection />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-pop-black">Operations Dashboard</h2>
        <p className="text-gray-600 mt-2">Bins, batches, production workflow, and logistics coordination</p>
      </div>

      {/* Sub-navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {operationsSubSections.map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => setActiveSubSection(section.id)}
                className={`flex items-center py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeSubSection === section.id
                    ? 'border-pop-green text-pop-green'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className={`h-5 w-5 mr-2 ${activeSubSection === section.id ? 'text-pop-green' : section.color}`} />
                {section.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Sub-section content */}
      {renderOperationsSubSection()}
    </div>
  )
}

export type { OperationsSection }