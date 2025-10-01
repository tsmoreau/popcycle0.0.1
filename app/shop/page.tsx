"use client";

import { useState, useEffect, useRef } from "react";
import {
  Package,
  Calendar,
  ChevronDown,
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
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <span className="text-sm text-pop-gray">Filter products:</span>
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="border border-gray-200 bg-white pl-5 pr-10 py-3 text-sm systematic-caps cursor-pointer hover:bg-gray-50 transition-colors flex items-center whitespace-nowrap"
              >
                {selectedCategory}
                <ChevronDown className="ml-2 w-4 h-4 text-pop-black" />
              </button>
              
              {filterOpen && (
                <div className="absolute top-full left-0 min-w-full bg-white border border-gray-200 mt-2 overflow-hidden z-10">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setFilterOpen(false);
                      }}
                      className="block w-full text-left px-5 py-3 systematic-caps text-sm hover:bg-pop-green hover:text-white transition-colors whitespace-nowrap"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="text-sm text-pop-gray">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <LoadingSquare color="green" text="Loading Products..." />
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {filteredProducts.map((product) => (
              <div 
                key={product._id} 
                className="bg-white"
                data-testid={`card-product-${product._id}`}
              >
                <div className="w-full h-64 mb-4 flex items-center justify-center overflow-hidden bg-gray-50">
                  {product.designFiles.photos && product.designFiles.photos.length > 0 ? (
                    <img 
                      src={product.designFiles.photos[0]} 
                      alt={product.name}
                      className="w-full h-full object-contain"
                      data-testid={`img-product-${product._id}`}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          const icon = document.createElement('div');
                          icon.innerHTML = '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-300"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><line x1="12" y1="22" x2="12" y2="12"></line></svg>';
                          parent.appendChild(icon.firstChild!);
                        }
                      }}
                    />
                  ) : (
                    <Package className="w-16 h-16 text-gray-300" />
                  )}
                </div>
                
                <div>
                  <h3 className="text-base mb-1 text-pop-black" data-testid={`text-product-name-${product._id}`}>
                    {product.name}
                  </h3>
                  <p className="text-sm text-pop-gray mb-2" data-testid={`text-product-category-${product._id}`}>
                    {categoryMap[product.category]}
                  </p>
                  <p className="text-sm text-pop-black" data-testid={`text-product-price-${product._id}`}>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(product.price)}
                  </p>
                </div>
              </div>
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
