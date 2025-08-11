import { Camera, Scan, Package, Settings, Archive, Truck } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface QRScannerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const QRScanner = ({ open, onOpenChange }: QRScannerProps) => {
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
          {/* Camera placeholder */}
          <div className="relative aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
            <div className="text-center">
              <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">
                Camera feed will appear here
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Position QR code within frame
              </p>
            </div>

            {/* Scanning overlay */}
            <div className="absolute inset-4 border-2 border-pop-green rounded-lg">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-pop-green"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-pop-green"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-pop-green"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-pop-green"></div>
            </div>
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
              onClick={() => {
                // Simulate successful scan - in real implementation this would process the QR code
                onOpenChange(false);
                // Here you would handle the scanned code and open the appropriate modal/action
              }}
            >
              <Scan className="h-4 w-4 mr-2" />
              Scan
            </Button>
          </div>

          {/* Quick access buttons */}
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-600 mb-3">Last Scan Info</p>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                <Package className="h-3 w-3 mr-1" />
                Bin Status
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <Settings className="h-3 w-3 mr-1" />
                Batch Process
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <Archive className="h-3 w-3 mr-1" />
                Item Track
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <Truck className="h-3 w-3 mr-1" />
                Collection
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
