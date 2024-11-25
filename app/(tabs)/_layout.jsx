import { router, Tabs } from "expo-router";
import React from "react";
import { Platform, Pressable } from "react-native";
import RemixIcon from "react-native-remix-icon";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0a7ea4",
        headerShown: false,
        headerShadowVisible: false,
        headerTitleAlign: "left",
        headerBackTitleVisible: false,
        headerTintColor: "black",
        headerBackTitleStyle: {
          display: "none",
          color: "#fff",
        },
        headerTitleStyle: {
          fontFamily: "SemiBold",
          fontSize: Platform.OS == "ios" ? 22 : 29,
        },
        tabBarLabelStyle: {
          fontFamily: "Medium",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Ana Sayfa",
          headerTitle: "ShopierApp",
          headerShown: true,
          headerRight: () => (
            <Pressable
              onPress={() => router.push("/pages/notification")}
              style={{
                paddingRight: 22,
              }}
            >
              <RemixIcon name="notification-3-line" color="#000" />
            </Pressable>
          ),
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
      <Tabs.Screen
        name="profile"
        options={{
          title: "Hesabım",
          headerTitle: "Hesabım",
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <RemixIcon
              name={focused ? "user-fill" : "user-line"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
