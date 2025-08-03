import Link from "next/link";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { PopArtContainer } from "../components/PopArtElements";
import { Users, Target, Cog, Mail, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl helvetica-bold mb-6 text-pop-black">
            ABOUT POPCYCLE
          </h1>
          <p className="text-xl text-pop-gray max-w-3xl mx-auto mb-8">
            We transform plastic waste into products that teach through making. Every item is 100% recycled, digitally tracked from collection to creation, and designed to inspire hands-on learning and community connection.
          </p>
          <div className="flex justify-center items-center gap-4 text-pop-gray">
            <Users className="w-6 h-6" />
            <span className="systematic-caps">Systematic Design for Circular Impact</span>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">

        {/* Team Section */}
        <section id="team" className="mb-20">
          <h2 className="text-4xl helvetica-bold mb-12 text-center">
            <span className="text-pop-blue">TEAM</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PopArtContainer color="green" shadow>
              <Card className="border-4 border-pop-black">
                <CardHeader>
                  <CardTitle className="systematic-caps text-pop-black">Founder & Creative Lead</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-pop-gray">Builder, artist, and teacher. Responsible for product development, backend systems, and hands-on R&D.</p>
                </CardContent>
              </Card>
            </PopArtContainer>

            <PopArtContainer color="blue" shadow>
              <Card className="border-4 border-pop-black">
                <CardHeader>
                  <CardTitle className="systematic-caps text-pop-black">Partnerships Lead</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-pop-gray">Connects people with systems of impact, education, and enjoyment. Leads outreach and collaborations.</p>
                </CardContent>
              </Card>
            </PopArtContainer>

            <PopArtContainer color="red" shadow>
              <Card className="border-4 border-pop-black">
                <CardHeader>
                  <CardTitle className="systematic-caps text-pop-black">Human Relations Lead</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-pop-gray">In charge of distractions, snacks, and walks. Enthusiastically chairs the studio greeting committee.

</p>
                </CardContent>
              </Card>
            </PopArtContainer>
          </div>
        </section>

        {/* Story Section */}
        <section id="story" className="mb-20">
          <h2 className="text-4xl helvetica-bold mb-12 text-center">
            <span className="text-pop-red">STORY</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="border-4 border-pop-black pop-shadow-black">
              <CardContent className="p-8">
                <p className="text-lg leading-relaxed mb-6">
                  PopCycle emerged from the intersection of waste crisis and educational opportunity. Every corporate plastic cup, every discarded container represents both environmental challenge and creative potential.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Our systematic approach transforms abstract sustainability concepts into tangible maker education experiences. Through QR code tracking, we create complete provenance stories that connect waste sources to final educational products.
                </p>
                <p className="text-lg leading-relaxed">
                  This isn't just recycling—it's reimagining how materials flow through educational ecosystems, creating value at every transformation point.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="mb-20">
          <h2 className="text-4xl helvetica-bold mb-12 text-center">
            <span className="text-pop-green">PROCESS</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-pop-green border-2 border-pop-black mx-auto mb-4 flex items-center justify-center">
                <span className="text-pop-black helvetica-bold text-xl">1</span>
              </div>
              <h3 className="systematic-caps text-lg mb-2">Collection</h3>
              <p className="text-pop-gray text-sm">Partner companies separate plastic waste for circular transformation</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-pop-blue border-2 border-pop-black mx-auto mb-4 flex items-center justify-center">
                <span className="text-pop-black helvetica-bold text-xl">2</span>
              </div>
              <h3 className="systematic-caps text-lg mb-2">Processing</h3>
              <p className="text-pop-gray text-sm">Clean, sort, and prepare materials for manufacturing transformation</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-pop-red border-2 border-pop-black mx-auto mb-4 flex items-center justify-center">
                <span className="text-pop-black helvetica-bold text-xl">3</span>
              </div>
              <h3 className="systematic-caps text-lg mb-2">Manufacturing</h3>
              <p className="text-pop-gray text-sm">Transform processed plastic into educational tools and components</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-pop-black border-2 border-pop-black mx-auto mb-4 flex items-center justify-center">
                <span className="text-white helvetica-bold text-xl">4</span>
              </div>
              <h3 className="systematic-caps text-lg mb-2">Distribution</h3>
              <p className="text-pop-gray text-sm">Deliver QR-coded products to educational institutions and makerspaces</p>
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
              <Card className="border-4 border-pop-black text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-pop-green border-2 border-pop-black mx-auto mb-4 flex items-center justify-center">
                    <span className="text-pop-black helvetica-bold text-lg">C</span>
                  </div>
                  <h3 className="systematic-caps text-lg mb-2">Corporate Partners</h3>
                  <p className="text-pop-gray text-sm">Companies providing plastic waste streams for circular transformation</p>
                </CardContent>
              </Card>
            </PopArtContainer>
            
            <PopArtContainer color="blue" shadow>
              <Card className="border-4 border-pop-black text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-pop-blue border-2 border-pop-black mx-auto mb-4 flex items-center justify-center">
                    <span className="text-pop-black helvetica-bold text-lg">E</span>
                  </div>
                  <h3 className="systematic-caps text-lg mb-2">Educational Institutions</h3>
                  <p className="text-pop-gray text-sm">Schools and universities implementing maker education programs</p>
                </CardContent>
              </Card>
            </PopArtContainer>
            
            <PopArtContainer color="red" shadow>
              <Card className="border-4 border-pop-black text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-pop-red border-2 border-pop-black mx-auto mb-4 flex items-center justify-center">
                    <span className="text-pop-black helvetica-bold text-lg">M</span>
                  </div>
                  <h3 className="systematic-caps text-lg mb-2">Makerspaces</h3>
                  <p className="text-pop-gray text-sm">Community workshops integrating circular materials into learning</p>
                </CardContent>
              </Card>
            </PopArtContainer>
            
            <PopArtContainer color="green" shadow>
              <Card className="border-4 border-pop-black text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-pop-black border-2 border-pop-black mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white helvetica-bold text-lg">R</span>
                  </div>
                  <h3 className="systematic-caps text-lg mb-2">Research Labs</h3>
                  <p className="text-pop-gray text-sm">Academic and industry labs advancing circular manufacturing methods</p>
                </CardContent>
              </Card>
            </PopArtContainer>
          </div>
          
          <div className="text-center mt-12">
            <Card className="border-4 border-pop-black pop-shadow-red max-w-3xl mx-auto">
              <CardContent className="p-8">
                <p className="text-lg mb-4">
                  Our partner network creates the circular ecosystem where plastic waste becomes educational opportunity. Each QR code tells the complete story from corporate waste stream to classroom learning experience.
                </p>
                <Badge className="bg-pop-red text-white systematic-caps">50+ Active Partners</Badge>
              </CardContent>
            </Card>
          </div>
        </section> */}

        {/* Contact Section */}
        <section id="contact">
          <h2 className="text-4xl helvetica-bold mb-12 text-center">
            <span className="text-pop-black">CONTACT</span>
          </h2>
          <div className="max-w-2xl mx-auto text-center">
            <Card className="border-4 border-pop-green pop-shadow-green">
              <CardContent className="p-8">
                <Mail className="w-12 h-12 text-pop-green mx-auto mb-6" />
                <p className="text-lg mb-4">Ready to transform your plastic waste into educational opportunities?</p>
                <p className="systematic-caps text-pop-green text-xl">hello@popcycle.io</p>
              </CardContent>
            </Card>
          </div>
        </section>
        </div>
      </div>

      {/* Footer CTA Section */}
      <section className="py-20 px-4 bg-pop-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl helvetica-bold mb-8 text-white">
            JOIN THE CIRCULAR<br />
            REVOLUTION
          </h2>
          
          <p className="text-xl mb-12 text-white leading-relaxed">
            Transform your organization's impact through traceable plastic transformation.
          </p>
          
          <Link href="/shop">
            <Button size="lg" className="bg-pop-green text-pop-black hover:bg-white hover:text-pop-black systematic-caps text-lg px-12 py-4">
              EXPLORE PRODUCTS
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}