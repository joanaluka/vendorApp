// React & React Native
import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  TouchableOpacity,
  TextInput,
} from "react-native";
// Expo
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Other
import IntlPhoneInput from "pow-react-native-intl-phone-input";
// Utils
import LoadingScreen from "../utils/LoadingScreen";
import * as colors from "../utils/colors";
// Sentry (Error Tracking)
import { sentryEx } from "../utils/sentry";
// CONTEXT
import AuthContext from "../context/AuthContext";
import { logIn } from "../utils/api";

export default function LoginScreen({ navigation }) {
  const { signIn, userData } = useContext(AuthContext);
  // Loading
  const [isLoading, setIsLoading] = useState(false);
  // Intl Phone Input
  const [phone, setPhone] = useState("");
  const [isValidPhoneNumber, setValidPhoneNumber] = useState(false);
  const [countryChangeDisabled, setCountryChangeDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  function onChangeText({
    dialCode,
    unmaskedPhoneNumber,
    phoneNumber,
    isVerified,
  }) {
    if (unmaskedPhoneNumber != "") {
      setCountryChangeDisabled(true);
    } else {
      setCountryChangeDisabled(false);
    }
    setValidPhoneNumber(isVerified);

    if (dialCode === "+254") {
      setPhone(dialCode + "0" + unmaskedPhoneNumber);
    } else {
      setPhone(dialCode + unmaskedPhoneNumber);
    }
  }

  // Masked PIN Code
  const [pin, setPin] = useState("");

  const togglePin = () => {
    if (showPassword === true) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  if (isLoading) {
    return <LoadingScreen message="Logging In" />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      enabled
      // contentContainerStyle={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 100}
      style={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
      }}
    >
      <TouchableWithoutFeedback
        style={{ width: "100%" }}
        onPress={Keyboard.dismiss}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-around",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Text style={[styles.logInTitle, { fontFamily: "Lato_700Bold" }]}>
            Login
          </Text>
          <View
            style={{
              flexGrow: 0.2,
              justifyContent: "space-evenly",
            }}
          >
            <View style={{ marginLeft: -13 }}>
              <IntlPhoneInput
                lang="EN"
                placeholder="712 345678"
                defaultCountry="KE"
                onChangeText={onChangeText}
                disableCountryChange={countryChangeDisabled}
                phoneInputStyle={{
                  borderBottomWidth: 0,
                  letterSpacing: 0.5,
                  fontSize: 15,
                  fontFamily: "Lato_400Regular",
                }}
                dialCodeTextStyle={{
                  fontSize: 15,
                  paddingLeft: 5,
                  fontFamily: "Lato_400Regular",
                }}
                flagStyle={{
                  fontSize: 15,
                  fontFamily: "Lato_400Regular",
                }}
              />
              <View
                style={{
                  borderBottomWidth: 1,
                  marginLeft: 13,
                  paddingTop: -20,
                }}
              />
            </View>

            <View
              style={{
                justifyContent: "flex-start",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomColor: "black",
                  borderBottomWidth: 1,
                  justifyContent: "space-between",
                }}
              >
                <TextInput
                  maxLength={4}
                  placeholder="Pin"
                  keyboardType="numeric"
                  value={pin}
                  placeholderTextColor={pin.length !== "Pin" ? "gray" : "black"}
                  secureTextEntry={showPassword}
                  onChangeText={(pin) => setPin(pin)}
                  style={{
                    height: 50,
                    width: "90%",
                    fontSize: 15,
                    fontFamily: "Lato_400Regular",
                  }}
                />
                <Pressable
                  onPress={() => {
                    togglePin();
                  }}
                  style={{
                    paddingVertical: 10,
                    paddingLeft: 10,
                  }}
                >
                  {showPassword ? (
                    <FontAwesome name="eye-slash" size={15} color="#0A62AE" />
                  ) : (
                    <FontAwesome name="eye" size={15} color="#0A62AE" />
                  )}
                </Pressable>
              </View>

              <Pressable
                onPress={() => navigation.push("ForgotPin")}
                style={{
                  alignSelf: "flex-end",
                  marginRight: "5%",
                  marginTop: "5%",
                }}
              >
                <Text
                  style={{
                    color: `${colors.pow_blue}`,
                    textAlign: "right",
                    fontFamily: "Lato_400Regular",
                  }}
                >
                  Forgot Pin?
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={{ width: "100%" }}>
            <TouchableOpacity
              style={styles.signUpButtonView}
              onPress={async () => {
                if (!isValidPhoneNumber) {
                  Alert.alert("Invalid Phone Number");
                  return;
                }
                if (pin.length !== 4) {
                  Alert.alert("Invalid Pin");
                  return;
                }
                setIsLoading(true);
                try {
                  let response = await logIn(phone, pin);
                  if (response.status == 200) {
                    let data = response.data;
                    data.userUID = data.uid;
                    data.phoneNumber = phone;
                    // Update Context vals
                    userData.userUID = data.uid;
                    userData.firstName = data.firstName;
                    userData.lastName = data.lastName;
                    userData.phoneNumber = phone;
                    userData.location_uid = data.location_uid;
                    userData.address = data.address;
                    userData.addressLabel =
                      data.addressLabel === "NA"
                        ? "Home (Default)"
                        : data.addressLabel;
                    userData.addressNotes =
                      data.addressNotes === "NA" ? "" : data.addressNotes;
                    userData.placeID = data.placeID;
                    userData.latlon = {
                      latitude: data.latitude,
                      longitude: data.longitude,
                    };
                    signIn(data);
                  }
                } catch (err) {
                  sentryEx(err);
                  Alert.alert("Log In Error", err.response.data.message);
                  setIsLoading(false);
                  await AsyncStorage.removeItem("pow_key");
                }
              }}
            >
              <Text
                style={[styles.signUpText, { fontFamily: "Lato_400Regular" }]}
              >
                Log In
              </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              <Text
                style={[
                  styles.alreadyHaveAnAccoText,
                  { fontFamily: "Lato_400Regular" },
                ]}
              >
                {"Don't have an Account?  "}
              </Text>
              <Text
                style={[styles.link, { fontFamily: "Lato_400Regular" }]}
                onPress={() => navigation.navigate("SignUp")}
              >
                Sign Up
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  logInTitle: {
    color: colors.pow_black,
    fontSize: 26,
    alignSelf: "flex-start",
  },

  signUpButtonView: {
    backgroundColor: colors.pow_blue,
    borderRadius: 10,
    width: "100%",
    height: 56,
    justifyContent: "space-around",
    marginBottom: "3%",
  },

  signUpText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },

  alreadyHaveAnAccoText: {
    color: "rgb(94, 94, 94)",
    fontSize: 14,
    textAlign: "center",
  },

  link: {
    color: "#0A62AE",
    textAlign: "center",
  },

  cell: {
    width: 60,
    height: 30,
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    borderRadius: 6,
    borderBottomColor: colors.pow_black,
    borderColor: colors.pow_grey,
    borderBottomWidth: 0.5,
    marginHorizontal: "3%",
  },

  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },
});
