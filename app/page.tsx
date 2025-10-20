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
    <div className="min-h-screen font-jost">
      {/* Hero Section */}
      <section className="py-40 lg:py-48 px-6 bg-white font-jost">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-5xl lg:text-7xl mb-10 tracking-tight leading-tight">
            connecting <span className="text-pop-green">systemic</span> and <span className="text-pop-red">aesthetic</span> dimensions of <span className="text-pop-blue">recycled</span> materials
           
          </span>
          
          <p className="text-lg lg:text-xl max-w-3xl mx-auto mb-14 leading-relaxed text-gray-700">
            we transform plastic waste into custom-branded products with complete traceability. 
            every item tells a story of sustainability, from bins and back again.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          

            <Link href="/about#faq">
              <Button variant="outline" size="lg" className="border border-gray-300 text-gray-900 hover:bg-gray-900 hover:text-white systematic-caps text-base px-10 py-6 transition-all">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Bold Hook Statement */}
      <section className="py-28 lg:py-32 px-6 bg-gray-900">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl  mb-10 text-white leading-tight">
            WE TRACK EVERYTHING<br />
            <span className="text-pop-green">EXCEPT WHAT MATTERS.</span>
          </h2>
          <p className="text-xl lg:text-2xl text-white/80 mb-8 leading-relaxed max-w-4xl mx-auto">
            Amazon can tell you where your package is at 2:47 AM. But where's your plastic bottle right now?
          </p>
          <div className="text-lg text-pop-green font-medium">
            True sustainability isn't just about what you buy, it's about what you waste.
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-20 lg:py-24 bg-pop-green text-white font-jost">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-3">
                {impactMetrics.totalPieces.toLocaleString()}
              </div>
              <div className="systematic-caps text-sm tracking-wider opacity-90">Stories Tracked</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-3">
                {impactMetrics.totalWeight}kg
              </div>
              <div className="systematic-caps text-sm tracking-wider opacity-90">Materials Transformed</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-3">
                {impactMetrics.totalCarbonOffset}kg
              </div>
              <div className="systematic-caps text-sm tracking-wider opacity-90">CO₂ Impact</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-3">
                {impactMetrics.companiesPartnered}
              </div>
              <div className="systematic-caps text-sm tracking-wider opacity-90">Storytellers</div>
            </div>
          </div>
        </div>
      </section>

      {/* The PopCycle Way */}
      <section className="py-28 lg:py-32 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
              PROVE YOUR SUSTAINABILITY.<br />
              <span className="text-pop-blue">DON'T JUST PROMISE IT.</span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Stock your spaces with custom products made from your own waste stream. 
              Every piece comes with verifiable impact data and branded tracking portals.
            </p>
          </div>
          
          <div className="space-y-20">
            <div className="relative">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-gray-200 divide-x divide-y divide-gray-200 bg-white">
                <div className="bg-white p-10 relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-pop-green text-white flex items-center justify-center font-bold text-lg">
                    01
                  </div>
                  <div className="text-center pt-4">
                    <div className="w-16 h-16 bg-pop-green/10 flex items-center justify-center mx-auto mb-6">
                      <Recycle className="w-8 h-8 text-pop-green" />
                    </div>
                    <h3 className="text-xl helvetica-bold mb-4 systematic-caps text-pop-green">COLLECT & TRACK</h3>
                    <p className="leading-relaxed text-gray-600">
                      Your waste becomes a traceable resource. Each bin gets a unique QR code that follows 
                      your specific plastic through the entire circular journey back to you.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-10 relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-pop-blue text-white flex items-center justify-center font-bold text-lg">
                    02
                  </div>
                  <div className="text-center pt-4">
                    <div className="w-16 h-16 bg-pop-blue/10 flex items-center justify-center mx-auto mb-6">
                      <Factory className="w-8 h-8 text-pop-blue" />
                    </div>
                    <h3 className="text-xl helvetica-bold mb-4 systematic-caps text-pop-blue">TRANSFORM & TRACE</h3>
                    <p className="leading-relaxed text-gray-600">
                      Your plastic stays traceable through minimal processing. Each transformation step 
                      is logged and verified, maintaining complete chain of custody from your waste bin.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-10 relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-pop-red text-white flex items-center justify-center font-bold text-lg">
                    03
                  </div>
                  <div className="text-center pt-4">
                    <div className="w-16 h-16 bg-pop-red/10 flex items-center justify-center mx-auto mb-6">
                      <Target className="w-8 h-8 text-pop-red" />
                    </div>
                    <h3 className="text-xl helvetica-bold mb-4 systematic-caps text-pop-red">DELIVER & VERIFY</h3>
                    <p className="leading-relaxed text-gray-600">
                      Your waste returns as custom products with complete provenance data. 
                      Scan the QR code to see the verified journey from your bin to your hands.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-28 lg:py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl lg:text-5xl helvetica-bold mb-8 text-gray-900 leading-tight">
              THE TRACKING <span className="text-pop-red">GAP</span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Supply chains have tracking perfected. Waste streams don't. 
              Organizations need verifiable circularity, not just good intentions.
            </p>
          </div>
          
          <div className="space-y-20">
            <div className="relative">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-gray-200 divide-x divide-y divide-gray-200 bg-white">
                <div className="bg-white p-10 relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-pop-red text-white flex items-center justify-center font-bold text-lg">
                    ✗
                  </div>
                  <div className="text-center pt-4">
                    <div className="w-16 h-16 bg-pop-red/10 flex items-center justify-center mx-auto mb-6">
                      <Eye className="w-8 h-8 text-pop-red" />
                    </div>
                    <h3 className="text-xl helvetica-bold mb-4 systematic-caps text-pop-red">TRADITIONAL WASTE</h3>
                    <p className="leading-relaxed text-gray-600">
                      Zero tracking after disposal. Your plastic disappears into generic processing. 
                      No proof of impact for sustainability reporting.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-10 relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-pop-green text-white flex items-center justify-center font-bold text-lg">
                    ✓
                  </div>
                  <div className="text-center pt-4">
                    <div className="w-16 h-16 bg-pop-green/10 flex items-center justify-center mx-auto mb-6">
                      <RotateCcw className="w-8 h-8 text-pop-green" />
                    </div>
                    <h3 className="text-xl helvetica-bold mb-4 systematic-caps text-pop-green">POPCYCLE TRACKING</h3>
                    <p className="leading-relaxed text-gray-600">
                      Complete transparency from your bin to your custom product. Every step tracked and verified. 
                      Direct proof of your organization's circular impact.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-10 relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-pop-blue text-white flex items-center justify-center font-bold text-lg">
                    ∞
                  </div>
                  <div className="text-center pt-4">
                    <div className="w-16 h-16 bg-pop-blue/10 flex items-center justify-center mx-auto mb-6">
                      <Target className="w-8 h-8 text-pop-blue" />
                    </div>
                    <h3 className="text-xl helvetica-bold mb-4 systematic-caps text-pop-blue">THE RESULT</h3>
                    <p className="leading-relaxed text-gray-600">
                      100% material accountability. Verifiable sustainability data. 
                      Custom products that prove your circular economy commitment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 lg:py-32 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl helvetica-bold mb-8 text-white leading-tight">
            READY TO PROVE<br />
            YOUR IMPACT?
          </h2>
          
          <p className="text-lg lg:text-xl mb-12 text-white/80 leading-relaxed max-w-2xl mx-auto">
            Join organizations already turning sustainability promises into verifiable circular data.
          </p>
          
          <Link href="/about#contact">
            <Button size="lg" className="bg-pop-green text-white hover:bg-opacity-90 systematic-caps text-base px-12 py-6  transition-all ">
              PROVE YOUR SUSTAINABILITY
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}