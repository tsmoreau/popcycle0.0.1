"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { QRCodeElement } from "../../components/PopArtElements";
import { LoadingSquare } from "../../components/ui/loading-square";
import {
  Building,
  Calendar,
  Weight,
  Leaf,
  Package,
  CheckCircle,
  User,
  MapPin,
  Heart,
  Plus,
  HeartHandshake,
  Circle,
  Clock,
  Droplets,
  Scissors,
  Zap as ShredIcon,
  Wind,
  Archive,
  Scale,
  Camera,
  Zap,
  Settings,
} from "lucide-react";

interface MakerDetails {
  userId: string;
  name: string;
  location: string;
  assemblyDate: string;
  story: string;
  registeredAt: string;
  verifiedEmail: string;
}

interface BlankItem {
  id: string;
  batchIds: string[];
  status: string;
  weight: number;
  materialType: string;
  collectionDate: string;
  productId?: string;
}

interface BatchItem {
  id: string;
  weight: number;
  materialType: string;
  status: string;
  collectionDate: string;
}



export default function TrackItem() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Date formatting helper - formats to M/D/YYYY
  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'numeric', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Safe ID prefix checker - prevents crashes with non-string IDs
  const idStartsWith = (prefix: string) => {
    return typeof data?.id === 'string' && data.id.startsWith(prefix);
  };

  // Get the appropriate date field for each type
  const getDateField = () => {
    if (idStartsWith("B")) return data.collectionDate || data.lastCollectionDate;
    if (idStartsWith("T")) return data.collectionDate;
    if (idStartsWith("K")) return data.createdAt;
    if (idStartsWith("I")) return data.assemblyDate;
    return null;
  };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/track/${id}`);
        if (!response.ok) {
          throw new Error("Item not found");
        }
        const apiData = await response.json();
        setData(apiData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch item");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchItem();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSquare color="green" text="Loading Item..." />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center font-jost">
        <Card className="border border-gray-300 max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl mb-4 font-light">Item Not Found</h2>
            <p className="text-gray-600 mb-6 font-light">
              Item code "{id}" is not in our system.
            </p>
            <p className="text-sm text-gray-500 font-light">
              Try one of our sample item codes: ABC123, DEF456, GHI789,
              JKL012, MNO345, PQR678, STU901
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Impact metrics calculation (kept for potential future use)
  const impactMetrics = data.impactMetrics?.carbonSaved
    ? {
        carbonSaved: data.impactMetrics.carbonSaved,
        wasteReduced: data.weight,
      }
    : null;

  const getProductTypeLabel = (type: string) => {
    switch (type) {
      case "rover_chassis":
        return "Rover Chassis";
      case "assembly_toy":
        return "Assembly Toy";
      case "educational_kit":
        return "Educational Kit";
      case "dinnerware":
        return "Dinnerware";
      default:
        return type;
    }
  };

  const getBinStatusLabel = (status: string) => {
    switch (status) {
      case "bin_on_vehicle":
        return "On Vehicle";
      case "bin_on_site":
        return "On Site";
      case "ready_for_processing":
        return "Ready for Processing";
      default:
        return "Awaiting Collection";
    }
  };

  const getBatchStatusLabel = (status: string) => {
    switch (status) {
      case "collected":
        return "Collected";
      case "rough_wash":
        return "Rough Wash";
      case "sort":
        return "Sorting";
      case "first_dry":
        return "First Dry";
      case "shred":
        return "Shredding";
      case "fine_wash":
        return "Fine Wash";
      case "second_dry":
        return "Second Dry";
      case "press":
        return "Pressing";
      case "weigh_photo":
        return "Weigh & Photo";
      case "laser_marking":
        return "Laser Marking";
      case "inventory_creation":
        return "Inventory Creation";
      default:
        return status;
    }
  };

  const getItemStatusLabel = (status: string) => {
    switch (status) {
      case "assembled":
        return "Assembled";
      case "quality_checked":
        return "Quality Checked";
      case "packaged":
        return "Packaged";
      case "shipped":
        return "Shipped";
      case "delivered":
        return "Delivered";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen lg:max-w-[35vw] py-20 flex mx-auto justify-center font-jost bg-white">
      <div className="w-full mx-auto bg-white border-[6px] border-black mr-6 ml-6">
        
        {/* ========== MATERIAL FACTS HEADER ========== */}
        <div className="border-b-[6px] border-black px-6 pt-6 pb-3">
          <h1 className="text-5xl font-black tracking-tight">Material Facts</h1>
        </div>

        {/* ========== ITEM TYPE DESCRIPTOR ========== */}
        <div className="border-b-[4px] border-black px-6 py-3">
          <div className="text-sm">
            <span className="font-bold">Item Type: </span>
            <span className="font-normal">
              {data.id.startsWith("B")
                ? "Collection Bin"
                : data.id.startsWith("T")
                  ? "Processing Batch"
                  : data.id.startsWith("K")
                    ? "Pressed Blank"
                    : data.id.startsWith("I")
                      ? "Manufactured Item"
                      : "Unknown"}
            </span>
          </div>
        </div>

        {/* ========================================
            SOURCE DETAILS SECTION
            Displays core identification and metadata
            ======================================== */}
        <div className="px-6 py-4 border-b-[6px] border-black">
          <div className="space-y-2 text-sm">
            
            {/* PRIMARY ID - Main identifier for this item (Bin/Batch/Blank/Item) */}
            <div className="flex justify-between py-1">
              <span className="font-bold">
                {idStartsWith("B")
                  ? "Bin ID"
                  : idStartsWith("T")
                    ? "Batch ID"
                    : idStartsWith("K")
                      ? "Blank ID"
                      : idStartsWith("I")
                        ? "Item ID"
                        : "Main ID"}
              </span>
              <span className="font-mono">{data.id}</span>
            </div>

            {/* ORIGINS - Multi-origin display for Items/Batches/Blanks (array of origin objects) */}
            {data.origins && data.origins.length > 0 && (
              <div className="flex justify-between py-1">
                <span className="font-bold">{data.origins.length === 1 ? "Origin" : "Origins"}</span>
                <div className="space-y-1 text-right">
                  {data.origins.map((origin: any) => (
                    <div key={origin.id} className="font-mono">
                      {origin.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EVENTS - Multi-event display for Items/Batches/Blanks (array of event objects) */}
            {data.events && data.events.length > 0 && (
              <div className="flex justify-between py-1">
                <span className="font-bold">{data.events.length === 1 ? "Event" : "Events"}</span>
                <div className="space-y-1 text-right">
                  {data.events.map((event: any) => (
                    <div key={event.eventId} className="font-mono">
                      {event.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ORIGIN - Single organization origin for Bins */}
            {idStartsWith("B") && (
              <div className="flex justify-between py-1">
                <span className="font-bold">Origin</span>
                <span className="font-mono">{data.organization?.name || "Unknown Origin"}</span>
              </div>
            )}

            {/* EVENT - Single event display for Bins (flat field pattern) */}
            {idStartsWith("B") && data.event && (
              <div className="flex justify-between py-1">
                <span className="font-bold">Event</span>
                <span className="font-mono">{data.event}</span>
              </div>
            )}

            {/* LOCATION - Physical location with map pin icon */}
            {data.location && (
              <div className="flex justify-between items-center py-1">
                <span className="font-bold">Location</span>
                <span className="font-mono flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {data.location}
                </span>
              </div>
            )}

            {/* MATERIAL TYPE - Type of plastic/material (e.g., HDPE, PET) */}
            {data.materialType && (
              <div className="flex justify-between py-1">
                <span className="font-bold">Material</span>
                <div className="rounded-full px-2 border border-1 border-black font-mono">
                  {data.materialType}
                </div>
              </div>
            )}

            {/* STATUS - Processing status for Batches only */}
            {idStartsWith("T") && data.status && (
              <div className="flex justify-between py-1">
                <span className="font-bold">Status</span>
                <span>{data.status}</span>
              </div>
            )}

            {/* WEIGHT - Weight in kilograms (hidden for Bins) */}
            {data.weight && !idStartsWith("B") && (
              <div className="flex justify-between items-center py-1">
                <span className="font-bold">Weight</span>
                <span className="font-mono flex items-center">
                  <Weight className="w-4 h-4 mr-1" />
                  {data.weight}kg
                </span>
              </div>
            )}

            {/* PRIMARY DATE - Main date field (varies by item type) */}
            {getDateField() && (
              <div className="flex justify-between items-center py-1">
                <span className="font-bold">
                  {idStartsWith("B") 
                    ? "Last Collected" 
                    : idStartsWith("T")
                      ? "Batched Date"
                      : idStartsWith("K")
                        ? "Pressed Date"
                        : idStartsWith("I")
                          ? "Manufacture Date"
                          : "Date"}
                </span>
                <span className="font-mono flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(getDateField())}
                </span>
              </div>
            )}

            {/* NEXT COLLECTION DATE - Scheduled future collection for Bins */}
            {data.nextCollectionDate && (
              <div className="flex justify-between items-center py-1">
                <span className="font-bold">Next Collection</span>
                <span className="font-mono flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(data.nextCollectionDate)}
                </span>
              </div>
            )}

            {/* BIN STATUS - Current bin location/state (Bins only) */}
            {idStartsWith("B") && data.binStatus && (
              <div className="flex justify-between items-center py-1">
                <span className="font-bold">Status</span>
                <Badge className="bg-gray-200 text-black font-normal">
                  {getBinStatusLabel(data.binStatus)}
                </Badge>
              </div>
            )}

            {/* PROCESSED DATE - When item was processed into inventory */}
            {data.processedDate && (
              <div className="flex justify-between items-center py-1">
                <span className="font-bold">Processed</span>
                <span className="flex items-center font-mono">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(data.processedDate)}
                </span>
              </div>
            )}

            {/* ADOPTED BY - Organization/person who adopted this bin */}
            {data.adoptedBy && idStartsWith("B") && (
              <div className="flex justify-between py-1">
                <span className="font-bold">Adopted By</span>
                <span>{data.adoptedBy}</span>
              </div>
            )}

          </div>
        </div>

        {/* SUPPLY CHAIN HISTORY ACCORDIONS - For Items only */}
        {idStartsWith("I") && (
          <div className="px-6 py-3 border-b-[4px] border-black">

            {/* BLANKS HISTORY ACCORDION - Full blank details for items */}
            {data.blanks && data.blanks.length > 0 && (
              <div>
                <Accordion type="single" collapsible className="border-0">
                  <AccordionItem value="blanks-history" className="border-0">
                    <AccordionTrigger className="text-sm font-bold hover:no-underline py-1">
                      Blanks History ({data.blanks.length})
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pt-1 pb-0">
                      <div className="space-y-1 text-right pl-4">
                        {data.blanks.map((blank: any) => (
                          <Link
                            key={blank.id}
                            href={`/track/${blank.id}`}
                            className="block font-mono hover:text-gray-600 hover:underline"
                          >
                            {blank.id}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}

            {/* BATCHES HISTORY ACCORDION - Full batch details for items */}
            {data.batches && data.batches.length > 0 && (
              <div>
                <Accordion type="single" collapsible className="border-0">
                  <AccordionItem value="batches-history" className="border-0">
                    <AccordionTrigger className="text-sm font-bold hover:no-underline py-1">
                      Batches History ({data.batches.length})
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pt-1 pb-0">
                      <div className="space-y-1 text-right pl-4">
                        {data.batches.map((batch: any) => (
                          <Link
                            key={batch.id}
                            href={`/track/${batch.id}`}
                            className="block font-mono hover:text-gray-600 hover:underline"
                          >
                            {batch.id}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}

            {/* BINS HISTORY ACCORDION - Full bin details for items */}
            {data.bins && data.bins.length > 0 && (
              <div>
                <Accordion type="single" collapsible className="border-0">
                  <AccordionItem value="bins-history" className="border-0">
                    <AccordionTrigger className="text-sm font-bold hover:no-underline py-1">
                      Bins History ({data.bins.length})
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pt-1 pb-0">
                      <div className="space-y-1 text-right pl-4">
                        {data.bins.map((bin: any) => (
                          <Link
                            key={bin.id}
                            href={`/track/${bin.id}`}
                            className="block font-mono hover:text-gray-600 hover:underline"
                          >
                            {bin.id}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}

          </div>
        )}

        {/* SUPPLY CHAIN HISTORY ACCORDIONS - For Blanks only */}
        {idStartsWith("K") && (
          <div className="px-6 py-3 border-b-[4px] border-black">

            {/* BATCHES HISTORY ACCORDION - Full batch details for blanks */}
            {data.batches && data.batches.length > 0 && (
              <div>
                <Accordion type="single" collapsible className="border-0">
                  <AccordionItem value="batches-history" className="border-0">
                    <AccordionTrigger className="text-sm font-bold hover:no-underline py-1">
                      Batches History ({data.batches.length})
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pt-1 pb-0">
                      <div className="space-y-1 text-right pl-4">
                        {data.batches.map((batch: any) => (
                          <Link
                            key={batch.id}
                            href={`/track/${batch.id}`}
                            className="block font-mono hover:text-gray-600 hover:underline"
                          >
                            {batch.id}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}

            {/* BINS HISTORY ACCORDION - Full bin details for blanks */}
            {data.bins && data.bins.length > 0 && (
              <div>
                <Accordion type="single" collapsible className="border-0">
                  <AccordionItem value="bins-history" className="border-0">
                    <AccordionTrigger className="text-sm font-bold hover:no-underline py-1">
                      Bins History ({data.bins.length})
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pt-1 pb-0">
                      <div className="space-y-1 text-right pl-4">
                        {data.bins.map((bin: any) => (
                          <Link
                            key={bin.id}
                            href={`/track/${bin.id}`}
                            className="block font-mono hover:text-gray-600 hover:underline"
                          >
                            {bin.id}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}

          </div>
        )}

        {/* SUPPLY CHAIN HISTORY ACCORDIONS - For Batches only */}
        {idStartsWith("T") && (
          <div className="px-6 py-3 border-b-[4px] border-black">

            {/* BINS HISTORY ACCORDION - Full bin details for batches */}
            {data.bins && data.bins.length > 0 && (
              <div>
                <Accordion type="single" collapsible className="border-0">
                  <AccordionItem value="bins-history" className="border-0">
                    <AccordionTrigger className="text-sm font-bold hover:no-underline py-1">
                      Bins History ({data.bins.length})
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pt-1 pb-0">
                      <div className="space-y-1 text-right pl-4">
                        {data.bins.map((bin: any) => (
                          <Link
                            key={bin.id}
                            href={`/track/${bin.id}`}
                            className="block font-mono hover:text-gray-600 hover:underline"
                          >
                            {bin.id}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}

          </div>
        )}

        {/* EVENT DETAILS ACCORDIONS FOR BATCHES/BLANKS/ITEMS - Loop through events array */}
        {!idStartsWith("B") && data.events && data.events.length > 0 && (
          <div className="px-6 py-3 border-b-[4px] border-black">
            {data.events.map((event: any) => (
              <Accordion key={event.eventId} type="single" collapsible className="border-0">
                <AccordionItem value={`event-${event.eventId}`} className="border-0">
                  
                  {/* Accordion trigger with event name */}
                  <AccordionTrigger className="text-sm font-bold hover:no-underline py-1">
                    Event Details: {event.name}
                  </AccordionTrigger>
                  
                  <AccordionContent className="px-0 pt-1 pb-0">
                    <div className="space-y-2 text-sm mb-4 pl-4">
                      
                      {/* EVENT NAME - Name of the collection event */}
                      <div className="flex justify-between">
                        <span className="font-bold">Event Name</span>
                        <span className="font-mono">{event.name}</span>
                      </div>
                      
                      {/* EVENT SCHEDULED DATE - When the event is/was scheduled */}
                      {event.scheduledDate && (
                        <div className="flex justify-between">
                          <span className="font-bold">Scheduled Date</span>
                          <span className="font-mono">{formatDate(event.scheduledDate)}</span>
                        </div>
                      )}
                      
                      {/* EVENT DESCRIPTION - Detailed description of the event */}
                      {event.description && (
                        <div className="pt-2 border-t border-gray-300 mt-2">
                          <div className="text-xs font-bold mb-2">
                            Description:
                          </div>
                          <div className="text-xs italic">
                            {event.description}
                          </div>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        )}

        {/* ========================================
            ORG MESSAGE & EVENT DETAILS SECTION
            Optional messaging and event information
            ======================================== */}

        <div className="px-6 py-4 border-b-[4px] border-black"> 

          {/* ORGANIZATION MESSAGE - Custom message from the source organization */}
          {data.orgMessage && (
            <div className="mb-4">
              
              {/* Message header showing organization name */}
              <div className="text-xs font-bold mb-2">
                Message from {data.organization?.name || "Unknown Origin"}:
              </div>
              
              {/* Message content - displayed in italics */}
              <div className="text-xs italic">
                "{data.orgMessage}"
              </div>
            </div>
          )}

          {/* EVENT DETAILS ACCORDION FOR BINS - Collection event information (flat field pattern) */}
          {idStartsWith("B") && data.event && data.event.trim() && (
            <div>
              <Accordion type="single" collapsible className="border-0">
                <AccordionItem value="event-details" className="border-0">
                  
                  {/* Accordion trigger */}
                  <AccordionTrigger className="text-sm font-bold hover:no-underline py-1">
                    Event Details
                  </AccordionTrigger>
                  
                  <AccordionContent className="px-0 pt-1 pb-0">
                    <div className="space-y-2 text-sm mb-4 pl-4">
                      
                      {/* EVENT NAME - Name of the collection event */}
                      <div className="flex justify-between">
                        <span className="font-bold">Event Name</span>
                        <span className="font-mono">{data.event}</span>
                      </div>
                      
                      {/* EVENT SCHEDULED DATE - When the event is/was scheduled */}
                      {data.eventScheduledDate && (
                        <div className="flex justify-between">
                          <span className="font-bold">Scheduled Date</span>
                          <span className="font-mono">{formatDate(data.eventScheduledDate)}</span>
                        </div>
                      )}
                      
                      {/* EVENT DESCRIPTION - Detailed description of the event */}
                      {data.eventDescription && (
                        <div className="pt-2 border-t border-gray-300 mt-2">
                          <div className="text-xs font-bold mb-2">
                            Description:
                          </div>
                          <div className="text-xs italic">
                            {data.eventDescription}
                          </div>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
          
        </div>

        {/* ========================================
            PRODUCT DETAILS SECTION
            Shows for Items only - product information
            ======================================== */}

        {data.type === 'item' && data.productDetails && (
          <div className="px-6 py-4 border-b-[4px] border-black">
            <div className="space-y-2 text-sm">
              
              {/* PRODUCT NAME - Name of the finished product */}
              <div className="flex justify-between">
                <span className="font-bold">Product Name</span>
                <span className="font-mono">{data.productDetails.name}</span>
              </div>
              
              {/* PRODUCT TYPE - Type of product (e.g., rover_chassis, assembly_toy) */}
              <div className="flex justify-between">
                <span className="font-bold">Product Type</span>
                <span className="font-mono">{data.productDetails.productType}</span>
              </div>
              
              {/* CATEGORY - Product category classification */}
              <div className="flex justify-between">
                <span className="font-bold">Category</span>
                <span className="font-mono">{data.productDetails.category}</span>
              </div>
              
              {/* EDITION NUMBER - Limited edition number (if applicable) */}
              {data.editionNumber && (
                <div className="flex justify-between">
                  <span className="font-bold">Edition</span>
                  <span className="font-mono">#{data.editionNumber}</span>
                </div>
              )}
              
              {/* SERIAL NUMBER - Unique serial number for this item */}
              {data.serialNumber && (
                <div className="flex justify-between">
                  <span className="font-bold">Serial Number</span>
                  <span className="font-mono">{data.serialNumber}</span>
                </div>
              )}
              
              {/* DELIVERY DATE - When the item was delivered to customer */}
              {data.deliveryDate && (
                <div className="flex justify-between items-center">
                  <span className="font-bold">Delivered</span>
                  <span className="flex items-center font-mono">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(data.deliveryDate)}
                  </span>
                </div>
              )}
              
              {/* PRODUCT DESCRIPTION - Detailed description of the product */}
              {data.productDetails.description && (
                <div className="border-t border-gray-300 pt-2 mt-2">
                  <span className="text-xs font-bold block mb-2">
                    Description:
                  </span>
                  <div className="text-xs italic">{data.productDetails.description}</div>
                </div>
              )}
            </div>
          </div>
        )}
     
        {/* ========================================
            CONNECTED ITEMS SECTION
            Shows downstream items produced from this item
            ======================================== */}

        <div className="px-6 py-3 border-b-[4px] border-black">
        
        {/* PRODUCED BLANKS ACCORDION - Shows blank sheets created from this batch (for Batches) */}
        {data.producedBlanks && data.producedBlanks.length > 0 && (
          <div className="mb-3">
            <Accordion type="single" collapsible className="border-0">
              <AccordionItem value="produced-blanks" className="border-0">
                
                {/* Accordion trigger with count */}
                <AccordionTrigger className="text-sm font-bold hover:no-underline py-1">
                  Produced Blanks ({data.producedBlanks.length})
                </AccordionTrigger>
                
                <AccordionContent className="px-0 pt-2 pb-0">
                  <div className="space-y-2 pl-4">
                    {data.producedBlanks.map((blank: any, index: number) => (
                      <Link
                        key={blank.id}
                        href={`/track/${blank.id}`}
                        className="block"
                      >
                        <div className="flex justify-between items-center py-2 hover:bg-gray-50 transition-colors cursor-pointer">
                          <div>
                            {/* BLANK ID - Identifier for the blank sheet */}
                            <div className="text-sm font-mono">
                              {blank.id}
                            </div>
                            
                            {/* PRODUCT INFO - Type and product name */}
                            <div className="text-xs text-gray-600">
                              {blank.productType && blank.productName
                                ? `${blank.productType} • ${blank.productName}`
                                : `${blank.weight}kg`}
                            </div>
                          </div>
                          
                          {/* Item type label */}
                          <div className="text-xs text-gray-600">
                            {blank.weight}kg
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        {/* PRODUCED ITEMS ACCORDION - Shows finished products from this batch/blank (for Batches or Blanks) */}
        {data.producedItems && data.producedItems.length > 0 && (
          <div className="mb-3">
            <Accordion type="single" collapsible className="border-0">
              <AccordionItem value="produced-items" className="border-0">
                
                {/* Accordion trigger with count */}
                <AccordionTrigger className="text-sm font-bold hover:no-underline py-1">
                  Finished Products ({data.producedItems.length})
                </AccordionTrigger>
                
                <AccordionContent className="px-0 pt-2 pb-0">
                  <div className="space-y-2 pl-4">
                    {data.producedItems.map((item: any, index: number) => (
                      <Link
                        key={item.id}
                        href={`/track/${item.id}`}
                        className="block"
                      >
                        <div className="flex justify-between items-center py-2 hover:bg-gray-50 transition-colors cursor-pointer">
                          <div>
                            {/* ITEM ID - Identifier for the finished item */}
                            <div className="text-sm font-mono">
                              {item.id}
                            </div>
                            
                            {/* PRODUCT INFO - Type and product name */}
                            <div className="text-xs text-gray-600">
                              {item.productType && item.productName
                                ? `${item.productType} • ${item.productName}`
                                : item.serialNumber
                                  ? `Serial: ${item.serialNumber}`
                                  : 'Finished Item'}
                            </div>
                          </div>
                          
                          {/* Serial number if available */}
                          {item.serialNumber && (
                            <div className="text-xs text-gray-600">
                              #{item.serialNumber}
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        {/* PRODUCED BATCHES ACCORDION - Shows batches created from this bin (for Bins) */}
        {data.producedBatches && data.producedBatches.length > 0 && (
          <div className="mb-3">
            <Accordion type="single" collapsible className="border-0">
              <AccordionItem value="produced-batches" className="border-0">
                
                {/* Accordion trigger with count */}
                <AccordionTrigger className="text-sm font-bold hover:no-underline py-1">
                  Batches from this Bin ({data.producedBatches.length})
                </AccordionTrigger>
                
                <AccordionContent className="px-0 pt-2 pb-0">
                  <div className="space-y-2 pl-4">
                    {data.producedBatches.map((batch: any, index: number) => (
                      <Link
                        key={batch.id}
                        href={`/track/${batch.id}`}
                        className="block"
                      >
                        <div className="flex justify-between items-center py-2 hover:bg-gray-50 transition-colors cursor-pointer">
                          <div>
                            {/* BATCH COLLECTION DATE - When this batch was collected */}
                            <div className="text-xs text-gray-600">
                              {formatDate(batch.collectionDate)}
                            </div>
                            
                            {/* BATCH WEIGHT, MATERIAL & STATUS - Physical attributes and processing status */}
                            <div className="text-xs text-gray-600">
                              {batch.weight}kg • {batch.materialType} •{" "}
                              {getBatchStatusLabel(batch.status)}
                            </div>
                          </div>

                          {/* BATCH ID - Identifier for the batch */}
                          <div className="text-sm font-mono">
                            {batch.id}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
        </div>

        {/* ========== FOOTER INFO ========== */}
        <div className="px-6 py-4">
          <div className="text-xs">
            <span className="font-bold">* PopCycle Material Facts</span> provides transparency about the journey of recycled materials through our circular economy system. For more information, visit popcycle.org
          </div>
        </div>
        
      </div>
    </div>
  );
}
