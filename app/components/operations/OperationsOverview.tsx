import { BarChart3, Package, Truck, Users, Calendar, CheckCircle, Clock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export const OperationsOverview = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="operations-overview" className="border rounded-lg px-4">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-pop-green" />
            <div className="text-left">
              <h3 className="text-lg font-semibold text-pop-black">Operations Overview</h3>
               <p className="text-sm text-gray-600">Bins, batches, orders and inventory</p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {/* Mobile-First Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 pb-4">
            {/* Active Bins */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Package className="h-5 w-5 text-gray-600" />
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Bins</span>
              </div>
              <div className="text-2xl font-bold text-pop-black mb-1">156</div>
              <div className="text-sm text-gray-600 mb-2">Total Active</div>
              <div className="flex gap-2 text-xs">
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">12 Ready</span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">8 Transit</span>
              </div>
            </div>

            {/* Active Batches */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Truck className="h-5 w-5 text-gray-600" />
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Batches</span>
              </div>
              <div className="text-2xl font-bold text-pop-black mb-1">23</div>
              <div className="text-sm text-gray-600 mb-2">Total Active</div>
              <div className="flex gap-2 text-xs">
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">8 Processing</span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">6 Waiting</span>
              </div>
            </div>

            {/* Orders Status */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-5 w-5 text-gray-600" />
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Orders</span>
              </div>
              <div className="text-2xl font-bold text-pop-black mb-1">47</div>
              <div className="text-sm text-gray-600 mb-2">Active Orders</div>
              <div className="flex gap-2 text-xs">
                <span className="bg-pop-red text-white px-2 py-1 rounded">3 Urgent</span>
                <span className="bg-pop-green text-white px-2 py-1 rounded">12 Ready</span>
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="h-5 w-5 text-gray-600" />
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Today</span>
              </div>
              <div className="text-2xl font-bold text-pop-black mb-1">8</div>
              <div className="text-sm text-gray-600 mb-2">Scheduled Pickups</div>
              <div className="flex gap-2 text-xs">
                <span className="bg-pop-green text-white px-2 py-1 rounded flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" />3 Done
                </span>
                <span className="bg-pop-blue text-white px-2 py-1 rounded flex items-center">
                  <Clock className="h-3 w-3 mr-1" />5 Pending
                </span>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};