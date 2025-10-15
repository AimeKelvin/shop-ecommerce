// src/pages/Dashboard.tsx
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import api from '@/lib/client';
import { toast } from 'sonner';
import { Pencil, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
  description?: string;
  images: string[];
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

  // Modal states
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editData, setEditData] = useState<Product>({
    _id: '',
    name: '',
    category: '',
    price: 0,
    inStock: true,
    description: '',
    images: [],
  });
  const [addData, setAddData] = useState<Omit<Product, '_id'>>({
    name: '',
    category: '',
    price: 0,
    inStock: true,
    description: '',
    images: [],
  });

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
      const res = await api.get('/products'); // backend endpoint
      setProducts(res.data.items || res.data);
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

  const handleEditChange = (key: keyof Product, value: any) => {
    setEditData(prev => ({ ...prev, [key]: value }));
  };

  const handleAddChange = (key: keyof Product, value: any) => {
    setAddData(prev => ({ ...prev, [key]: value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await api.put(`/products/${editData._id}`, editData);
      setProducts(products.map(p => (p._id === res.data._id ? res.data : p)));
      toast.success('Product updated');
      setOpenEditModal(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update product');
    }
  };

  const handleAdd = async () => {
    try {
      const res = await api.post('/products', addData);
      setProducts([res.data, ...products]);
      toast.success('Product added');
      setOpenAddModal(false);
      setAddData({ name: '', category: '', price: 0, inStock: true, description: '', images: [] });
    } catch (err) {
      console.error(err);
      toast.error('Failed to add product');
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
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your products here, {user?.name}</p>
          </div>
          <Button onClick={() => setOpenAddModal(true)}>Add New Product</Button>
        </div>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex gap-2 mb-4">
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

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 px-3">Product</th>
                    <th className="py-2 px-3">Category</th>
                    <th className="py-2 px-3">Price (RWF)</th>
                    <th className="py-2 px-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => (
                    <tr key={product._id} className="border-b border-border hover:bg-muted">
                      <td className="py-2 px-3 flex items-center gap-2">
                        {product.images[0] && (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        )}
                        {product.name}
                      </td>
                      <td className="py-2 px-3 capitalize">{product.category}</td>
                      <td className="py-2 px-3">{product.price.toLocaleString()}</td>
                      <td className="py-2 px-3 flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => { setEditData(product); setOpenEditModal(true); }}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(product._id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredProducts.length === 0 && (
                <p className="text-center text-muted-foreground mt-4">No products found.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Add Product Modal */}
        <Dialog open={openAddModal} onOpenChange={setOpenAddModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-2 mt-2">
              <Input placeholder="Name" value={addData.name} onChange={e => handleAddChange('name', e.target.value)} />
              <Input placeholder="Category" value={addData.category} onChange={e => handleAddChange('category', e.target.value)} />
              <Input type="number" placeholder="Price" value={addData.price} onChange={e => handleAddChange('price', Number(e.target.value))} />
              <Input placeholder="Description" value={addData.description} onChange={e => handleAddChange('description', e.target.value)} />
              <Input placeholder="Image URLs (comma separated)" value={addData.images.join(', ')} onChange={e => handleAddChange('images', e.target.value.split(',').map(url => url.trim()))} />
            </div>
            <DialogFooter>
              <Button onClick={handleAdd}>Add Product</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Product Modal */}
        <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-2 mt-2">
              <Input placeholder="Name" value={editData.name} onChange={e => handleEditChange('name', e.target.value)} />
              <Input placeholder="Category" value={editData.category} onChange={e => handleEditChange('category', e.target.value)} />
              <Input type="number" placeholder="Price" value={editData.price} onChange={e => handleEditChange('price', Number(e.target.value))} />
              <Input placeholder="Description" value={editData.description} onChange={e => handleEditChange('description', e.target.value)} />
              <Input placeholder="Image URLs (comma separated)" value={editData.images.join(', ')} onChange={e => handleEditChange('images', e.target.value.split(',').map(url => url.trim()))} />
            </div>
            <DialogFooter>
              <Button onClick={handleUpdate}>Update Product</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Dashboard;
