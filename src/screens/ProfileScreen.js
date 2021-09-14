// React & React-Native
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
// Other
import { Cell, Section, TableView } from "react-native-tableview-simple";
// Helpers & Constants
import * as colors from "./utils/colors";
import AuthContext from "../context/AuthContext";

export default function ProfileScreen({ navigation }) {
  const { userData } = useContext(AuthContext);
  const { firstName, lastName, phoneNumber, address } = userData;

  let address_parsed;
  try {
    address_parsed = address.split(",");
  } catch (err) {
    address_parsed = ["", "", ""];
  }

  return (
    <TableView appearance="light">
      <Section
        header="User Info"
        headerTextColor={colors.pow_black}
        headerTextStyle={[styles.secHeader, { fontFamily: "Lato_700Bold" }]}
      >
        <Cell
          cellStyle="RightDetail"
          title="First Name"
          detail={firstName == undefined ? "" : firstName}
          titleTextColor={colors.dark_grey}
          rightDetailColor={colors.pow_black}
        />
        <Cell
          cellStyle="RightDetail"
          title="Last Name"
          detail={lastName == undefined ? "" : lastName}
          titleTextColor={colors.dark_grey}
          rightDetailColor={colors.pow_black}
        />
      </Section>
      <Section
        header="Contact Info"
        headerTextColor={colors.pow_black}
        headerTextStyle={[styles.secHeader, { fontFamily: "Lato_700Bold" }]}
      >
        <Cell
          cellStyle="RightDetail"
          title="Phone"
          detail={phoneNumber == undefined ? "" : phoneNumber}
          titleTextColor={colors.dark_grey}
          rightDetailColor={colors.pow_black}
        />
      </Section>
      <Section
        header="Delivery Address"
        headerTextColor={colors.pow_black}
        headerTextStyle={[styles.secHeader, { fontFamily: "Lato_700Bold" }]}
      >
        <Cell
          cellStyle="RightDetail"
          title="Name"
          detail="Home (Default)"
          accessory="DisclosureIndicator"
          onPress={() => navigation.navigate("AddAddress")}
          titleTextColor={colors.dark_grey}
          rightDetailColor={colors.pow_black}
        />
        <Cell
          cellStyle="RightDetail"
          title="Line 1"
          detail={address_parsed[0]}
          titleTextColor={colors.dark_grey}
          rightDetailColor={colors.pow_black}
        />
        <Cell
          cellStyle="RightDetail"
          title="Line 2"
          titleTextColor={colors.dark_grey}
          rightDetailColor={colors.pow_black}
        />
        <Cell
          cellStyle="RightDetail"
          title="City"
          detail={address_parsed[1]}
          titleTextColor={colors.dark_grey}
          rightDetailColor={colors.pow_black}
        />
        <Cell
          cellStyle="RightDetail"
          title="Country"
          detail={address_parsed[2]}
          titleTextColor={colors.dark_grey}
          rightDetailColor={colors.pow_black}
        />
      </Section>
    </TableView>
  );
}

const styles = StyleSheet.create({
  secHeader: {
    fontSize: 20,
  },
});
