"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Droplets, Maximize, Settings, Thermometer, Gauge, Clock, AlertTriangle } from "lucide-react";

interface RoughWashStationCardProps {
  station: {
    currentBatch: string;
    status: string;
    progress: number;
  };
  onFullscreen?: () => void;
  isFullscreen?: boolean;
}

export function RoughWashStationCard({ station, onFullscreen, isFullscreen = false }: RoughWashStationCardProps) {
  if (isFullscreen) {
    return (
      <div className="w-full h-full bg-white overflow-y-auto overflow-x-hidden">
        <div className="p-4 md:p-8 max-w-6xl mx-auto min-h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Main Station Control */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Droplets className="h-6 w-6 mr-3 text-pop-blue" />
                  Wash Station Control
                </CardTitle>
                <CardDescription>Primary wash cycle management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Current Batch</Label>
                  <Input value={station.currentBatch} readOnly className="text-lg" />
                </div>
                <div className="flex items-center justify-between p-4 bg-pop-blue/5 rounded-lg">
                  <span className="font-medium">Station Status</span>
                  <Badge className="bg-pop-blue text-white text-sm px-3 py-1">{station.status}</Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Wash Progress</span>
                    <span className="text-lg font-bold text-pop-blue">{station.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-pop-blue h-3 rounded-full transition-all duration-300" style={{width: `${station.progress}%`}}></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button className="bg-pop-blue hover:bg-pop-blue/90">
                    Complete Cycle
                  </Button>
                  <Button variant="outline" className="border-pop-blue text-pop-blue hover:bg-pop-blue/10">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Station Parameters */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gauge className="h-6 w-6 mr-3 text-pop-green" />
                  Operating Parameters
                </CardTitle>
                <CardDescription>Real-time system monitoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Thermometer className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium">Temperature</span>
                    </div>
                    <div className="text-xl font-bold">65°C</div>
                    <div className="text-xs text-gray-600">Optimal range</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Gauge className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">Pressure</span>
                    </div>
                    <div className="text-xl font-bold">2.5 PSI</div>
                    <div className="text-xs text-gray-600">Normal</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Droplets className="h-4 w-4 text-pop-blue" />
                      <span className="text-sm font-medium">Detergent</span>
                    </div>
                    <div className="text-xl font-bold">78%</div>
                    <div className="text-xs text-gray-600">Level OK</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="h-4 w-4 text-purple-500" />
                      <span className="text-sm font-medium">Cycle Time</span>
                    </div>
                    <div className="text-xl font-bold">8:45</div>
                    <div className="text-xs text-gray-600">Remaining</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Queue Management */}
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-6 w-6 mr-3 text-pop-green" />
                  Batch Queue
                </CardTitle>
                <CardDescription>Upcoming batches and scheduling</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-pop-blue/5 rounded-lg border-l-4 border-pop-blue">
                    <div>
                      <div className="font-medium">BA-8473 - Active</div>
                      <div className="text-sm text-gray-600">Mixed plastic bottles - Started 45 min ago</div>
                    </div>
                    <Badge className="bg-pop-blue text-white">Processing</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                    <div>
                      <div className="font-medium">BA-8474 - Queued</div>
                      <div className="text-sm text-gray-600">PET containers - Ready for processing</div>
                    </div>
                    <Badge variant="outline">Next</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                    <div>
                      <div className="font-medium">BA-8475 - Queued</div>
                      <div className="text-sm text-gray-600">HDPE jugs - Scheduled for 2:30 PM</div>
                    </div>
                    <Badge variant="outline">Scheduled</Badge>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <Button size="sm" variant="outline">Add to Queue</Button>
                  <Button size="sm" variant="outline">Reschedule</Button>
                  <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Emergency Stop
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Droplets className="h-5 w-5 mr-2 text-pop-blue" />
            Wash Station
          </CardTitle>
          {onFullscreen && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onFullscreen}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <Maximize className="h-4 w-4" />
            </Button>
          )}
        </div>
        <CardDescription>Initial cleaning and contaminant removal</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Current Batch</Label>
          <Input value={station.currentBatch} readOnly />
        </div>
        <div className="flex items-center justify-between p-3 bg-pop-blue/5 rounded-lg">
          <span className="text-sm">Station Status</span>
          <Badge className="bg-pop-blue text-white">{station.status}</Badge>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{station.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-pop-blue h-2 rounded-full" style={{width: `${station.progress}%`}}></div>
          </div>
        </div>
        <Button className="w-full bg-pop-blue hover:bg-pop-blue/90">
          Complete Wash Cycle
        </Button>
      </CardContent>
    </Card>
  );
}