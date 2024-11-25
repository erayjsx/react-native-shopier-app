import { StyleSheet, View, FlatList } from "react-native";
import { useEffect } from "react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import ProductItem from "../components/ProductItem";
import useProductStore from "../store/useProductStore";
import NotFound from "../components/NotFound";

export default function ProductsScreen() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();

  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();

    navigation.setOptions({
      headerTitle: params?.title,
      headerTitleAlign: "center",
    });
  }, [navigation]);

  const categoryProducts = products?.filter((product) =>
    product.categories[0].id.includes(params.id)
  );

  return (
    <View style={styles.container}>
      {categoryProducts == 0 && <NotFound />}

      <FlatList
        data={categoryProducts}
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
