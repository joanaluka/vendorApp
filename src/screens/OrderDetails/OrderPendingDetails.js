// React/React Native
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
// Expo
// React-Navigation
// Utils
import * as colors from "../../utils/colors";
// Helpers

export default function OrderPendingDetails({ navigation }) {
  return (
    <View>
      <View style={{ marginVertical: 10 }}>
        <Image
          source={require("../../../assets/images/Illustrations-02.png")}
          style={{ width: "100%", height: 200 }}
        ></Image>
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
          <View style={styles.detail}>
            <Text style={styles.textGray}>Delivery Notes:</Text>
            <Text style={styles.textGray}>3 Block House number 4</Text>
          </View>
        </View>
        <View
          style={{
            paddingBottom: 10,
            borderBottomColor: "lightgray",
            borderBottomWidth: 1,
            marginTop: 20,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1.2,
              marginRight: 10,
            }}
          >
            <Text
              style={[
                styles.textGray,
                {
                  paddingVertical: 2,
                  paddingHorizontal: 4,
                  borderColor: "gray",
                  borderWidth: 1,
                  borderRadius: 2,
                },
              ]}
            >
              1
            </Text>
            <Text style={styles.textGray}>10 Litres New Bottles</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.textGray}>1</Text>
            <Text style={styles.textGray}>KES 150</Text>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={styles.detail}>
            <Text style={styles.textTitle}>SubTotal</Text>
            <Text style={styles.textTitle}>KES 150</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.textGray}>Delivery Fee</Text>
            <Text style={styles.textGray}>KES 30</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.textGray}>Discount</Text>
            <Text style={styles.textGray}>KES 20</Text>
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
            style={[styles.signUpButtonView, { backgroundColor: "#888888" }]}
            onPress={() => navigation.navigate("DelineReason")}
          >
            <Text
              style={[styles.signUpText, { fontFamily: "Lato_400Regular" }]}
            >
              Decline
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.signUpButtonView,
              { backgroundColor: colors.pow_blue },
            ]}
            onPress={() => navigation.navigate("SuccessfulOrder")}
          >
            <Text
              style={[styles.signUpText, { fontFamily: "Lato_400Regular" }]}
            >
              Accept
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
    width: 120,
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
