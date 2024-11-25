import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Text,
  ScrollView,
  Pressable,
  Image,
  Alert,
  Button,
} from "react-native";
import { useEffect } from "react";
import { router } from "expo-router";
import useProductStore from "../../store/useProductStore";
import ProductItem from "../../components/ProductItem";
import Carousel from "react-native-reanimated-carousel";
import EventSource from "react-native-sse";
import * as Notifications from "expo-notifications";

export default function HomeScreen() {
  const width = Dimensions.get("window").width;
  const { products, loading, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();

    requestPermissions();

    Notifications.addNotificationReceivedListener((notification) => {
      console.log("Bildirim alındı:", notification);
    });

    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("Bildirim yanıtı:", response);
    });
  }, []);

  async function requestPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Bildirimler için izin verilmedi!");
    }
  }

  if (loading) {
    return (
      <View>
        <Text>load</Text>
      </View>
    );
  }

  const eventSource = new EventSource(
    "https://ntfy.sh/com-erayjs-flet-notification/sse"
  );

  async function sendLocalNotification(message) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Yeni Bildirim",
        body: message,
        data: { someData: "additional data" },
      },
      trigger: {
        seconds: null,
      },
    });
  }

  eventSource.addEventListener("message", async (event) => {
    const eventData = JSON.parse(event.data);
    Alert.alert(eventData.message);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Yeni Bildirim",
        body: eventData.message || "Varsayılan mesaj",
        data: { someData: "additional data" },
      },
      trigger: {
        seconds: 0,
      },
    });
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        <Button title="Bildirim Gönder" onPress={sendLocalNotification} />

        <View>
          <Carousel
            loop
            width={width}
            height={160}
            autoPlay={true}
            autoPlayInterval={2000}
            data={products}
            scrollAnimationDuration={1000}
            renderItem={({ item, index }) =>
              item ? (
                <View
                  style={{
                    height: 160,
                    padding: 22,
                  }}
                >
                  <Pressable
                    key={item.id}
                    onPress={() =>
                      router.push({
                        pathname: "/detail",
                        params: {
                          id: item.id,
                          title: item.title ? item.title : "",
                        },
                      })
                    }
                    style={{
                      flex: 1,
                      width: "100%",
                      borderWidth: 1.5,
                      borderColor: "#eee",
                      borderRadius: 12,
                      alignItems: "center",
                      columnGap: 12,
                      paddingHorizontal: 20,
                      flexDirection: "row",
                    }}
                  >
                    <Image
                      style={{
                        width: 80,
                        height: 80,
                        objectFit: "contain",
                        borderRadius: 12,
                      }}
                      source={{
                        uri:
                          item.media && item.media[0] && item.media[0].url
                            ? item.media[0].url
                            : "default_image_url", // Varsayılan bir görsel URL'si
                      }}
                    />
                    <View style={{ gap: 8, width: "70%" }}>
                      <Text style={{ fontFamily: "SemiBold" }}>
                        {item.title ? item.title : "No title available"}
                      </Text>
                      <Text style={{ fontFamily: "Medium" }}>
                        {item.categories && item.categories[0]
                          ? item.categories[0].title
                          : "No category available"}
                      </Text>
                      <Text style={{ fontFamily: "SemiBold", fontSize: 16 }}>
                        {`${item.priceData?.price || "No price"} ${
                          item.priceData?.currency || "No currency"
                        }`}
                      </Text>
                    </View>
                  </Pressable>
                </View>
              ) : null
            }
          />
        </View>

        <Text
          style={{
            marginLeft: 20,
            fontFamily: "SemiBold",
            fontSize: 22,
          }}
        >
          Son Ürünler
        </Text>
        {products && (
          <FlatList
            data={products}
            scrollEnabled={false}
            renderItem={({ item, index }) =>
              item && (
                <ProductItem
                  key={item.id}
                  title={item.title}
                  price={`${item.priceData.price} ${item.priceData.currency}`}
                  image={item.media && item.media[0] ? item.media[0].url : ""}
                  onPress={() =>
                    router.push({
                      pathname: "/detail",
                      params: { id: item.id, title: item.title },
                    })
                  }
                />
              )
            }
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    gap: 8,
  },
  item: {
    height: 90,
    flex: 1,
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
    columnGap: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  itemTitle: {
    fontWeight: "600",
  },
});
