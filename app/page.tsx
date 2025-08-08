import Link from "next/link";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { PopArtContainer, QRCodeElement } from "./components/PopArtElements";
import { ArrowRight, Recycle, Factory, Zap, Users, Eye, RotateCcw, Target, Scan } from "lucide-react";

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
            <span className="text-pop-green">PLASTIC HAS A STORY.</span><br />
            WE HELP YOU TELL IT.
          </h1>
          
          <p className="text-xl lg:text-2xl max-w-4xl mx-auto mb-8 leading-relaxed text-pop-black">
            We are PopCycle. We turn corporate plastic waste into trackable, educational products. 
            This isn't recycling. This is material storytelling.
          </p>
          
          <div className="text-lg lg:text-xl max-w-3xl mx-auto mb-12 text-pop-gray font-medium">
            Every piece of plastic holds a history. We make that history visible.
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/track">
              <Button size="lg" className="bg-pop-green text-white hover:bg-white hover:text-pop-black systematic-caps text-lg px-8 py-4">
                <Scan className="mr-2 w-5 h-5" />
                Track Your Story
              </Button>
            </Link>
            
            <Link href="/about#contact">
              <Button variant="outline" size="lg" className="border-2 border-pop-black text-pop-black hover:bg-pop-black hover:text-white systematic-caps text-lg px-8 py-4">
                Start Partnership
                <ArrowRight className="ml-2 w-5 h-5" />
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
              <div className="text-4xl lg:text-5xl helvetica-bold text-white mb-2">
                {impactMetrics.totalPieces.toLocaleString()}
              </div>
              <div className="systematic-caps text-sm">Pieces Tracked</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl lg:text-5xl helvetica-bold text-white mb-2">
                {impactMetrics.totalWeight}kg
              </div>
              <div className="systematic-caps text-sm">Plastic Recycled</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl lg:text-5xl helvetica-bold text-white mb-2">
                {impactMetrics.totalCarbonOffset}kg
              </div>
              <div className="systematic-caps text-sm">CO₂ Offset</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl lg:text-5xl helvetica-bold text-white mb-2">
                {impactMetrics.companiesPartnered}
              </div>
              <div className="systematic-caps text-sm">Partner Companies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl helvetica-bold mb-6">
              Don't just recycle. <span className="text-pop-green">Recirculate.</span>
            </h2>
            <p className="text-lg lg:text-xl max-w-4xl mx-auto text-pop-gray leading-relaxed">
              Every PopCycle product has a journey you can follow. We use a material-honest approach to turn what's been discarded into something that inspires. Our process is local, regenerative, and transparent from start to finish.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <PopArtContainer color="green" className="bg-white border-4 border-pop-green p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-pop-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <Recycle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl helvetica-bold mb-4 systematic-caps text-pop-green">COLLECT & CONNECT</h3>
                <p className="text-pop-gray leading-relaxed">
                  Your waste becomes a traceable resource. We install our branded bins and collect plastic, creating a direct link from your organization to the final product.
                </p>
              </div>
            </PopArtContainer>
            
            <PopArtContainer color="blue" className="bg-white border-4 border-pop-blue p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-pop-blue rounded-full flex items-center justify-center mx-auto mb-6">
                  <Factory className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl helvetica-bold mb-4 systematic-caps text-pop-blue">TRANSFORM & TRACE</h3>
                <p className="text-pop-gray leading-relaxed">
                  We use minimal, non-destructive processes to clean and shape the plastic. Our laser-etched QR codes ensure every object carries its full provenance—from raw material to finished product.
                </p>
              </div>
            </PopArtContainer>
            
            <PopArtContainer color="red" className="bg-white border-4 border-pop-red p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-pop-red rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl helvetica-bold mb-4 systematic-caps text-pop-red">MAKE & MATTER</h3>
                <p className="text-pop-gray leading-relaxed">
                  We deliver durable, educational products that prove sustainability doesn't have to be a buzzword. Your material becomes a story of hands-on learning and real, local impact.
                </p>
              </div>
            </PopArtContainer>
          </div>
        </div>
      </section>

      {/* Journey Tracking Section */}
      <section className="py-20 px-4 bg-pop-gray">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl helvetica-bold mb-8 text-white">
              FOLLOW THE <span className="text-pop-green">JOURNEY</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="bg-white p-8 border-4 border-white">
              <div className="text-center">
                <div className="w-16 h-16 bg-pop-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl helvetica-bold mb-4 systematic-caps text-pop-green">SEE THE SOURCE</h3>
                <p className="text-pop-gray leading-relaxed">
                  Your journey begins at our partner's collection bin, where every kilogram of plastic starts its new life.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-8 border-4 border-white">
              <div className="text-center">
                <div className="w-16 h-16 bg-pop-blue rounded-full flex items-center justify-center mx-auto mb-6">
                  <RotateCcw className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl helvetica-bold mb-4 systematic-caps text-pop-blue">FOLLOW THE TRANSFORMATION</h3>
                <p className="text-pop-gray leading-relaxed">
                  We give each batch of plastic a unique QR code. You can follow it as it is cleaned, pressed into sheets, and precision-cut into a new design.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-8 border-4 border-white">
              <div className="text-center">
                <div className="w-16 h-16 bg-pop-red rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl helvetica-bold mb-4 systematic-caps text-pop-red">COMPLETE THE CIRCLE</h3>
                <p className="text-pop-gray leading-relaxed">
                  When you get a PopCycle product, you become part of the story. You can register your item and add your own maker journey to its history.
                </p>
              </div>
            </div>
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