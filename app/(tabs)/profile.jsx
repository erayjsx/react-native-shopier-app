import { router, Stack } from "expo-router";
import { Pressable, Text, View } from "react-native";
import RemixIcon from "react-native-remix-icon";

export default function ProfileScreen() {
  const menu = [
    {
      title: "Sipariş Takibi",
      desc: "Siparişinizin durumunu takip edebilirsiniz.",
      icon: "box-3-line",
      route: "/pages/delivery",
    },
    {
      title: "Kargo Detayları",
      desc: "Kargo ile ilgili bilgilendirme",
      icon: "truck-line",
      route: "/pages/cargo",
    },
    {
      title: "Hakkımızda",
      desc: "Firmamız hakkında",
      icon: "information-line",
      route: "/pages/info",
    },
    {
      title: "Kişisel Verilerin Korunması",
      desc: "Kişisel Verilerin Korunması ve Gizlilik Politikası",
      icon: "file-text-line",
      route: "/pages/kvkk",
    },
  ];
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        {menu.map((item) => (
          <Item
            title={item.title}
            desc={item.desc}
            icon={item.icon}
            onPress={() => router.push(item.route)}
          />
        ))}
      </View>
    </>
  );
}

const Item = ({ title, desc, icon, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "#aaa" }}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        gap: 12,
        height: 65,
        borderBottomWidth: 1,
        borderColor: "#eee",
      }}
    >
      <RemixIcon name={icon} size={22} />
      <View>
        <Text
          style={{
            fontFamily: "Medium",
          }}
        >
          {title}
        </Text>
        {desc && (
          <Text
            style={{
              fontFamily: "Medium",
              opacity: 0.4,
              fontSize: 13,
            }}
          >
            {desc}
          </Text>
        )}
      </View>
    </Pressable>
  );
};
