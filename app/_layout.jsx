import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Light: require("../assets/fonts/ClashGrotesk/ClashGrotesk-Light.otf"),
    Regular: require("../assets/fonts/ClashGrotesk/ClashGrotesk-Regular.otf"),
    Medium: require("../assets/fonts/ClashGrotesk/ClashGrotesk-Medium.otf"),
    SemiBold: require("../assets/fonts/ClashGrotesk/ClashGrotesk-Semibold.otf"),
    Bold: require("../assets/fonts/ClashGrotesk/ClashGrotesk-Bold.otf"),
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
    <>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            headerShadowVisible: false,
            headerTintColor: "black",
            headerBackTitleVisible: false,
            headerTitleStyle: {
              fontFamily: "SemiBold",
            },
            headerBackTitleStyle: {
              display: "none",
              color: "#fff",
            },
          }}
        />
        <Stack.Screen name="detail" />
        <Stack.Screen name="categoryProducts" />
        <Stack.Screen
          name="pages/delivery"
          options={{
            headerTitle: "Sipariş Takip",
          }}
        />
        <Stack.Screen
          name="pages/cargo"
          options={{
            headerTitle: "Kargo Detayları",
          }}
        />
        <Stack.Screen
          name="pages/info"
          options={{
            headerTitle: "Hakkımızda",
          }}
        />
        <Stack.Screen
          name="pages/kvkk"
          options={{
            headerTitle: "KVKK",
          }}
        />
        <Stack.Screen
          name="pages/notification"
          options={{
            headerTitle: "Bildirimler",
          }}
        />
        <Stack.Screen
          name="checkout"
          options={{
            headerBackTitleVisible: false,
            headerTintColor: "black",
            headerTitle: "Ödeme Yap",
            headerShadowVisible: false,
            headerBackTitleVisible: false,
            headerBackTitleStyle: {
              display: "none",
              color: "#fff",
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontFamily: "SemiBold",
            },
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>

      <StatusBar style="dark" />
    </>
  );
}
