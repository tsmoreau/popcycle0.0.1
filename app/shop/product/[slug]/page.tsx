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
    category?: "hero" | "product_info" | "lifestyle" | "detail" | "shop_listing";
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

  // Helper function to get images by category
  const getImagesByCategory = (category: "hero" | "product_info" | "lifestyle" | "detail" | "shop_listing") => {
    return product.assets
      ?.filter((a) => a.type === "image" && a.category === category)
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map((a) => a.url) || [];
  };

  // Get all images (for fallback and uncategorized)
  const allImages: string[] = [
    ...(product._photoUrls || []),
    ...(product.assets
      ?.filter((a) => a.type === "image")
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map((a) => a.url) || []),
  ];

  // Get categorized images with fallbacks
  const heroImage = getImagesByCategory("hero")[0] || allImages[0];
  const productInfoImage = getImagesByCategory("product_info")[0];
  const lifestyleImages = getImagesByCategory("lifestyle");
  const detailImages = getImagesByCategory("detail");

  // If no lifestyle images categorized, use all images for carousel
  const carouselImages = lifestyleImages.length > 0 ? lifestyleImages : allImages;

  const nextImage = () => {
    if (carouselImages.length === 0) return;
    setSelectedImage((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    if (carouselImages.length === 0) return;
    setSelectedImage((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <div className="font-jost  bg-white">
     
     
      {/* Hero Image Section - Single Static Image */}
      <section className="relative h-[70vh] bg-gray-50">
        {heroImage ? (
          <img
            src={heroImage}
            alt={product.name}
            className="w-full h-full object-cover"
            data-testid="img-product-hero"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-32 h-32 text-gray-200" />
          </div>
        )}
      </section>

      {/* Product Information - Single Column Editorial Layout */}
      <div className="w-full px-12 flex mx-auto justify-center h-auto my-8">
     
      <div className="bg-gray-50 w-2/3 self-center h-[60vh] flex items-center justify-center overflow-hidden">
        {productInfoImage ? (
          <img
            src={productInfoImage}
            alt={`${product.name} - Product Info`}
            className="w-full h-full object-cover"
            data-testid="img-product-info"
          />
        ) : (
          <ImageIcon className="w-20 h-20 text-gray-300" />
        )}
      </div>
      <div className="  w-1/3 lg:pl-12 py-6 lg:py-16">
      

        {/* Product Name */}
        <h1 className="text-3xl tracking-tight lg:text-5xl font-light mb-1.5 text-gray-700 leading-tight" data-testid="text-product-name">
          {product.name}
        </h1>
<div className="flex">
        {/* Category */}
        <p className="text-xl text-gray-500 mb-6 font-normal" data-testid="badge-category">
          {categoryLabels[product.category]}
        </p>

        {/* Product Type */}
        <p className="hidden px-1 text-xl text-gray-500 mb-6 font-light" data-testid="text-product-type">
          {productTypeLabels[product.productType]}
        </p>
  </div>

        {/* Description */}
        <div className="prose prose-lg max-w-none">
          <p className="bg-white text-gray-700 leading-relaxed font-[300] text-xl leading-6.5" data-testid="text-description">
            {product.description}
          </p>
        </div>

        {/* Price & Actions */}
        <div className=" border-gray-100 pt-8">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-3xl text-gray-800 font-normal tracking-tight" data-testid="text-price">
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
              className="text-white hover:bg-white hover:text-pop-green bg-pop-green systematic-caps w-xl px-12 px-6 text-base font-light"
              disabled={!product.inStock}
              data-testid="button-add-to-cart"
            >
              Add
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="hidden flex-1 h-14 text-base font-light border-gray-300"
              data-testid="button-contact"
            >
              Request quote
            </Button>
          </div>
        </div>
      </div>
       
        </div>

      {/* Lifestyle Image Carousel */}
      <section className="relative w-full h-[80vh] flex mx-auto justify-center mb-6 mt-12">
        <div className="relative w-full h-full bg-gray-50">
          {carouselImages.length > 0 ? (
            <>
              <img
                src={carouselImages[selectedImage]}
                alt={`${product.name} - Image ${selectedImage + 1}`}
                className="w-full h-full object-cover"
                data-testid="img-lifestyle-main"
              />
              
              {/* Carousel Navigation */}
              {carouselImages.length > 1 && (
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
                    {carouselImages.map((_, index) => (
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
              <div className="text-center">
                <ImageIcon className="w-32 h-32 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-400 text-sm">Lifestyle Images</p>
              </div>
            </div>
          )}
        </div>
      </section>
      
    
    
      {/* Narrative & Technical Specifications */}
     <div className="lg:flex justify-center  px-6 lg:px-12 py-8 lg:py-16">
       <div className=" w-1/3 px-6 ">
          <h2 className="text-3xl font-light mb-12">Specifications</h2>

          <dl className="space-y-3 text-base">
            <div className="flex border-b border-gray-50 pb-2">
              <dt className="w-1/3 text-gray-500 font-light">Material</dt>
              <dd className="w-2/3 text-gray-900 font-light">100% recycled plastic</dd>
            </div>
            <div className="flex border-b border-gray-50 pb-2">
              <dt className="w-1/3 text-gray-500 font-light">Category</dt>
              <dd className="w-2/3 text-gray-900 font-light">{categoryLabels[product.category]}</dd>
            </div>
            <div className="flex border-b border-gray-50 pb-2">
              <dt className="w-1/3 text-gray-500 font-light">Type</dt>
              <dd className="w-2/3 text-gray-900 font-light">{productTypeLabels[product.productType]}</dd>
            </div>
            <div className="flex border-b border-gray-50 pb-2">
              <dt className="w-1/3 text-gray-500 font-light">Traceability</dt>
              <dd className="w-2/3 text-gray-900 font-light">Complete source-to-product tracking</dd>
            </div>
            <div className="flex border-b border-gray-50 pb-2">
              <dt className="w-1/3 text-gray-500 font-light">Customization</dt>
              <dd className="w-2/3 text-gray-900 font-light">Custom branding available</dd>
            </div>
            <div className="flex pb-4">
              <dt className="w-1/3 text-gray-500 font-light">Shipping</dt>
              <dd className="w-2/3 text-gray-900 font-light">2-3 business days</dd>
            </div>
          </dl>
        </div>

              <div className="w-1/3  text-gray-900 px-6">
                <h2 className="text-3xl font-light mb-12">Narrative</h2>
       <div className="font-light">

         Every gamer recognizes the panic of a draining health bar. These potion bottle coasters capture that exact moment—swirled colors bleeding through translucent material like liquid catching light through glass.
         The material's natural inconsistency becomes the design feature. Colors bleed and swirl the way actual liquid settles in a bottle, creating that organic, slightly magical quality. No two are identical.
         Available as singles or in sets of four showing different fill levels—full to nearly empty—because we all know that feeling of limping back to camp on a sliver of HP.

       </div>
               </div>
     
       </div>


      {/* Detail Images Grid */}
      <section className="max-w-screen-2xl mx-auto px-6 pt-12">
        <h2 className="hidden text-3xl font-light mb-12 text-center">Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {detailImages.length > 0 ? (
            detailImages.map((image, i) => (
              <div key={i} className="aspect-square bg-gray-100 overflow-hidden">
                <img
                  src={image}
                  alt={`${product.name} - Detail ${i + 1}`}
                  className="w-full h-full object-cover"
                  data-testid={`img-detail-${i}`}
                />
              </div>
            ))
          ) : (
            [1, 2, 3].map((i) => (
              <div key={i} className="aspect-square bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <ImageIcon className="w-20 h-20 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-400 text-xs">Detail {i}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

       {/* Object Text */}
      <section className="max-w-screen-2xl mx-auto px-6 mt-16 mb-48 ">
        <h2 className="text-xl text-gray-400 font-light  text-center">PopCycle Studio Object 001</h2>
    
      </section>


      {/* Related Products */}
      <section className="bg-stone-50 pt-12 lg:pt-16 pb-20 ">
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

    </div>
  );
}
