import { ReactNode } from "react";
import { Dialog, DialogContent } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { X } from "lucide-react";
import { StationBase } from "./stationTypes";

interface StationFullscreenProps {
  isOpen: boolean;
  onClose: () => void;
  station: StationBase | null;
  children: ReactNode;
}

export function StationFullscreen({ isOpen, onClose, station, children }: StationFullscreenProps) {
  if (!station) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-none w-screen h-screen m-0 p-0 bg-gray-50">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
            <div>
              <h1 className="text-2xl font-bold text-pop-black">
                {station.name} - {station.type.replace('_', ' ').toUpperCase()}
              </h1>
              <p className="text-sm text-gray-600">{station.description}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="border-pop-red hover:bg-pop-red hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {children}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}