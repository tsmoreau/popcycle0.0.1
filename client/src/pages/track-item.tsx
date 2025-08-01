import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { PopArtContainer, QRCodeElement, TransformationVisualizer } from "@/components/pop-art-elements";
import { CalendarDays, Factory, Leaf, Package } from "lucide-react";
import { PlasticItem } from "@shared/schema";

export default function TrackItem() {
  const [, params] = useRoute("/track/:id");
  const qrCode = params?.id || "";

  const { data: item, isLoading, error } = useQuery<PlasticItem>({
    queryKey: ["/api/track", qrCode],
    enabled: !!qrCode,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="dots-pattern w-32 h-32 mx-auto mb-8 animate-pulse" />
          <h1 className="text-3xl helvetica-bold">Loading transformation story...</h1>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <PopArtContainer color="red" pattern="geometric" className="bg-white border-4 border-pop-red p-8">
            <QRCodeElement code="404" size="lg" color="red" />
            <h1 className="text-3xl helvetica-bold mt-8 mb-4">Item Not Found</h1>
            <p className="text-lg text-pop-gray mb-8">
              QR code "{qrCode}" doesn't exist in our tracking system.
            </p>
            <Link href="/track">
              <Button className="bg-pop-green text-white systematic-caps">
                Try Another Code
              </Button>
            </Link>
          </PopArtContainer>
        </div>
      </div>
    );
  }

  const transformationSteps = [
    {
      title: "Waste Collection",
      description: `Collected from ${item.sourceCompany} • ${item.materialType} plastic`,
      color: "green" as const,
    },
    {
      title: "Processing",
      description: "Heat pressed into sheet • CNC cut to specifications",
      color: "blue" as const,
    },
    {
      title: "Assembly",
      description: `Assembled into ${item.productType} • Workshop ready`,
      color: "red" as const,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "collected": return "green";
      case "processed": return "blue";
      case "assembled": return "red";
      case "delivered": return "green";
      default: return "gray";
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl helvetica-bold mb-4 tracking-tight">
            <span className="text-pop-green">TRANSFORMATION</span><br />
            COMPLETE
          </h1>
          <Badge 
            variant="outline" 
            className={`systematic-caps text-lg px-6 py-2 border-4 border-pop-${getStatusColor(item.status)}`}
          >
            {item.status}
          </Badge>
        </div>

        {/* Main Item Info */}
        <PopArtContainer color="green" shadow className="bg-white border-4 border-pop-black p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <QRCodeElement code={item.qrCode} size="lg" color="green" />
                <div>
                  <div className="text-3xl helvetica-bold">Item #{item.qrCode}</div>
                  <div className="text-xl text-pop-gray">{item.productType}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border-l-4 border-pop-green pl-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <Factory className="w-4 h-4" />
                      <div className="helvetica-bold systematic-caps text-sm">Source</div>
                    </div>
                    <div className="text-lg">{item.sourceCompany}</div>
                  </div>
                  
                  <div className="border-l-4 border-pop-blue pl-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <CalendarDays className="w-4 h-4" />
                      <div className="helvetica-bold systematic-caps text-sm">Collected</div>
                    </div>
                    <div className="text-lg">{new Date(item.collectionDate).toLocaleDateString()}</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-pop-red pl-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <Leaf className="w-4 h-4" />
                      <div className="helvetica-bold systematic-caps text-sm">Impact</div>
                    </div>
                    <div className="text-lg">{item.carbonOffset}kg CO₂ Saved</div>
                  </div>
                  
                  <div className="border-l-4 border-pop-green pl-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <Package className="w-4 h-4" />
                      <div className="helvetica-bold systematic-caps text-sm">Weight</div>
                    </div>
                    <div className="text-lg">{item.weight}kg {item.materialType}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <PopArtContainer pattern="dots" className="bg-gray-100 h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl helvetica-bold text-pop-green mb-4">
                    {item.qrCode}
                  </div>
                  <div className="systematic-caps text-pop-gray">
                    Waste → Product
                  </div>
                </div>
              </PopArtContainer>
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-pop-blue dots-pattern-blue opacity-60" />
            </div>
          </div>
        </PopArtContainer>

        {/* Transformation Timeline */}
        <Card className="border-4 border-pop-black mb-12">
          <CardContent className="p-8">
            <h3 className="text-3xl helvetica-bold mb-8 text-center systematic-caps">
              Transformation Timeline
            </h3>
            <TransformationVisualizer steps={transformationSteps} />
          </CardContent>
        </Card>

        {/* Impact Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <PopArtContainer color="green" className="bg-pop-green text-white p-6 text-center">
            <div className="text-3xl helvetica-bold mb-2">{item.weight}kg</div>
            <div className="systematic-caps">Plastic Diverted</div>
          </PopArtContainer>
          
          <PopArtContainer color="blue" className="bg-pop-blue text-white p-6 text-center">
            <div className="text-3xl helvetica-bold mb-2">{item.carbonOffset}kg</div>
            <div className="systematic-caps">CO₂ Saved</div>
          </PopArtContainer>
          
          <PopArtContainer color="red" className="bg-pop-red text-white p-6 text-center">
            <div className="text-3xl helvetica-bold mb-2">1</div>
            <div className="systematic-caps">Product Created</div>
          </PopArtContainer>
        </div>

        {/* Actions */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl helvetica-bold systematic-caps">
            Discover More <span className="text-pop-green">Transformations</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/track">
              <Button className="bg-pop-green text-white hover:bg-pop-black systematic-caps pop-shadow-green text-lg px-8 py-4">
                Track Another Item
              </Button>
            </Link>
            <Link href="/partners">
              <Button variant="outline" className="border-4 border-pop-black hover:bg-pop-black hover:text-white systematic-caps text-lg px-8 py-4">
                Become a Partner
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
