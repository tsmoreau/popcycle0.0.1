import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Progress } from "../../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { 
  Scissors, 
  Thermometer, 
  Gauge, 
  Clock, 
  Package,
  AlertCircle,
  TrendingUp,
  Settings,
  Activity,
  FileText,
  BarChart3,
  Target,
  CheckCircle,
  XCircle
} from "lucide-react";
import { StationControls } from "./StationControls";
import { StationMetrics } from "./StationMetrics";
import { StationStatus } from "./StationStatus";
import { SortStationData, StationActivity, StationMetrics as MetricsType } from "./stationTypes";

interface SortStationProps {
  station: SortStationData;
}

export function SortStation({ station }: SortStationProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isProcessing, setIsProcessing] = useState(station.status === "Active");
  const [cycleProgress, setCycleProgress] = useState(0);
  const [sortTimer, setSortTimer] = useState(0);

  // Mock real-time data - in production this would come from APIs
  const [realTimeData, setRealTimeData] = useState({
    sortingRate: station.sortingRate || 125,
    qualityScore: station.qualityScore || 92,
    rejectionRate: station.rejectionRate || 8,
    currentMaterial: station.currentMaterial || "PET Bottles",
    currentBatch: station.currentBatch || "SORT-2024-001"
  });

  const metrics: MetricsType = {
    throughput: 125,
    efficiency: 92,
    uptime: 96,
    errorRate: 1.8,
    lastUpdate: new Date().toISOString()
  };

  const recentActivity: StationActivity[] = [
    {
      id: "1",
      timestamp: new Date(Date.now() - 300000).toISOString(),
      action: "Sort cycle completed",
      operator: "Sarah Johnson",
      batchId: "SORT-2024-001",
      status: "success",
      details: "1,250 items sorted - 92% quality score"
    },
    {
      id: "2", 
      timestamp: new Date(Date.now() - 600000).toISOString(),
      action: "Material type changed",
      operator: "System",
      status: "success",
      details: "Switched to PET Bottles sorting"
    },
    {
      id: "3",
      timestamp: new Date(Date.now() - 900000).toISOString(),
      action: "Quality alert",
      operator: "Sarah Johnson", 
      batchId: "SORT-2024-001",
      status: "warning",
      details: "High rejection rate detected - 12%"
    }
  ];

  // Simulate sort cycle progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isProcessing) {
      interval = setInterval(() => {
        setSortTimer(prev => prev + 1);
        setCycleProgress(prev => {
          if (prev >= 100) {
            setIsProcessing(false);
            return 0;
          }
          return prev + (100 / 300); // Default 5 min cycle
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isProcessing]);

  const handleStart = () => {
    setIsProcessing(true);
    setCycleProgress(0);
    setSortTimer(0);
  };

  const handleStop = () => {
    setIsProcessing(false);
    setCycleProgress(0);
    setSortTimer(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full p-6 space-y-6">
      {/* Station Status Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <StationStatus status={station.status} size="lg" />
          {station.operator && (
            <Badge variant="outline" className="text-sm">
              Operator: {station.operator}
            </Badge>
          )}
        </div>
        <div className="text-right text-sm text-gray-600">
          <div>Last Maintenance: {station.lastMaintenance || "2024-01-08"}</div>
          <div>Next Maintenance: {station.nextMaintenance || "2024-02-08"}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white p-4 rounded-lg border">
        <StationControls
          status={station.status}
          onStart={handleStart}
          onStop={handleStop}
          onPause={() => setIsProcessing(false)}
          disabled={false}
        />
      </div>

      {/* Main Content Tabs */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="monitoring">Real-time</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="flex-1 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current Process */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-pop-green" />
                    Current Process
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Batch ID:</span>
                      <span className="font-mono">{realTimeData.currentBatch}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Material Type:</span>
                      <span>{realTimeData.currentMaterial}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Sort Time:</span>
                      <span>{formatTime(sortTimer)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Progress:</span>
                      <span>{Math.round(cycleProgress)}%</span>
                    </div>
                  </div>
                  <Progress value={cycleProgress} className="w-full" />
                  {isProcessing && (
                    <div className="text-center">
                      <Badge className="bg-pop-green text-white">
                        <Activity className="h-3 w-3 mr-1" />
                        Sorting in Progress
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Today's Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-pop-blue" />
                    Today's Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-pop-green">{station.sortCycles}</div>
                      <div className="text-sm text-gray-600">Cycles</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-pop-blue">{station.efficiency}%</div>
                      <div className="text-sm text-gray-600">Efficiency</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">5,670 items</div>
                    <div className="text-sm text-gray-600">Total Sorted</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Real-time Monitoring Tab */}
          <TabsContent value="monitoring" className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Sorting Rate */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Target className="h-4 w-4 text-blue-500" />
                    Sorting Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-500">
                    {realTimeData.sortingRate}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    items/min (Target: 150)
                  </div>
                  <Progress 
                    value={(realTimeData.sortingRate / 200) * 100} 
                    className="mt-2"
                  />
                </CardContent>
              </Card>

              {/* Quality Score */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Quality Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-500">
                    {realTimeData.qualityScore}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Target: ≥90%
                  </div>
                  <Progress 
                    value={realTimeData.qualityScore} 
                    className="mt-2"
                  />
                  {realTimeData.qualityScore >= 90 && (
                    <div className="mt-2">
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        On Target
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Rejection Rate */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    Rejection Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-500">
                    {realTimeData.rejectionRate}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Target: ≤5%
                  </div>
                  <Progress 
                    value={(realTimeData.rejectionRate / 20) * 100} 
                    className="mt-2"
                  />
                  {realTimeData.rejectionRate > 10 && (
                    <div className="mt-2">
                      <Badge variant="outline" className="text-red-600 border-red-600">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        High Rejection
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Metrics Tab */}
          <TabsContent value="metrics" className="flex-1">
            <StationMetrics metrics={metrics} />
          </TabsContent>

          {/* Activity Log Tab */}
          <TabsContent value="activity" className="flex-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-pop-green" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.status === 'success' ? 'bg-green-500' :
                        activity.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{activity.action}</div>
                        {activity.details && (
                          <div className="text-xs text-gray-600 mt-1">{activity.details}</div>
                        )}
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(activity.timestamp).toLocaleString()}
                          {activity.operator && ` • ${activity.operator}`}
                          {activity.batchId && ` • ${activity.batchId}`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}