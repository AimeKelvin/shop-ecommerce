import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import MyList from "./pages/MyList";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import { MyListProvider } from "./contexts/MyListContext";

const queryClient = new QueryClient();

// ProtectedRoute component for pages that require login
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div className="text-center py-16">Loading...</div>;
  if (!user) return <Navigate to="/auth" replace />;

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
          <MyListProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id/*" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/mylist"
              element={
                <ProtectedRoute>
                  <MyList />
                </ProtectedRoute>
              }
            />
            <Route path="/profile" element={<Profile />} />

            {/* Redirects for outdated URLs */}
            <Route path="/shop" element={<Navigate to="/products" replace />} />
            <Route path="/items" element={<Navigate to="/products" replace />} />
            <Route path="/account" element={<Navigate to="/profile" replace />} />

            {/* 404 catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </MyListProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
