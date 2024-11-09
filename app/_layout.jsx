import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="detail"
        options={{
          headerBackTitleVisible: false,
          headerTintColor: "black",
        }}
      />
      <Stack.Screen
        name="categoryProducts"
        options={{
          headerBackTitleVisible: false,
          headerTintColor: "black",
        }}
      />
      <Stack.Screen
        name="checkout"
        options={{
          headerBackTitleVisible: false,
          headerTintColor: "black",
          headerTitle: "Ödeme",
        }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
