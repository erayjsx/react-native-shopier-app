import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import ProductItem from "../../components/ProductItem";
import { useCategoriesStore } from "../../store/useCategoriesStore";
import useProductStore from "../../store/useProductStore";
import NotFound from "../../components/NotFound";

export default function ExploreScreen() {
  const [query, setQuery] = useState("");
  const { products, fetchProducts } = useProductStore();
  const { categories, fetchCategories } = useCategoriesStore();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const searchItems = products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Ürün Ara"
        placeholderTextColor="#aaa"
        inputMode="text"
        textBreakStrategy="simple"
        value={query}
        onChangeText={(text) => setQuery(text)}
        style={styles.input}
      />

      {query ? (
        <>
          {searchItems == 0 && <NotFound />}
          <FlatList
            data={searchItems}
            renderItem={({ item, index }) => (
              <ProductItem
                key={item.id}
                title={item.title}
                price={`${item?.priceData.price} ${item.priceData.currency}`}
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
        </>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Text style={{ fontFamily: "SemiBold", fontSize: 16 }}>
            Kategoriler
          </Text>
          <FlatList
            scrollEnabled={false}
            data={categories}
            renderItem={({ item, index }) => (
              <Pressable
                key={item.id}
                style={styles.item}
                onPress={() =>
                  router.push({
                    pathname: "/categoryProducts",
                    params: { id: item.id, title: item.title },
                  })
                }
              >
                <Text style={{ fontFamily: "Medium", fontSize: 16 }}>
                  {item.title}
                </Text>
              </Pressable>
            )}
          />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  input: {
    padding: 16,
    borderColor: "#ddd",
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: 20,
    fontFamily: "Medium",
  },
  item: {
    height: 52,
    opacity: 0.7,
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
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
    fontFamily: "SemiBold",
  },
});
