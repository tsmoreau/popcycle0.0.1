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
            <span className="text-pop-green">COMPLETE</span><br />
            THE SUPPLY<br />
            CHAIN
          </h1>
          
          <p className="text-xl lg:text-2xl max-w-4xl mx-auto mb-12 leading-relaxed text-pop-black">
            Your stakeholders deserve the same transparency for your waste as your products. 
            Track. Prove. Close the loop.
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
            WE TRACK EVERYTHING<br />
            <span className="text-pop-green">EXCEPT WHAT MATTERS.</span>
          </h2>
          <p className="text-2xl lg:text-3xl text-white/90 mb-6 leading-relaxed max-w-4xl mx-auto">
            Amazon can tell you where your package is at 2:47 AM. But where's your plastic bottle right now?
          </p>
          <div className="text-xl text-pop-green font-medium">
            True sustainability isn't what you buy — it's what you can prove about what you waste.
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
              PROVE YOUR SUSTAINABILITY.<br />
              <span className="text-pop-blue">DON'T JUST PROMISE IT.</span>
            </h2>
            <p className="text-xl lg:text-2xl text-pop-gray max-w-4xl mx-auto leading-relaxed">
              Complete circular economy tracking from your waste stream back to your products. 
              Full transparency that turns sustainability claims into verifiable data.
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
                    <h3 className="text-2xl helvetica-bold mb-4 systematic-caps">COLLECT & TRACK</h3>
                    <p className="leading-relaxed">
                      Your waste becomes a traceable resource. Each bin gets a unique QR code that follows 
                      your specific plastic through the entire circular journey back to you.
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
                      Your plastic stays traceable through minimal processing. Each transformation step 
                      is logged and verified, maintaining complete chain of custody from your waste bin.
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
                    <h3 className="text-2xl helvetica-bold mb-4 systematic-caps">DELIVER & VERIFY</h3>
                    <p className="leading-relaxed">
                      Your waste returns as custom products with complete provenance data. 
                      Scan the QR code to see the verified journey from your bin to your hands.
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
              THE TRACKING <span className="text-pop-red">GAP</span>
            </h2>
            <p className="text-xl lg:text-2xl text-pop-gray max-w-4xl mx-auto leading-relaxed">
              Supply chains have tracking perfected. Waste streams don't. 
              Organizations need verifiable circularity, not just good intentions.
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
                    <h3 className="text-2xl helvetica-bold mb-4 systematic-caps">TRADITIONAL WASTE</h3>
                    <p className="leading-relaxed">
                      Zero tracking after disposal. Your plastic disappears into generic processing. 
                      No proof of impact for sustainability reporting.
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
                    <h3 className="text-2xl helvetica-bold mb-4 systematic-caps">POPCYCLE TRACKING</h3>
                    <p className="leading-relaxed">
                      Complete transparency from your bin to your custom product. Every step tracked and verified. 
                      Direct proof of your organization's circular impact.
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
                      100% material accountability. Verifiable sustainability data. 
                      Custom products that prove your circular economy commitment.
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
            READY TO PROVE<br />
            YOUR IMPACT?
          </h2>
          
          <p className="text-xl mb-12 text-white leading-relaxed">
            Join organizations already turning sustainability promises into verifiable circular data.
          </p>
          
          <Link href="/about#contact">
            <Button size="lg" className="bg-pop-green text-pop-black hover:bg-white hover:text-pop-black systematic-caps text-lg px-12 py-4">
              PROVE YOUR SUSTAINABILITY
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}