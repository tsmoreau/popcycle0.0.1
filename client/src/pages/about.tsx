import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PopArtContainer } from "@/components/pop-art-elements";

export default function About() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-7xl helvetica-bold mb-8 tracking-tight">
            WHAT IS<br />
            <span className="text-pop-green">POP</span><span className="text-pop-blue">CYCLE</span>?
          </h1>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-8">
            <PopArtContainer color="green" pattern="geometric" shadow className="bg-pop-black text-white p-8">
              <h2 className="text-3xl helvetica-bold mb-4 text-pop-green">Our Mission</h2>
              <p className="text-xl leading-relaxed">
                Create a self-reinforcing ecosystem that transforms corporate plastic waste into educational experiences, community engagement, and sustainable revenue streams.
              </p>
            </PopArtContainer>
            
            <div className="space-y-4">
              <h3 className="text-2xl helvetica-bold systematic-caps">Core Philosophy</h3>
              <p className="text-lg leading-relaxed">
                Design thinking through hands-on making, where abstract concepts become tangible through physical systems that students build, test, and iterate.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <PopArtContainer pattern="dots" className="bg-gray-100 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl helvetica-bold text-pop-green mb-4">MAKERS</div>
                <div className="systematic-caps text-pop-gray">Learning Through Building</div>
              </div>
            </PopArtContainer>
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-pop-blue dots-pattern-blue opacity-80" />
          </div>
        </div>

        {/* Three Systems Integration */}
        <div className="space-y-16">
          <div className="text-center">
            <h2 className="text-4xl helvetica-bold mb-8 systematic-caps">
              Three <span className="text-pop-red">Interconnected</span> Systems
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PopArtContainer color="green" shadow className="bg-white border-4 border-pop-green p-8">
              <h3 className="text-2xl helvetica-bold mb-4 text-pop-green systematic-caps">PopCycle</h3>
              <p className="text-lg mb-4 font-medium">Circular Manufacturing System</p>
              <p className="leading-relaxed">
                Transform waste plastic into trackable, functional products with complete provenance tracking via QR codes.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>• Heat press → CNC cutting → assembly</li>
                <li>• Next.js + MongoDB tracking</li>
                <li>• Complete material provenance</li>
              </ul>
            </PopArtContainer>
            
            <PopArtContainer color="blue" shadow className="bg-white border-4 border-pop-blue p-8">
              <h3 className="text-2xl helvetica-bold mb-4 text-pop-blue systematic-caps">Insight Rovers</h3>
              <p className="text-lg mb-4 font-medium">Interactive Exploration System</p>
              <p className="leading-relaxed">
                Engaging robotics education through hands-on building and remote interaction with physical proximity access control.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>• ESP32 + camera system</li>
                <li>• Local and internet modes</li>
                <li>• Physical QR access control</li>
              </ul>
            </PopArtContainer>
            
            <PopArtContainer color="red" shadow className="bg-white border-4 border-pop-red p-8">
              <h3 className="text-2xl helvetica-bold mb-4 text-pop-red systematic-caps">Insight Makers</h3>
              <p className="text-lg mb-4 font-medium">Gamified Learning Ecosystem</p>
              <p className="leading-relaxed">
                Physical makerspace with RPG-style skill tracking that makes competency development visible and social.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>• 15 skill categories</li>
                <li>• Tool access progression</li>
                <li>• Social recognition system</li>
              </ul>
            </PopArtContainer>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-20 space-y-12">
          <h2 className="text-4xl helvetica-bold text-center systematic-caps">
            How <span className="text-pop-green">Integration</span> Works
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="border-4 border-pop-black">
              <CardContent className="p-8">
                <h3 className="text-2xl helvetica-bold mb-4 text-pop-green">Circular Flow</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-pop-green rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                    <span>Corporate partners provide plastic waste</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-pop-blue rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                    <span>PopCycle transforms into rover components</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-pop-red rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                    <span>Students build rovers in Makers workshops</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-pop-green rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                    <span>QR codes track complete journey</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-4 border-pop-black">
              <CardContent className="p-8">
                <h3 className="text-2xl helvetica-bold mb-4 text-pop-blue">Value Creation</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-pop-green pl-4">
                    <div className="font-bold">For Corporations</div>
                    <div className="text-pop-gray">Waste disposal + ESG impact + team building</div>
                  </div>
                  <div className="border-l-4 border-pop-blue pl-4">
                    <div className="font-bold">For Students</div>
                    <div className="text-pop-gray">Hands-on learning + skill development + real impact</div>
                  </div>
                  <div className="border-l-4 border-pop-red pl-4">
                    <div className="font-bold">For Community</div>
                    <div className="text-pop-gray">Makerspace access + social learning + recognition</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Vision */}
        <div className="mt-20 text-center">
          <PopArtContainer color="red" pattern="geometric" className="bg-pop-red text-white p-12">
            <h2 className="text-3xl helvetica-bold mb-6 systematic-caps">Our Vision</h2>
            <p className="text-xl leading-relaxed max-w-3xl mx-auto">
              A world where waste becomes wonder, where sustainability education happens through making real things that matter, and where every piece of plastic tells a story of transformation and community impact.
            </p>
          </PopArtContainer>
        </div>

        {/* Staff Section */}
        <div id="staff" className="mt-20 space-y-12">
          <h2 className="text-4xl helvetica-bold text-center systematic-caps">
            Our <span className="text-pop-green">Team</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PopArtContainer color="green" shadow className="bg-white border-4 border-pop-green p-8 text-center">
              <div className="w-24 h-24 bg-pop-green rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl helvetica-bold">JS</span>
              </div>
              <h3 className="text-xl helvetica-bold mb-2">Jamie Smith</h3>
              <div className="text-pop-green systematic-caps text-sm mb-3">Founder & CEO</div>
              <p className="text-sm leading-relaxed">
                Former sustainability consultant with 10+ years in circular economy design. Passionate about making abstract concepts tangible through hands-on education.
              </p>
            </PopArtContainer>
            
            <PopArtContainer color="blue" shadow className="bg-white border-4 border-pop-blue p-8 text-center">
              <div className="w-24 h-24 bg-pop-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl helvetica-bold">AR</span>
              </div>
              <h3 className="text-xl helvetica-bold mb-2">Alex Rivera</h3>
              <div className="text-pop-blue systematic-caps text-sm mb-3">CTO & Makerspace Director</div>
              <p className="text-sm leading-relaxed">
                Robotics engineer and educator specializing in accessible technology design. Leads workshop development and technical curriculum creation.
              </p>
            </PopArtContainer>
            
            <PopArtContainer color="red" shadow className="bg-white border-4 border-pop-red p-8 text-center">
              <div className="w-24 h-24 bg-pop-red rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl helvetica-bold">MK</span>
              </div>
              <h3 className="text-xl helvetica-bold mb-2">Morgan Kim</h3>
              <div className="text-pop-red systematic-caps text-sm mb-3">Operations & Partnerships</div>
              <p className="text-sm leading-relaxed">
                Supply chain specialist focused on sustainable materials processing. Manages corporate partnerships and impact measurement systems.
              </p>
            </PopArtContainer>
          </div>
        </div>

        {/* Story Section */}
        <div id="story" className="mt-20 space-y-12">
          <h2 className="text-4xl helvetica-bold text-center systematic-caps">
            Our <span className="text-pop-blue">Story</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <PopArtContainer color="blue" pattern="geometric" shadow className="bg-pop-black text-white p-8">
                <h3 className="text-2xl helvetica-bold mb-4 text-pop-blue">The Problem</h3>
                <p className="text-lg leading-relaxed">
                  Corporate sustainability programs generate reports but rarely create tangible learning experiences. Meanwhile, maker education lacks real-world impact stories that students can touch and track.
                </p>
              </PopArtContainer>
              
              <div className="space-y-4">
                <h3 className="text-2xl helvetica-bold systematic-caps">The Solution</h3>
                <p className="text-lg leading-relaxed">
                  PopCycle bridges this gap by creating physical products from tracked waste that become educational tools. Every QR code tells a complete story from corporate waste to student creation.
                </p>
                <p className="text-lg leading-relaxed">
                  Founded in 2024, we've processed over 150kg of plastic waste into educational experiences for 500+ students across corporate workshops and school programs.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <PopArtContainer pattern="dots" className="bg-gray-100 h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl helvetica-bold text-pop-blue mb-4">2024</div>
                  <div className="systematic-caps text-pop-gray">Founded in San Francisco</div>
                </div>
              </PopArtContainer>
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-pop-green dots-pattern opacity-80" />
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div id="process" className="mt-20 space-y-12">
          <h2 className="text-4xl helvetica-bold text-center systematic-caps">
            Our <span className="text-pop-red">Process</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <PopArtContainer color="green" className="bg-white border-4 border-pop-green p-6 text-center">
              <div className="w-12 h-12 bg-pop-green text-white rounded-full flex items-center justify-center helvetica-bold text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="helvetica-bold mb-3 systematic-caps">Collection</h3>
              <p className="text-sm">Partner companies provide clean HDPE plastic waste with full material documentation.</p>
              <div className="mt-4 text-xs text-pop-gray">
                Quality control • Material identification • Traceability logging
              </div>
            </PopArtContainer>
            
            <PopArtContainer color="blue" className="bg-white border-4 border-pop-blue p-6 text-center">
              <div className="w-12 h-12 bg-pop-blue text-white rounded-full flex items-center justify-center helvetica-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="helvetica-bold mb-3 systematic-caps">Processing</h3>
              <p className="text-sm">Heat press into sheets, then precision CNC cutting with integrated QR code laser etching.</p>
              <div className="mt-4 text-xs text-pop-gray">
                Heat pressing • CNC cutting • QR etching • Quality testing
              </div>
            </PopArtContainer>
            
            <PopArtContainer color="red" className="bg-white border-4 border-pop-red p-6 text-center">
              <div className="w-12 h-12 bg-pop-red text-white rounded-full flex items-center justify-center helvetica-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="helvetica-bold mb-3 systematic-caps">Assembly</h3>
              <p className="text-sm">Students and workshop participants assemble tracked components into functional products.</p>
              <div className="mt-4 text-xs text-pop-gray">
                Workshop facilitation • Skill development • Impact documentation
              </div>
            </PopArtContainer>
            
            <PopArtContainer color="green" className="bg-white border-4 border-pop-green p-6 text-center">
              <div className="w-12 h-12 bg-pop-green text-white rounded-full flex items-center justify-center helvetica-bold text-xl mx-auto mb-4">
                4
              </div>
              <h3 className="helvetica-bold mb-3 systematic-caps">Impact</h3>
              <p className="text-sm">Complete tracking system provides ongoing impact measurement and educational value.</p>
              <div className="mt-4 text-xs text-pop-gray">
                QR tracking • Impact reports • Community showcase • Reuse pathways
              </div>
            </PopArtContainer>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="mt-20 space-y-12">
          <h2 className="text-4xl helvetica-bold text-center systematic-caps">
            Get In <span className="text-pop-green">Touch</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <PopArtContainer color="green" pattern="geometric" shadow className="bg-pop-green text-white p-8">
                <h3 className="text-2xl helvetica-bold mb-4 systematic-caps">Ready to Start?</h3>
                <p className="text-lg mb-6 leading-relaxed">
                  Whether you're a corporation looking to transform waste into impact, or an educator seeking hands-on sustainability curriculum, we're here to help.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span>90-day pilot programs available</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span>Free consultation and demo workshops</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span>Custom solutions for any organization size</span>
                  </div>
                </div>
              </PopArtContainer>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-4 border-pop-blue text-center">
                  <CardContent className="p-6">
                    <h4 className="helvetica-bold mb-3 text-pop-blue systematic-caps">For Corporations</h4>
                    <p className="text-sm mb-4">Transform your waste into team building experiences and ESG impact.</p>
                    <Button className="bg-pop-blue text-white hover:bg-pop-black systematic-caps">
                      Schedule Demo
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border-4 border-pop-red text-center">
                  <CardContent className="p-6">
                    <h4 className="helvetica-bold mb-3 text-pop-red systematic-caps">For Educators</h4>
                    <p className="text-sm mb-4">Bring hands-on sustainability education to your students.</p>
                    <Button className="bg-pop-red text-white hover:bg-pop-black systematic-caps">
                      Get Curriculum
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <Card className="border-4 border-pop-black">
                  <CardContent className="p-6">
                    <h4 className="helvetica-bold mb-4 systematic-caps">Contact Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-pop-green rounded-full" />
                        <span>hello@popcycle.io</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-pop-blue rounded-full" />
                        <span>(555) 123-4567</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-pop-red rounded-full" />
                        <span>San Francisco, CA</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-4 border-pop-black">
                  <CardContent className="p-6">
                    <h4 className="helvetica-bold mb-4 systematic-caps">Visit Our Space</h4>
                    <p className="text-sm mb-4 leading-relaxed">
                      See our process in action. Tours available Tuesday-Thursday, 2-4 PM. Advance booking required.
                    </p>
                    <Button variant="outline" className="border-2 border-pop-black hover:bg-pop-black hover:text-white systematic-caps">
                      Book Tour
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
