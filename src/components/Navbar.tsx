import { Link } from "react-router-dom";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="font-bold text-xl tracking-tight hover:opacity-70 transition-opacity">
          ABC
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm uppercase tracking-wide hover:opacity-70 transition-opacity">
            Home
          </Link>
          <Link to="/products" className="text-sm uppercase tracking-wide hover:opacity-70 transition-opacity">
            Products
          </Link>
          {user && (
            <Link to="/dashboard" className="text-sm uppercase tracking-wide hover:opacity-70 transition-opacity">
              Dashboard
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/profile" className="text-sm hover:opacity-70 transition-opacity">
                {user.name}
              </Link>
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="icon" asChild>
              <Link to="/auth">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          )}
          <Button variant="ghost" size="icon" asChild>
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
