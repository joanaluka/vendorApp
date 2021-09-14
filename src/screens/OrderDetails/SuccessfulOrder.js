// React/React Native
import React from "react";
import { View, Text, Image } from "react-native";
// Expo
// React-Navigation
// Utils
// Helpers

export default function SuccessfulOrder() {
  return (
    <View>
      <Image
        source={require("../../../assets/images/Illustrations.png")}
        style={{ width: "100%", height: 200 }}
      />
      <Text
        style={{
          textAlign: "center",
          fontSize: 25,
          paddingHorizontal: "20%",
          marginTop: 10,
        }}
      >
        Your order has been successfully delivered{" "}
      </Text>
    </View>
  );
}
