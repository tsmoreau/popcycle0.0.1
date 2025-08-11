import { Badge } from "../../ui/badge";
import { 
  Circle, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Wrench,
  Activity
} from "lucide-react";
import { StationStatus as StatusType } from "./stationTypes";

interface StationStatusProps {
  status: StatusType;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StationStatus({ 
  status, 
  showIcon = true, 
  size = "md",
  className = "" 
}: StationStatusProps) {
  const getStatusConfig = (status: StatusType) => {
    switch (status) {
      case StatusType.ONLINE:
        return {
          color: "bg-pop-green text-white",
          icon: CheckCircle,
          label: "Online"
        };
      case StatusType.ACTIVE:
        return {
          color: "bg-pop-blue text-white",
          icon: Activity,
          label: "Active"
        };
      case StatusType.MAINTENANCE:
        return {
          color: "bg-yellow-500 text-white",
          icon: Wrench,
          label: "Maintenance"
        };
      case StatusType.ERROR:
        return {
          color: "bg-pop-red text-white",
          icon: AlertTriangle,
          label: "Error"
        };
      case StatusType.OFFLINE:
      default:
        return {
          color: "bg-gray-100 text-gray-800",
          icon: XCircle,
          label: "Offline"
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;
  
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-2"
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4", 
    lg: "h-5 w-5"
  };

  return (
    <Badge 
      className={`${config.color} ${sizeClasses[size]} ${className} flex items-center gap-1`}
    >
      {showIcon && <Icon className={iconSizes[size]} />}
      {config.label}
    </Badge>
  );
}