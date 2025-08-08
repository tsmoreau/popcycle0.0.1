import { QrCode, Radio } from 'lucide-react'

// Simple rover data
const rovers = [
  { id: 'RV-001', status: 'online', type: 'public' },
  { id: 'RV-002', status: 'busy', type: 'public' },
  { id: 'RV-003', status: 'online', type: 'gated' },
  { id: 'RV-004', status: 'offline', type: 'gated' },
]

export default function RoversPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        
        {/* Simple Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light mb-4 rover-mono">INSIGHT_ROVERS</h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Physical proximity access control for educational robotics.
          </p>
        </div>

        {/* Rover Status Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {rovers.map((rover) => (
            <div key={rover.id} className="text-center">
              <div className={`w-16 h-16 mx-auto mb-3 rounded border-2 flex items-center justify-center ${
                rover.status === 'online' ? 'border-green-500 bg-green-50' :
                rover.status === 'busy' ? 'border-orange-500 bg-orange-50' :
                'border-gray-300 bg-gray-50'
              }`}>
                <Radio className={`w-6 h-6 ${
                  rover.status === 'online' ? 'text-green-600' :
                  rover.status === 'busy' ? 'text-orange-600' :
                  'text-gray-400'
                }`} />
              </div>
              <div className="rover-mono text-sm font-medium">{rover.id}</div>
              <div className="text-xs text-gray-500">{rover.type} • {rover.status}</div>
            </div>
          ))}
        </div>

        {/* Simple Actions */}
        <div className="text-center space-y-4">
          <button className="inline-flex items-center space-x-2 px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors">
            <QrCode className="w-4 h-4" />
            <span className="rover-mono">SCAN_CHASSIS_QR</span>
          </button>
          <div className="text-sm text-gray-500">
            Scan QR code on rover chassis for access
          </div>
        </div>

      </div>
    </div>
  )
}