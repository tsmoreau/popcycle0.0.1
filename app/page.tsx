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
      <section className="py-32 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl lg:text-8xl helvetica-bold mb-8 tracking-tight">
            <span className="text-pop-green">TRACK</span><br />
            YOUR PLASTIC'S<br />
            JOURNEY
          </h1>
          
          <p className="text-xl lg:text-2xl max-w-4xl mx-auto mb-12 leading-relaxed text-pop-black">
            Each PopCycle product tells an essential story of transformation from plastic waste to enduring engagement. 
            Scan. Learn. Make.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/track">
              <Button size="lg" className="bg-pop-green text-white hover:bg-white hover:text-pop-black systematic-caps text-lg px-8 py-4">
                Track Plastic
              </Button>
            </Link>

            <Link href="/about#faq">
              <Button variant="outline" size="lg" className="border-2 border-pop-black text-pop-black hover:bg-pop-black hover:text-white systematic-caps text-lg px-8 py-4">
                Learn More
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
        <div className="max-w-4xl mx-auto">
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
          
          <div className="space-y-20">
            <div className="relative">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <PopArtContainer color="green" className="bg-pop-green text-white p-8 relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-white text-pop-green rounded-full flex items-center justify-center font-bold text-xl">
                    01
                  </div>
                  <div className="text-center pt-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                      <Recycle className="w-8 h-8 text-pop-green" />
                    </div>
                    <h3 className="text-2xl helvetica-bold mb-4 systematic-caps">COLLECT & CONNECT</h3>
                    <p className="leading-relaxed">
                      Your waste becomes a traceable resource. We install branded bins and collect plastic, 
                      creating a direct link from your organization to the final product.
                    </p>
                  </div>
                </PopArtContainer>

                <PopArtContainer color="blue" className="bg-pop-blue text-white p-8 relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-white text-pop-blue rounded-full flex items-center justify-center font-bold text-xl">
                    02
                  </div>
                  <div className="text-center pt-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                      <Factory className="w-8 h-8 text-pop-blue" />
                    </div>
                    <h3 className="text-2xl helvetica-bold mb-4 systematic-caps">TRANSFORM & TRACE</h3>
                    <p className="leading-relaxed">
                      Minimal, non-destructive processes clean and shape plastic. Laser-etched QR codes 
                      ensure every object carries its full provenance—raw material to finished product.
                    </p>
                  </div>
                </PopArtContainer>

                <PopArtContainer color="red" className="bg-pop-red text-white p-8 relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-white text-pop-red rounded-full flex items-center justify-center font-bold text-xl">
                    03
                  </div>
                  <div className="text-center pt-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                      <Target className="w-8 h-8 text-pop-red" />
                    </div>
                    <h3 className="text-2xl helvetica-bold mb-4 systematic-caps">MAKE & ENGAGE</h3>
                    <p className="leading-relaxed">
                      Durable, educational products that prove sustainability doesn't have to be a buzzword. 
                      Your material becomes stories of hands-on learning and real impact.
                    </p>
                  </div>
                </PopArtContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl helvetica-bold mb-8 text-pop-black">
              WHY THIS <span className="text-pop-red">MATTERS</span>
            </h2>
            <p className="text-xl lg:text-2xl text-pop-gray max-w-4xl mx-auto leading-relaxed">
              Traditional recycling is a black box. You never see the impact. We're changing that.
            </p>
          </div>
          
          <div className="space-y-20">
            <div className="relative">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <PopArtContainer color="red" className="bg-pop-red text-white p-8 relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-white text-pop-red rounded-full flex items-center justify-center font-bold text-xl">
                    ✗
                  </div>
                  <div className="text-center pt-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                      <Eye className="w-8 h-8 text-pop-red" />
                    </div>
                    <h3 className="text-2xl helvetica-bold mb-4 systematic-caps">TRADITIONAL RECYCLING</h3>
                    <p className="leading-relaxed">
                      No visibility into what happens to your waste. Generic processing that downgrades materials. 
                      No connection to educational impact.
                    </p>
                  </div>
                </PopArtContainer>

                <PopArtContainer color="green" className="bg-pop-green text-white p-8 relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-white text-pop-green rounded-full flex items-center justify-center font-bold text-xl">
                    ✓
                  </div>
                  <div className="text-center pt-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                      <RotateCcw className="w-8 h-8 text-pop-green" />
                    </div>
                    <h3 className="text-2xl helvetica-bold mb-4 systematic-caps">POPCYCLE APPROACH</h3>
                    <p className="leading-relaxed">
                      Complete transparency from bin to final product. Minimal processing that preserves material integrity. 
                      Direct connection to educational outcomes.
                    </p>
                  </div>
                </PopArtContainer>

                <PopArtContainer color="blue" className="bg-pop-blue text-white p-8 relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-white text-pop-blue rounded-full flex items-center justify-center font-bold text-xl">
                    ∞
                  </div>
                  <div className="text-center pt-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                      <Target className="w-8 h-8 text-pop-blue" />
                    </div>
                    <h3 className="text-2xl helvetica-bold mb-4 systematic-caps">THE RESULT</h3>
                    <p className="leading-relaxed">
                      100% material accountability. Local community manufacturing. 
                      Lasting educational products that inspire hands-on learning.
                    </p>
                  </div>
                </PopArtContainer>
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