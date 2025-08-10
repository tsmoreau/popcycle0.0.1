import { 
  Package, 
  ArrowRight, 
  ChevronDown,
  Droplets,
  Scissors,
  Wind,
  Zap,
  Archive,
  Scale,
  Settings
} from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const ProcessingWorkflow = () => {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-pop-blue" />
          Processing Workflow Overview
        </CardTitle>
        <CardDescription>
          Complete batch processing pipeline from collection to inventory
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center gap-3 overflow-x-auto pb-4">
          {/* Step 1: Collected */}
          <div className="flex flex-col items-center">
            <Badge className="bg-gray-500 text-white px-4 py-2 text-sm whitespace-nowrap">
              <Package className="h-4 w-4 mr-2" />
              Collected
            </Badge>
          </div>
          
          {/* Arrow 1 */}
          <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
          <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
          
          {/* Step 2: Rough Wash */}
          <div className="flex flex-col items-center">
            <Badge className="bg-pop-blue text-white px-4 py-2 text-sm whitespace-nowrap">
              <Droplets className="h-4 w-4 mr-2" />
              Rough Wash
            </Badge>
          </div>
          
          {/* Arrow 2 */}
          <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
          <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
          
          {/* Step 3: Sort */}
          <div className="flex flex-col items-center">
            <Badge className="bg-pop-green text-white px-4 py-2 text-sm whitespace-nowrap">
              <Scissors className="h-4 w-4 mr-2" />
              Sort
            </Badge>
          </div>
          
          {/* Arrow 3 */}
          <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
          <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
          
          {/* Step 4: First Dry */}
          <div className="flex flex-col items-center">
            <Badge className="bg-yellow-500 text-white px-4 py-2 text-sm whitespace-nowrap">
              <Wind className="h-4 w-4 mr-2" />
              First Dry
            </Badge>
          </div>
          
          {/* Arrow 4 */}
          <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
          <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
          
          {/* Step 5: Shred */}
          <div className="flex flex-col items-center">
            <Badge className="bg-orange-500 text-white px-4 py-2 text-sm whitespace-nowrap">
              <Zap className="h-4 w-4 mr-2" />
              Shred
            </Badge>
          </div>
          
          {/* Arrow 5 */}
          <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
          <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
          
          {/* Step 6: Fine Wash */}
          <div className="flex flex-col items-center">
            <Badge className="bg-blue-600 text-white px-4 py-2 text-sm whitespace-nowrap">
              <Droplets className="h-4 w-4 mr-2" />
              Fine Wash
            </Badge>
          </div>
          
          {/* Arrow 6 */}
          <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
          <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
          
          {/* Step 7: Second Dry */}
          <div className="flex flex-col items-center">
            <Badge className="bg-yellow-600 text-white px-4 py-2 text-sm whitespace-nowrap">
              <Wind className="h-4 w-4 mr-2" />
              Second Dry
            </Badge>
          </div>
          
          {/* Arrow 7 */}
          <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
          <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
          
          {/* Step 8: Press */}
          <div className="flex flex-col items-center">
            <Badge className="bg-purple-500 text-white px-4 py-2 text-sm whitespace-nowrap">
              <Archive className="h-4 w-4 mr-2" />
              Press
            </Badge>
          </div>
          
          {/* Arrow 8 */}
          <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
          <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
          
          {/* Step 9: Weigh & Photo */}
          <div className="flex flex-col items-center">
            <Badge className="bg-indigo-500 text-white px-4 py-2 text-sm whitespace-nowrap">
              <Scale className="h-4 w-4 mr-2" />
              Weigh & Photo
            </Badge>
          </div>
          
          {/* Arrow 8 */}
          <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
          <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
          
          {/* Step 9: Laser Marking */}
          <div className="flex flex-col items-center">
            <Badge className="bg-pop-red text-white px-4 py-2 text-sm whitespace-nowrap">
              <Zap className="h-4 w-4 mr-2" />
              Laser Marking
            </Badge>
          </div>
          <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
           <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
          {/* Step 10: inventory Creation */}
          <div className="flex flex-col items-center">
            <Badge className="bg-black text-white px-4 py-2 text-sm whitespace-nowrap">
              <Package className="h-4 w-4 mr-2" />
              Inventory Creation
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};