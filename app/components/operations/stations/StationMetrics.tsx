import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { 
  Activity, 
  Clock, 
  TrendingUp, 
  AlertCircle,
  Gauge,
  BarChart3 
} from "lucide-react";
import { StationMetrics as MetricsType } from "./stationTypes";

interface StationMetricsProps {
  metrics: MetricsType;
  className?: string;
}

export function StationMetrics({ metrics, className = "" }: StationMetricsProps) {
  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return "text-green-600 bg-green-50";
    if (efficiency >= 75) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getUptimeColor = (uptime: number) => {
    if (uptime >= 95) return "text-green-600";
    if (uptime >= 85) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {/* Throughput */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-pop-blue" />
            Throughput
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-pop-blue">
            {metrics.throughput}
          </div>
          <p className="text-xs text-gray-600">units/hour</p>
        </CardContent>
      </Card>

      {/* Efficiency */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Gauge className="h-4 w-4 text-pop-green" />
            Efficiency
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${getEfficiencyColor(metrics.efficiency).split(' ')[0]}`}>
            {metrics.efficiency}%
          </div>
          <Badge className={getEfficiencyColor(metrics.efficiency)} variant="outline">
            {metrics.efficiency >= 90 ? 'Excellent' : 
             metrics.efficiency >= 75 ? 'Good' : 'Needs Attention'}
          </Badge>
        </CardContent>
      </Card>

      {/* Uptime */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4 text-purple-500" />
            Uptime
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${getUptimeColor(metrics.uptime)}`}>
            {metrics.uptime}%
          </div>
          <p className="text-xs text-gray-600">last 24h</p>
        </CardContent>
      </Card>

      {/* Error Rate */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-500" />
            Error Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${metrics.errorRate > 5 ? 'text-red-600' : 'text-green-600'}`}>
            {metrics.errorRate}%
          </div>
          <p className="text-xs text-gray-600">
            Updated: {new Date(metrics.lastUpdate).toLocaleTimeString()}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}