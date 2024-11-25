import { create } from "zustand";
import axios from "axios";
import { options } from "../hooks/options";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const useProductStore = create((set) => ({
  products: [],
  loading: true,
  fetchProducts: async () => {
    try {
      const response = await axios.get(
        `${API_URL}/products?limit=10&page=1&sort=dateDesc`,
        options
      );
      set({ products: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
}));

export default useProductStore;
