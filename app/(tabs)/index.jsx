import { StyleSheet, View, FlatList } from "react-native";
import { useEffect } from "react";
import { router } from "expo-router";
import useProductStore from "../../store/useProductStore";
import ProductItem from "../../components/ProductItem";

export default function HomeScreen() {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item, index }) => (
          <ProductItem
            key={item.id}
            title={item.title}
            price={`${item.priceData.price} ${item.priceData.currency}`}
            image={item.media[0].url}
            onPress={() =>
              router.push({
                pathname: "/detail",
                params: { id: item.id, title: item.title },
              })
            }
          />
        )}
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
