import axios, { AxiosError } from "axios";


const API_URL = "http://localhost:4000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});


export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  }
};

// Load token automatically if available
const token = localStorage.getItem("token");
if (token) setAuthToken(token);

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<{ message?: string }>;
    throw new Error(err.response?.data?.message || err.message);
  }
  throw new Error("Unexpected error occurred");
};


export interface Product {
  _id?: string;
  name: string;
  price: number;
  rating?: number;
  category: string;
  images: string[];
  description?: string;
  details?: string[];
  sizes?: string[];
}

export interface LoginResponse {
  token: string;
  user: {
    _id: string;
    email: string;
    role: string;
  };
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await api.get("/products");
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const { data } = await api.get(`/products/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};


export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const { data } = await api.post("/auth/login", { email, password });
    if (data?.token) setAuthToken(data.token);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const createProduct = async (product: Product): Promise<Product> => {
  try {
    const { data } = await api.post("/products", product);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const updateProduct = async (
  id: string,
  updates: Partial<Product>
): Promise<Product> => {
  try {
    const { data } = await api.put(`/products/${id}`, updates);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteProduct = async (id: string): Promise<{ message: string }> => {
  try {
    const { data } = await api.delete(`/products/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const addToList = (product: Product) => {
  const list = JSON.parse(localStorage.getItem("myList") || "[]");
  const updated = [...list, product];
  localStorage.setItem("myList", JSON.stringify(updated));
};

export const getMyList = (): Product[] => {
  return JSON.parse(localStorage.getItem("myList") || "[]");
};

export const removeFromList = (id: string) => {
  const list = JSON.parse(localStorage.getItem("myList") || "[]");
  const updated = list.filter((item: Product) => item._id !== id);
  localStorage.setItem("myList", JSON.stringify(updated));
};


export const openWhatsAppForProduct = (product: Product) => {
  const phone =
    import.meta.env.VITE_WHATSAPP_NUMBER || "+250796105514";
  const message = encodeURIComponent(
    `Hello 👋, I'm interested in buying this product:\n\n🛍️ ${product.name}\n💰 Price: ${product.price} RWF\n\nPlease provide more details.`
  );
  window.open(
    `https://wa.me/${phone.replace(/\D/g, "")}?text=${message}`,
    "_blank"
  );
};
export default api;
