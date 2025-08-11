"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { PopArtContainer } from "../components/PopArtElements";
import {
  Package,
  ShoppingCart,
  Heart,
  Star,
  Calendar,
  Weight,
} from "lucide-react";
import { LoadingSquare } from "../components/ui/loading-square";

interface Product {
  _id: string;
  name: string;
  description: string;
  category: 'flora_fauna' | 'kinetic_sculptures' | 'vehicles_vessels' | 'pop_bots' | 'everyday_objects' | 'limited_editions';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedAssemblyTime: number;
  materialRequirements: {
    plasticType: 'HDPE' | 'PET' | 'PP';
    weight: number;
  };
  designFiles: {
    instructionsPdf?: string;
    templateSvg?: string;
    photos: string[];
  };
  assets?: {
    id: string;
    type: 'image' | 'video' | 'document' | 'model';
    url: string;
    thumbnail?: string;
    alt?: string;
    description?: string;
    isPrimary?: boolean;
    order?: number;
  }[];
  price: number;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

// Map database categories to display categories
const categoryMap = {
  'flora_fauna': 'Flora & Fauna',
  'kinetic_sculptures': 'Kinetic Sculptures',
  'vehicles_vessels': 'Vehicles & Vessels',
  'pop_bots': 'Pop Bots',
  'everyday_objects': 'Everyday Objects',
  'limited_editions': 'Limited Editions'
};

const categories = [
  "All",
  "Flora & Fauna",
  "Kinetic Sculptures",
  "Vehicles & Vessels",
  "Pop Bots",
  "Everyday Objects",
  "Limited Editions",
];

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/shop/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => categoryMap[product.category] === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-white py-0 pt-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl helvetica-bold mb-6 text-pop-black">SHOP</h1>
          <p className="text-xl text-pop-black max-w-3xl mx-auto mb-8">
            Toys, games, models, and more, custom-cut from traceable, 100%
            recycled waste plastic. Choose your design and a sheet blank and
            we'll send you a unique piece of sustainability.
          </p>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 border-2 border-pop-black transition-colors systematic-caps ${
                selectedCategory === category 
                  ? 'bg-pop-black text-white' 
                  : 'bg-white hover:bg-pop-black hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <LoadingSquare />
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="text-pop-red systematic-caps mb-4">Error Loading Products</div>
            <p className="text-pop-gray">{error}</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-pop-gray mx-auto mb-4" />
            <div className="text-pop-gray systematic-caps">No Products Found</div>
            {selectedCategory !== "All" && (
              <p className="text-pop-gray mt-2">Try selecting a different category</p>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <PopArtContainer
                key={product._id}
                color={product.inStock ? "blue" : "black"}
                shadow
              >
                <Card className="border-4 border-pop-black h-full">
                  <CardHeader className="pb-4">
                    <div className="w-full h-48 bg-pop-white border-2 border-pop-black mb-4 flex items-center justify-center">
                      {product.designFiles.photos && product.designFiles.photos.length > 0 ? (
                        <img 
                          src={product.designFiles.photos[0]} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package className="w-16 h-16 text-pop-black" />
                      )}
                    </div>
                    <div className="flex justify-between items-start mb-2">
                      <Badge
                        className={`${product.inStock ? "bg-pop-green" : "bg-pop-gray"} text-pop-black`}
                      >
                        {categoryMap[product.category]}
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
                        <span className="systematic-caps text-pop-gray">
                          Material
                        </span>
                        <span>{product.materialRequirements.plasticType}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="systematic-caps text-pop-gray">
                          Weight
                        </span>
                        <span className="flex items-center">
                          <Weight className="w-3 h-3 mr-1" />
                          {product.materialRequirements.weight}kg recycled plastic
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="systematic-caps text-pop-gray">
                          Difficulty
                        </span>
                        <span className="capitalize">{product.difficulty}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="systematic-caps text-pop-gray">
                          Assembly Time
                        </span>
                        <span>{product.estimatedAssemblyTime} min</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="systematic-caps text-pop-gray">
                          Rating
                        </span>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 mr-1 fill-pop-black" />
                          <span>
                            {product.rating} ({product.reviewCount})
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <button
                        className={`flex-1 py-3 px-4 border-2 border-pop-black transition-colors systematic-caps ${
                          product.inStock
                            ? "bg-pop-blue text-pop-black hover:bg-pop-black hover:text-white"
                            : "bg-pop-gray text-pop-black cursor-not-allowed"
                        }`}
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2 inline" />
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
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
        )}
      </div>

      {/* Bottom CTA */}
      <div className="bg-pop-black text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl helvetica-bold mb-6">
            Every Purchase Tells a Story
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Register the assembly of your design to complete the circular
            journey from waste to wonder.
          </p>
          <div className="flex justify-center items-center gap-4">
            <Calendar className="w-6 h-6" />
            <span className="systematic-caps">Start Your Maker Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
}
