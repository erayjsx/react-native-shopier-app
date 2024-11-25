import { Text, View } from "react-native";
import RemixIcon from "react-native-remix-icon";

export default function NotFound() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        opacity: 0.5,
      }}
    >
      <RemixIcon name="error-warning-line" size={44} />
      <Text style={{ fontFamily: "SemiBold", fontSize: 20 }}>Bulunamadı!</Text>
    </View>
  );
}
