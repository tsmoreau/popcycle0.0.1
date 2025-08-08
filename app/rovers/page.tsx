'use client'

import { useState, useEffect } from 'react'
import { QrCode, Radio, Users, Clock, Battery, Signal, Camera, Navigation as NavIcon } from 'lucide-react'
import RoverCard from './components/RoverCard'
import QRScanner from './components/QRScanner'

// Mock rover data - this would come from your API
const mockRovers = [
  {
    id: 'RV-001',
    name: 'Explorer Alpha',
    type: 'public',
    status: 'online',
    batteryLevel: 85,
    signalStrength: 'strong',
    currentUser: null,
    queueLength: 0,
    location: 'Main Workshop',
    capabilities: ['camera', 'movement', 'sensors'],
    uptime: '2d 14h',
  },
  {
    id: 'RV-002',
    name: 'Builder Beta',
    type: 'public',
    status: 'busy',
    batteryLevel: 62,
    signalStrength: 'good',
    currentUser: 'Alex_M',
    queueLength: 2,
    location: 'Assembly Area',
    capabilities: ['camera', 'movement', 'gripper'],
    uptime: '1d 8h',
  },
  {
    id: 'RV-003',
    name: 'Scout Gamma',
    type: 'gated',
    status: 'offline',
    batteryLevel: 15,
    signalStrength: 'weak',
    currentUser: null,
    queueLength: 0,
    location: 'Charging Station',
    capabilities: ['camera', 'movement', 'environmental'],
    uptime: '0h',
  },
  {
    id: 'RV-004',
    name: 'Maker Delta',
    type: 'gated',
    status: 'online',
    batteryLevel: 91,
    signalStrength: 'excellent',
    currentUser: null,
    queueLength: 1,
    location: 'Advanced Lab',
    capabilities: ['camera', 'movement', 'precision_tools'],
    uptime: '5d 2h',
  },
]

export default function RoversPage() {
  const [showQRScanner, setShowQRScanner] = useState(false)
  const [selectedRover, setSelectedRover] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'public' | 'gated'>('all')

  const filteredRovers = mockRovers.filter(rover => 
    filter === 'all' || rover.type === filter
  )

  const onlineCount = mockRovers.filter(r => r.status === 'online' || r.status === 'busy').length
  const publicAvailable = mockRovers.filter(r => r.type === 'public' && r.status === 'online').length

  return (
    <div className="min-h-screen rover-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="rover-card mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  <span className="rover-mono">ROVER_CONTROL</span>
                </h1>
                <p className="text-gray-600 max-w-2xl">
                  Interactive exploration system with physical proximity access control. 
                  Scan QR codes on chassis for gated access, or control public rovers directly.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <button
                  onClick={() => setShowQRScanner(true)}
                  className="rover-btn-primary flex items-center space-x-2"
                >
                  <QrCode className="w-4 h-4" />
                  <span className="rover-mono">SCAN_QR</span>
                </button>
              </div>
            </div>
          </div>

          {/* Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="rover-card text-center">
              <Radio className="w-6 h-6 mx-auto mb-2 rover-status-online" />
              <div className="rover-mono text-lg font-bold">{onlineCount}</div>
              <div className="text-sm text-gray-600">ONLINE</div>
            </div>
            <div className="rover-card text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="rover-mono text-lg font-bold">{publicAvailable}</div>
              <div className="text-sm text-gray-600">AVAILABLE</div>
            </div>
            <div className="rover-card text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-orange-500" />
              <div className="rover-mono text-lg font-bold">
                {mockRovers.reduce((acc, r) => acc + (r.queueLength || 0), 0)}
              </div>
              <div className="text-sm text-gray-600">QUEUED</div>
            </div>
            <div className="rover-card text-center">
              <Battery className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <div className="rover-mono text-lg font-bold">
                {Math.round(mockRovers.reduce((acc, r) => acc + r.batteryLevel, 0) / mockRovers.length)}%
              </div>
              <div className="text-sm text-gray-600">AVG_BATTERY</div>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {(['all', 'public', 'gated'] as const).map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`rover-btn rover-mono ${
                  filter === filterType ? 'rover-btn-primary' : ''
                }`}
              >
                {filterType.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Rover Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRovers.map((rover) => (
            <RoverCard
              key={rover.id}
              rover={rover}
              onSelect={setSelectedRover}
              isSelected={selectedRover === rover.id}
            />
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-12 rover-card">
          <h2 className="text-xl font-bold mb-4 rover-mono">ACCESS_GUIDE</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-blue-600 mb-2 rover-mono">PUBLIC_ROVERS</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Direct access - no QR scan required</li>
                <li>• First-come, first-served queue system</li>
                <li>• 10-minute session limit when others waiting</li>
                <li>• Basic movement and camera controls</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-orange-600 mb-2 rover-mono">GATED_ROVERS</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Requires physical QR scan from chassis</li>
                <li>• Extended session times (30+ minutes)</li>
                <li>• Advanced capabilities and tools</li>
                <li>• Visit the workshop to unlock access</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <QRScanner
          onClose={() => setShowQRScanner(false)}
          onScan={(code) => {
            console.log('QR Code scanned:', code)
            setShowQRScanner(false)
            // Handle QR code logic here
          }}
        />
      )}
    </div>
  )
}