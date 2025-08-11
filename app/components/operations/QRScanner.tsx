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
  const [scannedItem, setScannedItem] = useState<any>(null);
  const [isLoadingItem, setIsLoadingItem] = useState(false);
  const router = useRouter();

  // Extract item ID from any URL or direct code
  const extractItemId = (scannedText: string): string | null => {
    // If it's a URL, get the last segment after /
    if (scannedText.includes('/')) {
      const segments = scannedText.split('/');
      const lastSegment = segments[segments.length - 1];
      
      // Check if last segment looks like a PopCycle code (letter + 7 chars)
      if (/^[BTKPOR][A-Z0-9]{7}$/i.test(lastSegment)) {
        return lastSegment.toUpperCase();
      }
    } else {
      // Direct code scan - check if it looks like a PopCycle code
      if (/^[BTKPOR][A-Z0-9]{7}$/i.test(scannedText)) {
        return scannedText.toUpperCase();
      }
    }
    
    return null;
  };

  // Fetch item data by ID
  const fetchItemData = async (itemId: string) => {
    setIsLoadingItem(true);
    try {
      const response = await fetch(`/api/track/${itemId}`);
      if (response.ok) {
        const data = await response.json();
        setScannedItem(data);
        console.log("Fetched item data:", data);
      } else {
        console.error("Item not found:", itemId);
        setScannedItem({ error: `Item ${itemId} not found` });
      }
    } catch (error) {
      console.error("Error fetching item:", error);
      setScannedItem({ error: "Failed to fetch item data" });
    } finally {
      setIsLoadingItem(false);
    }
  };

  // Handle QR code scan result
  const handleScanResult = (result: string) => {
    console.log("QR Code scanned:", result);
    
    // Prevent duplicate scans of the same code
    if (result === lastScan) {
      console.log("Duplicate scan ignored");
      return;
    }
    
    setLastScan(result);
    
    const itemId = extractItemId(result);
    if (itemId) {
      console.log("Extracted item ID:", itemId);
      fetchItemData(itemId);
    } else {
      console.log("No valid PopCycle item ID found in:", result);
      setScannedItem({ error: `No valid item code found in: ${result}` });
    }
  };

  // Initialize camera and QR scanner when modal opens
  useEffect(() => {
    console.log("useEffect triggered - open:", open, "videoRef.current:", !!videoRef.current);
    
    if (open) {
      // Reset states
      setCameraError("");
      setHasCamera(false);
      setIsScanning(false);
      setLastScan("");
      setScannedItem(null);
      setIsLoadingItem(false);
      
      // Add multiple delays to ensure video element is properly rendered
      const timer = setTimeout(() => {
        console.log("Timer triggered - videoRef.current:", !!videoRef.current);
        if (videoRef.current) {
          initializeScanner();
        } else {
          console.error("Video ref is null after timeout, retrying...");
          // Try one more time with longer delay
          setTimeout(() => {
            console.log("Retry - videoRef.current:", !!videoRef.current);
            if (videoRef.current) {
              initializeScanner();
            } else {
              setCameraError("Failed to initialize video element");
            }
          }, 500);
        }
      }, 200);
      
      return () => clearTimeout(timer);
    } else if (!open && qrScannerRef.current) {
      // Clean up scanner when modal closes
      qrScannerRef.current.stop();
      qrScannerRef.current.destroy();
      qrScannerRef.current = null;
      setIsScanning(false);
      setHasCamera(false);
      setCameraError("");
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
      
      // Debug video element
      if (videoRef.current) {
        console.log("Video element after start:", {
          videoWidth: videoRef.current.videoWidth,
          videoHeight: videoRef.current.videoHeight,
          srcObject: !!videoRef.current.srcObject,
          currentSrc: videoRef.current.currentSrc,
          readyState: videoRef.current.readyState,
          style: videoRef.current.style.cssText
        });
        
        // Force video to be visible - override QrScanner library styles
        videoRef.current.style.setProperty('display', 'block', 'important');
        videoRef.current.style.setProperty('visibility', 'visible', 'important');
        videoRef.current.style.setProperty('opacity', '1', 'important');
        videoRef.current.style.setProperty('position', 'static', 'important');
        videoRef.current.style.setProperty('width', '100%', 'important');
        videoRef.current.style.setProperty('height', '100%', 'important');
        videoRef.current.style.setProperty('object-fit', 'cover', 'important');
        
        // Try to play if not playing
        if (videoRef.current.paused) {
          try {
            await videoRef.current.play();
            console.log("Video play() called successfully");
          } catch (playError) {
            console.error("Video play error:", playError);
          }
        }
      }
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



  const handleManualScan = () => {
    if (qrScannerRef.current && !isScanning) {
      qrScannerRef.current.start();
      setIsScanning(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <Scan className="h-5 w-5 text-pop-green" />
            QR Code Scanner
          </DialogTitle>
          <DialogDescription>
            Scan any QR code for bin status, batch processing, or item tracking
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 overflow-y-auto flex-1">
          {/* Camera feed */}
          <div className="relative aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
            {/* Always render video element so ref is available */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover rounded-lg"
              style={{ display: isScanning ? 'block' : 'none' }}
              autoPlay
              playsInline
              muted
            />
            
            {/* Show overlays based on state */}
            {cameraError ? (
              <div className="absolute inset-0 flex items-center justify-center text-center p-4 bg-white">
                <div>
                  <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-2" />
                  <p className="text-sm text-red-600 font-medium">Camera Error</p>
                  <p className="text-xs text-red-500 mt-1">{cameraError}</p>
                </div>
              </div>
            ) : !isScanning && (
              <div className="absolute inset-0 flex items-center justify-center text-center bg-white">
                <div>
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Initializing camera...</p>
                  <p className="text-xs text-gray-400 mt-1">Check browser console for debug info</p>
                </div>
              </div>
            )}
            
            {/* Scanning overlay - only show corners, not blocking overlay */}
            {isScanning && (
              <div className="absolute inset-4 border-2 border-pop-green rounded-lg pointer-events-none">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-pop-green"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-pop-green"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-pop-green"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-pop-green"></div>
                
                {/* Scanning indicator in bottom corner */}
                <div className="absolute bottom-2 right-2">
                  <div className="bg-pop-green/90 text-white text-xs px-2 py-1 rounded">
                    Scanning...
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Close button */}
          <div className="flex justify-end flex-shrink-0 sticky bottom-0 bg-white pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Close Scanner
            </Button>
          </div>

          {/* Scanned item information */}
          {(lastScan || isLoadingItem || scannedItem) && (
            <div className="pt-4 border-t space-y-3">
              <h3 className="text-sm font-medium text-gray-900">Last Scanned Item</h3>
              
              {/* Last scan raw data */}
              {lastScan && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Scanned QR Code:</p>
                  <div className="bg-gray-50 p-2 rounded text-xs font-mono break-all">
                    {lastScan}
                  </div>
                </div>
              )}

              {/* Loading state */}
              {isLoadingItem && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="animate-spin h-4 w-4 border-2 border-pop-green border-t-transparent rounded-full"></div>
                  Loading item data...
                </div>
              )}

              {/* Item data or error */}
              {scannedItem && !isLoadingItem && (
                <div className="space-y-3">
                  {scannedItem.error ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-800">{scannedItem.error}</p>
                    </div>
                  ) : (
                    <div className="bg-pop-green/5 border border-pop-green/20 rounded-lg p-3 space-y-2">
                      {/* Item ID and Type */}
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-mono font-bold text-pop-green">
                          {scannedItem.id}
                        </span>
                        <span className="text-xs bg-pop-green text-white px-2 py-1 rounded uppercase">
                          {scannedItem.type}
                        </span>
                      </div>

                      {/* Item details */}
                      <div className="text-sm space-y-1">
                        {scannedItem.materialType && (
                          <div><span className="font-medium">Material:</span> {scannedItem.materialType}</div>
                        )}
                        {scannedItem.weight && (
                          <div><span className="font-medium">Weight:</span> {scannedItem.weight}kg</div>
                        )}
                        {scannedItem.status && (
                          <div><span className="font-medium">Status:</span> {scannedItem.status.replace(/_/g, ' ')}</div>
                        )}
                        {scannedItem.collectedBy && (
                          <div><span className="font-medium">Collected By:</span> {scannedItem.collectedBy}</div>
                        )}
                        {scannedItem.collectionDate && (
                          <div><span className="font-medium">Collection Date:</span> {new Date(scannedItem.collectionDate).toLocaleDateString()}</div>
                        )}
                        {scannedItem.binIds && scannedItem.binIds.length > 0 && (
                          <div><span className="font-medium">Source Bins:</span> {scannedItem.binIds.join(', ')}</div>
                        )}
                        {scannedItem.notes && (
                          <div><span className="font-medium">Notes:</span> {scannedItem.notes}</div>
                        )}
                        {scannedItem.organization && (
                          <div><span className="font-medium">Organization:</span> {scannedItem.organization.name}</div>
                        )}
                      </div>

                      {/* Impact metrics */}
                      {scannedItem.impactMetrics && (
                        <div className="bg-white/50 rounded p-2 text-xs space-y-1">
                          <div className="font-medium text-pop-green">Environmental Impact:</div>
                          {scannedItem.impactMetrics.carbonSaved && (
                            <div>Carbon Saved: {scannedItem.impactMetrics.carbonSaved}kg CO₂</div>
                          )}
                          {scannedItem.impactMetrics.wasteReduced && (
                            <div>Waste Reduced: {scannedItem.impactMetrics.wasteReduced}kg</div>
                          )}
                        </div>
                      )}

                      {/* Action button to view full details */}
                      <Button
                        size="sm"
                        className="w-full bg-pop-green hover:bg-pop-green/90"
                        onClick={() => {
                          onOpenChange(false);
                          router.push(`/track/${scannedItem.id}`);
                        }}
                      >
                        View Full Details
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
