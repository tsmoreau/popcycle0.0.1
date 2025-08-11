import { Button } from "../../ui/button";
import { 
  Play, 
  Pause, 
  Square, 
  Settings, 
  AlertTriangle, 
  RefreshCw,
  Power,
  Wrench
} from "lucide-react";
import { StationStatus } from "./stationTypes";

interface StationControlsProps {
  status: StationStatus;
  onStart?: () => void;
  onPause?: () => void;
  onStop?: () => void;
  onReset?: () => void;
  onMaintenance?: () => void;
  onSettings?: () => void;
  onEmergencyStop?: () => void;
  disabled?: boolean;
}

export function StationControls({
  status,
  onStart,
  onPause,
  onStop,
  onReset,
  onMaintenance,
  onSettings,
  onEmergencyStop,
  disabled = false
}: StationControlsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {/* Primary Controls */}
      <div className="flex gap-2">
        {status === StationStatus.OFFLINE && (
          <Button
            onClick={onStart}
            disabled={disabled}
            className="bg-pop-green hover:bg-pop-green/90"
          >
            <Play className="h-4 w-4 mr-2" />
            Start
          </Button>
        )}

        {status === StationStatus.ACTIVE && (
          <Button
            onClick={onPause}
            disabled={disabled}
            variant="outline"
          >
            <Pause className="h-4 w-4 mr-2" />
            Pause
          </Button>
        )}

        {(status === StationStatus.ACTIVE || status === StationStatus.ONLINE) && (
          <Button
            onClick={onStop}
            disabled={disabled}
            variant="outline"
          >
            <Square className="h-4 w-4 mr-2" />
            Stop
          </Button>
        )}

        <Button
          onClick={onReset}
          disabled={disabled}
          variant="outline"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Secondary Controls */}
      <div className="flex gap-2">
        <Button
          onClick={onMaintenance}
          disabled={disabled}
          variant="outline"
          className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
        >
          <Wrench className="h-4 w-4 mr-2" />
          Maintenance
        </Button>

        <Button
          onClick={onSettings}
          disabled={disabled}
          variant="outline"
        >
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>

      {/* Emergency Control */}
      <div className="flex gap-2">
        <Button
          onClick={onEmergencyStop}
          disabled={disabled}
          variant="destructive"
          className="bg-pop-red hover:bg-pop-red/90"
        >
          <AlertTriangle className="h-4 w-4 mr-2" />
          Emergency Stop
        </Button>
      </div>
    </div>
  );
}