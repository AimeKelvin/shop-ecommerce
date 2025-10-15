import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingBag, Package, User } from 'lucide-react';
import { useEffect } from 'react';

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  if (isLoading || !user) return null;

  const stats = [
    { label: 'Orders', value: '12', icon: ShoppingBag },
    { label: 'Products', value: '45', icon: Package },
    { label: 'Profile', value: 'Active', icon: User },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6">
          <Card className="border-border">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <div>
                    <p className="font-medium">Order #1234</p>
                    <p className="text-sm text-muted-foreground">2 items • 27,000 RWF</p>
                  </div>
                  <span className="text-sm">Delivered</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <div>
                    <p className="font-medium">Order #1233</p>
                    <p className="text-sm text-muted-foreground">1 item • 15,000 RWF</p>
                  </div>
                  <span className="text-sm">Processing</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
