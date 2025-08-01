import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PopArtContainer } from "@/components/pop-art-elements";
import { Link } from "wouter";
import { Building, GraduationCap, Users, Cog, Package, Zap } from "lucide-react";

export default function Services() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-7xl helvetica-bold mb-8 tracking-tight">
            OUR<br />
            <span className="text-pop-green">SERVICES</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed text-pop-gray">
            Transform waste into educational impact through our integrated circular economy services.
          </p>
        </div>

        {/* Core Services */}
        <div id="waste-processing" className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          <PopArtContainer color="green" shadow className="bg-white border-4 border-pop-green p-8">
            <div className="w-16 h-16 bg-pop-green mb-6 flex items-center justify-center">
              <Cog className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl helvetica-bold mb-4 systematic-caps">Waste Processing</h3>
            <p className="text-lg leading-relaxed mb-6">
              Complete plastic waste collection, sorting, and transformation into functional products with full traceability.
            </p>
            <ul className="space-y-2 text-sm">
              <li>• Free corporate pickup</li>
              <li>• HDPE material processing</li>
              <li>• Heat press → CNC cutting</li>
              <li>• QR code tracking integration</li>
            </ul>
          </PopArtContainer>
          
          <PopArtContainer id="educational-workshops" color="blue" shadow className="bg-white border-4 border-pop-blue p-8">
            <div className="w-16 h-16 bg-pop-blue mb-6 flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl helvetica-bold mb-4 systematic-caps">Educational Workshops</h3>
            <p className="text-lg leading-relaxed mb-6">
              Hands-on maker workshops that teach circular economy principles through building real products.
            </p>
            <ul className="space-y-2 text-sm">
              <li>• Corporate team building</li>
              <li>• School curriculum packages</li>
              <li>• Summer camp programs</li>
              <li>• Adult maker workshops</li>
            </ul>
          </PopArtContainer>
          
          <PopArtContainer id="custom-products" color="red" shadow className="bg-white border-4 border-pop-red p-8">
            <div className="w-16 h-16 bg-pop-red mb-6 flex items-center justify-center">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl helvetica-bold mb-4 systematic-caps">Custom Products</h3>
            <p className="text-lg leading-relaxed mb-6">
              Branded educational products made from your company's waste plastic with complete provenance tracking.
            </p>
            <ul className="space-y-2 text-sm">
              <li>• Pop-out assembly toys</li>
              <li>• Robot chassis components</li>
              <li>• Custom corporate items</li>
              <li>• Educational kits</li>
            </ul>
          </PopArtContainer>
        </div>

        {/* Service Categories */}
        <div className="space-y-16">
          {/* Corporate Services */}
          <div id="corporate-services">
            <h2 className="text-4xl helvetica-bold mb-12 text-center systematic-caps">
              For <span className="text-pop-green">Corporations</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-4 border-pop-green">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-pop-green">
                    <Building className="w-6 h-6" />
                    <span className="helvetica-bold systematic-caps">ESG Compliance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Complete waste-to-impact reporting for sustainability goals.</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Monthly impact reports</li>
                    <li>• Carbon offset calculations</li>
                    <li>• Supply chain transparency</li>
                    <li>• Regulatory compliance support</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-4 border-pop-green">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-pop-green">
                    <Users className="w-6 h-6" />
                    <span className="helvetica-bold systematic-caps">Team Building</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Engaging workshops that build products from your company's waste.</p>
                  <ul className="space-y-2 text-sm">
                    <li>• 4-hour workshop sessions</li>
                    <li>• 15-20 person capacity</li>
                    <li>• $200-300 per person</li>
                    <li>• Take-home products</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Educational Services */}
          <div id="educational-services">
            <h2 className="text-4xl helvetica-bold mb-12 text-center systematic-caps">
              For <span className="text-pop-blue">Educational</span> Institutions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-4 border-pop-blue">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-pop-blue">
                    <GraduationCap className="w-6 h-6" />
                    <span className="helvetica-bold systematic-caps">Curriculum Integration</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Complete STEM curriculum packages with teacher training.</p>
                  <ul className="space-y-2 text-sm">
                    <li>• 5-day program modules</li>
                    <li>• Teacher certification</li>
                    <li>• Materials included</li>
                    <li>• Assessment rubrics</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-4 border-pop-blue">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-pop-blue">
                    <Zap className="w-6 h-6" />
                    <span className="helvetica-bold systematic-caps">After-School Programs</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Maker-focused after-school programming with skill progression.</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Weekly 2-hour sessions</li>
                    <li>• Skill tracking system</li>
                    <li>• Project-based learning</li>
                    <li>• Community showcase events</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Process Overview */}
        <div className="mt-20 mb-20">
          <h2 className="text-4xl helvetica-bold mb-12 text-center systematic-caps">
            Service <span className="text-pop-red">Process</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <PopArtContainer color="green" className="bg-white border-4 border-pop-green p-6 text-center">
              <div className="w-12 h-12 bg-pop-green text-white rounded-full flex items-center justify-center helvetica-bold text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="helvetica-bold mb-2 systematic-caps">Consultation</h3>
              <p className="text-sm">Assess needs and design custom solution</p>
            </PopArtContainer>
            
            <PopArtContainer color="blue" className="bg-white border-4 border-pop-blue p-6 text-center">
              <div className="w-12 h-12 bg-pop-blue text-white rounded-full flex items-center justify-center helvetica-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="helvetica-bold mb-2 systematic-caps">Collection</h3>
              <p className="text-sm">Pickup and process waste materials</p>
            </PopArtContainer>
            
            <PopArtContainer color="red" className="bg-white border-4 border-pop-red p-6 text-center">
              <div className="w-12 h-12 bg-pop-red text-white rounded-full flex items-center justify-center helvetica-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="helvetica-bold mb-2 systematic-caps">Transform</h3>
              <p className="text-sm">Create trackable products from waste</p>
            </PopArtContainer>
            
            <PopArtContainer color="green" className="bg-white border-4 border-pop-green p-6 text-center">
              <div className="w-12 h-12 bg-pop-green text-white rounded-full flex items-center justify-center helvetica-bold text-xl mx-auto mb-4">
                4
              </div>
              <h3 className="helvetica-bold mb-2 systematic-caps">Engage</h3>
              <p className="text-sm">Deliver workshops and educational impact</p>
            </PopArtContainer>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <PopArtContainer color="red" pattern="geometric" className="bg-pop-red text-white p-12">
            <h2 className="text-4xl helvetica-bold mb-6 systematic-caps">Ready to Start?</h2>
            <p className="text-xl mb-8 leading-relaxed">
              Let's discuss how PopCycle services can transform your waste into educational impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-pop-red hover:bg-gray-100 systematic-caps text-lg px-8 py-4">
                Schedule Consultation
              </Button>
              <Link href="/track">
                <Button variant="outline" className="border-4 border-white text-white hover:bg-white hover:text-pop-red systematic-caps text-lg px-8 py-4">
                  See Our Work
                </Button>
              </Link>
            </div>
          </PopArtContainer>
        </div>
      </div>
    </div>
  );
}