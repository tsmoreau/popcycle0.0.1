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
              <Button size="lg" className="bg-pop-green text-white hover:bg-white hover:text-pop-black systematic-caps text-lg px-8 py-4">
                Track Plastic
              </Button>
            </Link>
            
            <Link href="/about#faq">
              <Button variant="outline" size="lg" className="border-2 border-pop-black text-pop-black hover:bg-pop-black hover:text-white systematic-caps text-lg px-8 py-4">
                FAQ
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Bold Hook Statement */}
      <section className="py-24 px-4 bg-pop-black">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl lg:text-7xl helvetica-bold mb-8 text-white leading-tight">
            PLASTIC HAS A STORY.<br />
            <span className="text-pop-green">WE HELP YOU TELL IT.</span>
          </h2>
          <p className="text-2xl lg:text-3xl text-white/90 mb-6 leading-relaxed max-w-4xl mx-auto">
            This isn't recycling. This is material storytelling.
          </p>
          <div className="text-xl text-pop-green font-medium">
            Every piece of plastic holds a history. We make that history visible.
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 bg-pop-green text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl helvetica-bold text-white mb-2">
                {impactMetrics.totalPieces.toLocaleString()}
              </div>
              <div className="systematic-caps text-sm">Stories Tracked</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl lg:text-5xl helvetica-bold text-white mb-2">
                {impactMetrics.totalWeight}kg
              </div>
              <div className="systematic-caps text-sm">Materials Transformed</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl lg:text-5xl helvetica-bold text-white mb-2">
                {impactMetrics.totalCarbonOffset}kg
              </div>
              <div className="systematic-caps text-sm">CO₂ Impact</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl lg:text-5xl helvetica-bold text-white mb-2">
                {impactMetrics.companiesPartnered}
              </div>
              <div className="systematic-caps text-sm">Storytellers</div>
            </div>
          </div>
        </div>
      </section>

      {/* The PopCycle Way */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl helvetica-bold mb-8">
              DON'T JUST RECYCLE.<br />
              <span className="text-pop-blue">RECIRCULATE.</span>
            </h2>
            <p className="text-xl lg:text-2xl text-pop-gray max-w-4xl mx-auto leading-relaxed">
              We use a material-honest approach to turn what's been discarded into something that inspires. 
              Local, regenerative, and transparent from start to finish.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <PopArtContainer color="green" className="bg-white border-4 border-pop-green p-10 hover:bg-pop-green hover:text-white transition-all duration-300">
              <div className="text-center">
                <div className="w-20 h-20 bg-pop-green rounded-full flex items-center justify-center mx-auto mb-8">
                  <Recycle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl helvetica-bold mb-6 systematic-caps">COLLECT & CONNECT</h3>
                <p className="leading-relaxed text-lg">
                  Your waste becomes a traceable resource. We install branded bins and collect plastic, 
                  creating a direct link from your organization to the final product.
                </p>
              </div>
            </PopArtContainer>
            
            <PopArtContainer color="blue" className="bg-white border-4 border-pop-blue p-10 hover:bg-pop-blue hover:text-white transition-all duration-300">
              <div className="text-center">
                <div className="w-20 h-20 bg-pop-blue rounded-full flex items-center justify-center mx-auto mb-8">
                  <Factory className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl helvetica-bold mb-6 systematic-caps">TRANSFORM & TRACE</h3>
                <p className="leading-relaxed text-lg">
                  Minimal, non-destructive processes clean and shape plastic. Laser-etched QR codes 
                  ensure every object carries its full provenance—raw material to finished product.
                </p>
              </div>
            </PopArtContainer>
            
            <PopArtContainer color="red" className="bg-white border-4 border-pop-red p-10 hover:bg-pop-red hover:text-white transition-all duration-300">
              <div className="text-center">
                <div className="w-20 h-20 bg-pop-red rounded-full flex items-center justify-center mx-auto mb-8">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl helvetica-bold mb-6 systematic-caps">MAKE & MATTER</h3>
                <p className="leading-relaxed text-lg">
                  Durable, educational products that prove sustainability doesn't have to be a buzzword. 
                  Your material becomes stories of hands-on learning and real impact.
                </p>
              </div>
            </PopArtContainer>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl helvetica-bold mb-8 text-pop-black">
              WHY THIS <span className="text-pop-red">MATTERS</span>
            </h2>
            <p className="text-xl lg:text-2xl text-pop-gray max-w-4xl mx-auto leading-relaxed">
              Traditional recycling is a black box. You never see the impact. We're changing that.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h3 className="text-3xl lg:text-4xl helvetica-bold mb-8 text-pop-black">
                TRADITIONAL RECYCLING
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-pop-red rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">✗</span>
                  </div>
                  <p className="text-lg text-pop-gray">No visibility into what happens to your waste</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-pop-red rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">✗</span>
                  </div>
                  <p className="text-lg text-pop-gray">Generic processing that downgrades materials</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-pop-red rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">✗</span>
                  </div>
                  <p className="text-lg text-pop-gray">No connection to educational or community impact</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl lg:text-4xl helvetica-bold mb-8 text-pop-green">
                POPCYCLE APPROACH
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-pop-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                  <p className="text-lg text-pop-gray">Complete transparency from bin to final product</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-pop-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                  <p className="text-lg text-pop-gray">Minimal processing that preserves material integrity</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-pop-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                  <p className="text-lg text-pop-gray">Direct connection to educational outcomes and makers</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-pop-blue p-12 text-white text-center">
            <h3 className="text-3xl lg:text-4xl helvetica-bold mb-6">
              THE RESULT: <span className="text-pop-green">REAL IMPACT</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl helvetica-bold mb-2">100%</div>
                <p className="systematic-caps">Material Accountability</p>
              </div>
              <div>
                <div className="text-4xl helvetica-bold mb-2">LOCAL</div>
                <p className="systematic-caps">Community Manufacturing</p>
              </div>
              <div>
                <div className="text-4xl helvetica-bold mb-2">LASTING</div>
                <p className="systematic-caps">Educational Products</p>
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