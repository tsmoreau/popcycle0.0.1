"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Droplets } from "lucide-react";

interface RoughWashStationCardProps {
  station: {
    currentBatch: string;
    status: string;
    progress: number;
  };
}

export function RoughWashStationCard({ station }: RoughWashStationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Droplets className="h-5 w-5 mr-2 text-pop-blue" />
          Wash Station
        </CardTitle>
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