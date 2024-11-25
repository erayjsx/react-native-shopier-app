import {
  Image,
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import useCartStore from "../store/useCartStore";
import useDetailStore from "../store/useDetailStore";
import useProductStore from "../store/useProductStore";
import ProductItem from "../components/ProductItem";
import RemixIcon from "react-native-remix-icon";
import Toast from "../components/Toast";

export default function HomeScreen() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const showToast = (msg, type = "success") => {
    setMessage(msg);
    setVisible(true);
  };

  const params = useLocalSearchParams();
  const navigation = useNavigation();

  const { products, fetchProducts } = useProductStore();
  const { product, loading, error, fetchProduct } = useDetailStore();
  const { cart, addToCart, removeFromCart } = useCartStore();

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    fetchProducts();
    if (params.title) {
      navigation.setOptions({
        title: params.title,
        headerRight: () => (
          <Pressable
            onPress={() => alert("This is a button!")}
            style={{
              marginLeft: 16,
            }}
          >
            <RemixIcon name="share-line" size={20} />
          </Pressable>
        ),
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
      <ScrollView
        showsVerticalScrollIndicator={true}
        scrollEnabled
        contentContainerStyle={{
          padding: 20,
        }}
      >
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
        <Text style={{ fontFamily: "Medium" }}>
          {product?.categories[0].title}
        </Text>
        <Text style={styles.price}>
          {getPrice()} {product?.priceproduct?.currency}
        </Text>

        {cart.includes(params?.id) ? (
          <Pressable
            onPress={() => removeFromCart(product?.id)}
            style={[styles.button, { backgroundColor: "#C92031FF" }]}
          >
            <Text style={styles.buttonText}>Sepetten Çıkar</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              addToCart(product?.id), showToast(true);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sepete Ekle</Text>
          </Pressable>
        )}

        <ScrollView horizontal scrollEnabled={false}>
          <View>
            <Text
              style={{
                fontFamily: "SemiBold",
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
            fontFamily: "Medium",
          }}
        >
          {product?.description
            ? product?.description
            : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, "}
        </Text>

        <Text
          style={{
            marginTop: 22,
            marginBottom: 16,
            fontFamily: "SemiBold",
            fontSize: 22,
          }}
        >
          Benzer Ürünler
        </Text>
        <FlatList
          data={products}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() =>
                router.navigate({
                  pathname: "/detail",
                  params: { id: item.id, title: item.title },
                })
              }
              style={{
                width: 140,
                borderWidth: 1,
                borderColor: "#eee",
                borderRadius: 12,
                marginRight: 12,
              }}
            >
              <Image
                style={{
                  width: "100%",
                  height: 140,
                }}
                source={{
                  uri: item.media[0].url,
                }}
              />
              <View style={{ padding: 8, gap: 8 }}>
                <Text numberOfLines={4} style={{ fontFamily: "Medium" }}>
                  {item.title}
                </Text>
                <Text
                  style={{ fontFamily: "SemiBold", marginTop: "auto" }}
                >{`${item.priceData.price} ${item.priceData.currency}`}</Text>
              </View>
            </Pressable>
          )}
        />
      </ScrollView>

      <Toast
        visible={visible}
        message="Ürün Sepetinize Eklendi"
        onHide={() => setVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    gap: 8,
  },
  title: {
    fontFamily: "SemiBold",
    fontSize: 18,
    lineHeight: 22,
    marginVertical: 14,
  },
  price: {
    marginTop: 6,
    fontFamily: "SemiBold",
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
    fontFamily: "Medium",
    fontSize: 16,
  },
});
