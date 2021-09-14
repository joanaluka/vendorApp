// React/React Native
import React, { useState } from "react";
import { View, Text, ScrollView, Switch, Image } from "react-native";
// Expo
import { Ionicons } from "@expo/vector-icons";
// React-Navigation
// Utils
import * as colors from "../utils/colors";
// Helpers

const InventoryCard = ({ title, price, desc, image }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View
      style={{
        backgroundColor: "#f2f2f2",
        padding: 10,
        borderRadius: 10,
        marginBottom: 15,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              backgroundColor: "lightgray",
              borderRadius: 5,
              marginRight: 20,
            }}
          >
            <Image source={image} style={{ width: 60, height: 60 }}></Image>
          </View>
          <View>
            <Text style={{ fontWeight: "bold" }}>{title}</Text>
            <Text style={{ fontWeight: "bold" }}>{desc}</Text>
          </View>
        </View>
        <View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "green" : "lightgray"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold" }}>KES: </Text>
        <Text
          style={{
            paddingVertical: 4,
            paddingHorizontal: 20,
            borderRadius: 5,
            backgroundColor: "white",
            marginHorizontal: 20,
          }}
        >
          {price}
        </Text>
        <Ionicons name="pencil-outline" size={15} color={colors.pow_blue} />
      </View>
    </View>
  );
};

const items = [
  {
    title: "Dispenser Bottle 18.9L",
    desc: "New Bottle",
    price: 950,
    image: require("../../assets/images/bottles/dispenserbottle18.9L.png"),
  },
  {
    title: "PET Bottle 20L",
    desc: "New Bottle",
    price: 400,
    image: require("../../assets/images/bottles/jerrybottle20L.png"),
  },
  {
    title: "Jerrycan Bottle 10L",
    desc: "Refill",
    price: 950,
    image: require("../../assets/images/bottles/jerry10Lbottle.png"),
  },
  {
    title: "Dispenser Bottle 18.9L",
    desc: "Swap",
    price: 950,
    image: require("../../assets/images/bottles/dispenserbottle18.9L.png"),
  },
];

export default function Inventory({ navigation }) {
  return (
    <ScrollView
      style={{
        margin: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: "lightgray",
      }}
    >
      {items.map((item, i) => (
        <InventoryCard
          key={i}
          title={item.title}
          desc={item.desc}
          price={item.price}
          image={item.image}
        />
      ))}
    </ScrollView>
  );
}
