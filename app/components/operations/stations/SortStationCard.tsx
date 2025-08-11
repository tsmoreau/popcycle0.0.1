"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Scissors, Maximize, Settings, Gauge, Clock, AlertTriangle, CheckCircle, Package } from "lucide-react";

interface SortStationCardProps {
  station: {
    queue: string[];
    status: string;
    currentMaterial: string;
  };
  onFullscreen?: () => void;
  isFullscreen?: boolean;
}

export function SortStationCard({ station, onFullscreen, isFullscreen = false }: SortStationCardProps) {
  if (isFullscreen) {
    return (
      <div className="w-full h-screen bg-white overflow-y-auto overflow-x-hidden">
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Main Station Control */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Scissors className="h-6 w-6 mr-3 text-pop-green" />
                  Sort Station Control
                </CardTitle>
                <CardDescription>Material separation and quality control</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Current Material</Label>
                  <Input value={station.currentMaterial} readOnly className="text-lg" />
                </div>
                <div className="flex items-center justify-between p-4 bg-pop-green/5 rounded-lg">
                  <span className="font-medium">Station Status</span>
                  <Badge className="bg-pop-green text-white text-sm px-3 py-1">{station.status}</Badge>
                </div>
                <div className="space-y-3">
                  <Label>Material Types</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">PET</Button>
                    <Button variant="outline" size="sm">HDPE</Button>
                    <Button variant="outline" size="sm">PP</Button>
                    <Button variant="outline" size="sm">Reject</Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button className="bg-pop-green hover:bg-pop-green/90">
                    Start Sort Process
                  </Button>
                  <Button variant="outline" className="border-pop-green text-pop-green hover:bg-pop-green/10">
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
                  <Gauge className="h-6 w-6 mr-3 text-pop-green" />
                  Sorting Metrics
                </CardTitle>
                <CardDescription>Real-time performance monitoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Accuracy</span>
                    </div>
                    <div className="text-xl font-bold">94%</div>
                    <div className="text-xs text-gray-600">Above target</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Gauge className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">Rate</span>
                    </div>
                    <div className="text-xl font-bold">125/hr</div>
                    <div className="text-xs text-gray-600">Items sorted</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">Rejection</span>
                    </div>
                    <div className="text-xl font-bold">8%</div>
                    <div className="text-xs text-gray-600">Within limits</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Package className="h-4 w-4 text-purple-500" />
                      <span className="text-sm font-medium">Total Sorted</span>
                    </div>
                    <div className="text-xl font-bold">2,547</div>
                    <div className="text-xs text-gray-600">Today</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Queue Management */}
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-6 w-6 mr-3 text-pop-green" />
                  Sort Queue
                </CardTitle>
                <CardDescription>Incoming material batches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {station.queue.map((batch, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{batch} - Ready</div>
                        <div className="text-sm text-gray-600">Mixed material batch</div>
                      </div>
                      <Badge variant="outline">Queued</Badge>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-4">
                  <Button size="sm" variant="outline">Add Batch</Button>
                  <Button size="sm" variant="outline">Priority Sort</Button>
                  <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Stop Sort
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
            <Scissors className="h-5 w-5 mr-2 text-pop-green" />
            Sort Station
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
        <CardDescription>Material separation and quality control</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Queue</Label>
          <div className="space-y-1">
            {station.queue.map((batch, index) => (
              <div key={index} className="text-sm p-2 bg-gray-50 rounded">{batch} - Ready</div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm">Station Status</span>
          <Badge variant="outline">{station.status}</Badge>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm">PET</Button>
          <Button variant="outline" size="sm">HDPE</Button>
          <Button variant="outline" size="sm">PP</Button>
          <Button variant="outline" size="sm">Reject</Button>
        </div>
        <Button className="w-full bg-pop-green hover:bg-pop-green/90">
          Start Sort Process
        </Button>
      </CardContent>
    </Card>
  );
}