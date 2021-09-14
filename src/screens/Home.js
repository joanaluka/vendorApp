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
// Helpers

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import * as colors from "../utils/colors";
import { useNavigation } from "@react-navigation/core";

const Tab = createMaterialTopTabNavigator();

const Pending = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <Pressable
            key={i}
            onPress={() =>
              navigation.navigate("OrderPending", {
                item: 1,
              })
            }
          >
            <ActivityCardOne key={i} />
          </Pressable>
        ))}
    </ScrollView>
  );
};
const Preparing = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <Pressable
            key={i}
            onPress={() =>
              navigation.navigate("OrderPreparing", {
                item: 1,
              })
            }
          >
            <ActivityCardTwo key={i} />
          </Pressable>
        ))}
    </ScrollView>
  );
};

const InProgress = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <Pressable
            key={i}
            onPress={() => navigation.navigate("OrderInProgress")}
          >
            <ActivityCardOne />
          </Pressable>
        ))}
    </ScrollView>
  );
};

const Delivered = () => {
  return (
    <ScrollView>
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <ActivityCardThree key={i} />
        ))}
    </ScrollView>
  );
};

export default function Home() {
  return (
    <>
      <View
        style={{
          height: 60,
          backgroundColor: "#f9f9f9",
          justifyContent: "center",
          paddingLeft: 20,
          borderTopColor: "lightgray",
          borderTopWidth: 2,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          BrookeSide Water
        </Text>
      </View>
      <View
        style={{
          marginLeft: 20,
          marginRight: 20,
          marginTop: 5,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            height: 40,
            justifyContent: "center",
            backgroundColor: "#0A62AE",
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "white", fontSize: 16, marginLeft: 10 }}>
            Today's Activity
          </Text>
        </View>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 12,
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
        <Tab.Screen name="Pending" component={Pending} />
        <Tab.Screen name="Preparing" component={Preparing} />
        <Tab.Screen name="Out of Delivery" component={InProgress} />
        <Tab.Screen name="Delivered" component={Delivered} />
      </Tab.Navigator>
    </>
  );
}

const ActivityCardOne = () => (
  <View style={styles.cardContainer}>
    <View style={styles.cardInner}>
      <Text style={styles.cardTitle}>Order Number #123</Text>
      <Text style={styles.cardText}>Today 05:40 pm</Text>
    </View>
    <View style={styles.cardInner}>
      <Text style={styles.cardDesc}>Total Cost - KES 600</Text>
      <AntDesign name="arrowdown" size={20} color="#0A62AE" />
    </View>
  </View>
);

const ActivityCardTwo = () => (
  <View style={styles.cardContainer}>
    <View style={styles.cardInner}>
      <View>
        <Text style={styles.cardTitle}>Order Number #123</Text>
        <Text style={styles.cardText}>Total Cost - KES 600</Text>
      </View>
      <Text style={styles.cardDesc}>Preparing Time</Text>
    </View>
    <View style={[styles.cardInner, { paddingVertical: 10 }]}>
      <AntDesign name="arrowdown" size={20} color="#0A62AE" />
      <Text style={styles.cardBig}>15 Min</Text>
    </View>
  </View>
);

const ActivityCardThree = () => {
  const [show, setShow] = React.useState(false);
  return (
    <View style={[styles.cardContainer, { backgroundColor: colors.pow_lime }]}>
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
    backgroundColor: "#f2f2f2",
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
    color: colors.pow_black,
  },
  cardDesc: {
    fontWeight: "bold",
    fontSize: 12,
    fontFamily: "Lato_400Regular",
    color: colors.pow_black,
  },
  cardText: {
    fontSize: 11,
    fontFamily: "Lato_400Regular",
    color: colors.pow_black,
  },
  cardBig: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Lato_400Regular",
    color: "#358c0a",
  },
  textGray: {
    color: "#888888",
    fontSize: 12,
    fontFamily: "Lato_400Regular",
    lineHeight: 16,
  },
});
