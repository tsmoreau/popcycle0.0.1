import Link from "next/link";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { PopArtContainer, QRCodeElement } from "./components/PopArtElements";
import { ArrowRight, Recycle, Factory, Zap, Users } from "lucide-react";

// Mock data for MVP
const impactMetrics = {
  totalPieces: 3247,
  totalWeight: 127.8,
  totalCarbonOffset: 342.1,
  companiesPartnered: 12
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl lg:text-8xl helvetica-bold mb-8 tracking-tight">
            <span className="text-pop-green">TRACK</span><br />
            YOUR PLASTIC'S<br />
            JOURNEY
          </h1>
          
          <p className="text-xl lg:text-2xl max-w-4xl mx-auto mb-12 leading-relaxed text-pop-black">
            Every QR code tells the complete story of transformation: from corporate waste to educational wonder. 
            Scan. Learn. Make.
          </p>
          
          <div className="flex justify-center items-center gap-4 text-pop-black mb-8">
            <Recycle className="w-6 h-6" />
            <span className="systematic-caps">Complete Provenance Tracking</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/track">
              <Button size="lg" className="bg-pop-black text-white hover:bg-white hover:text-pop-black systematic-caps text-lg px-8 py-4">
                Track Plastic
              </Button>
            </Link>
            
            <Link href="/about#contact">
              <Button variant="outline" size="lg" className="border-2 border-pop-black text-pop-black hover:bg-pop-black hover:text-white systematic-caps text-lg px-8 py-4">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 bg-pop-black text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl helvetica-bold text-pop-green mb-2">
                {impactMetrics.totalPieces.toLocaleString()}
              </div>
              <div className="systematic-caps text-sm">Pieces Tracked</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl lg:text-5xl helvetica-bold text-pop-blue mb-2">
                {impactMetrics.totalWeight}kg
              </div>
              <div className="systematic-caps text-sm">Plastic Recycled</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl lg:text-5xl helvetica-bold text-pop-red mb-2">
                {impactMetrics.totalCarbonOffset}kg
              </div>
              <div className="systematic-caps text-sm">CO₂ Offset</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl lg:text-5xl helvetica-bold text-pop-green mb-2">
                {impactMetrics.companiesPartnered}
              </div>
              <div className="systematic-caps text-sm">Partner Companies</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl lg:text-6xl helvetica-bold text-center mb-16">
            HOW IT <span className="text-pop-green">WORKS</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <PopArtContainer color="green" className="bg-white border-4 border-pop-green p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-pop-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <Recycle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl helvetica-bold mb-4 systematic-caps">01. Collect</h3>
                <p className="text-pop-gray leading-relaxed">
                  Corporate partners provide waste plastic. We collect, sort, and prepare materials for transformation.
                </p>
              </div>
            </PopArtContainer>
            
            <PopArtContainer color="blue" className="bg-white border-4 border-pop-blue p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-pop-blue rounded-full flex items-center justify-center mx-auto mb-6">
                  <Factory className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl helvetica-bold mb-4 systematic-caps">02. Transform</h3>
                <p className="text-pop-gray leading-relaxed">
                  Heat press into sheets, CNC cut custom designs, laser etch QR codes. Every step tracked.
                </p>
              </div>
            </PopArtContainer>
            
            <PopArtContainer color="red" className="bg-white border-4 border-pop-red p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-pop-red rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl helvetica-bold mb-4 systematic-caps">03. Learn</h3>
                <p className="text-pop-gray leading-relaxed">
                  Educational products with complete provenance. Students learn through making and building.
                </p>
              </div>
            </PopArtContainer>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-pop-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl helvetica-bold mb-8 text-white">
            READY TO TRANSFORM<br />
            YOUR WASTE?
          </h2>
          
          <p className="text-xl mb-12 text-white leading-relaxed">
            Join companies already turning their plastic waste into educational impact.
          </p>
          
          <Link href="/about#contact">
            <Button size="lg" className="bg-pop-green text-pop-black hover:bg-white hover:text-pop-black systematic-caps text-lg px-12 py-4">
              START PARTNERSHIP
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}