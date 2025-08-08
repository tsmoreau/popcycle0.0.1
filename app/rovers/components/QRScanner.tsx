import { X, QrCode } from 'lucide-react'

interface QRScannerProps {
  onClose: () => void
  onScan: (code: string) => void
}

export default function QRScanner({ onClose, onScan }: QRScannerProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rover-border max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold rover-mono">QR_SCANNER</h2>
          <button
            onClick={onClose}
            className="rover-btn p-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scanner Area */}
        <div className="p-6">
          <div className="aspect-square bg-gray-100 rover-border flex items-center justify-center mb-4">
            <div className="text-center text-gray-500">
              <QrCode className="w-16 h-16 mx-auto mb-4" />
              <p className="rover-mono text-sm">CAMERA_PREVIEW</p>
              <p className="text-xs mt-2">Position QR code within frame</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-sm text-gray-600">
              <p className="font-medium mb-2 rover-mono">INSTRUCTIONS:</p>
              <ul className="space-y-1 text-xs">
                <li>• Point camera at QR code on rover chassis</li>
                <li>• Ensure good lighting and steady hand</li>
                <li>• Code will scan automatically when detected</li>
              </ul>
            </div>

            {/* Mock scan results for demo */}
            <div className="text-center pt-4">
              <button
                onClick={() => onScan('RV-DEMO-001')}
                className="rover-btn-primary rover-mono text-sm"
              >
                SIMULATE_SCAN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}