import { Camera, Scan, Package, Settings, Archive, Truck, AlertCircle, X } from "lucide-react";
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
  const [lastScanTime, setLastScanTime] = useState<number>(0);
  const router = useRouter();
  
  // Queue state
  const [queueActive, setQueueActive] = useState(false);
  const [queueType, setQueueType] = useState<string>('');
  const [queuedItems, setQueuedItems] = useState<any[]>([]);
  const [lastQueuedItemId, setLastQueuedItemId] = useState<string>('');
  const [scannedItemHistory, setScannedItemHistory] = useState<any[]>([]);


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
        
        // Add to history stack only if it's not already in the list
        setScannedItemHistory(prev => {
          // Check if this item is already in the history
          const itemExists = prev.some(item => item.id === data.id);
          if (itemExists) {
            console.log('Item already in history, not adding duplicate');
            return prev;
          }
          // Add new item to the beginning, limit to 10 items
          return [data, ...prev].slice(0, 10);
        });
        

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

  // Queue management functions
  const startQueue = (type: string) => {
    setQueueActive(true);
    setQueueType(type);
    
    // Start with current item if it matches type
    if (scannedItem && scannedItem.type === type) {
      setQueuedItems([scannedItem]);
    } else {
      setQueuedItems([]);
    }
  };

  const stopQueue = () => {
    console.log('Stopping queue...'); // Debug log
    
    // Use functional updates to ensure state is updated immediately
    setQueueActive(false);
    setQueueType('');
    setQueuedItems([]);
    setLastQueuedItemId('');
    
    console.log('Queue stopped - all state cleared');
  };

  // Use useEffect to handle queue additions when scannedItem changes
  useEffect(() => {
    // Early exit if queue is not active
    if (!queueActive || !queueType) {
      console.log('Queue not active, skipping item addition');
      return;
    }
    
    if (scannedItem && scannedItem.type === queueType && scannedItem.id !== lastQueuedItemId) {
      console.log('Adding item to queue:', scannedItem.id);
      setQueuedItems(prev => {
        const isAlreadyQueued = prev.some(item => item.id === scannedItem.id);
        if (!isAlreadyQueued) {
          setLastQueuedItemId(scannedItem.id);
          return [...prev, scannedItem];
        }
        return prev;
      });
    }
  }, [scannedItem, queueActive, queueType, lastQueuedItemId]);

  // Handle QR code scan result with proper debouncing
  const handleScanResult = (result: string) => {
    const now = Date.now();
    const itemId = extractItemId(result);
    
    // Only debounce identical scans within 2 seconds - allow different codes immediately
    if (result === lastScan && (now - lastScanTime) < 2000) {
      console.log("Duplicate scan ignored:", result);
      return;
    }
    
    // Allow new scans even if currently loading (user might want to scan different item)
    console.log("QR Code scanned:", result, "Extracted ID:", itemId);
    
    setLastScan(result);
    setLastScanTime(now);
    
    if (itemId) {
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
      // Create QR scanner instance with proper debouncing
      qrScannerRef.current = new QrScanner(
        videoRef.current,
        (result) => {
          // Use the raw text data for comparison
          const scanData = typeof result === 'string' ? result : result.data;
          handleScanResult(scanData);
        },
        {
          onDecodeError: (error) => {
            // Silently ignore decode errors (normal when no QR code in view)
            console.log("Decode error (normal):", typeof error === 'string' ? error : error?.message || 'Unknown decode error');
          },
          highlightScanRegion: true,
          highlightCodeOutline: true,
          preferredCamera: 'environment', // Try back camera first on mobile
          maxScansPerSecond: 1, // Allow up to 1 scan per second
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
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        {/* Close button in upper right */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 pr-8">
            <Scan className="h-5 w-5 text-pop-green" />
            QR Code Scanner
          </DialogTitle>
          <DialogDescription>
            Scan any QR code for bin status, batch processing, or item tracking
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {/* Camera feed with queue icons */}
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

            {/* Queue icons on right side */}
            {queueActive && queuedItems.length > 0 && (
              <div className="absolute right-2 top-2 flex flex-col gap-1 max-h-full overflow-y-auto">
                {queuedItems.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="w-8 h-8 rounded-full bg-pop-green text-white text-xs flex items-center justify-center font-bold shadow-lg"
                    title={`${item.id} (${item.type})`}
                  >
                    {item.id?.charAt(0) || '?'}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Scanned item information */}
          {(lastScan || isLoadingItem || scannedItem) && (
            <div className="pt-4 border-t space-y-3">
              <div className="flex items-center justify-between">
                
                {/* Queue Active indicator - moved here */}
                {queueActive && (
                  <div className="flex items-center gap-2 bg-pop-green/10 px-2 py-1 rounded">
                    <span className="text-xs font-medium text-pop-green">
                      {queueType.charAt(0).toUpperCase() + queueType.slice(1)} Queue Active
                    </span>
                    <span className="text-xs bg-pop-green text-white px-2 py-1 rounded">
                      {queuedItems.length}
                    </span>
                  </div>
                )}
              </div>

              {/* Loading state */}
              {isLoadingItem && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="animate-spin h-4 w-4 border-2 border-pop-green border-t-transparent rounded-full"></div>
                  Loading item data...
                </div>
              )}

              {/* Queue Controls Section - Full Width above scanned items */}
              {scannedItemHistory.length > 0 && (
                <div className="pb-3">
                  {!queueActive ? (
                    /* Start queue button - only show if we have a valid item */
                    scannedItemHistory[0]?.type && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full border-pop-green text-pop-green hover:bg-pop-green hover:text-white"
                        onClick={() => startQueue(scannedItemHistory[0].type)}
                      >
                        Start {scannedItemHistory[0].type.charAt(0).toUpperCase() + scannedItemHistory[0].type.slice(1)} Queue
                      </Button>
                    )
                  ) : (
                    /* Stop queue button when active */
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full border-red-400 text-red-600 hover:bg-red-50"
                      onClick={stopQueue}
                    >
                      Stop Queue
                    </Button>
                  )}
                </div>
              )}

              <h3 className="text-sm font-medium text-gray-900">Last Scanned Item</h3>

              {/* Item history stack - show all scanned items */}
              {scannedItemHistory.length > 0 && !isLoadingItem && (
                <div className="space-y-2">
                  {scannedItemHistory.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="space-y-3">
                      {item.error ? (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                          <p className="text-sm text-red-800">{item.error}</p>
                        </div>
                      ) : (
                        <div className={`${index === 0 ? 'bg-pop-green/5 border-pop-green/20' : 'bg-gray-50 border-gray-200'} border rounded-lg p-3 space-y-2`}>
                          {/* Item ID and Type with newest indicator */}
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-mono font-bold text-pop-green">
                              {item.id}
                            </span>
                            <span className="text-xs bg-pop-green text-white px-2 py-1 rounded uppercase">
                              {item.type}
                            </span>
                          </div>

                          {/* Full item details - show for ALL items */}
                          <>
                              {/* Item details - show different fields based on item type */}
                              <div className="text-sm space-y-1">
                                {/* Common fields */}
                                {item.status && (
                                  <div><span className="font-medium">Status:</span> {item.status.replace(/_/g, ' ')}</div>
                                )}
                                {item.organization && (
                                  <div><span className="font-medium">Organization:</span> {item.organization.name}</div>
                                )}

                                {/* Batch-specific fields */}
                                {item.type === 'batch' && (
                                  <>
                                    {item.materialType && (
                                      <div><span className="font-medium">Material:</span> {item.materialType}</div>
                                    )}
                                    {item.weight && (
                                      <div><span className="font-medium">Weight:</span> {item.weight}kg</div>
                                    )}
                                    {item.collectedBy && (
                                      <div><span className="font-medium">Collected By:</span> {item.collectedBy}</div>
                                    )}
                                    {item.collectionDate && (
                                      <div><span className="font-medium">Collection Date:</span> {new Date(item.collectionDate).toLocaleDateString()}</div>
                                    )}
                                    {item.binIds && item.binIds.length > 0 && (
                                      <div><span className="font-medium">Source Bins:</span> {item.binIds.join(', ')}</div>
                                    )}
                                  </>
                                )}

                                {/* Bin-specific fields */}
                                {item.type === 'bin' && (
                                  <>
                                    {item.name && (
                                      <div><span className="font-medium">Name:</span> {item.name}</div>
                                    )}
                                    {item.location && (
                                      <div><span className="font-medium">Location:</span> {item.location}</div>
                                    )}
                                    {item.capacity && (
                                      <div><span className="font-medium">Capacity:</span> {item.capacity}L</div>
                                    )}
                                    {item.lastCollectionDate && (
                                      <div><span className="font-medium">Last Collection:</span> {new Date(item.lastCollectionDate).toLocaleDateString()}</div>
                                    )}
                                    {item.nextCollectionDate && (
                                      <div><span className="font-medium">Next Collection:</span> {new Date(item.nextCollectionDate).toLocaleDateString()}</div>
                                    )}
                                    {item.canBeAdopted !== undefined && (
                                      <div><span className="font-medium">Can Be Adopted:</span> {item.canBeAdopted ? 'Yes' : 'No'}</div>
                                    )}
                                    {item.adoptedBy && (
                                      <div><span className="font-medium">Adopted By:</span> {item.adoptedBy}</div>
                                    )}
                                  </>
                                )}

                                {/* Blank-specific fields - DEBUG VERSION */}
                                {item.type === 'blank' && (
                                  <>
                                    <div className="text-xs text-red-500 mb-2">DEBUG: Type={item.type}, Has batchId={!!item.batchId}, Has productId={!!item.productId}</div>
                                    
                                    {console.log("BLANK RENDER DEBUG:", {
                                      type: item.type,
                                      batchId: item.batchId,
                                      productId: item.productId,
                                      binIds: item.binIds,
                                      allKeys: Object.keys(item)
                                    })}
                                    
                                    {/* Always show available fields with fallbacks */}
                                    <div><span className="font-medium">Batch ID:</span> {item.batchId || 'Not available'}</div>
                                    <div><span className="font-medium">Product ID:</span> {item.productId || 'Not available'}</div>
                                    <div><span className="font-medium">Weight:</span> {item.weight || 'Not available'}kg</div>
                                    <div><span className="font-medium">Source Bins:</span> {(item.binIds && item.binIds.length > 0) ? item.binIds.join(', ') : 'Not available'}</div>
                                    <div><span className="font-medium">Assembly Date:</span> {item.assemblyDate ? new Date(item.assemblyDate).toLocaleDateString() : 'Not available'}</div>
                                    <div><span className="font-medium">Delivery Date:</span> {item.deliveryDate ? new Date(item.deliveryDate).toLocaleDateString() : 'Not available'}</div>
                                    <div><span className="font-medium">User ID:</span> {item.userId || 'Not available'}</div>
                                    <div><span className="font-medium">Maker:</span> {item.makerDetails || 'Not available'}</div>
                                    
                                    {item.impactMetrics && (
                                      <div className="text-xs text-gray-600 mt-2">
                                        <div>Carbon Saved: {item.impactMetrics.carbonSaved}kg</div>
                                        <div>Waste Reduced: {item.impactMetrics.wasteReduced}kg</div>
                                      </div>
                                    )}
                                  </>
                                )}

                                {/* Generic notes field */}
                                {item.notes && (
                                  <div><span className="font-medium">Notes:</span> {item.notes}</div>
                                )}
                              </div>

                              {/* Impact metrics */}
                              {item.impactMetrics && (
                                <div className="bg-white/50 rounded p-2 text-xs space-y-1">
                                  <div className="font-medium text-pop-green">Environmental Impact:</div>
                                  {item.impactMetrics.carbonSaved && (
                                    <div>Carbon Saved: {item.impactMetrics.carbonSaved}kg CO₂</div>
                                  )}
                                  {item.impactMetrics.wasteReduced && (
                                    <div>Waste Reduced: {item.impactMetrics.wasteReduced}kg</div>
                                  )}
                                </div>
                              )}

                              {/* Action button to view full details - only show for newest item */}
                              {index === 0 && (
                                <Button
                                  size="sm"
                                  className="w-full bg-pop-green hover:bg-pop-green/90"
                                  onClick={() => {
                                    onOpenChange(false);
                                    router.push(`/track/${item.id}`);
                                  }}
                                >
                                  View Full Details
                                </Button>
                              )}
                            </>
                          
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}



              {/* Legacy fallback - only show if no history exists */}
              {scannedItem && !isLoadingItem && scannedItemHistory.length === 0 && (
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

                      {/* Item details - show different fields based on item type */}
                      <div className="text-sm space-y-1">
                        {/* Common fields */}
                        {scannedItem.status && (
                          <div><span className="font-medium">Status:</span> {scannedItem.status.replace(/_/g, ' ')}</div>
                        )}
                        {scannedItem.organization && (
                          <div><span className="font-medium">Organization:</span> {scannedItem.organization.name}</div>
                        )}

                        {/* Batch-specific fields */}
                        {scannedItem.type === 'batch' && (
                          <>
                            {scannedItem.materialType && (
                              <div><span className="font-medium">Material:</span> {scannedItem.materialType}</div>
                            )}
                            {scannedItem.weight && (
                              <div><span className="font-medium">Weight:</span> {scannedItem.weight}kg</div>
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
                          </>
                        )}

                        {/* Bin-specific fields */}
                        {scannedItem.type === 'bin' && (
                          <>
                            {scannedItem.name && (
                              <div><span className="font-medium">Name:</span> {scannedItem.name}</div>
                            )}
                            {scannedItem.location && (
                              <div><span className="font-medium">Location:</span> {scannedItem.location}</div>
                            )}
                            {scannedItem.capacity && (
                              <div><span className="font-medium">Capacity:</span> {scannedItem.capacity}L</div>
                            )}
                            {scannedItem.lastCollectionDate && (
                              <div><span className="font-medium">Last Collection:</span> {new Date(scannedItem.lastCollectionDate).toLocaleDateString()}</div>
                            )}
                            {scannedItem.nextCollectionDate && (
                              <div><span className="font-medium">Next Collection:</span> {new Date(scannedItem.nextCollectionDate).toLocaleDateString()}</div>
                            )}
                            {scannedItem.canBeAdopted !== undefined && (
                              <div><span className="font-medium">Can Be Adopted:</span> {scannedItem.canBeAdopted ? 'Yes' : 'No'}</div>
                            )}
                            {scannedItem.adoptedBy && (
                              <div><span className="font-medium">Adopted By:</span> {scannedItem.adoptedBy}</div>
                            )}
                          </>
                        )}

                        {/* Blank-specific fields - DEBUG VERSION */}
                        {scannedItem.type === 'blank' && (
                          <>
                            <div className="text-xs text-red-500 mb-2">DEBUG: Type={scannedItem.type}, Has batchId={!!scannedItem.batchId}, Has productId={!!scannedItem.productId}</div>
                            
                            {console.log("BLANK RENDER DEBUG:", {
                              type: scannedItem.type,
                              batchId: scannedItem.batchId,
                              productId: scannedItem.productId,
                              binIds: scannedItem.binIds,
                              allKeys: Object.keys(scannedItem)
                            })}
                            
                            {/* Always show available fields with fallbacks */}
                            <div><span className="font-medium">Batch ID:</span> {scannedItem.batchId || 'Not available'}</div>
                            <div><span className="font-medium">Product ID:</span> {scannedItem.productId || 'Not available'}</div>
                            <div><span className="font-medium">Weight:</span> {scannedItem.weight || 'Not available'}kg</div>
                            <div><span className="font-medium">Source Bins:</span> {(scannedItem.binIds && scannedItem.binIds.length > 0) ? scannedItem.binIds.join(', ') : 'Not available'}</div>
                            <div><span className="font-medium">Assembly Date:</span> {scannedItem.assemblyDate ? new Date(scannedItem.assemblyDate).toLocaleDateString() : 'Not available'}</div>
                            <div><span className="font-medium">Delivery Date:</span> {scannedItem.deliveryDate ? new Date(scannedItem.deliveryDate).toLocaleDateString() : 'Not available'}</div>
                            <div><span className="font-medium">User ID:</span> {scannedItem.userId || 'Not available'}</div>
                            <div><span className="font-medium">Maker:</span> {scannedItem.makerDetails || 'Not available'}</div>
                            
                            {scannedItem.impactMetrics && (
                              <div className="text-xs text-gray-600 mt-2">
                                <div>Carbon Saved: {scannedItem.impactMetrics.carbonSaved}kg</div>
                                <div>Waste Reduced: {scannedItem.impactMetrics.wasteReduced}kg</div>
                              </div>
                            )}
                          </>
                        )}

                        {/* Generic notes field */}
                        {scannedItem.notes && (
                          <div><span className="font-medium">Notes:</span> {scannedItem.notes}</div>
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

                      {/* Queue controls */}
                      <div className="space-y-2">
                        {!queueActive ? (
                          /* Start queue button - only show if we have a valid item */
                          scannedItem.type && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full border-pop-green text-pop-green hover:bg-pop-green hover:text-white"
                              onClick={() => startQueue(scannedItem.type)}
                            >
                              Start {scannedItem.type.charAt(0).toUpperCase() + scannedItem.type.slice(1)} Queue
                            </Button>
                          )
                        ) : (
                          /* Queue is active - show status and stop button */
                          <div className="space-y-2">
                            <div className="flex items-center justify-between bg-pop-green/10 p-2 rounded">
                              <span className="text-sm font-medium text-pop-green">
                                {queueType.charAt(0).toUpperCase() + queueType.slice(1)} Queue Active
                              </span>
                              <span className="text-xs bg-pop-green text-white px-2 py-1 rounded">
                                {queuedItems.length} items
                              </span>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full border-red-400 text-red-600 hover:bg-red-50"
                              onClick={stopQueue}
                            >
                              Stop Queue
                            </Button>
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
