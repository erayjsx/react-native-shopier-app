import { Tabs } from "expo-router";
import React from "react";
import RemixIcon from "react-native-remix-icon";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0a7ea4",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Ana Sayfa",
          headerTitle: "Shopier App",
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <RemixIcon
              name={focused ? "home-6-fill" : "home-6-line"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Arama",
          headerTitle: "Arama",
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <RemixIcon
              name={focused ? "menu-search-fill" : "menu-search-line"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Sepetim",
          headerTitle: "Sepetim",
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <RemixIcon
              name={focused ? "shopping-basket-fill" : "shopping-basket-line"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
