import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PopArtContainer, MetricCard } from "@/components/pop-art-elements";
import { Building, GraduationCap, Users, Mail, Phone, MapPin } from "lucide-react";
import { Partner } from "@shared/schema";

export default function Partners() {
  const { data: partners } = useQuery<Partner[]>({
    queryKey: ["/api/partners"],
  });

  const corporatePartners = partners?.filter(p => p.type === "corporate") || [];
  const educationalPartners = partners?.filter(p => p.type === "educational") || [];
  const communityPartners = partners?.filter(p => p.type === "community") || [];

  const getPartnerIcon = (type: string) => {
    switch (type) {
      case "corporate": return <Building className="w-6 h-6" />;
      case "educational": return <GraduationCap className="w-6 h-6" />;
      case "community": return <Users className="w-6 h-6" />;
      default: return <Building className="w-6 h-6" />;
    }
  };

  const getPartnerColor = (type: string) => {
    switch (type) {
      case "corporate": return "green";
      case "educational": return "blue";
      case "community": return "red";
      default: return "green";
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-7xl helvetica-bold mb-8 tracking-tight">
            <span className="text-pop-green">PARTNER</span><br />
            WITH US
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed text-pop-gray">
            Join corporations, educational institutions, and community organizations transforming waste into learning opportunities.
          </p>
        </div>

        {/* Partnership Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div className="space-y-8">
            <PopArtContainer color="green" pattern="geometric" shadow className="bg-pop-green text-white p-8">
              <h2 className="text-3xl helvetica-bold mb-4 systematic-caps flex items-center space-x-3">
                <Building className="w-8 h-8" />
                <span>For Corporations</span>
              </h2>
              <ul className="space-y-3 text-lg">
                <li>• Free plastic waste pickup & processing</li>
                <li>• Detailed impact reporting for ESG compliance</li>
                <li>• Team building workshops ($200-300/person)</li>
                <li>• 90-day pilot programs available</li>
                <li>• Custom branded educational products</li>
              </ul>
            </PopArtContainer>
            
            <PopArtContainer color="blue" pattern="geometric" shadow className="bg-pop-blue text-white p-8">
              <h2 className="text-3xl helvetica-bold mb-4 systematic-caps flex items-center space-x-3">
                <GraduationCap className="w-8 h-8" />
                <span>For Schools</span>
              </h2>
              <ul className="space-y-3 text-lg">
                <li>• Complete STEM curriculum packages</li>
                <li>• Teacher training & certification</li>
                <li>• Summer camp partnerships</li>
                <li>• After-school program licensing</li>
                <li>• Free educational materials</li>
              </ul>
            </PopArtContainer>
          </div>
          
          <div className="relative">
            <PopArtContainer pattern="dots" className="bg-gray-100 h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl helvetica-bold text-pop-green mb-4">COMMUNITY</div>
                <div className="systematic-caps text-pop-gray">Building Together</div>
              </div>
            </PopArtContainer>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-pop-red dots-pattern-red opacity-80" />
          </div>
        </div>

        {/* Current Partners */}
        <div className="mb-20">
          <h2 className="text-4xl helvetica-bold mb-12 text-center systematic-caps">
            Current <span className="text-pop-blue">Partners</span>
          </h2>
          
          {/* Partner Categories */}
          <div className="space-y-12">
            {/* Corporate Partners */}
            <div>
              <h3 className="text-2xl helvetica-bold mb-6 text-pop-green systematic-caps flex items-center space-x-2">
                <Building className="w-6 h-6" />
                <span>Corporate Partners</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {corporatePartners.map((partner) => (
                  <Card key={partner.id} className="border-4 border-pop-green">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="helvetica-bold">{partner.name}</span>
                        <Badge variant="outline" className="border-pop-green text-pop-green">
                          {partner.type}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="text-2xl helvetica-bold text-pop-green">
                          {partner.plasticContributed}kg
                        </div>
                        <div className="text-sm text-pop-gray systematic-caps">
                          Plastic Contributed
                        </div>
                        <div className="text-sm text-pop-gray">
                          Joined {new Date(partner.joinedDate).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Educational Partners */}
            <div>
              <h3 className="text-2xl helvetica-bold mb-6 text-pop-blue systematic-caps flex items-center space-x-2">
                <GraduationCap className="w-6 h-6" />
                <span>Educational Partners</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {educationalPartners.map((partner) => (
                  <Card key={partner.id} className="border-4 border-pop-blue">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="helvetica-bold">{partner.name}</span>
                        <Badge variant="outline" className="border-pop-blue text-pop-blue">
                          {partner.type}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="text-2xl helvetica-bold text-pop-blue">
                          {partner.plasticContributed}kg
                        </div>
                        <div className="text-sm text-pop-gray systematic-caps">
                          Plastic Contributed
                        </div>
                        <div className="text-sm text-pop-gray">
                          Joined {new Date(partner.joinedDate).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Community Partners */}
            <div>
              <h3 className="text-2xl helvetica-bold mb-6 text-pop-red systematic-caps flex items-center space-x-2">
                <Users className="w-6 h-6" />
                <span>Community Partners</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {communityPartners.map((partner) => (
                  <Card key={partner.id} className="border-4 border-pop-red">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="helvetica-bold">{partner.name}</span>
                        <Badge variant="outline" className="border-pop-red text-pop-red">
                          {partner.type}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="text-2xl helvetica-bold text-pop-red">
                          {partner.plasticContributed}kg
                        </div>
                        <div className="text-sm text-pop-gray systematic-caps">
                          Plastic Contributed
                        </div>
                        <div className="text-sm text-pop-gray">
                          Joined {new Date(partner.joinedDate).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Partnership Process */}
        <div className="mb-20">
          <h2 className="text-4xl helvetica-bold mb-12 text-center systematic-caps">
            Partnership <span className="text-pop-green">Process</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <PopArtContainer color="green" className="bg-white border-4 border-pop-green p-6 text-center">
              <div className="w-12 h-12 bg-pop-green text-white rounded-full flex items-center justify-center helvetica-bold text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="helvetica-bold mb-2 systematic-caps">Contact</h3>
              <p className="text-sm">Initial consultation and needs assessment</p>
            </PopArtContainer>
            
            <PopArtContainer color="blue" className="bg-white border-4 border-pop-blue p-6 text-center">
              <div className="w-12 h-12 bg-pop-blue text-white rounded-full flex items-center justify-center helvetica-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="helvetica-bold mb-2 systematic-caps">Demo</h3>
              <p className="text-sm">Hands-on workshop experience for decision makers</p>
            </PopArtContainer>
            
            <PopArtContainer color="red" className="bg-white border-4 border-pop-red p-6 text-center">
              <div className="w-12 h-12 bg-pop-red text-white rounded-full flex items-center justify-center helvetica-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="helvetica-bold mb-2 systematic-caps">Pilot</h3>
              <p className="text-sm">90-day trial program with clear success metrics</p>
            </PopArtContainer>
            
            <PopArtContainer color="green" className="bg-white border-4 border-pop-green p-6 text-center">
              <div className="w-12 h-12 bg-pop-green text-white rounded-full flex items-center justify-center helvetica-bold text-xl mx-auto mb-4">
                4
              </div>
              <h3 className="helvetica-bold mb-2 systematic-caps">Scale</h3>
              <p className="text-sm">Full partnership with ongoing support and expansion</p>
            </PopArtContainer>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-8">
          <PopArtContainer color="red" pattern="geometric" className="bg-pop-red text-white p-12">
            <h2 className="text-4xl helvetica-bold mb-6 systematic-caps">Ready to Transform?</h2>
            <p className="text-xl mb-8 leading-relaxed">
              Join the circular economy revolution. Transform your waste into educational impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-pop-red hover:bg-gray-100 systematic-caps text-lg px-8 py-4">
                Start Partnership
              </Button>
              <Button variant="outline" className="border-4 border-white text-white hover:bg-white hover:text-pop-red systematic-caps text-lg px-8 py-4">
                Download Info Pack
              </Button>
            </div>
          </PopArtContainer>
        </div>

        {/* Contact Information */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-4 border-pop-green text-center">
            <CardContent className="p-8">
              <Mail className="w-12 h-12 text-pop-green mx-auto mb-4" />
              <h3 className="helvetica-bold mb-2 systematic-caps">Email</h3>
              <p className="text-pop-gray">partnerships@popcycle.io</p>
            </CardContent>
          </Card>
          
          <Card className="border-4 border-pop-blue text-center">
            <CardContent className="p-8">
              <Phone className="w-12 h-12 text-pop-blue mx-auto mb-4" />
              <h3 className="helvetica-bold mb-2 systematic-caps">Phone</h3>
              <p className="text-pop-gray">(555) 123-4567</p>
            </CardContent>
          </Card>
          
          <Card className="border-4 border-pop-red text-center">
            <CardContent className="p-8">
              <MapPin className="w-12 h-12 text-pop-red mx-auto mb-4" />
              <h3 className="helvetica-bold mb-2 systematic-caps">Location</h3>
              <p className="text-pop-gray">San Francisco, CA</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
