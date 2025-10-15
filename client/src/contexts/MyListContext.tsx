import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import api from "@/lib/client";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

interface MyListContextType {
  myList: string[];
  toggleMyList: (productId: string) => void;
}

const MyListContext = createContext<MyListContextType | undefined>(undefined);

export const MyListProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [myList, setMyList] = useState<string[]>([]);

  useEffect(() => {
    const fetchList = async () => {
      if (!user) return;
      try {
        const res = await api.get("/list");
        // Extract the product IDs from the array of objects
        const productIds = (res.data || []).map((item: any) => item.product._id);
        setMyList(productIds);
      } catch (err) {
        console.error("Failed to fetch mylist:", err);
      }
    };
    fetchList();
  }, [user]);

  const toggleMyList = async (productId: string) => {
    if (!user) {
      toast.error("Please login to add items to your list.");
      return;
    }

    try {
      if (myList.includes(productId)) {
        await api.delete(`/list/${productId}`);
        setMyList((prev) => prev.filter((id) => id !== productId));
        toast.success("Removed from your list");
      } else {
        await api.post("/list", { productId });
        setMyList((prev) => [...prev, productId]);
        toast.success("Added to your list");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update your list");
    }
  };

  return (
    <MyListContext.Provider value={{ myList, toggleMyList }}>
      {children}
    </MyListContext.Provider>
  );
};

export const useMyList = () => {
  const context = useContext(MyListContext);
  if (!context) throw new Error("useMyList must be used within a MyListProvider");
  return context;
};
