// React/React Native
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
// Expo
import { AntDesign } from "@expo/vector-icons";
// React-Navigation
// Utils
import * as colors from "../utils/colors";
// Helpers

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const Delivered = () => {
  return (
    <ScrollView>
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <ActivityCardThree key={i} color={colors.pow_lime} />
        ))}
    </ScrollView>
  );
};

const Declined = () => {
  return (
    <ScrollView>
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <ActivityCardThree key={i} color="#f2f2f2" />
        ))}
    </ScrollView>
  );
};

export default function Activity() {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontWeight: "bold",
            textTransform: "capitalize",
            color: colors.pow_blue,
            elevation: 0,
          },
          tabBarItemStyle: {
            marginHorizontal: 0,
            paddingHorizontal: 0,
          },
          tabBarIndicatorStyle: {
            marginHorizontal: 0,
            paddingHorizontal: 0,
          },
        }}
      >
        <Tab.Screen name="Delivered" component={Delivered} />
        <Tab.Screen name="Declined" component={Declined} />
      </Tab.Navigator>
    </>
  );
}

const ActivityCardThree = ({ color }) => {
  const [show, setShow] = React.useState(false);
  return (
    <View style={[styles.cardContainer, { backgroundColor: color }]}>
      <View style={styles.cardInner}>
        <Text style={styles.cardTitle}>Order Number #123</Text>
        <Text style={styles.cardText}>Today 05:40 pm</Text>
      </View>
      <View style={styles.cardInner}>
        <Text style={styles.cardDesc}>Total Cost - KES 600</Text>
        <TouchableOpacity onPress={() => setShow(!show)}>
          {!show && <AntDesign name="arrowdown" size={20} color="#0A62AE" />}
          {show && <AntDesign name="arrowup" size={20} color="#0A62AE" />}
        </TouchableOpacity>
      </View>

      <View style={{ display: show ? "flex" : "none" }}>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.textGray}>Order From: Martin Chezo</Text>
          <Text style={styles.textGray}>Delivery Address: Bay Building</Text>
          <Text style={styles.textGray}>Moi Ave, Mombase, Kenya</Text>
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={styles.textGray}>
            <Text style={{ fontWeight: "bold", marginRight: 10 }}>Items:</Text>
            <Text> 10 Liter new Bottle(1)</Text>
          </Text>
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={styles.textGray}>
            <Text style={{ fontWeight: "bold", marginRight: 10 }}>
              Sub Total:{" "}
            </Text>
            <Text> - KES 140</Text>
          </Text>
          <Text style={styles.textGray}>
            <Text style={{ fontWeight: "bold", marginRight: 10 }}>
              Delivery Fee:{" "}
            </Text>
            <Text> - KES 30</Text>
          </Text>
          <Text style={styles.textGray}>
            <Text style={{ fontWeight: "bold", marginRight: 10 }}>
              Discount:{" "}
            </Text>
            <Text> - KES 20</Text>
          </Text>
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={[styles.textGray, { fontWeight: "bold" }]}>
            Paid With Mpesa
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  cardInner: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontWeight: "bold",
    fontFamily: "Lato_400Regular",
  },
  cardDesc: {
    fontWeight: "bold",
    fontSize: 12,
    fontFamily: "Lato_400Regular",
  },
  cardText: {
    fontSize: 11,
    fontFamily: "Lato_400Regular",
  },
  cardBig: {
    fontSize: 18,
    color: "green",
    fontWeight: "bold",
    fontFamily: "Lato_400Regular",
  },
  textGray: {
    color: "#888888",
    fontSize: 12,
    fontFamily: "Lato_400Regular",
    lineHeight: 16,
  },
});
