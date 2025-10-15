import { Link, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingBag, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");

const allProducts = [
  {
    id: 1,
    name: "Red Home Jersey",
    price: 25000,
    rating: 4.8,
    category: "jersey",
    image: "https://i.pinimg.com/736x/09/43/92/094392a6867bbef3c0df9fe8c33316bf.jpg"
  },
  {
    id: 2,
    name: "Blue Away Jersey",
    price: 26000,
    rating: 4.9,
    category: "jersey",
    image: "https://i.pinimg.com/1200x/bd/e5/1e/bde51e7bae7f66fe370c962af7f69429.jpg"
  },
  {
    id: 3,
    name: "Goalkeeper Jersey",
    price: 28000,
    rating: 4.7,
    category: "jersey",
    image: "https://i.pinimg.com/736x/52/ee/38/52ee38929caa01d58360098070cd9a69.jpg"
  },
  {
    id: 4,
    name: "Team Scarf",
    price: 9000,
    rating: 4.6,
    category: "textile",
    image: "https://i.pinimg.com/736x/b4/a5/d8/b4a5d882970c2e735d856d11eb0b5bdf.jpg"
  },
  {
    id: 5,
    name: "Sports Cap",
    price: 8000,
    rating: 4.8,
    category: "headwear",
    image: "https://i.pinimg.com/1200x/dc/8c/64/dc8c644603c17a9c9eb6eadc355869c3.jpg"
  },
  {
    id: 6,
    name: "Training Shorts",
    price: 15000,
    rating: 4.5,
    category: "jersey",
    image: "https://i.pinimg.com/736x/78/36/99/7836999896b9c90785f4e2e1e2102594.jpg"
  },
  {
    id: 7,
    name: "Soccer Ball",
    price: 20000,
    rating: 4.9,
    category: "accessory",
    image: "https://i.pinimg.com/1200x/3d/bd/f3/3dbdf3f2a0c9817efc4531c681682ab6.jpg"
  },
  {
    id: 8,
    name: "Goalkeeper Gloves",
    price: 18000,
    rating: 4.4,
    category: "accessory",
    image: "https://i.pinimg.com/1200x/05/78/75/05787563086580064323e57b8c620ee0.jpg"
  },
  // New products
  {
    id: 9,
    name: "Digital Sports Watch",
    price: 22000,
    rating: 4.7,
    category: "accessory",
    image: "https://i.pinimg.com/736x/84/e4/17/84e4172c8650f813853e803211e22440.jpg"
  },
  {
    id: 10,
    name: "Analog Classic Watch",
    price: 30000,
    rating: 4.8,
    category: "accessory",
    image: "https://i.pinimg.com/736x/7d/cc/7e/7dcc7ee62713a57a3c92458b45ca570b.jpg"
  },
  {
    id: 11,
    name: "Baseball Cap",
    price: 7000,
    rating: 4.5,
    category: "accessory",
    image: "https://i.pinimg.com/1200x/a4/15/61/a415617218dc5273f8c2260d905cecd0.jpg"
  },
  {
    id: 12,
    name: "Snapback Hat",
    price: 8500,
    rating: 4.6,
    category: "accessory",
    image: "https://i.pinimg.com/1200x/5b/13/3e/5b133ec9d16ba9945efecfaa04fea9a1.jpg"
  },
  {
    id: 13,
    name: "Fitness Tracker Watch",
    price: 27000,
    rating: 4.9,
    category: "accessory",
    image: "https://i.pinimg.com/736x/4b/3d/78/4b3d787f53eb4d12ff48d978a07c5ff7.jpg"
  }
];



  // Filter by category
  let filteredProducts = category 
    ? allProducts.filter(p => p.category === category)
    : allProducts;

  // Sort products
  if (sort === "price-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sort === "price-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sort === "rating") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
  }

  const categories = [
  { value: "", label: "All Products" },
  { value: "jersey", label: "Jerseys" },
  { value: "accessory", label: "Accessories" },
];


  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    setSearchParams(params);
  };

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Our Products</h1>
          <p className="text-muted-foreground">Quality items from local artisans and producers</p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">Filter:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge
                key={cat.value}
                variant={category === cat.value || (!category && !cat.value) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/90 hover:text-white transition-colors"
                onClick={() => handleCategoryChange(cat.value)}
              >
                {cat.label}
              </Badge>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm font-medium">Sort:</span>
            <select
              value={sort || ""}
              onChange={(e) => handleSortChange(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-1.5 text-sm transition-colors hover:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`} className="group">
              <div className="aspect-square overflow-hidden bg-muted mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
                <h3 className="font-medium">{product.name}</h3>
                <p className="font-medium">{product.price.toLocaleString()} RWF</p>
              </div>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
