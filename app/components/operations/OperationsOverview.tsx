import { BarChart3, Package, Truck, Users, Calendar, CheckCircle, Clock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Bin, Batch, Order, Blank } from "../../../lib/schemas";

interface OperationsOverviewProps {
  bins: Bin[];
  batches: Batch[];
  orders: Order[];
  blanks: Blank[];
  loading: boolean;
}

export const OperationsOverview = ({ bins, batches, orders, blanks, loading }: OperationsOverviewProps) => {
  // Calculate statistics from real data using correct schema status values
  const activeBins = bins.filter(bin => bin.isActive);
  const readyBins = bins.filter(bin => bin.status === 'ready_for_processing');
  const transitBins = bins.filter(bin => bin.status === 'bin_on_vehicle');
  
  const activeBatches = batches.filter(batch => batch.status !== 'inventory_creation'); // Final step
  const processingBatches = batches.filter(batch => 
    ['rough_wash', 'sort', 'first_dry', 'shred', 'fine_wash', 'second_dry', 'press'].includes(batch.status)
  );
  const waitingBatches = batches.filter(batch => batch.status === 'collected');
  
  const activeOrders = orders.filter(order => order.status !== 'completed');
  const urgentOrders = orders.filter(order => order.type === 'collection_service'); // Use order type as priority indicator
  const readyOrders = orders.filter(order => order.status === 'in_progress');
  
  // Today's orders - for simplicity, using orders created today as "today's pickups"
  const today = new Date().toISOString().split('T')[0];
  const todaysPickups = orders.filter(order => {
    const orderDate = typeof order.createdAt === 'string' ? order.createdAt : order.createdAt.toISOString();
    return orderDate.startsWith(today);
  });
  const completedPickups = todaysPickups.filter(order => order.status === 'completed');
  const pendingPickups = todaysPickups.filter(order => order.status !== 'completed');

  if (loading) {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="operations-overview" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-pop-green" />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-pop-black">Operations Overview</h3>
                <p className="text-sm text-gray-600">Loading data...</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 pb-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-4 animate-pulse">
                  <div className="h-5 bg-gray-300 rounded mb-2"></div>
                  <div className="h-8 bg-gray-300 rounded mb-1"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-300 rounded w-16"></div>
                    <div className="h-6 bg-gray-300 rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

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
              <div className="text-2xl font-bold text-pop-black mb-1">{activeBins.length}</div>
              <div className="text-sm text-gray-600 mb-2">Total Active</div>
              <div className="flex gap-2 text-xs">
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">{readyBins.length} Ready</span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">{transitBins.length} Transit</span>
              </div>
            </div>

            {/* Active Batches */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Truck className="h-5 w-5 text-gray-600" />
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Batches</span>
              </div>
              <div className="text-2xl font-bold text-pop-black mb-1">{activeBatches.length}</div>
              <div className="text-sm text-gray-600 mb-2">Total Active</div>
              <div className="flex gap-2 text-xs">
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">{processingBatches.length} Processing</span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">{waitingBatches.length} Waiting</span>
              </div>
            </div>

            {/* Orders Status */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-5 w-5 text-gray-600" />
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Orders</span>
              </div>
              <div className="text-2xl font-bold text-pop-black mb-1">{activeOrders.length}</div>
              <div className="text-sm text-gray-600 mb-2">Active Orders</div>
              <div className="flex gap-2 text-xs">
                <span className="bg-pop-red text-white px-2 py-1 rounded">{urgentOrders.length} Urgent</span>
                <span className="bg-pop-green text-white px-2 py-1 rounded">{readyOrders.length} Ready</span>
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="h-5 w-5 text-gray-600" />
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Today</span>
              </div>
              <div className="text-2xl font-bold text-pop-black mb-1">{todaysPickups.length}</div>
              <div className="text-sm text-gray-600 mb-2">Scheduled Pickups</div>
              <div className="flex gap-2 text-xs">
                <span className="bg-pop-green text-white px-2 py-1 rounded flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" />{completedPickups.length} Done
                </span>
                <span className="bg-pop-blue text-white px-2 py-1 rounded flex items-center">
                  <Clock className="h-3 w-3 mr-1" />{pendingPickups.length} Pending
                </span>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};