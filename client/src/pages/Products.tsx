// src/pages/Products.tsx
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Filter, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import api from "@/lib/client";
import { useAuth } from "@/contexts/AuthContext";
import { useMyList } from "@/contexts/MyListContext";
import { toast } from "sonner";

interface Product {
  _id: string;
  name: string;
  price: number;
  rating: number;
  category: string;
  images: string[];
  description?: string;
  details?: string[];
  sizes?: string[];
}

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const { myList, toggleMyList } = useMyList();

  const categories = [
    { value: "", label: "All Products" },
    { value: "jersey", label: "Jerseys" },
    { value: "accessory", label: "Accessories" },
    { value: "headwear", label: "Headwear" },
    { value: "textile", label: "Textiles" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get("/products");
        setProducts(response.data.items || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch products from backend.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let data = [...products];
    if (category) data = data.filter((p) => p.category === category);

    if (sort === "price-low") data.sort((a, b) => a.price - b.price);
    else if (sort === "price-high") data.sort((a, b) => b.price - a.price);
    else if (sort === "rating") data.sort((a, b) => b.rating - a.rating);

    setFilteredProducts(data);
  }, [products, category, sort]);

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    value ? params.set("category", value) : params.delete("category");
    setSearchParams(params);
  };

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    value ? params.set("sort", value) : params.delete("sort");
    setSearchParams(params);
  };

  // Toggle product in/out of list and update UI immediately
  const handleToggleList = async (productId: string) => {
    if (!user) {
      toast.error("Please login to add items to your list.");
      return;
    }

    try {
      // Optimistic UI update
      const isInList = myList.includes(productId);
      toggleMyList(productId); // this updates myList state instantly

      // API request
      if (isInList) {
        await api.delete(`/list/${productId}`);
        toast.success("Removed from your list");
      } else {
        await api.post("/list", { productId });
        toast.success("Added to your list");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update your list");
    }
  };

  if (loading) return <div className="text-center py-16">Loading products...</div>;
  if (error) return <div className="text-center py-16 text-red-500">{error}</div>;

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
                variant={category === cat.value ? "default" : "outline"}
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
              value={sort}
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
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id} className="group relative flex flex-col">
                <Link to={`/products/${product._id}`}>
                  <div className="aspect-square overflow-hidden bg-muted mb-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="font-medium">{product.price.toLocaleString()} RWF</p>
                  </div>

                  <button
                    onClick={() => handleToggleList(product._id)}
                    className="p-1 bg-transparent hover:bg-red-100 rounded-full transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        myList.includes(product._id) ? "text-red-500 fill-current" : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
