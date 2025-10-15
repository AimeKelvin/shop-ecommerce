// src/pages/ProductDetail.tsx
import { useParams, Link, Routes, Route, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { allProducts } from "@/data/products";

const ProductReviews = () => {
  const reviews = [
    { id: 1, author: "Jean Mukesh", rating: 5, comment: "Excellent quality! Highly recommended.", date: "2025-01-15" },
    { id: 2, author: "Marie Uwase", rating: 4, comment: "Good product, fast delivery.", date: "2025-01-10" },
    { id: 3, author: "Patrick Niyonzima", rating: 5, comment: "Amazing! Will buy again.", date: "2025-01-05" },
  ];

  return (
    <div className="space-y-4 mt-12">
      <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold">{review.author}</p>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted"}`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-sm text-muted-foreground">{review.date}</span>
            </div>
            <p className="text-muted-foreground">{review.comment}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState("M");

  const productId = Number(id);
  const product = allProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Product not found.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    toast.success("Added to cart!", {
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container px-4 py-12">
        <Button
          variant="ghost"
          size="icon"
          className="mb-6"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Product Images Carousel */}
          <div>
            <Carousel className="w-full">
              <CarouselContent>
                {product.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-square bg-muted">
                      <img
                        src={image}
                        alt={`${product.name} image ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">{product.name}</h1>
              <p className="text-sm text-muted-foreground mb-4">{product.category}</p>
              <p className="text-2xl font-medium">{product.price.toLocaleString()} RWF</p>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-4">Select Size</h3>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      className="py-3"
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <Button size="lg" className="w-full h-14 text-base" onClick={handleAddToCart}>
              Add to Cart
            </Button>

            {/* Description & Details */}
            <div className="space-y-4 pt-8 border-t border-border">
              <div>
                <h3 className="text-sm font-medium mb-2">Product Information</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {product.details && product.details.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Details</h3>
                  <ul className="space-y-1">
                    {product.details.map((detail, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Reviews Summary */}
              <div>
                <h3 className="text-sm font-medium mb-2">Reviews</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm">{product.rating}</span>
                  <Link to="reviews" className="text-sm underline ml-2">
                    View all
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nested Routes for Reviews */}
        <Routes>
          <Route path="reviews" element={<ProductReviews />} />
        </Routes>
      </div>
    </div>
  );
};

export default ProductDetail;