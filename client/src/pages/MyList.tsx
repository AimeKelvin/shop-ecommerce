// src/pages/MyList.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Trash } from "lucide-react";
import api from "@/lib/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface Product {
  _id: string;
  name: string;
  price: number;
  rating: number;
  category: string;
  images: string[];
}

const MyList = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchMyList = async () => {
      try {
        setLoading(true);
        const res = await api.get("/list");
        // res.data is the array of list items with populated product
        const productsOnly = res.data
          .map((item: any) => item.product)
          .filter((p: any) => p && p._id && p.images?.length > 0);
        setProducts(productsOnly);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load your list");
      } finally {
        setLoading(false);
      }
    };

    fetchMyList();
  }, [user]);

  const handleRemove = async (productId: string) => {
    try {
      await api.delete(`/list/${productId}`);
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      toast.success("Removed from your list");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
    }
  };

  if (!user) return <div className="text-center py-16">Please login to see your list</div>;
  if (loading) return <div className="text-center py-16">Loading your list...</div>;
  if (products.length === 0)
    return (
  <>
  <Navbar />
 
      <div className="min-h-screen flex flex-col items-center justify-center text-muted-foreground">
        
        <p className="text-xl mb-4">Your list is empty.</p>
        <Link to="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
       </>
    );

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-background">
      
      <div className="container px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">My List</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product._id}>
              <div className="aspect-square bg-muted overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="space-y-2">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-muted-foreground">{product.category}</p>
                <p className="font-medium">{product.price.toLocaleString()} RWF</p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted"
                      }`}
                    />
                  ))}
                  <span className="text-sm">{product.rating}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="destructive" size="sm" onClick={() => handleRemove(product._id)}>
                  <Trash className="h-4 w-4 mr-1" /> Remove
                </Button>
                <Link to={`/products/${product._id}`}>
                  <Button size="sm">View</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default MyList;

