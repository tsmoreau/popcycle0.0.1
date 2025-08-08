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

      {/* Story Introduction */}
      <section className="py-20 px-4 bg-pop-green">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl helvetica-bold mb-8 text-white">
            PLASTIC HAS A STORY
          </h2>
          <p className="text-xl lg:text-2xl text-white mb-8 leading-relaxed">
            Every piece holds a history. We make that history visible through material storytelling that transforms waste into wonder.
          </p>
          <div className="text-lg text-white/90">
            This isn't recycling. This is regenerative design.
          </div>
        </div>
      </section>

      {/* The Problem/Opportunity */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl lg:text-4xl helvetica-bold mb-6">
                Your waste stream has <span className="text-pop-red">untold potential</span>
              </h3>
              <p className="text-lg text-pop-gray leading-relaxed mb-6">
                Corporate plastic waste typically disappears into opaque recycling streams. You invest in sustainability but never see the transformation or impact.
              </p>
              <p className="text-lg text-pop-gray leading-relaxed">
                What if every plastic bottle, container, and wrapper became a traceable learning tool? What if your sustainability investment created visible, lasting educational impact?
              </p>
            </div>
            <div className="bg-pop-black p-8 text-white">
              <div className="text-center">
                <div className="text-5xl lg:text-6xl helvetica-bold text-pop-green mb-4">
                  {impactMetrics.totalPieces.toLocaleString()}
                </div>
                <div className="systematic-caps text-lg mb-6">Pieces Given New Life</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-2xl helvetica-bold text-white">{impactMetrics.totalWeight}kg</div>
                    <div className="systematic-caps">Transformed</div>
                  </div>
                  <div>
                    <div className="text-2xl helvetica-bold text-white">{impactMetrics.companiesPartnered}</div>
                    <div className="systematic-caps">Partners</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The PopCycle Difference */}
      <section className="py-20 px-4 bg-pop-blue">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl helvetica-bold mb-8 text-white">
              WE CREATE <span className="text-pop-green">MATERIAL STORIES</span>
            </h2>
            <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Through minimal processing and maximum transparency, we turn your discarded materials into durable products that inspire hands-on learning and prove sustainability isn't just a buzzword.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 border-4 border-white">
              <div className="w-16 h-16 bg-pop-green rounded-full flex items-center justify-center mx-auto mb-6">
                <Recycle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl helvetica-bold mb-4 systematic-caps">COLLECT & CONNECT</h3>
              <p className="text-pop-gray leading-relaxed text-sm">
                Branded collection bins create direct links from your organization to finished products. Every kilogram becomes traceable raw material.
              </p>
            </div>
            
            <div className="bg-white p-8 border-4 border-white">
              <div className="w-16 h-16 bg-pop-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <Factory className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl helvetica-bold mb-4 systematic-caps">TRANSFORM & TRACE</h3>
              <p className="text-pop-gray leading-relaxed text-sm">
                Heat-pressed sheets, precision-cut designs, laser-etched QR codes. Minimal processing, maximum transparency, complete provenance.
              </p>
            </div>
            
            <div className="bg-white p-8 border-4 border-white">
              <div className="w-16 h-16 bg-pop-red rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl helvetica-bold mb-4 systematic-caps">MAKE & MATTER</h3>
              <p className="text-pop-gray leading-relaxed text-sm">
                Educational products that prove impact. Local manufacturing creates jobs while your materials become stories of regeneration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Visualization */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl helvetica-bold mb-8">
              FOLLOW EVERY <span className="text-pop-green">TRANSFORMATION</span>
            </h2>
            <p className="text-xl text-pop-gray max-w-4xl mx-auto">
              Scan any QR code to witness the complete journey from waste stream to learning tool
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <PopArtContainer color="green" className="bg-pop-green text-white p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-10 h-10 text-pop-green" />
                </div>
                <h3 className="text-2xl helvetica-bold mb-4 systematic-caps">01. SOURCE</h3>
                <p className="leading-relaxed">
                  Your collection bin. GPS coordinates. Collection date. Batch weight. The story begins here.
                </p>
              </div>
            </PopArtContainer>
            
            <PopArtContainer color="blue" className="bg-pop-blue text-white p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <RotateCcw className="w-10 h-10 text-pop-blue" />
                </div>
                <h3 className="text-2xl helvetica-bold mb-4 systematic-caps">02. PROCESS</h3>
                <p className="leading-relaxed">
                  Cleaning, heating, forming. Each step documented. Watch plastic sheets become precision-cut designs.
                </p>
              </div>
            </PopArtContainer>
            
            <PopArtContainer color="red" className="bg-pop-red text-white p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-pop-red" />
                </div>
                <h3 className="text-2xl helvetica-bold mb-4 systematic-caps">03. IMPACT</h3>
                <p className="leading-relaxed">
                  Makers register items. Add their stories. Your waste becomes part of ongoing educational journeys.
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