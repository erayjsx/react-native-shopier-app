import { Image, StyleSheet, View, Text, Pressable } from "react-native";

export default function ProductItem({
  id,
  title,
  desc,
  price,
  image,
  onPress,
}) {
  return (
    <Pressable onPress={onPress} style={styles.item}>
      <Image
        style={{
          width: 60,
          height: 80,
          objectFit: "contain",
        }}
        source={{
          uri: image,
        }}
      />
      <View style={{ gap: 12, width: "80%" }}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={{ fontFamily: "SemiBold", fontSize: 16 }}>{price}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
    fontFamily: "Medium",
    fontSize: 16,
  },
});
