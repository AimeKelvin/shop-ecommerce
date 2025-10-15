import { useParams, Link, Routes, Route, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ShoppingCart, ArrowLeft } from "lucide-react";
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

const ProductReviews = () => {
  const reviews = [
    { id: 1, author: "Jean Mukesh", rating: 5, comment: "Excellent quality! Highly recommended.", date: "2025-01-15" },
    { id: 2, author: "Marie Uwase", rating: 4, comment: "Good product, fast delivery.", date: "2025-01-10" },
    { id: 3, author: "Patrick Niyonzima", rating: 5, comment: "Amazing! Will buy again.", date: "2025-01-05" },
  ];

  return (
    <div className="space-y-4">
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
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState("M");

  const product = {
    id: Number(id),
    name: "Premium Coffee Beans",
    price: 15000,
    rating: 4.8,
    description: "High-quality Arabica coffee beans sourced from local farms in Kayonza. Rich aroma and smooth taste, perfect for coffee enthusiasts.",
    category: "Food & Drinks",
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600",
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600",
    ],
    details: [
      "Origin: Kayonza, Eastern Province",
      "Weight: 500g",
      "Roast: Medium",
      "Organic certified",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
  };

  const handleAddToCart = () => {
    toast.success("Added to cart!", {
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container px-4 py-12">
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
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
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
            <div>
              <h3 className="text-sm font-medium mb-4">Select Size</h3>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 border transition-colors ${
                      selectedSize === size
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <Button size="lg" className="w-full h-14 text-base" onClick={handleAddToCart}>
              Add to Cart
            </Button>

            {/* Description */}
            <div className="space-y-4 pt-8 border-t border-border">
              <div>
                <h3 className="text-sm font-medium mb-2">Product Information</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
              
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

              <div>
                <h3 className="text-sm font-medium mb-2">Reviews</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-foreground" : "text-muted"}`}
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
