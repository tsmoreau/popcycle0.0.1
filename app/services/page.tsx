import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { PopArtContainer } from "../components/PopArtElements";
import { Recycle, Factory, Package, Wrench, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Services() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-7xl helvetica-bold mb-6 tracking-tight">
            <span className="text-pop-green">SERVICES</span>
          </h1>
          <p className="text-xl text-pop-gray max-w-3xl mx-auto">
            Complete circular manufacturing solutions from waste collection through educational product delivery.
          </p>
        </div>

        {/* Collection Section */}
        <section id="collection" className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl helvetica-bold mb-6">
                <span className="text-pop-green">COLLECTION</span>
              </h2>
              <p className="text-lg mb-6 text-pop-gray">
                We partner with corporations to establish systematic plastic waste collection programs. Every collected item receives QR code tracking from the moment it enters our circular system.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-pop-green mr-3"></div>
                  <span className="systematic-caps text-sm">On-site collection setup</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-pop-green mr-3"></div>
                  <span className="systematic-caps text-sm">Material sorting protocols</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-pop-green mr-3"></div>
                  <span className="systematic-caps text-sm">QR code assignment system</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-pop-green mr-3"></div>
                  <span className="systematic-caps text-sm">Regular pickup scheduling</span>
                </li>
              </ul>
              <Link href="/partners">
                <Button className="bg-pop-green text-pop-black hover:bg-pop-black hover:text-white systematic-caps">
                  Start Collection Program
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
                      <div className="text-2xl helvetica-bold text-pop-green">500+</div>
                      <div className="systematic-caps text-xs text-pop-gray">Pickup locations</div>
                    </div>
                    <div>
                      <div className="text-2xl helvetica-bold text-pop-green">12kg</div>
                      <div className="systematic-caps text-xs text-pop-gray">Avg daily collection</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </PopArtContainer>
          </div>
        </section>

        {/* Processing Section */}
        <section id="processing" className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <PopArtContainer color="blue" shadow>
              <Card className="border-4 border-pop-black">
                <CardContent className="p-8">
                  <Factory className="w-16 h-16 text-pop-blue mb-6" />
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="systematic-caps text-sm">HDPE Processing</span>
                      <span className="text-pop-blue helvetica-bold">95%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="systematic-caps text-sm">PET Processing</span>
                      <span className="text-pop-blue helvetica-bold">87%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="systematic-caps text-sm">PP Processing</span>
                      <span className="text-pop-blue helvetica-bold">92%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </PopArtContainer>
            <div>
              <h2 className="text-4xl helvetica-bold mb-6">
                <span className="text-pop-blue">PROCESSING</span>
              </h2>
              <p className="text-lg mb-6 text-pop-gray">
                Advanced cleaning, sorting, and material preparation ensures optimal quality for educational product manufacturing. Each processing stage maintains QR code traceability.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-pop-blue mr-3"></div>
                  <span className="systematic-caps text-sm">Industrial cleaning systems</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-pop-blue mr-3"></div>
                  <span className="systematic-caps text-sm">Automated sorting technology</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-pop-blue mr-3"></div>
                  <span className="systematic-caps text-sm">Quality control testing</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-pop-blue mr-3"></div>
                  <span className="systematic-caps text-sm">Material grade certification</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Manufacturing Section */}
        <section id="manufacturing" className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl helvetica-bold mb-6">
                <span className="text-pop-red">MANUFACTURING</span>
              </h2>
              <p className="text-lg mb-6 text-pop-gray">
                Transform processed plastic into educational tools, rover chassis, assembly kits, and custom products designed for maker education and robotics learning.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <Badge className="bg-pop-red text-white mb-2">Rover Chassis</Badge>
                  <p className="text-sm text-pop-gray">Modular robotics platform components</p>
                </div>
                <div>
                  <Badge className="bg-pop-red text-white mb-2">Assembly Toys</Badge>
                  <p className="text-sm text-pop-gray">Educational construction sets</p>
                </div>
                <div>
                  <Badge className="bg-pop-red text-white mb-2">Learning Kits</Badge>
                  <p className="text-sm text-pop-gray">STEM education materials</p>
                </div>
                <div>
                  <Badge className="bg-pop-red text-white mb-2">Dinnerware</Badge>
                  <p className="text-sm text-pop-gray">Sustainable cafeteria products</p>
                </div>
              </div>
            </div>
            <PopArtContainer color="red" shadow>
              <Card className="border-4 border-pop-black">
                <CardContent className="p-8">
                  <Package className="w-16 h-16 text-pop-red mb-6" />
                  <div className="space-y-3">
                    <div className="systematic-caps text-xs text-pop-gray mb-2">Monthly production</div>
                    <div className="text-3xl helvetica-bold text-pop-red">2,400</div>
                    <div className="systematic-caps text-xs text-pop-gray">Educational products manufactured</div>
                  </div>
                </CardContent>
              </Card>
            </PopArtContainer>
          </div>
        </section>

        {/* Custom Products Section */}
        <section id="custom-products">
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
            <Link href="/partners">
              <Button size="lg" className="bg-pop-black text-white hover:bg-pop-green hover:text-pop-black systematic-caps text-lg px-8 py-4">
                Start Custom Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}