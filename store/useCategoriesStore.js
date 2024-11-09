import { create } from "zustand";
import axios from "axios";
import { options } from "../hooks/options";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const useCategoriesStore = create((set) => ({
  categories: [],
  fetchCategories: async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`, options);
      set({ categories: response.data });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },
}));

export { useCategoriesStore };
