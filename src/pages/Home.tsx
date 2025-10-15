import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, ShoppingBag, Star } from "lucide-react";
import Navbar from "@/components/Navbar";

const Home = () => {
  const featuredProducts = [
    { id: 1, name: "Premium Coffee Beans", price: 15000, rating: 4.8, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400" },
    { id: 2, name: "Handcrafted Basket", price: 8500, rating: 4.9, image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400" },
    { id: 3, name: "Traditional Fabric", price: 12000, rating: 4.7, image: "https://images.unsplash.com/photo-1558769132-cb1aea1f5168?w=400" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920"
            alt="Hero"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            JUST DO IT
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Quality products from Kayonza, Eastern Province
          </p>
          <Button asChild size="lg" className="h-12 px-8">
            <Link to="/products">
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container px-4 py-24">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 tracking-tight">Featured</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`} className="group">
              <div className="aspect-square overflow-hidden bg-muted mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-muted-foreground">1 Style</p>
                <p className="font-medium">{product.price.toLocaleString()} RWF</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/50 py-8">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 ABC Store - Kayonza, Eastern Province, Rwanda</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
