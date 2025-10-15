// src/pages/Auth.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Facebook } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Login with backend
        await login(email, password);
        toast.success("Welcome back!");
      } else {
        // Signup with backend, include name
        await signup(email, password, name);
        toast.success("Account created successfully!");
      }
      navigate("/dashboard");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Authentication failed. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left image */}
      <div className="flex-1 bg-muted hidden lg:block relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200"
          alt="Store"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              {isLogin ? "Sign In" : "Join Us"}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {isLogin
                ? "Welcome back to ABC Store"
                : "Create your ABC Store account"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-12"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : isLogin
                ? "Sign In"
                : "Create Account"}
            </Button>

            {/* Optional social logins */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 text-base flex items-center justify-center gap-3 border-gray-300 bg-white shadow-sm hover:bg-gray-50 mt-2"
            >
              <img src="/google.png" alt="Google" className="w-5 h-5" />
              Continue with Google
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 text-base flex items-center justify-center gap-3 border-gray-300 bg-white text-black hover:text-black shadow-sm hover:bg-blue-100 mt-2"
            >
              <Facebook className="w-5 h-5 text-blue-400 hover:text-white" />
              Continue with Facebook
            </Button>
          </form>

          <div className="text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm hover:underline"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
