import {
  Image,
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
} from "react-native";
import { useEffect } from "react";
import { router } from "expo-router";
import useCartStore from "../../store/useCartStore";
import RemixIcon from "react-native-remix-icon";
import NotFound from "../../components/NotFound";

export default function CartScreen() {
  const { products, cart, fetchProducts, removeFromCart } = useCartStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (!products || !Array.isArray(products)) {
    return <Text>Loading...</Text>;
  }

  const cartItems = cart
    .map((id) => products.find((product) => product.id === id))
    .filter((item) => item !== undefined);

  const totalAmount = cartItems
    .reduce((sum, item) => sum + Number(item.priceData.price), 0)
    .toFixed(2);

  return (
    <View style={styles.container}>
      {cartItems == 0 && <NotFound />}

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/detail",
                params: { id: item.id, title: item.title },
              })
            }
            style={styles.item}
          >
            <Image
              style={styles.image}
              source={{
                uri: item?.media[0]?.url,
              }}
            />
            <View style={{ gap: 12, width: "72%" }}>
              <Text style={styles.itemTitle}>{item?.title}</Text>
              <Text>
                {item.priceData.price} {item.priceData.currency}
              </Text>
            </View>
            <Pressable onPress={() => removeFromCart(item.id)}>
              <RemixIcon name="delete-bin-line" color="#ba2525" />
            </Pressable>
          </Pressable>
        )}
      />
      <View style={{ padding: 20, borderTopWidth: 1, borderColor: "#eee" }}>
        <Text style={{ fontFamily: "Regular" }}>Toplam Tutar</Text>
        <Text style={{ fontFamily: "SemiBold", marginTop: 4, fontSize: 18 }}>
          {totalAmount} TL
        </Text>
        <Pressable
          style={styles.button}
          onPress={() => router.push("/checkout")}
        >
          <Text style={styles.buttonText}>Sepeti Onayla</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  item: {
    height: 90,
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
    gap: 12,
  },
  image: {
    width: 60,
    height: 80,
  },
  itemTitle: {
    fontFamily: "SemiBold",
  },
  button: {
    marginVertical: 12,
    backgroundColor: "#0a7ea4",
    padding: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Medium",
    fontSize: 16,
  },
});
