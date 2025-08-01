'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { PopArtContainer, QRCodeElement } from "../../components/PopArtElements";
import { Building, Calendar, Weight, Leaf, Package, CheckCircle } from "lucide-react";

interface PlasticItem {
  id: string;
  qrCode: string;
  sourceCompany: string;
  collectionDate: string;
  materialType: string;
  weight: number;
  processedDate: string;
  carbonOffset: number;
  status: string;
  productType: string;
  event?: string;
  message?: string;
  impactMetrics: {
    carbonSaved: number;
    wasteReduced: number;
    status: string;
  };
}

export default function TrackItem() {
  const { id } = useParams();
  const [item, setItem] = useState<PlasticItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/track/${id}`);
        if (!response.ok) {
          throw new Error('Item not found');
        }
        const data = await response.json();
        setItem(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch item');
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
        <div className="text-center">
          <div className="w-16 h-16 bg-pop-green border-2 border-pop-black mx-auto mb-4 animate-pulse"></div>
          <p className="systematic-caps">Loading item data...</p>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PopArtContainer color="red" shadow>
          <Card className="border-4 border-pop-black">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl helvetica-bold mb-4">Item Not Found</h2>
              <p className="text-pop-gray mb-6">QR code "{id}" is not in our system.</p>
              <p className="text-sm text-pop-gray">Try one of our sample codes: ABC123, DEF456, GHI789, JKL012</p>
            </CardContent>
          </Card>
        </PopArtContainer>
      </div>
    );
  }

  const getProductTypeLabel = (type: string) => {
    switch (type) {
      case 'rover_chassis': return 'Rover Chassis';
      case 'assembly_toy': return 'Assembly Toy';
      case 'educational_kit': return 'Educational Kit';
      case 'dinnerware': return 'Dinnerware';
      default: return type;
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl helvetica-bold mb-6 tracking-tight">
            <span className="text-pop-green">QR</span> {item.qrCode}
          </h1>
          <p className="text-lg text-pop-gray">
            Complete transformation journey from {item.originPoint}
          </p>
        </div>

        {/* QR Code Display */}
        <div className="flex justify-center mb-12">
          <PopArtContainer color="green" shadow>
            <div className="p-8 bg-white border-4 border-pop-black">
              <QRCodeElement qrCode={item.qrCode} size="lg" />
            </div>
          </PopArtContainer>
        </div>

        {/* Item Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-12 items-start">
          <PopArtContainer color="green" shadow>
            <Card className="border-4 border-pop-black">
              <CardHeader>
                <CardTitle className="systematic-caps flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Source Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="systematic-caps text-sm">ID</span>
                  <span>{item.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="systematic-caps text-sm">Origin</span>
                  <span className="helvetica-bold">{item.originPoint}</span>
                </div>
                <div className="flex justify-between">
                  <span className="systematic-caps text-sm">Material</span>
                  <Badge className="bg-pop-green text-pop-black">{item.materialType}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="systematic-caps text-sm">Weight</span>
                  <span className="flex items-center">
                    <Weight className="w-4 h-4 mr-1" />
                    {item.weight}kg
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="systematic-caps text-sm">Collected</span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {item.collectionDate}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="systematic-caps text-sm">Processed</span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {item.processedDate}
                  </span>
                </div>
                {item.event && (
                  <div className="flex justify-between">
                    <span className="systematic-caps text-sm">Event</span>
                    <span className="helvetica-bold">{item.event}</span>
                  </div>
                )}
                {item.message && (
                  <div className="border-t border-pop-gray pt-4">
                    <span className="systematic-caps text-sm text-pop-gray block mb-2">Message</span>
                    <p className="text-sm italic">{item.message}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </PopArtContainer>

          <PopArtContainer color="blue" shadow>
            <Card className="border-4 border-pop-black">
              <CardHeader>
                <CardTitle className="systematic-caps flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Product Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="systematic-caps text-sm">Product Type</span>
                  <span className="helvetica-bold">{getProductTypeLabel(item.productType)}</span>
                </div>

                {!item.isCharity && (
                  <div className="flex justify-between items-center">
                    <span className="systematic-caps text-sm">Purchased</span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {item.purchasedDate}
                    </span>
                  </div>
                )}
                
                {item.isCharity && item.donatingEntity && (
                  <div className="flex justify-between">
                    <span className="systematic-caps text-sm">Donated By</span>
                    <span className="helvetica-bold">{item.donatingEntity}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="systematic-caps text-sm">{item.isCharity ? 'Donated To' : 'Destination'}</span>
                  <div className="flex items-center gap-2">
                    <span>{item.destination}</span>
                    {item.isCharity && (
                      <Badge className="bg-pop-red text-white text-xs">CHARITY</Badge>
                    )}
                  </div>
                </div>
                {item.event && (
                  <div className="flex justify-between">
                    <span className="systematic-caps text-sm">Event</span>
                    <span className="helvetica-bold">{item.event}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </PopArtContainer>
        </div>

        {/* Status Timeline */}
        <div className="mb-12">
          <h2 className="text-3xl helvetica-bold mb-8 text-center">
            <span className="text-pop-black">TRANSFORMATION JOURNEY</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 border-2 border-pop-black flex items-center justify-center bg-pop-green">
                <CheckCircle className="w-8 h-8 text-pop-black" />
              </div>
              <h3 className="systematic-caps text-sm mb-1">Collected</h3>
              <p className="text-xs text-pop-gray">{item.collectionDate}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 border-2 border-pop-black flex items-center justify-center bg-pop-blue">
                <CheckCircle className="w-8 h-8 text-pop-black" />
              </div>
              <h3 className="systematic-caps text-sm mb-1">Processed</h3>
              <p className="text-xs text-pop-gray">{item.processedDate}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 border-2 border-pop-black flex items-center justify-center bg-pop-black">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="systematic-caps text-sm mb-1">Purchased</h3>
              <p className="text-xs text-pop-gray">{item.purchasedDate}</p>
            </div>
          </div>
        </div>

        {/* Impact Metrics */}
        <PopArtContainer color="red" shadow>
          <Card className="border-4 border-pop-black">
            <CardHeader>
              <CardTitle className="systematic-caps flex items-center justify-center text-2xl">
                <Leaf className="w-6 h-6 mr-2" />
                Environmental Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8 text-center">
                <div>
                  <div className="text-4xl helvetica-bold text-pop-red mb-2">
                    {item.impactMetrics.carbonSaved}kg
                  </div>
                  <div className="systematic-caps text-sm text-pop-gray">CO₂ Offset Generated</div>
                  <p className="text-xs text-pop-gray mt-2">
                    Equivalent to removing a car from the road for 2.3 days
                  </p>
                </div>
                <div>
                  <div className="text-4xl helvetica-bold text-pop-red mb-2">
                    {item.impactMetrics.wasteReduced}kg
                  </div>
                  <div className="systematic-caps text-sm text-pop-gray">Plastic Waste Diverted</div>
                  <p className="text-xs text-pop-gray mt-2">
                    Prevented from entering landfills or ocean systems
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </PopArtContainer>
      </div>
    </div>
  );
}