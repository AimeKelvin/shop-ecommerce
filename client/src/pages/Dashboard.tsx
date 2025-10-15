// src/pages/Dashboard.tsx
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import api from '@/lib/client';
import { toast } from 'sonner';

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
  description?: string;
}

const categories = [
  { value: '', label: 'All' },
  { value: 'jersey', label: 'Jerseys' },
  { value: 'headwear', label: 'Headwear' },
  { value: 'accessory', label: 'Accessories' },
  { value: 'textile', label: 'Textiles' },
];

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // Redirect non-admins
  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/products'); // Should hit listProducts endpoint
      setProducts(res.data.items || res.data); // If using pagination, it's res.data.items
    } catch (err) {
      console.error(err);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
      toast.success('Product deleted');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete product');
    }
  };

  const filteredProducts = filterCategory
    ? products.filter(p => p.category === filterCategory)
    : products;

  if (isLoading || loading) return <div className="text-center py-16">Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your products here, {user?.name}</p>
        </div>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Inventory Management</h2>
              <div className="flex gap-2">
                {categories.map(cat => (
                  <Badge
                    key={cat.value}
                    variant={filterCategory === cat.value ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setFilterCategory(cat.value)}
                  >
                    {cat.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 px-3">Name</th>
                    <th className="py-2 px-3">Category</th>
                    <th className="py-2 px-3">Price (RWF)</th>
                    <th className="py-2 px-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => (
                    <tr key={product._id} className="border-b border-border hover:bg-muted">
                      <td className="py-2 px-3">{product.name}</td>
                      <td className="py-2 px-3 capitalize">{product.category}</td>
                      <td className="py-2 px-3">{product.price.toLocaleString()}</td>
                      
                      <td className="py-2 px-3 flex gap-2">
                        <Button size="sm" onClick={() => toast('Edit feature coming soon')}>
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredProducts.length === 0 && (
                <p className="text-center text-muted-foreground mt-4">No products found.</p>
              )}

              <div className="mt-4 flex justify-end">
                <Button onClick={() => toast('Add product feature coming soon')}>
                  Add New Product
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
