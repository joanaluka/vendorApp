import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
// Expo
import RNPickerSelect from "react-native-picker-select";
// Other
// Utils & Helpers
import * as colors from "../../utils/colors";

export default function DeclineReason() {
  const [selected, setSelected] = useState(null);
  const Dropdown = () => {
    return (
      <RNPickerSelect
        onValueChange={(value) => setSelected(value)}
        placeholder={{ label: "Select", value: null }}
        value={selected}
        items={[
          { label: "Maintainance", value: "maintainance" },
          { label: "Lack of bottle", value: "bottle" },
          { label: "Lack of seal", value: "seal" },
          { label: "Other", value: "other" },
        ]}
      />
    );
  };

  return (
    <View style={{ marginHorizontal: 15, marginTop: 10 }}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 22,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Reason for Declining
      </Text>
      <Text
        style={{
          textAlign: "center",
          marginBottom: 15,
        }}
      >
        Please explain why you are declining this order
      </Text>

      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 1,
          paddingBottom: 5,
          marginTop: 20,
        }}
      >
        <Dropdown />
      </View>

      {selected === "other" && (
        <View>
          <View style={{ width: "100%", marginTop: 50 }}>
            <Text
              style={{
                fontSize: 18,
                marginBottom: 15,
              }}
            >
              Write your Comment
            </Text>

            <View
              style={{
                borderBottomColor: colors.pow_black,
                borderBottomWidth: 1,
                height: 50,
                width: "100%",
              }}
            >
              <TextInput
                style={[styles.textInput, { fontFamily: "Lato_400Regular" }]}
                placeholder="Leave a comment here"
                placeholderTextColor={colors.pow_grey}
                onChangeText={(text) => setFirstName(text)}
                autoFocus
                autoCapitalize="words"
                returnKeyType="next"
                autoCompleteType="name"
                autoCapitalize="words"
                underlineColorAndroid="transparent"
                autoCorrect={false}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    backgroundColor: "white",
    color: "black",
  },
});
