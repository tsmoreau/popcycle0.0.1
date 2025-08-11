import { Camera, Scan, Package, Settings, Archive, Truck, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { useRouter } from "next/navigation";

interface QRScannerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const QRScanner = ({ open, onOpenChange }: QRScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [cameraError, setCameraError] = useState<string>("");
  const [isScanning, setIsScanning] = useState(false);
  const [lastScan, setLastScan] = useState<string>("");
  const router = useRouter();

  // Initialize camera and QR scanner when modal opens
  useEffect(() => {
    console.log("useEffect triggered - open:", open, "videoRef.current:", !!videoRef.current);
    
    if (open) {
      // Add a small delay to ensure video element is rendered
      const timer = setTimeout(() => {
        console.log("Timer triggered - videoRef.current:", !!videoRef.current);
        if (videoRef.current) {
          initializeScanner();
        } else {
          console.error("Video ref is null after timeout");
          setCameraError("Failed to initialize video element");
        }
      }, 100);
      
      return () => clearTimeout(timer);
    } else if (!open && qrScannerRef.current) {
      // Clean up scanner when modal closes
      qrScannerRef.current.stop();
      qrScannerRef.current.destroy();
      qrScannerRef.current = null;
      setIsScanning(false);
    }
  }, [open]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.stop();
        qrScannerRef.current.destroy();
      }
    };
  }, []);

  const initializeScanner = async () => {
    if (!videoRef.current) return;

    try {
      setCameraError("");
      console.log("Starting camera initialization...");
      
      // Check if camera is available
      const hasCamera = await QrScanner.hasCamera();
      console.log("Camera availability:", hasCamera);
      setHasCamera(hasCamera);
      
      if (!hasCamera) {
        setCameraError("No camera found on this device");
        return;
      }

      console.log("Creating QR scanner instance...");
      // Create QR scanner instance
      qrScannerRef.current = new QrScanner(
        videoRef.current,
        (result) => handleScanResult(result.data),
        {
          onDecodeError: (error) => {
            // Silently ignore decode errors (normal when no QR code in view)
            console.log("Decode error (normal):", typeof error === 'string' ? error : error?.message || 'Unknown decode error');
          },
          highlightScanRegion: true,
          highlightCodeOutline: true,
          preferredCamera: 'environment', // Try back camera first on mobile
        }
      );

      console.log("Starting scanner...");
      // Start scanning
      await qrScannerRef.current.start();
      console.log("Scanner started successfully!");
      setIsScanning(true);
    } catch (error) {
      console.error("Failed to initialize scanner:", error);
      
      // More specific error messages
      const err = error as Error;
      if (err.name === 'NotAllowedError') {
        setCameraError("Camera access denied. Please allow camera permissions and try again.");
      } else if (err.name === 'NotFoundError') {
        setCameraError("No camera found. Please connect a camera and try again.");
      } else if (err.name === 'NotSupportedError') {
        setCameraError("Camera not supported in this browser. Try Chrome or Firefox.");
      } else if (err.name === 'NotReadableError') {
        setCameraError("Camera is being used by another application.");
      } else {
        setCameraError(`Camera error: ${err.message || 'Unknown error'}`);
      }
    }
  };

  const handleScanResult = (scannedCode: string) => {
    setLastScan(scannedCode);
    setIsScanning(false);
    
    // Stop scanning
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
    }

    // Close modal and navigate to tracking page
    onOpenChange(false);
    router.push(`/track/${scannedCode}`);
  };

  const handleManualScan = () => {
    if (qrScannerRef.current && !isScanning) {
      qrScannerRef.current.start();
      setIsScanning(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Scan className="h-5 w-5 text-pop-green" />
            QR Code Scanner
          </DialogTitle>
          <DialogDescription>
            Scan any QR code for bin status, batch processing, or item tracking
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {/* Camera feed */}
          <div className="relative aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
            {cameraError ? (
              <div className="flex items-center justify-center h-full text-center p-4">
                <div>
                  <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-2" />
                  <p className="text-sm text-red-600 font-medium">Camera Error</p>
                  <p className="text-xs text-red-500 mt-1">{cameraError}</p>
                </div>
              </div>
            ) : !hasCamera ? (
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Initializing camera...</p>
                  <p className="text-xs text-gray-400 mt-1">Check browser console for debug info</p>
                </div>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover rounded-lg"
                  autoPlay
                  playsInline
                  muted
                />
                
                {/* Scanning overlay */}
                <div className="absolute inset-4 border-2 border-pop-green rounded-lg pointer-events-none">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-pop-green"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-pop-green"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-pop-green"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-pop-green"></div>
                  
                  {/* Scanning indicator */}
                  {isScanning && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-pop-green/20 text-pop-green text-xs px-2 py-1 rounded">
                        Scanning...
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Scan controls */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-pop-green hover:bg-pop-green/90"
              onClick={handleManualScan}
              disabled={!hasCamera || cameraError !== "" || isScanning}
            >
              <Scan className="h-4 w-4 mr-2" />
              {isScanning ? "Scanning..." : "Start Scan"}
            </Button>
          </div>

          {/* Last scan info */}
          {lastScan && (
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600 mb-2">Last Scanned Code:</p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <code className="text-sm font-mono text-pop-green">{lastScan}</code>
              </div>
            </div>
          )}

          {/* Quick access buttons */}
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-600 mb-3">Quick Navigation</p>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => {
                  onOpenChange(false);
                  router.push('/track');
                }}
              >
                <Package className="h-3 w-3 mr-1" />
                Track Items
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => {
                  onOpenChange(false);
                  router.push('/portal/operations');
                }}
              >
                <Settings className="h-3 w-3 mr-1" />
                Operations
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => {
                  onOpenChange(false);
                  router.push('/portal/crm');
                }}
              >
                <Archive className="h-3 w-3 mr-1" />
                CRM
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => {
                  onOpenChange(false);
                  router.push('/portal');
                }}
              >
                <Truck className="h-3 w-3 mr-1" />
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
