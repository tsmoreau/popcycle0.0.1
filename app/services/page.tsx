import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { PopArtContainer } from "../components/PopArtElements";
import { Recycle, Factory, Package, Wrench, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Services() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl helvetica-bold mb-6 text-pop-black">
            SERVICES
          </h1>
          <p className="text-xl text-pop-gray max-w-3xl mx-auto mb-8">
            Complete circular manufacturing solutions from waste collection through educational product delivery.
          </p>
          <div className="flex justify-center items-center gap-4 text-pop-gray">
            <Factory className="w-6 h-6" />
            <span className="systematic-caps">End-to-End Circular Solutions</span>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">

        {/* Community Partnerships Section */}
        <section className="mb-20 scroll-mt-24" id="community-partnerships">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl helvetica-bold mb-6">
                <span className="text-pop-green">COMMUNITY PARTNERSHIPS</span>
              </h2>
              <p className="text-lg mb-6 text-pop-gray">
                Building circular economy networks through community makerspaces, schools, and local organizations. Every partnership creates new pathways for plastic transformation and education.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-pop-green mr-3"></div>
                  <span className="systematic-caps text-sm">Makerspace integration programs</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-pop-green mr-3"></div>
                  <span className="systematic-caps text-sm">Community collection points</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-pop-green mr-3"></div>
                  <span className="systematic-caps text-sm">Local educator training</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-pop-green mr-3"></div>
                  <span className="systematic-caps text-sm">Impact measurement tools</span>
                </li>
              </ul>
              <Link href="/about#contact">
                <Button className="bg-pop-green text-pop-black hover:bg-pop-black hover:text-white systematic-caps">
                  Join Community Network
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <PopArtContainer color="green" shadow>
              <Card className="border-4 border-pop-black">
                <CardContent className="p-8">
                  <Recycle className="w-16 h-16 text-pop-green mb-6" />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl helvetica-bold text-pop-green">75+</div>
                      <div className="systematic-caps text-xs text-pop-gray">Partner locations</div>
                    </div>
                    <div>
                      <div className="text-2xl helvetica-bold text-pop-green">2.4k</div>
                      <div className="systematic-caps text-xs text-pop-gray">Students reached</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </PopArtContainer>
          </div>
        </section>

        {/* Corporate ESG & Events Section */}
        <section className="mb-20 scroll-mt-24" id="corporate-esg-events">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl helvetica-bold mb-6">
                <span className="text-pop-blue">CORPORATE ESG & EVENTS</span>
              </h2>
              <p className="text-lg mb-6 text-pop-gray">
                Transform corporate sustainability goals into tangible impact through team-building maker workshops and measurable ESG outcomes with complete QR tracking.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-pop-blue mr-3"></div>
                  <span className="systematic-caps text-sm">Team maker workshops</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-pop-blue mr-3"></div>
                  <span className="systematic-caps text-sm">ESG impact reporting</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-pop-blue mr-3"></div>
                  <span className="systematic-caps text-sm">Employee engagement programs</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-pop-blue mr-3"></div>
                  <span className="systematic-caps text-sm">Sustainability storytelling</span>
                </li>
              </ul>
              <Link href="/about#contact">
                <Button className="bg-pop-blue text-white hover:bg-pop-black hover:text-white systematic-caps">
                  Request ESG Consultation
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <PopArtContainer color="blue" shadow>
              <Card className="border-4 border-pop-black">
                <CardContent className="p-8">
                  <Factory className="w-16 h-16 text-pop-blue mb-6" />
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="systematic-caps text-sm">ESG Reporting</span>
                      <span className="text-pop-blue helvetica-bold">100%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="systematic-caps text-sm">Team Events</span>
                      <span className="text-pop-blue helvetica-bold">45+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="systematic-caps text-sm">Carbon Offset</span>
                      <span className="text-pop-blue helvetica-bold">2.1t</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </PopArtContainer>
          </div>
        </section>

        {/* Educational Kits & Workshops Section */}
        <section className="mb-20 scroll-mt-24" id="educational-kits-workshops">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl helvetica-bold mb-6">
                <span className="text-pop-red">EDUCATIONAL KITS & WORKSHOPS</span>
              </h2>
              <p className="text-lg mb-6 text-pop-gray">
                Complete maker education experiences using products made from tracked plastic waste. Every kit tells the story of circular manufacturing through hands-on learning.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <Badge className="bg-pop-red text-white mb-2">Robotics Kits</Badge>
                  <p className="text-sm text-pop-gray">Build rovers from plastic waste</p>
                </div>
                <div>
                  <Badge className="bg-pop-red text-white mb-2">Maker Workshops</Badge>
                  <p className="text-sm text-pop-gray">Hands-on circular economy education</p>
                </div>
                <div>
                  <Badge className="bg-pop-red text-white mb-2">Assembly Sets</Badge>
                  <p className="text-sm text-pop-gray">STEM construction challenges</p>
                </div>
                <div>
                  <Badge className="bg-pop-red text-white mb-2">QR Tracking</Badge>
                  <p className="text-sm text-pop-gray">Complete waste-to-product stories</p>
                </div>
              </div>
              <Link href="/shop">
                <Button className="bg-pop-red text-white hover:bg-pop-black hover:text-white systematic-caps">
                  View Educational Kits
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <PopArtContainer color="red" shadow>
              <Card className="border-4 border-pop-black">
                <CardContent className="p-8">
                  <Package className="w-16 h-16 text-pop-red mb-6" />
                  <div className="space-y-3">
                    <div className="systematic-caps text-xs text-pop-gray mb-2">Monthly kit production</div>
                    <div className="text-3xl helvetica-bold text-pop-red">850</div>
                    <div className="systematic-caps text-xs text-pop-gray">Educational kits delivered</div>
                  </div>
                </CardContent>
              </Card>
            </PopArtContainer>
          </div>
        </section>

        {/* Custom Products Section */}
        <section className="scroll-mt-24" id="custom-products">
          <div className="text-center mb-12">
            <h2 className="text-4xl helvetica-bold mb-6">
              <span className="text-pop-black">CUSTOM PRODUCTS</span>
            </h2>
            <p className="text-lg text-pop-gray max-w-3xl mx-auto mb-8">
              Design custom educational products from your plastic waste. Complete QR tracking from your office to your classroom.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <PopArtContainer color="green" shadow>
              <Card className="border-4 border-pop-black text-center">
                <CardContent className="p-6">
                  <Wrench className="w-12 h-12 text-pop-green mx-auto mb-4" />
                  <h3 className="systematic-caps text-lg mb-2">Design Consultation</h3>
                  <p className="text-sm text-pop-gray">Custom product development tailored to your educational needs</p>
                </CardContent>
              </Card>
            </PopArtContainer>
            
            <PopArtContainer color="blue" shadow>
              <Card className="border-4 border-pop-black text-center">
                <CardContent className="p-6">
                  <Factory className="w-12 h-12 text-pop-blue mx-auto mb-4" />
                  <h3 className="systematic-caps text-lg mb-2">Prototyping</h3>
                  <p className="text-sm text-pop-gray">Rapid prototyping and testing before full production runs</p>
                </CardContent>
              </Card>
            </PopArtContainer>
            
            <PopArtContainer color="red" shadow>
              <Card className="border-4 border-pop-black text-center">
                <CardContent className="p-6">
                  <Package className="w-12 h-12 text-pop-red mx-auto mb-4" />
                  <h3 className="systematic-caps text-lg mb-2">Production</h3>
                  <p className="text-sm text-pop-gray">Scalable manufacturing with complete QR provenance tracking</p>
                </CardContent>
              </Card>
            </PopArtContainer>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/about#contact">
              <Button size="lg" className="bg-pop-black text-white hover:bg-pop-green hover:text-pop-black systematic-caps text-lg px-8 py-4">
                Start Custom Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>
        </div>
      </div>

      {/* Footer CTA Section */}
      <section className="py-20 px-4 bg-pop-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl helvetica-bold mb-8 text-white">
            TRANSFORM YOUR<br />
            PLASTIC IMPACT
          </h2>
          
          <p className="text-xl mb-12 text-white leading-relaxed">
            Partner with us to create trackable educational products from your corporate waste.
          </p>
          
          <Link href="/about#contact">
            <Button size="lg" className="bg-pop-green text-pop-black hover:bg-white hover:text-pop-black systematic-caps text-lg px-12 py-4">
              GET STARTED
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}