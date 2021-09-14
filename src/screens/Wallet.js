// React/React Native
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
// Expo
// React-Navigation
// Utils
import * as colors from "../utils/colors";

const items = [
  { a: "08/09/2021", b: 1111, c: "KES 450", d: "KES 1400" },
  { a: "07/09/2021", b: 789, c: "KES 150", d: "KES 900" },
  { a: "06/09/2021", b: 456, c: "KES 100", d: "KES 800" },
  { a: "05/09/2021", b: 123, c: "KES 700", d: "KES 700" },
  { a: "04/09/2021", b: "N/A", c: "KES 1700", d: "KES 1400" },
];

export default function Wallet() {
  return (
    <View>
      <View
        style={{
          backgroundColor: colors.pow_blue,
          height: 250,
          borderRadius: 5,
        }}
      >
        <View>
          <Text
            style={{
              color: "white",
              fontSize: 30,
              textAlign: "center",
              marginVertical: 10,
            }}
          >
            KES 1260
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 16,
              textAlign: "center",
              marginBottom: 15,
            }}
          >
            Current Balance
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 16,
              textAlign: "center",
              marginBottom: 15,
              fontWeight: "bold",
            }}
          >
            Weekly Earning
          </Text>
        </View>
        <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: "white" }}>Credit from Orders</Text>
            <Text style={{ color: "white" }}>KES 1400</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 10,
            }}
          >
            <Text style={{ color: "white" }}>Debit Commission</Text>
            <Text style={{ color: "white" }}>KES 140</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: "white" }}>Total Order Earnings</Text>
            <Text style={{ color: "white" }}>KES 1400</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#f2f2f2",
          height: 70,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: colors.pow_blue,
            fontWeight: "bold",
            fontSize: 18,
            textAlign: "center",
          }}
        >
          Transactions
        </Text>
      </View>

      <View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 10,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: "bold", flex: 1 }}>
            Date
          </Text>
          <Text style={{ fontSize: 12, fontWeight: "bold", flex: 1.1 }}>
            Order Number
          </Text>
          <Text style={{ fontSize: 12, fontWeight: "bold", flex: 1 }}>
            Amount
          </Text>
          <Text style={{ fontSize: 12, fontWeight: "bold", flex: 1 }}>
            Wallet Balance
          </Text>
        </View>

        {items.map((item, i) => (
          <View
            key={i}
            style={{
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 8,
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 13, flex: 1 }}>{item.a}</Text>
            <Text style={{ fontSize: 13, flex: 1.1 }}>{item.b}</Text>
            <Text style={{ fontSize: 13, flex: 1 }}>{item.c}</Text>
            <Text style={{ fontSize: 13, flex: 1 }}>{item.d}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  secHeader: {
    fontSize: 20,
  },
});
