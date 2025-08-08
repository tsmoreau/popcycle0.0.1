import { Battery, Signal, Clock, Camera, Navigation, Wrench, Zap, Users } from 'lucide-react'

interface Rover {
  id: string
  name: string
  type: 'public' | 'gated'
  status: 'online' | 'offline' | 'busy'
  batteryLevel: number
  signalStrength: 'weak' | 'good' | 'strong' | 'excellent'
  currentUser: string | null
  queueLength: number
  location: string
  capabilities: string[]
  uptime: string
}

interface RoverCardProps {
  rover: Rover
  onSelect: (id: string) => void
  isSelected: boolean
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'online': return 'rover-status-online'
    case 'busy': return 'rover-status-busy'
    case 'offline': return 'rover-status-offline'
    default: return 'rover-status-offline'
  }
}

const getSignalBars = (strength: string) => {
  const levels = { weak: 1, good: 2, strong: 3, excellent: 4 }
  return levels[strength as keyof typeof levels] || 1
}

const getCapabilityIcon = (capability: string) => {
  switch (capability) {
    case 'camera': return <Camera className="w-3 h-3" />
    case 'movement': return <Navigation className="w-3 h-3" />
    case 'gripper': return <Wrench className="w-3 h-3" />
    case 'sensors': return <Zap className="w-3 h-3" />
    case 'environmental': return <Zap className="w-3 h-3" />
    case 'precision_tools': return <Wrench className="w-3 h-3" />
    default: return <Zap className="w-3 h-3" />
  }
}

export default function RoverCard({ rover, onSelect, isSelected }: RoverCardProps) {
  const canControl = rover.status === 'online' || (rover.type === 'public' && rover.status === 'busy')
  
  return (
    <div className={`rover-card cursor-pointer transition-all ${
      isSelected ? 'rover-border-accent' : ''
    } ${!canControl ? 'opacity-60' : ''}`}
    onClick={() => onSelect(rover.id)}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg rover-mono">{rover.id}</h3>
          <p className="text-gray-600">{rover.name}</p>
        </div>
        <div className="text-right">
          <span className={`text-sm font-medium rover-mono ${getStatusColor(rover.status)}`}>
            {rover.status.toUpperCase()}
          </span>
          <div className="text-xs text-gray-500 mt-1">
            {rover.type === 'gated' ? 'GATED' : 'PUBLIC'}
          </div>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Battery className="w-4 h-4 text-gray-400" />
          <div className="flex-1">
            <div className="text-xs text-gray-500 rover-mono">BATTERY</div>
            <div className="text-sm font-medium rover-mono">{rover.batteryLevel}%</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Signal className="w-4 h-4 text-gray-400" />
          <div className="flex-1">
            <div className="text-xs text-gray-500 rover-mono">SIGNAL</div>
            <div className="flex space-x-1">
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={`w-1 h-3 ${
                    bar <= getSignalBars(rover.signalStrength) 
                      ? 'bg-green-500' 
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Current Status */}
      <div className="mb-4">
        <div className="rover-specs">
          <dt>Location:</dt>
          <dd>{rover.location}</dd>
          <dt>Uptime:</dt>
          <dd>{rover.uptime}</dd>
          {rover.currentUser && (
            <>
              <dt>User:</dt>
              <dd>{rover.currentUser}</dd>
            </>
          )}
          {rover.queueLength > 0 && (
            <>
              <dt>Queue:</dt>
              <dd>{rover.queueLength} waiting</dd>
            </>
          )}
        </div>
      </div>

      {/* Capabilities */}
      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-2 rover-mono">CAPABILITIES</div>
        <div className="flex flex-wrap gap-2">
          {rover.capabilities.map((capability) => (
            <div
              key={capability}
              className="flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded text-xs"
            >
              {getCapabilityIcon(capability)}
              <span className="rover-mono">{capability.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-3 border-t border-gray-200">
        {rover.status === 'online' ? (
          <button className="w-full rover-btn-primary rover-mono">
            CONTROL_ROVER
          </button>
        ) : rover.status === 'busy' && rover.type === 'public' ? (
          <button className="w-full rover-btn rover-mono">
            JOIN_QUEUE
          </button>
        ) : rover.status === 'offline' ? (
          <button className="w-full rover-btn rover-mono" disabled>
            OFFLINE
          </button>
        ) : (
          <button className="w-full rover-btn rover-mono">
            SCAN_QR_TO_ACCESS
          </button>
        )}
      </div>
    </div>
  )
}