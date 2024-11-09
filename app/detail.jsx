import {
  Image,
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import useCartStore from "../store/useCartStore";
import useDetailStore from "../store/useDetailStore";

export default function HomeScreen() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();

  const { product, loading, error, fetchProduct } = useDetailStore();
  const { cart, addToCart, removeFromCart } = useCartStore();

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    if (params.title) {
      navigation.setOptions({
        title: params.title,
      });
    }
  }, [params.title]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0a7ea4" />
      </View>
    );
  }

  const getPrice = () => {
    if (
      product?.priceData?.price !== undefined &&
      product?.priceData?.currency
    ) {
      return `${product.priceData.price} ${product.priceData.currency}`;
    } else if (product?.price !== undefined && product?.currency) {
      return `${product.price} ${product.currency}`;
    }
    return "Fiyat bilgisi mevcut değil";
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          style={{
            width: "100%",
            height: 200,
            objectFit: "contain",
          }}
          source={{
            uri: product?.media[0].url,
          }}
        />
        <Text style={styles.title}>{product?.title}</Text>
        <Text>{product?.categories[0].title}</Text>
        <Text style={styles.price}>
          {getPrice()} {product?.priceproduct?.currency}
        </Text>

        {cart.includes(params?.id) ? (
          <Pressable
            onPress={() => removeFromCart(product?.id)}
            style={[styles.button, { backgroundColor: "#de1a2e" }]}
          >
            <Text style={styles.buttonText}>Sepetten Çıkar</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => addToCart(product?.id)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sepete Ekle</Text>
          </Pressable>
        )}

        <ScrollView horizontal>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                paddingVertical: 8,
                color: "#0a7ea4",
              }}
            >
              Açıklama
            </Text>
            <View
              style={{
                borderBottomWidth: 2,
                borderColor: "#0a7ea4",
                marginBottom: 12,
              }}
            />
          </View>
        </ScrollView>

        <Text
          style={{
            lineHeight: 22,
            opacity: 0.8,
          }}
        >
          {product?.description
            ? product?.description
            : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, "}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    gap: 8,
    padding: 20,
  },
  title: {
    fontWeight: "600",
    marginVertical: 14,
  },
  price: {
    marginTop: 6,
    fontWeight: "600",
    fontSize: 18,
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
    fontWeight: "700",
  },
});
