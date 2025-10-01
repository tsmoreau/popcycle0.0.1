"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { PopArtContainer } from "../components/PopArtElements";
import { Users, Target, Cog, Mail, ArrowRight, ChevronDown } from "lucide-react";

export default function About() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-white py-0 pt-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl helvetica-bold mb-6 text-pop-black">
            ABOUT POPCYCLE
          </h1>
          <p className="text-xl text-pop-gray max-w-3xl mx-auto mb-8">
            We transform plastic waste into products that teach through making.
            Every item is 100% recycled, digitally tracked from collection to
            creation, and designed to inspire hands-on learning and community
            connection.
          </p>
        </div>
      </div>

      <div className="pb-20 pt-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Team Section */}
          <section id="team" className="mb-20">
            <h2 className="text-4xl helvetica-bold mb-12 text-center">
              <span className="text-black">TEAM</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border border-gray-200 divide-x divide-y divide-gray-200 bg-white">
              <div className="bg-white p-8">
                <div className="text-center">
                    <div className="w-64 h-64 mx-auto mb-4 bg-pop-green flex items-center justify-center">
                      <Users className="w-10 h-10 text-pop-black" />
                    </div>
                    <div className="systematic-caps text-pop-black px-10 pb-4 pt-2 font-bold">
                     Terrence Stasse
                    </div>
                    <div className="systematic-caps text-pop-black mt-12 font-bold">
                      Founder & Creative Lead
                    </div>
                    <p className="text-pop-gray mt-6">
                      Builder, artist, and teacher. Leads product development, systems design, and hands-on R&D.
                    </p>
                </div>
              </div>

              <div className="bg-white p-8">
                <div className="text-center">
                    <div className="w-64 h-64 mx-auto mb-4 bg-pop-blue flex items-center justify-center">
                      <Target className="w-10 h-10 text-pop-black" />
                    </div>
                    <div className="systematic-caps text-pop-black px-10 pb-4 pt-2 font-bold">
                     Oxana Ermolova
                    </div>
                    <div className="systematic-caps text-pop-black font-bold">
                      Development & Partnerships Lead
                    </div>
                    <p className="text-pop-gray mt-6">
                      Connector of people, impact, and ideas. Heads outreach, collaborations, and partnerships.
                    </p>
                </div>
              </div>

              <div className="bg-white p-8">
                <div className="text-center">
                    <div className="w-64 h-64 mx-auto mb-4 bg-pop-red flex items-center justify-center">
                      <Cog className="w-10 h-10 text-pop-black" />
                    </div>
                    <div className="systematic-caps text-pop-black px-10 pb-4 pt-2 font-bold">
                     Argo
                    </div>
                    <div className="systematic-caps text-pop-black font-bold">
                      Human Relations Lead
                    </div>
                    <p className="text-pop-gray mt-6">
                      In charge of distractions, snacks, and walks.
                      Enthusiastically leads the studio greeting committee.
                    </p>
                </div>
              </div>
            </div>
          </section>

          {/* Story Section */}
          <section id="story" className="mb-20">
            <h2 className="text-4xl helvetica-bold mb-12 text-center">
              <span className="text-pop-black">STORY</span>
            </h2>
            <div className="max-w-4xl mx-auto">
              <Card className="border border-gray-200">
                <CardContent className="p-8">
                  <p className="text-lg leading-relaxed mb-6">
                    PopCycle emerged from the intersection of waste crisis and
                    educational opportunity. Every corporate plastic cup, every
                    discarded container represents both environmental challenge
                    and creative potential.
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    Our systematic approach transforms abstract sustainability
                    concepts into tangible maker education experiences. Through
                    QR code tracking, we create complete provenance stories that
                    connect waste sources to final educational products.
                  </p>
                  <p className="text-lg leading-relaxed">
                    This isn't just recycling—it's reimagining how materials
                    flow through educational ecosystems, creating value at every
                    transformation point.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Process Section */}
          <section id="process" className="mb-20">
            <h2 className="text-4xl helvetica-bold mb-12 text-center">
              <span className="text-pop-black">PROCESS</span>
            </h2>
            <div className="grid md:grid-cols-4 gap-0 border border-gray-200 divide-x divide-y divide-gray-200 bg-white">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-pop-green mx-auto mb-4 flex items-center justify-center">
                  <span className="text-pop-black helvetica-bold text-xl">
                    1
                  </span>
                </div>
                <h3 className="systematic-caps text-lg mb-2 font-bold">Collection</h3>
                <p className="text-pop-gray text-sm">
                  Partner companies separate plastic waste for circular
                  transformation
                </p>
              </div>

              <div className="text-center p-8">
                <div className="w-16 h-16 bg-pop-blue mx-auto mb-4 flex items-center justify-center">
                  <span className="text-pop-black helvetica-bold text-xl">
                    2
                  </span>
                </div>
                <h3 className="systematic-caps text-lg mb-2 font-bold">Processing</h3>
                <p className="text-pop-gray text-sm">
                  Clean, sort, and prepare materials for manufacturing
                  transformation
                </p>
              </div>

              <div className="text-center p-8">
                <div className="w-16 h-16 bg-pop-red mx-auto mb-4 flex items-center justify-center">
                  <span className="text-pop-black helvetica-bold text-xl">
                    3
                  </span>
                </div>
                <h3 className="systematic-caps text-lg mb-2 font-bold">Manufacturing</h3>
                <p className="text-pop-gray text-sm">
                  Transform processed plastic into educational tools and
                  components
                </p>
              </div>

              <div className="text-center p-8">
                <div className="w-16 h-16 bg-pop-black mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white helvetica-bold text-xl">4</span>
                </div>
                <h3 className="systematic-caps text-lg mb-2 font-bold">Distribution</h3>
                <p className="text-pop-gray text-sm">
                  Deliver QR-coded products to educational institutions and
                  makerspaces
                </p>
              </div>
            </div>
          </section>

          {/* Partners Section */}
          {/* <section id="partners" className="mb-20">
          <h2 className="text-4xl helvetica-bold mb-12 text-center">
            <span className="text-pop-red">PARTNERS</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <PopArtContainer color="green" shadow>
              <Card className="border border-gray-200 text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-pop-green border border-gray-300 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-pop-black helvetica-bold text-lg">C</span>
                  </div>
                  <h3 className="systematic-caps text-lg mb-2">Corporate Partners</h3>
                  <p className="text-pop-gray text-sm">Companies providing plastic waste streams for circular transformation</p>
                </CardContent>
              </Card>
            </PopArtContainer>
            
            <PopArtContainer color="blue" shadow>
              <Card className="border border-gray-200 text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-pop-blue border border-gray-300 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-pop-black helvetica-bold text-lg">E</span>
                  </div>
                  <h3 className="systematic-caps text-lg mb-2">Educational Institutions</h3>
                  <p className="text-pop-gray text-sm">Schools and universities implementing maker education programs</p>
                </CardContent>
              </Card>
            </PopArtContainer>
            
            <PopArtContainer color="red" shadow>
              <Card className="border border-gray-200 text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-pop-red border border-gray-300 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-pop-black helvetica-bold text-lg">M</span>
                  </div>
                  <h3 className="systematic-caps text-lg mb-2">Makerspaces</h3>
                  <p className="text-pop-gray text-sm">Community workshops integrating circular materials into learning</p>
                </CardContent>
              </Card>
            </PopArtContainer>
            
            <PopArtContainer color="green" shadow>
              <Card className="border border-gray-200 text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-pop-black border border-gray-300 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white helvetica-bold text-lg">R</span>
                  </div>
                  <h3 className="systematic-caps text-lg mb-2">Research Labs</h3>
                  <p className="text-pop-gray text-sm">Academic and industry labs advancing circular manufacturing methods</p>
                </CardContent>
              </Card>
            </PopArtContainer>
          </div>
          
          <div className="text-center mt-12">
            <Card className="border border-gray-200 max-w-3xl mx-auto">
              <CardContent className="p-8">
                <p className="text-lg mb-4">
                  Our partner network creates the circular ecosystem where plastic waste becomes educational opportunity. Each QR code tells the complete story from corporate waste stream to classroom learning experience.
                </p>
                <Badge className="bg-pop-red text-white systematic-caps">50+ Active Partners</Badge>
              </CardContent>
            </Card>
          </div>
        </section> */}

          {/* FAQ Section */}
          <section id="faq" className="mb-20">
            <h2 className="text-4xl helvetica-bold mb-12 text-center">
              <span className="text-pop-black">FREQUENTLY ASKED QUESTIONS</span>
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <PopArtContainer color="green" shadow>
                <Card className="border border-gray-200">
                  <CardHeader 
                    className="cursor-pointer hover:bg-pop-green hover:text-white transition-colors"
                    onClick={() => toggleFaq('faq1')}
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="systematic-caps text-lg">How does QR code tracking work?</CardTitle>
                      <ChevronDown className={`w-6 h-6 transition-transform ${openFaq === 'faq1' ? 'rotate-180' : ''}`} />
                    </div>
                  </CardHeader>
                  {openFaq === 'faq1' && (
                    <CardContent>
                      <p className="text-pop-gray">
                        Each plastic item receives a unique QR code during collection. This code tracks the complete journey from corporate waste through processing, manufacturing, and final delivery to educational institutions. Users can scan the code to see the full provenance story.
                      </p>
                    </CardContent>
                  )}
                </Card>
              </PopArtContainer>

              <PopArtContainer color="blue" shadow>
                <Card className="border border-gray-200">
                  <CardHeader 
                    className="cursor-pointer hover:bg-pop-blue hover:text-white transition-colors"
                    onClick={() => toggleFaq('faq2')}
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="systematic-caps text-lg">What types of plastic do you accept?</CardTitle>
                      <ChevronDown className={`w-6 h-6 transition-transform ${openFaq === 'faq2' ? 'rotate-180' : ''}`} />
                    </div>
                  </CardHeader>
                  {openFaq === 'faq2' && (
                    <CardContent>
                      <p className="text-pop-gray">
                        We work with common office plastics including cups, containers, and packaging materials. Our system is designed to handle PET, HDPE, and PP plastics that are commonly found in corporate waste streams.
                      </p>
                    </CardContent>
                  )}
                </Card>
              </PopArtContainer>

              <PopArtContainer color="red" shadow>
                <Card className="border border-gray-200">
                  <CardHeader 
                    className="cursor-pointer hover:bg-pop-red hover:text-white transition-colors"
                    onClick={() => toggleFaq('faq3')}
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="systematic-caps text-lg">How can educational institutions get involved?</CardTitle>
                      <ChevronDown className={`w-6 h-6 transition-transform ${openFaq === 'faq3' ? 'rotate-180' : ''}`} />
                    </div>
                  </CardHeader>
                  {openFaq === 'faq3' && (
                    <CardContent>
                      <p className="text-pop-gray">
                        Schools and makerspaces can join our network to receive tracked educational products. We provide maker education resources, assembly guides, and curriculum integration support to maximize learning outcomes.
                      </p>
                    </CardContent>
                  )}
                </Card>
              </PopArtContainer>

              <PopArtContainer color="green" shadow>
                <Card className="border border-gray-200">
                  <CardHeader 
                    className="cursor-pointer hover:bg-pop-green hover:text-white transition-colors"
                    onClick={() => toggleFaq('faq4')}
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="systematic-caps text-lg">What is the maker registration system?</CardTitle>
                      <ChevronDown className={`w-6 h-6 transition-transform ${openFaq === 'faq4' ? 'rotate-180' : ''}`} />
                    </div>
                  </CardHeader>
                  {openFaq === 'faq4' && (
                    <CardContent>
                      <p className="text-pop-gray">
                        Our maker registration allows customers to declare when they've completed assembling their tracked products. This creates a fourth "Assembled" step in the transformation timeline, completing the circular economy story from waste to finished educational tool.
                      </p>
                    </CardContent>
                  )}
                </Card>
              </PopArtContainer>

              <PopArtContainer color="blue" shadow>
                <Card className="border border-gray-200">
                  <CardHeader 
                    className="cursor-pointer hover:bg-pop-blue hover:text-white transition-colors"
                    onClick={() => toggleFaq('faq5')}
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="systematic-caps text-lg">How do companies become partners?</CardTitle>
                      <ChevronDown className={`w-6 h-6 transition-transform ${openFaq === 'faq5' ? 'rotate-180' : ''}`} />
                    </div>
                  </CardHeader>
                  {openFaq === 'faq5' && (
                    <CardContent>
                      <p className="text-pop-gray">
                        Corporate partners provide plastic waste streams and receive detailed impact reporting. We handle collection, processing, and transformation while providing complete transparency through our QR tracking system. Contact us to discuss partnership opportunities.
                      </p>
                    </CardContent>
                  )}
                </Card>
              </PopArtContainer>
            </div>
          </section>


        </div>
      </div>

      {/* Footer CTA Section */}
      <section className="py-20 px-4 bg-pop-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl helvetica-bold mb-8 text-white">
            JOIN THE CIRCULAR
            <br />
            REVOLUTION
          </h2>

          <p className="text-xl mb-12 text-white leading-relaxed">
            Transform your organization's impact through traceable plastic
            transformation.
          </p>

          <Link href="/shop">
            <Button
              size="lg"
              className="bg-pop-green text-pop-black hover:bg-white hover:text-pop-black systematic-caps text-lg px-12 py-4"
            >
              EXPLORE PRODUCTS
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
