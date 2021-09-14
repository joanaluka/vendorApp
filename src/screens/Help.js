// React/React Native
import React from "react";
import { View, Text, Link, TouchableOpacity, Linking } from "react-native";
// Expo
import { MaterialCommunityIcons } from "@expo/vector-icons";
// React-Navigation
// Utils
import * as colors from "../utils/colors";

export default function Help() {
  const [show, setShow] = React.useState(false);
  return (
    <View style={{ marginVertical: 10, marginHorizontal: 15 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text>Contact Us</Text>
        <TouchableOpacity onPress={() => setShow(!show)}>
          {!show && (
            <MaterialCommunityIcons
              name="chevron-down"
              size={24}
              color={colors.pow_blue}
            />
          )}
          {show && (
            <MaterialCommunityIcons
              name="chevron-left"
              size={24}
              color={colors.pow_blue}
            />
          )}
        </TouchableOpacity>
      </View>
      {show && (
        <View
          style={{
            borderBottomColor: "lightgray",
            borderBottomWidth: 1,
            borderStyle: "dotted",
            paddingBottom: 10,
            borderRadius: 1,
          }}
        >
          <TouchableOpacity
            onPress={() => Linking.openURL("mailto:suuport@powwater.com")}
          >
            <Text style={{ color: "#888888", paddingTop: 10 }}>
              Email Address: support@powwater.com
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL("tel://0111718463")}>
            <Text style={{ color: "#888888", paddingVertical: 10 }}>
              Phone Number: +254111718463
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View>
        <TouchableOpacity
          style={{ marginTop: 10 }}
          onPress={() => Linking.openURL("https://www.powwater.com/")}
        >
          <Text style={{ color: colors.pow_blue }}>Terms & Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginTop: 10 }}
          onPress={() => Linking.openURL("https://www.powwater.com/")}
        >
          <Text style={{ color: colors.pow_blue }}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
