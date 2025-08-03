'use client'

import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { PopArtContainer } from "../components/PopArtElements";
import { Package, ShoppingCart, Heart, Star, Calendar, Weight } from "lucide-react";

const products = [
  {
    id: 'rover_chassis',
    name: 'Educational Rover Chassis',
    price: 45,
    description: 'Complete rover chassis kit made from recycled HDPE plastic. Perfect for robotics education and STEM learning.',
    image: '/api/placeholder/300/200',
    category: 'Educational Kits',
    inStock: true,
    rating: 4.8,
    reviews: 24,
    plasticSource: 'Corporate Cafeterias',
    weight: '2.3kg recycled plastic'
  },
  {
    id: 'assembly_toy',
    name: 'Modular Assembly Set',
    price: 32,
    description: 'Interlocking building pieces that teach engineering principles while demonstrating circular manufacturing.',
    image: '/api/placeholder/300/200',
    category: 'Educational Toys',
    inStock: true,
    rating: 4.6,
    reviews: 18,
    plasticSource: 'Office Buildings',
    weight: '1.7kg recycled plastic'
  },
  {
    id: 'educational_kit',
    name: 'Sustainability Learning Kit',
    price: 38,
    description: 'Hands-on kit teaching circular economy principles through interactive plastic transformation activities.',
    image: '/api/placeholder/300/200',
    category: 'Educational Kits',
    inStock: true,
    rating: 4.9,
    reviews: 31,
    plasticSource: 'Community Cleanups',
    weight: '3.1kg recycled plastic'
  },
  {
    id: 'dinnerware',
    name: 'Eco Dinnerware Set',
    price: 28,
    description: 'Durable dinnerware set crafted from recycled plastic. Food-safe and perfect for outdoor education programs.',
    image: '/api/placeholder/300/200',
    category: 'Practical Items',
    inStock: true,
    rating: 4.7,
    reviews: 15,
    plasticSource: 'Startup Offices',
    weight: '1.9kg recycled plastic'
  },
  {
    id: 'garden_tools',
    name: 'Mini Garden Tool Set',
    price: 35,
    description: 'Child-friendly garden tools made from recycled plastic. Great for outdoor learning and environmental education.',
    image: '/api/placeholder/300/200',
    category: 'Educational Tools',
    inStock: false,
    rating: 4.5,
    reviews: 9,
    plasticSource: 'School Cafeterias',
    weight: '2.1kg recycled plastic'
  },
  {
    id: 'measurement_kit',
    name: 'Science Measurement Kit',
    price: 42,
    description: 'Precision measurement tools for science education, all crafted from traceable recycled plastic materials.',
    image: '/api/placeholder/300/200',
    category: 'Educational Kits',
    inStock: true,
    rating: 4.8,
    reviews: 22,
    plasticSource: 'Corporate Events',
    weight: '2.5kg recycled plastic'
  }
];

const categories = ['All', 'Forever Flowers', 'Kinetic Sculptures ', 'Practical Items', 'Educational Tools'];

export default function Shop() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl helvetica-bold mb-6 text-pop-black">
            SHOP
          </h1>
          <p className="text-xl text-pop-black max-w-3xl mx-auto mb-8">
            Toys, games, models, and more, custom cut from traceable 100% recycled plastic waste. Choose your design and a sheet blank and we'll send you a unique piece of sustainability.</p>
          <div className="flex justify-center items-center gap-4 text-pop-black">
            <Package className="w-6 h-6" />
            <span className="systematic-caps">All Products Include QR Tracking</span>
          </div>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-3 border-2 border-pop-black bg-white hover:bg-pop-black hover:text-white transition-colors systematic-caps"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <PopArtContainer key={product.id} color={product.inStock ? "blue" : "black"} shadow>
              <Card className="border-4 border-pop-black h-full">
                <CardHeader className="pb-4">
                  <div className="w-full h-48 bg-pop-gray border-2 border-pop-black mb-4 flex items-center justify-center">
                    <Package className="w-16 h-16 text-pop-black" />
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={`${product.inStock ? 'bg-pop-green' : 'bg-pop-gray'} text-pop-black`}>
                      {product.category}
                    </Badge>
                    <div className="text-right">
                      <div className="text-2xl helvetica-bold text-pop-black">
                        ${product.price}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="systematic-caps text-lg mb-2">
                    {product.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-pop-gray leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="systematic-caps text-pop-gray">Source</span>
                      <span>{product.plasticSource}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="systematic-caps text-pop-gray">Weight</span>
                      <span className="flex items-center">
                        <Weight className="w-3 h-3 mr-1" />
                        {product.weight}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="systematic-caps text-pop-gray">Rating</span>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 mr-1 fill-pop-black" />
                        <span>{product.rating} ({product.reviews})</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <button 
                      className={`flex-1 py-3 px-4 border-2 border-pop-black transition-colors systematic-caps ${
                        product.inStock 
                          ? 'bg-pop-blue text-pop-black hover:bg-pop-black hover:text-white' 
                          : 'bg-pop-gray text-pop-black cursor-not-allowed'
                      }`}
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2 inline" />
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <button className="p-3 border-2 border-pop-black bg-white hover:bg-pop-red hover:text-white transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </PopArtContainer>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-pop-black text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl helvetica-bold mb-6">
            Every Purchase Tells a Story
          </h2>
          <p className="text-lg max-w-3xl mx-auto mb-8">
            When you buy PopCycle products, you receive complete provenance tracking from the original corporate waste source through manufacturing to your hands. Scan the QR code to see your item's transformation journey.
          </p>
          <div className="flex justify-center items-center gap-4">
            <Calendar className="w-6 h-6" />
            <span className="systematic-caps">Track Your Impact Over Time</span>
          </div>
        </div>
      </div>
    </div>
  );
}