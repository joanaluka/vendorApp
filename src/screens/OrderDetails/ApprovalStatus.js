import React from "react";
import { View, Text, Image } from "react-native";
// Expo
// React-Navigation
// Utils
// Helpers

export default function ApprovalStatus() {
  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          paddingLeft: 20,
          paddingTop: 10,
        }}
      >
        Approval Status
      </Text>
      <Image
        source={require("../../../assets/images/Illustrations.png")}
        style={{ width: "100%", height: 200 }}
      />
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          paddingHorizontal: "20%",
          marginTop: 10,
          fontFamily: "Lato_400Regular",
        }}
      >
        Thank you we will review your information, and someome from our team
        will get in touch.{" "}
      </Text>
    </View>
  );
}
