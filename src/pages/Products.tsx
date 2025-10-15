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
    { id: 1, name: "Premium Coffee Beans", price: 15000, rating: 4.8, category: "food", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400" },
    { id: 2, name: "Handcrafted Basket", price: 8500, rating: 4.9, category: "crafts", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400" },
    { id: 3, name: "Traditional Fabric", price: 12000, rating: 4.7, category: "textiles", image: "https://images.unsplash.com/photo-1558769132-cb1aea1f5168?w=400" },
    { id: 4, name: "Organic Honey", price: 6000, rating: 4.6, category: "food", image: "https://images.unsplash.com/photo-1587049352846-4a222e784720?w=400" },
    { id: 5, name: "Ceramic Vase", price: 18000, rating: 4.8, category: "crafts", image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400" },
    { id: 6, name: "Cotton Scarf", price: 9500, rating: 4.5, category: "textiles", image: "https://images.unsplash.com/photo-1601924287525-6947532eec5f?w=400" },
    { id: 7, name: "Banana Wine", price: 20000, rating: 4.9, category: "food", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400" },
    { id: 8, name: "Woven Mat", price: 7500, rating: 4.4, category: "crafts", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400" },
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
    { value: "food", label: "Food & Drinks" },
    { value: "crafts", label: "Handcrafts" },
    { value: "textiles", label: "Textiles" },
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
                className="cursor-pointer hover:bg-primary/90 transition-colors"
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
