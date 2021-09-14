// React/React Native
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
// Expo
import { Feather } from "@expo/vector-icons";
// React-Navigation
// Utils
import * as colors from "../../utils/colors";
// Helpers

export default function OrderPreparingDetails() {
  return (
    <View>
      <View>
        <Text
          style={[
            styles.textTitle,
            { textAlign: "center", fontSize: 16, marginVertical: 10 },
          ]}
        >
          Preparing Water
        </Text>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Image
          source={require("../../../assets/images/Illustrations-02.png")}
          style={{ width: "100%", height: 200 }}
        ></Image>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text
          style={[
            styles.textGray,
            { color: colors.pow_blue, textAlign: "center", fontSize: 14 },
          ]}
        >
          Estimated Preparing Time
        </Text>
        <Text style={[styles.textTitle, { textAlign: "center", fontSize: 16 }]}>
          15 - 20 Min
        </Text>
      </View>
      <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
        <View
          style={{
            paddingBottom: 10,
            borderBottomColor: "lightgray",
            borderBottomWidth: 1,
          }}
        >
          <View style={styles.detail}>
            <Text style={styles.textGray}>Order Number:</Text>
            <Text style={styles.textGray}>#123</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.textGray}>Order From:</Text>
            <Text style={styles.textGray}>Martin Chezo</Text>
          </View>
          <View style={styles.detail}>
            <Text style={[styles.textGray, { flex: 1 }]}>Delivery Address</Text>
            <Text style={[styles.textGray, { flex: 1, textAlign: "right" }]}>
              Baywood Building, Moi Ave, Mombasa, Kenya
            </Text>
          </View>
        </View>

        <View
          style={{
            marginVertical: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ marginRight: 10 }}>
              <Image
                source={require("../../../assets/images/rider.jpg")}
                style={{ width: 60, height: 60, borderRadius: 50 }}
              />
            </View>
            <View>
              <Text style={styles.textTitle}>Abuya Awino</Text>
              <View style={{ flexDirection: "row", marginTop: 4 }}>
                <Feather name="star" size={15} color={colors.pow_blue} />
                <Text>4.9 (38)</Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Feather
              name="phone-call"
              size={15}
              color={colors.pow_blue}
              style={{ marginRight: 8 }}
            />
            <Feather name="message-circle" size={15} color={colors.pow_blue} />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={[
              styles.signUpButtonView,
              { backgroundColor: colors.pow_blue },
            ]}
          >
            <Text
              style={[styles.signUpText, { fontFamily: "Lato_400Regular" }]}
            >
              Ready for Pickup
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  textTitle: {
    fontWeight: "bold",
    fontFamily: "Lato_400Regular",
  },
  textGray: {
    color: "#888888",
    fontSize: 12,
    fontFamily: "Lato_400Regular",
    lineHeight: 16,
  },

  signUpButtonView: {
    borderRadius: 10,
    width: "100%",
    height: 50,
    justifyContent: "space-around",
    marginBottom: "3%",
  },

  signUpText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
