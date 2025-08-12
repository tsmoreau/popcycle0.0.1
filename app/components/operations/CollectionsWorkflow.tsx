import {
  Package,
  Truck,
  MapPin,
  Clock,
  Settings,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const CollectionsWorkflow = () => {
  return (

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRight className="h-5 w-5 text-pop-green" />
            Collections Workflow
          </CardTitle>
          <CardDescription>
            Complete collections pipeline from bin checkout to processing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 py-4">
            {/* Step 1: Ready for Check-Out */}
            <div className="flex flex-col items-center">
              <Badge className="bg-pop-green text-white px-4 py-2 text-sm whitespace-nowrap">
                <Package className="h-4 w-4 mr-2" />
                Bin Ready for Check-Out
              </Badge>
            </div>
            
            {/* Arrow 1 */}
            <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
            <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
            
            {/* Step 2: On Vehicle */}
            <div className="flex flex-col items-center">
              <Badge className="bg-pop-blue text-white px-4 py-2 text-sm whitespace-nowrap">
                <Truck className="h-4 w-4 mr-2" />
                Bin On Vehicle
              </Badge>
            </div>
            
            {/* Arrow 2 */}
            <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
            <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
            
            {/* Step 3: On Site */}
            <div className="flex flex-col items-center">
              <Badge className="bg-orange-500 text-white px-4 py-2 text-sm whitespace-nowrap">
                <MapPin className="h-4 w-4 mr-2" />
                Bin On Site
              </Badge>
            </div>
            
            {/* Arrow 3 */}
            <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
            <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
            
            {/* Step 4: Ready for Pickup */}
            <div className="flex flex-col items-center">
              <Badge className="bg-red-600 text-white px-4 py-2 text-sm whitespace-nowrap">
                <Clock className="h-4 w-4 mr-2" />
                Upcoming Pickup
              </Badge>
            </div>
            
            {/* Arrow 4 */}
            <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
            <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
            
            {/* Step 5: On Vehicle (Return) */}
            <div className="flex flex-col items-center">
              <Badge className="bg-pop-blue text-white px-4 py-2 text-sm whitespace-nowrap">
                <Truck className="h-4 w-4 mr-2" />
                Pickup On Vehicle
              </Badge>
            </div>
            
            {/* Arrow 5 */}
            <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
            <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
            
            {/* Step 6: Ready for Processing */}
            <div className="flex flex-col items-center">
              <Badge className="bg-pop-black text-white px-4 py-2 text-sm whitespace-nowrap">
                <Settings className="h-4 w-4 mr-2" />
                Ready for Processing
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
  );
};