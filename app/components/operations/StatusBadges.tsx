import { Badge } from "../ui/badge";
import {
  Package,
  Droplets,
  Scissors,
  Zap,
  Wind,
  Archive,
  Scale,
  Settings,
} from "lucide-react";

export const getStatusBadge = (status: string) => {
  switch (status) {
    case "Ready for Pickup":
      return <Badge className="bg-pop-red text-white">Ready for Pickup</Badge>;
    case "Collected":
      return <Badge className="bg-pop-blue text-white">Collected</Badge>;
    case "Awaiting Rough Wash":
      return <Badge className="bg-pop-green text-white">Awaiting Wash</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export const getProcessingStatusBadge = (status: string) => {
  switch (status) {
    case "collected":
      return <Badge className="bg-gray-500 text-white"><Package className="h-3 w-3 mr-1" />Collected</Badge>;
    case "rough_wash":
      return <Badge className="bg-pop-blue text-white"><Droplets className="h-3 w-3 mr-1" />Rough Wash</Badge>;
    case "sort":
      return <Badge className="bg-pop-green text-white"><Scissors className="h-3 w-3 mr-1" />Sort</Badge>;
    case "first_dry":
      return <Badge className="bg-yellow-500 text-white"><Wind className="h-3 w-3 mr-1" />First Dry</Badge>;
    case "shred":
      return <Badge className="bg-orange-500 text-white"><Zap className="h-3 w-3 mr-1" />Shred</Badge>;
    case "fine_wash":
      return <Badge className="bg-blue-600 text-white"><Droplets className="h-3 w-3 mr-1" />Fine Wash</Badge>;
    case "second_dry":
      return <Badge className="bg-yellow-600 text-white"><Wind className="h-3 w-3 mr-1" />Second Dry</Badge>;
    case "press":
      return <Badge className="bg-purple-500 text-white"><Archive className="h-3 w-3 mr-1" />Press</Badge>;
    case "weigh_photo":
      return <Badge className="bg-indigo-500 text-white"><Scale className="h-3 w-3 mr-1" />Weigh & Photo</Badge>;
    case "laser_marking":
      return <Badge className="bg-pop-red text-white"><Zap className="h-3 w-3 mr-1" />Laser Marking</Badge>;
    case "inventory_creation":
      return <Badge className="bg-pop-black text-white"><Settings className="h-3 w-3 mr-1" />Inventory Creation</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export const getMaterialTypeBadge = (type: string) => {
  switch (type) {
    case "HDPE":
      return <Badge variant="secondary" className="bg-blue-100 text-blue-800">HDPE</Badge>;
    case "PET":
      return <Badge variant="secondary" className="bg-green-100 text-green-800">PET</Badge>;
    case "PP":
      return <Badge variant="secondary" className="bg-purple-100 text-purple-800">PP</Badge>;
    case "mixed":
      return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Mixed</Badge>;
    default:
      return <Badge variant="outline">{type}</Badge>;
  }
};

export const getFulfillmentStatusBadge = (status: string) => {
  switch (status) {
    case "urgent":
      return <Badge className="bg-pop-red text-white">Urgent</Badge>;
    case "assembly":
      return <Badge className="bg-pop-blue text-white">Assembly</Badge>;
    case "ready":
      return <Badge className="bg-pop-green text-white">Ready</Badge>;
    case "shipping":
      return <Badge className="bg-orange-500 text-white">Shipping</Badge>;
    case "shipped":
      return <Badge className="bg-gray-500 text-white">Shipped</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};