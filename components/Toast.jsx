import { router } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View, Text, Dimensions, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const Toast = ({
  message,
  visible,
  onHide,
  duration = 8000,
  type = "success",
}) => {
  const translateY = useSharedValue(height);
  const opacity = useSharedValue(0);

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "#379C52FF";
      case "error":
        return "#F44336";
      case "warning":
        return "#FFC107";
      default:
        return "#4CAF50";
    }
  };

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(height - 180, {
        damping: 15,
        stiffness: 100,
      });
      opacity.value = withSpring(1);

      const timeout = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [visible]);

  const hideToast = () => {
    // Toast'ı tekrar ekranın altına gönder
    translateY.value = withTiming(height, {
      duration: 3600,
    });
    opacity.value = withTiming(
      0,
      {
        duration: 1200,
      },
      (finished) => {
        if (finished) {
          runOnJS(onHide)();
        }
      }
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={[styles.toast, { backgroundColor: getBackgroundColor() }]}>
        <Text style={styles.text}>{message}</Text>

        <Pressable onPress={() => router.push("/(tabs)/cart")}>
          <Text
            style={{
              color: "#fff",
              fontFamily: "SemiBold",
            }}
          >
            Sepete Git
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 9999,
  },
  toast: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 220,
    maxWidth: width * 0.9,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 8,
    marginHorizontal: 20,
    shadowColor: "#aaa",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 12,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Medium",
  },
});

export default Toast;
