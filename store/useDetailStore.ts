import { create } from "zustand";
import axios from "axios";
import { options } from "../hooks/options";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

type Product = {
  id: string;
  title: string;
  media: Array<{ url: string }>;
  priceData: {
    price: number;
    currency: string;
  };
};

type DetailStore = {
  product: Product | null;
  loading: boolean;
  error: string | null;
  fetchProduct: (id: string) => Promise<void>;
};

const useDetailStore = create<DetailStore>((set) => ({
  product: null,
  loading: false,
  error: null,
  fetchProduct: async (id) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${API_URL}/products/${id}`, options);
      set({ product: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching product:", error);
      set({
        product: null,
        loading: false,
        error: "Ürün yüklenirken bir hata oluştu",
      });
    }
  },
}));

export default useDetailStore;
