"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Zap, Maximize, Settings, Gauge, Clock, AlertTriangle, Activity, Scale } from "lucide-react";

interface ShredStationCardProps {
  station: {
    materialInput: string;
    status: string;
    targetSize: string;
  };
  onFullscreen?: () => void;
  isFullscreen?: boolean;
}

export function ShredStationCard({ station, onFullscreen, isFullscreen = false }: ShredStationCardProps) {
  if (isFullscreen) {
    return (
      <div className="w-full h-screen bg-white overflow-y-auto overflow-x-hidden">
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Main Station Control */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-6 w-6 mr-3 text-pop-red" />
                  Shred Station Control
                </CardTitle>
                <CardDescription>Size reduction processing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Material Input</Label>
                  <div className="flex space-x-2">
                    <Input value={station.materialInput} readOnly className="flex-1 text-lg" />
                    <Button size="sm" variant="outline">
                      <Scale className="h-4 w-4 mr-2" />
                      Scale
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-pop-red/5 rounded-lg">
                  <span className="font-medium">Shredder Status</span>
                  <Badge className="bg-pop-red text-white text-sm px-3 py-1">{station.status}</Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Target Size</span>
                    <span className="text-lg font-bold text-pop-red">{station.targetSize}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button className="bg-pop-red hover:bg-pop-red/90">
                    Start Shredding
                  </Button>
                  <Button variant="outline" className="border-pop-red text-pop-red hover:bg-pop-red/10">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Station Metrics */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gauge className="h-6 w-6 mr-3 text-pop-red" />
                  Shredding Metrics
                </CardTitle>
                <CardDescription>Real-time performance monitoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Activity className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium">Throughput</span>
                    </div>
                    <div className="text-xl font-bold">850 kg/hr</div>
                    <div className="text-xs text-gray-600">Processing rate</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">Power</span>
                    </div>
                    <div className="text-xl font-bold">45 kW</div>
                    <div className="text-xs text-gray-600">Current draw</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Gauge className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">Efficiency</span>
                    </div>
                    <div className="text-xl font-bold">92%</div>
                    <div className="text-xs text-gray-600">Material yield</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="h-4 w-4 text-purple-500" />
                      <span className="text-sm font-medium">Runtime</span>
                    </div>
                    <div className="text-xl font-bold">6.2 hrs</div>
                    <div className="text-xs text-gray-600">Today</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Process Management */}
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-6 w-6 mr-3 text-pop-red" />
                  Shredding Process
                </CardTitle>
                <CardDescription>Material processing and quality control</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-pop-red/5 rounded-lg border-l-4 border-pop-red">
                    <div>
                      <div className="font-medium">Current Load - Active</div>
                      <div className="text-sm text-gray-600">Processing 250kg PET bottles</div>
                    </div>
                    <Badge className="bg-pop-red text-white">Shredding</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-gray-50 rounded-lg text-center">
                      <div className="text-sm text-gray-600">Blade Condition</div>
                      <div className="font-medium text-green-600">Excellent</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg text-center">
                      <div className="text-sm text-gray-600">Screen Size</div>
                      <div className="font-medium">5mm mesh</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg text-center">
                      <div className="text-sm text-gray-600">Vibration</div>
                      <div className="font-medium text-green-600">Normal</div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <Button size="sm" variant="outline">Load Material</Button>
                  <Button size="sm" variant="outline">Change Screen</Button>
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
            <Zap className="h-5 w-5 mr-2 text-pop-red" />
            Shred Station
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
        <CardDescription>Size reduction processing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Material Input</Label>
          <div className="flex space-x-2">
            <Input value={station.materialInput} readOnly className="flex-1" />
            <Button size="sm" variant="outline">Scale</Button>
          </div>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm">Shredder Status</span>
          <Badge variant="outline">{station.status}</Badge>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Target Size</span>
            <span>{station.targetSize}</span>
          </div>
        </div>
        <Button className="w-full bg-pop-red hover:bg-pop-red/90">
          Start Shredding
        </Button>
      </CardContent>
    </Card>
  );
}