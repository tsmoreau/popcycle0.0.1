import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { PopArtContainer } from "../components/PopArtElements";
import { Building, School, Users, CheckCircle } from "lucide-react";

export default function Partners() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-pop-gray py-16 border-b-4 border-pop-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl helvetica-bold mb-6 text-white">
            PARTNERS
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto mb-8">
            Join the circular economy. Transform your plastic waste into educational opportunities.
          </p>
          <div className="flex justify-center items-center gap-4 text-white">
            <Building className="w-6 h-6" />
            <span className="systematic-caps">Building Circular Networks</span>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">

        {/* Partnership Types */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <PopArtContainer color="green" shadow>
            <Card className="border-4 border-pop-black text-center h-full">
              <CardContent className="p-8">
                <Building className="w-16 h-16 text-pop-green mx-auto mb-6" />
                <h3 className="text-2xl helvetica-bold mb-4">Corporate Partners</h3>
                <p className="text-pop-gray mb-6">
                  Transform your office plastic waste into educational tools. Complete tracking from your break room to the classroom.
                </p>
                <ul className="text-left space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-pop-green mr-2" />
                    <span>On-site collection setup</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-pop-green mr-2" />
                    <span>Sustainability reporting</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-pop-green mr-2" />
                    <span>Employee engagement programs</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </PopArtContainer>

          <PopArtContainer color="blue" shadow>
            <Card className="border-4 border-pop-black text-center h-full">
              <CardContent className="p-8">
                <School className="w-16 h-16 text-pop-blue mx-auto mb-6" />
                <h3 className="text-2xl helvetica-bold mb-4">Educational Partners</h3>
                <p className="text-pop-gray mb-6">
                  Receive QR-tracked educational products made from corporate plastic waste. Connect students to the circular economy.
                </p>
                <ul className="text-left space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-pop-blue mr-2" />
                    <span>Custom product development</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-pop-blue mr-2" />
                    <span>Curriculum integration support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-pop-blue mr-2" />
                    <span>Student maker programs</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </PopArtContainer>

          <PopArtContainer color="red" shadow>
            <Card className="border-4 border-pop-black text-center h-full">
              <CardContent className="p-8">
                <Users className="w-16 h-16 text-pop-red mx-auto mb-6" />
                <h3 className="text-2xl helvetica-bold mb-4">Community Partners</h3>
                <p className="text-pop-gray mb-6">
                  Makerspaces, libraries, and community centers. Bring circular manufacturing education to your neighborhood.
                </p>
                <ul className="text-left space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-pop-red mr-2" />
                    <span>Workshop materials supply</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-pop-red mr-2" />
                    <span>Community education programs</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-pop-red mr-2" />
                    <span>Local collection networks</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </PopArtContainer>
        </div>

        {/* Current Partners */}
        <section className="mb-20">
          <h2 className="text-4xl helvetica-bold mb-12 text-center">
            <span className="text-pop-black">CURRENT PARTNERS</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Cafe Luna", type: "Corporate", items: "347" },
              { name: "TechCorp", type: "Corporate", items: "892" },
              { name: "Green Office", type: "Corporate", items: "156" },
              { name: "Startup Hub", type: "Corporate", items: "423" },
              { name: "Lincoln Elementary", type: "Educational", products: "89" },
              { name: "Metro Makerspace", type: "Community", products: "134" },
              { name: "Public Library", type: "Community", products: "67" },
              { name: "Innovation High", type: "Educational", products: "178" }
            ].map((partner, index) => (
              <Card key={index} className="border-2 border-pop-black">
                <CardContent className="p-4 text-center">
                  <h4 className="helvetica-bold mb-2">{partner.name}</h4>
                  <p className="systematic-caps text-xs text-pop-gray mb-2">{partner.type}</p>
                  <div className="text-lg helvetica-bold text-pop-green">
                    {partner.items || partner.products}
                  </div>
                  <div className="systematic-caps text-xs text-pop-gray">
                    {partner.items ? "Items collected" : "Products received"}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Partnership Application */}
        <section>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl helvetica-bold mb-12 text-center">
              <span className="text-pop-green">BECOME A PARTNER</span>
            </h2>
            
            <PopArtContainer color="black" shadow>
              <Card className="border-4 border-pop-black">
                <CardContent className="p-8">
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="systematic-caps text-sm mb-2 block">Organization Name</label>
                        <Input className="border-2 border-pop-black" placeholder="Your organization" />
                      </div>
                      <div>
                        <label className="systematic-caps text-sm mb-2 block">Partnership Type</label>
                        <select className="w-full border-2 border-pop-black p-3">
                          <option>Corporate Partner</option>
                          <option>Educational Partner</option>
                          <option>Community Partner</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="systematic-caps text-sm mb-2 block">Contact Name</label>
                        <Input className="border-2 border-pop-black" placeholder="Your name" />
                      </div>
                      <div>
                        <label className="systematic-caps text-sm mb-2 block">Email</label>
                        <Input type="email" className="border-2 border-pop-black" placeholder="contact@organization.com" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="systematic-caps text-sm mb-2 block">Project Description</label>
                      <Textarea 
                        className="border-2 border-pop-black min-h-32" 
                        placeholder="Describe your plastic waste situation or educational needs..."
                      />
                    </div>
                    
                    <div className="text-center">
                      <Button 
                        size="lg" 
                        className="bg-pop-green text-pop-black hover:bg-pop-black hover:text-white systematic-caps text-lg px-12 py-4"
                      >
                        Submit Partnership Application
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </PopArtContainer>
          </div>
        </section>
        </div>
      </div>
    </div>
  );
}