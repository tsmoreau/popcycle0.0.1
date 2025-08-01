import { Card, CardContent } from "@/components/ui/card";
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
      </div>
    </div>
  );
}
