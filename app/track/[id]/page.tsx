import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { PopArtContainer } from '@/app/components/PopArtElements';
import { ArrowRight, Calendar, Factory, Leaf, Scale, Users } from 'lucide-react';

async function getTrackingData(id: string) {
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:5000';
    
  try {
    const res = await fetch(`${baseUrl}/api/track/${id}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      return null;
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching tracking data:', error);
    return null;
  }
}

export default async function TrackingPage({ params }: { params: { id: string } }) {
  const data = await getTrackingData(params.id);
  
  if (!data) {
    notFound();
  }

  const statusColors = {
    'collected': 'bg-pop-blue',
    'processed': 'bg-pop-green', 
    'assembled': 'bg-pop-red',
    'delivered': 'bg-pop-black'
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-7xl helvetica-bold mb-6 tracking-tight">
            <span className="text-pop-green">YOUR PLASTIC'S</span><br />
            JOURNEY
          </h1>
          
          <div className="inline-flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-white border-4 border-pop-black flex items-center justify-center pop-shadow-green">
              <span className="systematic-caps text-xs font-bold">{data.qrCode}</span>
            </div>
            <Badge className={`${statusColors[data.status as keyof typeof statusColors]} text-white systematic-caps text-sm px-4 py-2`}>
              {data.status.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <PopArtContainer color="green" shadow className="bg-white border-4 border-pop-green p-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-pop-green rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl helvetica-bold systematic-caps">Source</h3>
                  <p className="text-pop-gray">{data.sourceCompany}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-pop-blue rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg helvetica-bold systematic-caps">Collected</h3>
                  <p className="text-pop-gray">{new Date(data.collectionDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </PopArtContainer>

          <PopArtContainer color="blue" shadow className="bg-white border-4 border-pop-blue p-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-pop-blue rounded-full flex items-center justify-center">
                  <Factory className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl helvetica-bold systematic-caps">Material</h3>
                  <p className="text-pop-gray">{data.materialType}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-pop-red rounded-full flex items-center justify-center">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg helvetica-bold systematic-caps">Weight</h3>
                  <p className="text-pop-gray">{data.weight}kg</p>
                </div>
              </div>
            </div>
          </PopArtContainer>
        </div>

        {/* Impact Metrics */}
        <Card className="border-4 border-pop-black pop-shadow-black mb-12">
          <CardHeader className="bg-pop-black text-white">
            <CardTitle className="text-3xl helvetica-bold systematic-caps flex items-center">
              <Leaf className="w-8 h-8 mr-3 text-pop-green" />
              Environmental Impact
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-4xl helvetica-bold text-pop-green mb-2">
                  {data.carbonOffset}kg
                </div>
                <p className="systematic-caps text-sm text-pop-gray">CO₂ Offset</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl helvetica-bold text-pop-blue mb-2">
                  {data.weight}kg
                </div>
                <p className="systematic-caps text-sm text-pop-gray">Waste Diverted</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transformation Story */}
        <div className="text-center mb-12">
          <h2 className="text-3xl helvetica-bold mb-6 systematic-caps">
            Transformed Into: <span className="text-pop-red">{data.productType?.replace('_', ' ').toUpperCase()}</span>
          </h2>
          
          <p className="text-xl text-pop-gray leading-relaxed mb-8 max-w-2xl mx-auto">
            This piece of plastic waste has been given new life as an educational tool, 
            helping students learn through hands-on making and building projects.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link href="/about">
            <Button size="lg" className="bg-pop-green text-pop-black hover:bg-pop-black hover:text-white systematic-caps text-lg px-8 py-4 pop-shadow-green">
              Learn About Our Process
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}