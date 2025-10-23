"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { LoadingSquare } from "../../../components/ui/loading-square";
import { ArrowLeft, ChevronLeft, ChevronRight, Package, Image as ImageIcon } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  description: string;
  slug: string;
  category: "workshop" | "studio_edition" | "client_edition";
  productType:
    | "coasters"
    | "keychains"
    | "bookmarks"
    | "magnets"
    | "earrings"
    | "lighting"
    | "cutting_boards";
  designFiles?: {
    cncVectors?: string[];
    laserVectors?: string[];
    instructionsPdfs?: string[];
    photos?: string[];
  };
  _photoUrls?: string[];
  assets?: Array<{
    id: string;
    type: "image" | "video" | "document" | "model";
    url: string;
    thumbnail?: string;
    alt?: string;
    description?: string;
    isPrimary?: boolean;
    order?: number;
  }>;
  price: number;
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

const categoryLabels = {
  workshop: "Workshop",
  studio_edition: "Studio Edition",
  client_edition: "Client Edition",
};

const productTypeLabels = {
  coasters: "Coasters",
  keychains: "Keychains",
  bookmarks: "Bookmarks",
  magnets: "Magnets",
  earrings: "Earrings",
  lighting: "Lighting",
  cutting_boards: "Cutting Boards",
};

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/shop/products/${slug}`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <LoadingSquare size="lg" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white">
        <h1 className="text-2xl font-light mb-4">Product Not Found</h1>
        <p className="text-gray-500 mb-12">{error || "This product doesn't exist"}</p>
        <Link href="/shop">
          <Button variant="outline" size="lg">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Button>
        </Link>
      </div>
    );
  }

  // Get images from both photoUrls and assets
  const images: string[] = [
    ...(product._photoUrls || []),
    ...(product.assets
      ?.filter((a) => a.type === "image")
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map((a) => a.url) || []),
  ];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Top Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-4">
          <Link
            href="/shop"
            className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-2 transition-colors"
            data-testid="link-back-shop"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Shop
          </Link>
        </div>
      </div>

      {/* Hero Image Section */}
      <section className="relative mt-16 h-[75vh] bg-gray-50">
        {images.length > 0 ? (
          <>
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
              data-testid="img-product-main"
            />
            
            {/* Image Navigation */}
            {images.length > 1 && (
              <>
                {/* Arrow Navigation */}
                <button
                  onClick={prevImage}
                  className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full transition-all"
                  data-testid="button-prev-image"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-900" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full transition-all"
                  data-testid="button-next-image"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5 text-gray-900" />
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`transition-all ${
                        selectedImage === index
                          ? "w-8 h-2 bg-white rounded-full"
                          : "w-2 h-2 bg-white/50 hover:bg-white/75 rounded-full"
                      }`}
                      data-testid={`button-dot-${index}`}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-32 h-32 text-gray-200" />
          </div>
        )}
      </section>

      {/* Product Information - Single Column Editorial Layout */}
      <section className="max-w-3xl mx-auto px-6 lg:px-12 py-20 lg:py-32">
        {/* Category */}
        <p className="text-xs uppercase tracking-wider text-gray-400 mb-6" data-testid="badge-category">
          {categoryLabels[product.category]}
        </p>

        {/* Product Name */}
        <h1 className="text-5xl lg:text-6xl font-light mb-6 leading-tight" data-testid="text-product-name">
          {product.name}
        </h1>

        {/* Product Type */}
        <p className="text-xl text-gray-500 mb-12 font-light" data-testid="text-product-type">
          {productTypeLabels[product.productType]}
        </p>

        {/* Description */}
        <div className="prose prose-lg max-w-none mb-16">
          <p className="text-gray-700 leading-relaxed font-light text-lg" data-testid="text-description">
            {product.description}
          </p>
        </div>

        {/* Price & Actions */}
        <div className="border-t border-gray-100 pt-12">
          <div className="flex items-baseline gap-3 mb-8">
            <span className="text-4xl font-light" data-testid="text-price">
              ${product.price.toFixed(2)}
            </span>
            {product.inStock ? (
              <span className="text-sm text-gray-500" data-testid="status-in-stock">
                In stock
              </span>
            ) : (
              <span className="text-sm text-red-500" data-testid="status-out-of-stock">
                Out of stock
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="flex-1 h-14 text-base font-light"
              disabled={!product.inStock}
              data-testid="button-add-to-cart"
            >
              Add to basket
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 h-14 text-base font-light border-gray-300"
              data-testid="button-contact"
            >
              Request quote
            </Button>
          </div>
        </div>
      </section>

      {/* Full-Width Lifestyle Image */}
      <section className="relative h-[80vh] bg-gray-100">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <ImageIcon className="w-32 h-32 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400 text-sm">Lifestyle Image</p>
          </div>
        </div>
      </section>

      {/* Detail Images Grid */}
      <section className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <h2 className="text-3xl font-light mb-12 text-center">Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-square bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <ImageIcon className="w-20 h-20 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-400 text-xs">Detail {i}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Materials & Colors */}
      <section className="bg-gray-50 py-20 lg:py-32">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-light mb-12 text-center">Materials & Colors</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-24 h-24 rounded-full bg-gray-200 border-2 border-gray-300"></div>
                <p className="text-xs text-gray-500">Color {i}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-Width Environmental Shot */}
      <section className="relative h-[80vh] bg-gray-100">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <ImageIcon className="w-32 h-32 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400 text-sm">Environmental Image</p>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="max-w-3xl mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <h2 className="text-3xl font-light mb-12">Specifications</h2>
        
        <dl className="space-y-6 text-base">
          <div className="flex border-b border-gray-50 pb-4">
            <dt className="w-1/3 text-gray-500 font-light">Material</dt>
            <dd className="w-2/3 text-gray-900 font-light">100% recycled plastic</dd>
          </div>
          <div className="flex border-b border-gray-50 pb-4">
            <dt className="w-1/3 text-gray-500 font-light">Category</dt>
            <dd className="w-2/3 text-gray-900 font-light">{categoryLabels[product.category]}</dd>
          </div>
          <div className="flex border-b border-gray-50 pb-4">
            <dt className="w-1/3 text-gray-500 font-light">Type</dt>
            <dd className="w-2/3 text-gray-900 font-light">{productTypeLabels[product.productType]}</dd>
          </div>
          <div className="flex border-b border-gray-50 pb-4">
            <dt className="w-1/3 text-gray-500 font-light">Traceability</dt>
            <dd className="w-2/3 text-gray-900 font-light">Complete source-to-product tracking</dd>
          </div>
          <div className="flex border-b border-gray-50 pb-4">
            <dt className="w-1/3 text-gray-500 font-light">Customization</dt>
            <dd className="w-2/3 text-gray-900 font-light">Custom branding available</dd>
          </div>
          <div className="flex pb-4">
            <dt className="w-1/3 text-gray-500 font-light">Shipping</dt>
            <dd className="w-2/3 text-gray-900 font-light">2-3 business days</dd>
          </div>
        </dl>
      </section>

      {/* Related Products */}
      <section className="bg-gray-50 py-20 lg:py-32">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-light mb-12">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Link key={i} href="/shop" className="group">
                <div className="aspect-square bg-gray-100 mb-4 overflow-hidden flex items-center justify-center">
                  <Package className="w-20 h-20 text-gray-300" />
                </div>
                <h3 className="text-base font-light mb-1">Related Product {i}</h3>
                <p className="text-sm text-gray-500 font-light">From $XX.XX</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Spacer for breathing room */}
      <div className="h-20"></div>
    </div>
  );
}
