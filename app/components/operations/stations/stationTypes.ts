export interface StationBase {
  id: string;
  name: string;
  type: StationType;
  status: StationStatus;
  description: string;
  location?: string;
  operator?: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
}

export enum StationType {
  ROUGH_WASH = "rough_wash",
  SORT = "sort",
  SHRED = "shred",
  DRY = "dry",
  PRESS = "press",
  QUALITY_CONTROL = "quality_control"
}

export enum StationStatus {
  ONLINE = "Online",
  OFFLINE = "Offline", 
  ACTIVE = "Active",
  MAINTENANCE = "Maintenance",
  ERROR = "Error"
}

export interface WashStationData extends StationBase {
  type: StationType.ROUGH_WASH;
  waterTemperature?: number;
  waterPressure?: number;
  detergentLevel?: number;
  cycleTime?: number;
  currentBatch?: string;
  washCycles: number;
  efficiency: number;
}

export interface StationMetrics {
  throughput: number;
  efficiency: number;
  uptime: number;
  errorRate: number;
  lastUpdate: string;
}

export interface StationActivity {
  id: string;
  timestamp: string;
  action: string;
  operator?: string;
  batchId?: string;
  status: 'success' | 'warning' | 'error';
  details?: string;
}