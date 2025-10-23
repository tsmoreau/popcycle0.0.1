"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { LoadingSquare } from "../../../components/ui/loading-square";
import {
  ArrowLeft,
  Check,
  Package,
  Truck,
  Star,
  ShoppingCart,
} from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSquare size="lg" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <h1 className="text-2xl font-medium mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">{error || "This product doesn't exist"}</p>
        <Link href="/shop">
          <Button>
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

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            href="/shop"
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2"
            data-testid="link-back-shop"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="aspect-square bg-gray-50 mb-4 overflow-hidden">
              {images.length > 0 ? (
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  data-testid="img-product-main"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-24 h-24 text-gray-300" />
                </div>
              )}
            </div>

            {/* Thumbnail Grid */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-gray-50 overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-gray-900"
                        : "border-transparent hover:border-gray-300"
                    }`}
                    data-testid={`button-thumbnail-${index}`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Category Badge */}
            <Badge
              variant="outline"
              className="mb-4"
              data-testid="badge-category"
            >
              {categoryLabels[product.category]}
            </Badge>

            {/* Product Name */}
            <h1 className="text-4xl lg:text-5xl font-light mb-4" data-testid="text-product-name">
              {product.name}
            </h1>

            {/* Product Type */}
            <p className="text-lg text-gray-600 mb-6" data-testid="text-product-type">
              {productTypeLabels[product.productType]}
            </p>

            {/* Rating */}
            {product.reviewCount > 0 && (
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            )}

            {/* Description */}
            <p className="text-gray-700 mb-8 leading-relaxed" data-testid="text-description">
              {product.description}
            </p>

            {/* Price */}
            <div className="mb-8">
              <span className="text-3xl font-light" data-testid="text-price">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Stock Status */}
            <div className="mb-8">
              {product.inStock ? (
                <div className="flex items-center gap-2 text-green-600" data-testid="status-in-stock">
                  <Check className="h-5 w-5" />
                  <span>In Stock</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600" data-testid="status-out-of-stock">
                  <span>Out of Stock</span>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4 mb-12">
              <Button
                size="lg"
                className="w-full"
                disabled={!product.inStock}
                data-testid="button-add-to-cart"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full"
                data-testid="button-contact"
              >
                Contact for Custom Order
              </Button>
            </div>

            {/* Features */}
            <div className="border-t pt-8">
              <h3 className="text-lg font-medium mb-4">Product Features</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Made from 100% recycled plastic
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Fully traceable from source to product
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Custom branding available
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Ships within 2-3 business days
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
