import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PopArtContainer, QRCodeElement } from "@/components/pop-art-elements";
import { Link } from "wouter";
import { Package, Zap, Building, Heart } from "lucide-react";

export default function Store() {
  const products = [
    {
      id: 1,
      name: "Rover Chassis Kit",
      category: "Educational",
      price: "$35",
      description: "Complete robot chassis made from recycled HDPE plastic with assembly instructions and QR tracking.",
      features: ["CNC cut precision", "Full assembly guide", "QR provenance tracking", "Educational materials"],
      color: "green",
      qrCode: "RCK001",
      inStock: true
    },
    {
      id: 2,
      name: "Pop-Out Assembly Toy",
      category: "Toy",
      price: "$25",
      description: "Interactive puzzle toy that demonstrates mechanical assembly and circular economy principles.",
      features: ["Quadrant-based design", "No tools required", "Age 8+", "Skill development focus"],
      color: "blue",
      qrCode: "POT002",
      inStock: true
    },
    {
      id: 3,
      name: "Workshop Material Kit",
      category: "Educational",
      price: "$45",
      description: "Complete kit for 10-person workshop including pre-cut blanks and instruction materials.",
      features: ["Supports 10 participants", "Instructor guide included", "Mixed material types", "Skill tracking cards"],
      color: "red",
      qrCode: "WMK003",
      inStock: true
    },
    {
      id: 4,
      name: "Corporate Branded Items",
      category: "Custom",
      price: "Quote",
      description: "Custom branded products made from your company's waste plastic with complete traceability.",
      features: ["Your waste → your products", "Custom branding", "Impact reporting", "Team building integration"],
      color: "green",
      qrCode: "CBI004",
      inStock: false
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "green": return "border-pop-green hover:pop-shadow-green text-pop-green";
      case "blue": return "border-pop-blue hover:pop-shadow-blue text-pop-blue";
      case "red": return "border-pop-red hover:pop-shadow-red text-pop-red";
      default: return "border-pop-green hover:pop-shadow-green text-pop-green";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Educational": return <Zap className="w-4 h-4" />;
      case "Toy": return <Heart className="w-4 h-4" />;
      case "Custom": return <Building className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-7xl helvetica-bold mb-8 tracking-tight">
            <span className="text-pop-green">STORE</span><br />
            RECYCLED
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed text-pop-gray">
            Products made from tracked waste plastic. Every purchase supports circular economy education and community making.
          </p>
        </div>

        {/* Featured Message */}
        <PopArtContainer color="green" pattern="geometric" shadow className="bg-pop-black text-white p-8 mb-16">
          <div className="text-center">
            <h2 className="text-2xl helvetica-bold mb-4 text-pop-green systematic-caps">
              Every Product Tells a Story
            </h2>
            <p className="text-lg leading-relaxed">
              Scan the QR code on any product to discover its complete journey from waste to wonder. 
              See the company that donated the plastic, the processing date, and the environmental impact.
            </p>
          </div>
        </PopArtContainer>

        {/* Product Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <PopArtContainer color="green" className="bg-white border-4 border-pop-green p-6 text-center">
            <Zap className="w-12 h-12 text-pop-green mx-auto mb-4" />
            <h3 className="helvetica-bold systematic-caps mb-2">Educational</h3>
            <p className="text-sm">Hands-on learning tools and workshop materials</p>
          </PopArtContainer>
          
          <PopArtContainer color="blue" className="bg-white border-4 border-pop-blue p-6 text-center">
            <Heart className="w-12 h-12 text-pop-blue mx-auto mb-4" />
            <h3 className="helvetica-bold systematic-caps mb-2">Toys</h3>
            <p className="text-sm">Interactive assembly toys that teach making</p>
          </PopArtContainer>
          
          <PopArtContainer color="red" className="bg-white border-4 border-pop-red p-6 text-center">
            <Building className="w-12 h-12 text-pop-red mx-auto mb-4" />
            <h3 className="helvetica-bold systematic-caps mb-2">Custom</h3>
            <p className="text-sm">Branded products from your company's waste</p>
          </PopArtContainer>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {products.map((product) => (
            <Card key={product.id} className={`border-4 ${getColorClasses(product.color)} transform-pop cursor-pointer`}>
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <Badge variant="outline" className={`mb-2 border-2 ${getColorClasses(product.color)}`}>
                      <span className="flex items-center space-x-1">
                        {getCategoryIcon(product.category)}
                        <span>{product.category}</span>
                      </span>
                    </Badge>
                    <CardTitle className="helvetica-bold text-xl">{product.name}</CardTitle>
                  </div>
                  <QRCodeElement code={product.qrCode} size="sm" color={product.color as any} />
                </div>
                <div className="text-3xl helvetica-bold">{product.price}</div>
              </CardHeader>
              
              <CardContent>
                <p className="text-lg mb-4 leading-relaxed">{product.description}</p>
                
                <div className="space-y-3 mb-6">
                  <h4 className="helvetica-bold systematic-caps text-sm">Features</h4>
                  <ul className="space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-sm flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full bg-pop-${product.color}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex space-x-4">
                  {product.inStock ? (
                    <>
                      <Button className={`bg-pop-${product.color} text-white hover:bg-pop-black systematic-caps flex-1`}>
                        Add to Cart
                      </Button>
                      <Link href={`/track/${product.qrCode}`}>
                        <Button variant="outline" className={`border-2 border-pop-${product.color} systematic-caps`}>
                          Track Origin
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <Button className="bg-pop-gray text-white systematic-caps flex-1">
                      Request Quote
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Impact Summary */}
        <div className="mb-16">
          <h2 className="text-4xl helvetica-bold mb-12 text-center systematic-caps">
            Shop <span className="text-pop-blue">Impact</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PopArtContainer color="green" className="bg-pop-green text-white p-8 text-center">
              <div className="text-4xl helvetica-bold mb-2">127</div>
              <div className="systematic-caps">Products Sold</div>
              <div className="text-sm mt-2 opacity-80">This month</div>
            </PopArtContainer>
            
            <PopArtContainer color="blue" className="bg-pop-blue text-white p-8 text-center">
              <div className="text-4xl helvetica-bold mb-2">89kg</div>
              <div className="systematic-caps">Plastic Diverted</div>
              <div className="text-sm mt-2 opacity-80">From landfills</div>
            </PopArtContainer>
            
            <PopArtContainer color="red" className="bg-pop-red text-white p-8 text-center">
              <div className="text-4xl helvetica-bold mb-2">23</div>
              <div className="systematic-caps">Workshops Supported</div>
              <div className="text-sm mt-2 opacity-80">Students learning</div>
            </PopArtContainer>
          </div>
        </div>

        {/* Custom Orders */}
        <div className="mb-16">
          <PopArtContainer color="red" pattern="geometric" className="bg-white border-4 border-pop-red p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl helvetica-bold mb-4 text-pop-red systematic-caps">
                  Custom Orders
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Transform your company's waste plastic into branded products. Perfect for corporate gifts, 
                  team building activities, and sustainability showcases.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-pop-red rounded-full" />
                    <span>Your waste → your branded products</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-pop-red rounded-full" />
                    <span>Complete impact documentation</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-pop-red rounded-full" />
                    <span>Workshop integration available</span>
                  </li>
                </ul>
                <Button className="bg-pop-red text-white hover:bg-pop-black systematic-caps">
                  Start Custom Order
                </Button>
              </div>
              
              <div className="relative">
                <PopArtContainer pattern="dots" className="bg-gray-100 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl helvetica-bold text-pop-red mb-2">CUSTOM</div>
                    <div className="systematic-caps text-pop-gray">Your Brand Here</div>
                  </div>
                </PopArtContainer>
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-pop-blue dots-pattern-blue opacity-60" />
              </div>
            </div>
          </PopArtContainer>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl helvetica-bold mb-6 systematic-caps">
            Questions About Our <span className="text-pop-green">Products</span>?
          </h2>
          <p className="text-lg text-pop-gray mb-8">
            Every product comes with complete provenance tracking and impact documentation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services">
              <Button className="bg-pop-green text-white hover:bg-pop-black systematic-caps text-lg px-8 py-4">
                Learn About Services
              </Button>
            </Link>
            <Link href="/track">
              <Button variant="outline" className="border-4 border-pop-black hover:bg-pop-black hover:text-white systematic-caps text-lg px-8 py-4">
                Track a Product
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}