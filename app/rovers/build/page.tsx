import { Wrench, Download } from 'lucide-react'

export default function BuildPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light mb-4 rover-mono">BUILD_GUIDE</h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Build your own rover using PopCycle recycled plastic chassis.
          </p>
        </div>

        {/* Simple Build Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 border-2 border-blue-500 rounded flex items-center justify-center">
              <Wrench className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-medium mb-3 rover-mono">BASIC_ROVER</h2>
            <p className="text-gray-600 mb-6">ESP32 + Camera + Motors</p>
            <button className="inline-flex items-center space-x-2 px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors">
              <Download className="w-4 h-4" />
              <span className="rover-mono">DOWNLOAD_GUIDE</span>
            </button>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 border-2 border-orange-500 rounded flex items-center justify-center">
              <Wrench className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-xl font-medium mb-3 rover-mono">SENSOR_ROVER</h2>
            <p className="text-gray-600 mb-6">Advanced + Environmental Sensors</p>
            <button className="inline-flex items-center space-x-2 px-6 py-3 border border-orange-600 text-orange-600 hover:bg-orange-50 transition-colors">
              <Download className="w-4 h-4" />
              <span className="rover-mono">DOWNLOAD_GUIDE</span>
            </button>
          </div>
        </div>

        {/* Simple Materials List */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-medium mb-6 rover-mono text-center">CORE_MATERIALS</h2>
          <div className="bg-gray-50 p-8 rounded">
            <ul className="space-y-3 text-gray-700">
              <li>• PopCycle recycled plastic sheets</li>
              <li>• ESP32-S3 microcontroller</li>
              <li>• OV2640 camera module</li>
              <li>• N20 gear motors (2x)</li>
              <li>• Basic electronics package</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}