// React/RN
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, Pressable, Alert } from "react-native";
// Expo
// import Toast from "react-native-root-toast"
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
Location.setGoogleApiKey(Constants.manifest.extra.mapsApiKey);
Location.installWebGeolocationPolyfill();
import Constants from "expo-constants";

// Import Firebase JS SDK
const firebase = require("firebase/app");
require("firebase/auth");

// Other
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

// Global setting for Font Scaling
Text.defaultProps = {
  allowFontScaling: false,
};

// Utils & Helpers
import LoadingScreen from "../utils/LoadingScreen";

// CONTEXT
import AuthContext from "../context/AuthContext";
import { registerUser } from "../utils/api";

// Sentry (Error Tracking)
import { sentryEx } from "../utils/sentry";

export default function VerificationScreen({ navigation, route }) {
  const { userData, signUp } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);

  // Pin Code field
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const { firstName, lastName, phoneNumber, gender, dob, pin, verificationId } =
    route.params;

  // Location Permission & Request
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    (async () => {
      let pos;
      if (location === null) {
        // pos = await Location.getCurrentPositionAsync({
        //   accuracy: Location.Accuracy.BestForNavigation,
        //   mayShowUserSettingsDialog: true
        // });

        pos = await Location.getLastKnownPositionAsync({});

        setLocation(pos.coords);
      }

      if (location !== null && address === null) {
        let address_data = await Location.reverseGeocodeAsync(
          {
            latitude: location.latitude,
            longitude: location.longitude,
          },
          { useGoogleMaps: true }
        );
        const address_format =
          address_data[0]["name"] +
          ", " +
          address_data[0]["city"] +
          ", " +
          address_data[0]["country"];
        setAddress(address_format);
        userData.address = address_format;
        userData.latlon = {
          latitude: location.latitude,
          longitude: location.longitude,
        };
        setLoading(false);
      }
    })();
  }, [location, address]);

  if (isLoading) {
    let message;
    if (value === "") {
      message = "Sending Verification SMS Message";
    } else {
      message = "Verifying Current Location";
    }

    return <LoadingScreen message={message} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>SMS Verification</Text>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={6}
        rootStyle={{ marginTop: 20 }}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor delay={5000} /> : null)}
          </Text>
        )}
      />
      <Pressable
        style={styles.buttonView}
        onPress={async () => {
          setLoading(true);

          try {
            let credential = firebase.default.auth.PhoneAuthProvider.credential(
              verificationId,
              value
            );
            await firebase.default.auth().signInWithCredential(credential);
          } catch (err) {
            sentryEx(err);
            if (err.message !== null && err.message !== undefined) {
              Alert.alert("Firebase Authentication Error", err.message);
            } else {
              Alert.alert("Firebase Authentication Error");
            }
            setValue("");
            setLoading(false);
            navigation.goBack();
            return;
          }

          try {
            // Update Context vals
            userData.firstName = firstName;
            userData.lastName = lastName;
            userData.phoneNumber = phoneNumber;
            userData.pin = pin;
            userData.address = address;
            userData.addressLabel = "Home (Default)";
            userData.addressNotes = "";

            let response = await registerUser(
              firstName,
              lastName,
              phoneNumber,
              gender,
              dob,
              pin,
              location,
              address
            );

            if (response.status == 200) {
              let data = response.data;
              userData.userUID = data.user_uid;
              userData.location_uid =
                data.new_customer_location_tbl_records[0].uid;

              setLoading(false);
              signUp(userData);
            }
          } catch (err) {
            sentryEx(err);
            Alert.alert(err.response.data.message);
            setValue("");
            setLoading(false);
            navigation.goBack();
          }
        }}
      >
        <Text style={styles.buttonText}>Verify</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonView: {
    backgroundColor: "rgb(10, 98, 174)",
    borderRadius: 10,
    width: 307,
    height: 56,
    marginBottom: 14,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#00000030",
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#000",
  },
});
