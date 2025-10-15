import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, ShoppingBag, Star } from "lucide-react";
import Navbar from "@/components/Navbar";

const Home = () => {
  const featuredProducts = [
  {
    id: 6,
    name: "Training Shorts",
    price: 15000,
    rating: 4.5,
    category: "jersey",
    image: "https://i.pinimg.com/736x/78/36/99/7836999896b9c90785f4e2e1e2102594.jpg",
    description: "Comfortable training shorts for everyday workouts.",
    details: ["Material: Polyester", "Sizes: XS - XL"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 7,
    name: "Soccer Ball",
    price: 20000,
    rating: 4.9,
    category: "accessory",
    image: "https://i.pinimg.com/1200x/3d/bd/f3/3dbdf3f2a0c9817efc4531c681682ab6.jpg",
    description: "Official size soccer ball for training or matches.",
    details: ["Material: Synthetic Leather", "Size: 5"],
    sizes: [],
  },
  {
    id: 8,
    name: "Goalkeeper Gloves",
    price: 18000,
    rating: 4.4,
    category: "accessory",
    image: "https://i.pinimg.com/1200x/05/78/75/05787563086580064323e57b8c620ee0.jpg",
    description: "High-quality gloves for goalkeepers.",
    details: ["Material: Latex", "Sizes: S - XL"],
    sizes: ["S", "M", "L", "XL"],
  }];

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
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Shop Kayonza’s Finest
 </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Premium local products, just for you
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
