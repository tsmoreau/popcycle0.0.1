import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Maximize } from "lucide-react";
import { StationBase, StationStatus } from "./stationTypes";

interface StationCardProps {
  station: StationBase;
  onFullscreen: (station: StationBase) => void;
}

export function StationCard({ station, onFullscreen }: StationCardProps) {
  const getStatusBadgeStyle = (status: StationStatus) => {
    switch (status) {
      case StationStatus.ONLINE:
        return "bg-pop-green text-white";
      case StationStatus.ACTIVE:
        return "bg-pop-blue text-white";
      case StationStatus.MAINTENANCE:
        return "bg-yellow-500 text-white";
      case StationStatus.ERROR:
        return "bg-pop-red text-white";
      case StationStatus.OFFLINE:
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="font-medium text-sm">{station.name}: {station.type}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFullscreen(station)}
            className="h-8 w-8 p-0 hover:bg-gray-100"
          >
            <Maximize className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-600 mt-1">{station.description}</p>
        {station.operator && (
          <p className="text-xs text-gray-500 mt-1">Operator: {station.operator}</p>
        )}
      </div>
      <div className="ml-3">
        <Badge className={getStatusBadgeStyle(station.status)}>
          {station.status}
        </Badge>
      </div>
    </div>
  );
}