import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { options } from "../hooks/options";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const useCartStore = create((set, get) => ({
  cart: [],
  products: {},

  loadCart: async () => {
    const savedCart = await AsyncStorage.getItem("cart");
    if (savedCart) {
      set({ cart: JSON.parse(savedCart) });
    }
  },

  addToCart: async (productId) => {
    set((state) => {
      const updatedCart = [...state.cart, productId];
      AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    });
  },

  removeFromCart: async (productId) => {
    set((state) => {
      const updatedCart = state.cart.filter((id) => id !== productId);
      AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    });
  },

  syncCartWithProducts: (availableProducts) => {
    const availableProductIds = new Set(availableProducts.map((p) => p.id));
    set((state) => ({
      cart: state.cart.filter((id) => availableProductIds.has(id)),
    }));
  },

  fetchProducts: async () => {
    try {
      const response = await axios.get(
        `${API_URL}/products?limit=10&page=1&sort=dateDesc`,
        options
      );
      const availableProducts = response.data;
      set({ products: availableProducts });
      get().syncCartWithProducts(availableProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
}));

export default useCartStore;
