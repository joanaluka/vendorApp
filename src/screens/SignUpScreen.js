import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
// Expo
import Constants from "expo-constants";
import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";
// Other
import IntlPhoneInput from "pow-react-native-intl-phone-input";
import DateTimePickerModal from "react-native-modal-datetime-picker";
// Utils & Helpers
import * as colors from "../utils/colors";
import * as Linking from "expo-linking";
// Firebase Auth
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
const firebase = require("firebase/app");
require("firebase/auth");

FIREBASE_WEB_CONFIG = Constants.manifest.extra.FIREBASE_WEB_CONFIG;

Text.defaultProps = {
  allowFontScaling: false,
};

// Sentry (Error Tracking)
import { sentryEx } from "../utils/sentry";

export default function SignUpScreen({ navigation }) {
  const recaptchaVerifier = useRef(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  // latest state additions for react native time picker
  const [showPassword, setShowPassword] = useState(true);
  const [dob, setDob] = useState(new Date());
  const [show, setShow] = useState(false);
  // gender state
  const [gender, setGender] = useState("Gender");
  const [showGender, setShowGender] = useState(false);
  const [datePlaceHolder, setDatePlaceHolder] = useState("Date of birth");
  const genderArray = ["Male", "Female", "Other", "Prefer Not to Say"];
  // Intl Phone Input
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhoneNumber, setValidPhoneNumber] = useState(false);
  const [countryChangeDisabled, setCountryChangeDisabled] = useState(false);

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
      setPhoneNumber(dialCode + "0" + unmaskedPhoneNumber);
    } else {
      setPhoneNumber(dialCode + unmaskedPhoneNumber);
    }
  }

  const [pin, setPin] = useState("");
  const [pinConfirm, setPinConfirm] = useState("");
  const [areTermsAccepted, setAreTermsAccepted] = useState(false);

  // end field code functionality
  const togglePin = () => {
    if (showPassword === true) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);

  // latest sign up additions
  const windowHeight = Dimensions.get("window").height;

  function setCustomerGender(gender) {
    setGender(gender);
    setShowGender(!showGender);
  }

  function handleDobConfirm(date) {
    setDob(date);
    setDatePlaceHolder(date.toLocaleDateString());
    setShow(false);
  }

  function handleDobCancel() {
    setShow(false);
  }

  function handleTerms() {
    Linking.openURL("https://www.powwater.com/terms-of-service/");
  }

  function handleContactUs() {
    try {
      // TODO: update Customer Support phone #
      let supportNumberUrl = "tel://" + "0111718463";
      Linking.openURL(supportNumberUrl);
    } catch (e) {
      sentryEx(e);
    }
  }

  function handlePrivacyPolicy() {
    Linking.openURL("https://www.powwater.com/privacy/");
  }

  const genderContainer = (
    <View
      style={{
        backgroundColor: "#0A62AE",
        position: "absolute",
        top: 40,
        width: "100%",
        zIndex: 11,
        elevation: 11,
      }}
    >
      {genderArray.map((gender, index) => (
        <Pressable onPress={() => setCustomerGender(gender)} key={index}>
          <Text
            style={{
              color: "white",
              paddingHorizontal: 3,
              paddingVertical: 5,
              fontFamily: "Lato_700Bold",
            }}
          >
            {gender}
          </Text>
        </Pressable>
      ))}
    </View>
  );

  const togglegender = showGender === false ? <></> : <>{genderContainer}</>;

  return (
    <ScrollView
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            padding: 20,
            height: windowHeight,
          }}
        >
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={FIREBASE_WEB_CONFIG}
            attemptInvisibleVerification={true}
            appVerificationDisabledForTesting={__DEV__ ? true : false}
            // containerStyle=
            // geolocationEnabled
            onHttpError={(error) => {
              sentryEx(error);
              Alert.alert("Recaptcha Error", "HTTP Error in Web View");
            }}
            mixedContentMode="always"
          />
          <Text
            style={{
              color: colors.pow_black,
              fontSize: 26,
              alignSelf: "flex-start",
              fontFamily: "Lato_700Bold",
            }}
          >
            Sign Up
          </Text>

          <View style={{ width: "100%" }}>
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
                placeholder="First Name"
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
                placeholder="Last Name"
                placeholderTextColor={colors.pow_grey}
                autoCapitalize="words"
                returnKeyType="next"
                onChangeText={(text) => setLastName(text)}
                autoCompleteType="off"
                ref={lastNameRef}
                onSubmitEditing={Keyboard.dismiss}
              />
            </View>

            <View
              style={{
                width: "100%",
                height: 50,
                borderBottomWidth: 1,
                borderBottomColor: colors.pow_black,
              }}
            >
              <View style={{ marginLeft: -13, paddingTop: 5 }}>
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
              </View>
            </View>

            <View
              style={{
                elevation: 10,
                position: "relative",
                zIndex: 10,
                width: "100%",
              }}
            >
              <View style={{ height: 50, width: "100%" }}>
                <View
                  style={{
                    position: "relative",
                    height: "100%",
                    borderBottomColor: colors.pow_black,
                    borderBottomWidth: 1,
                  }}
                >
                  <TouchableOpacity onPress={() => setShowGender(!showGender)}>
                    <TextInput
                      value={gender}
                      placeholder="Gender"
                      editable={false}
                      style={{
                        height: 50,
                        color: `${
                          gender === "Gender"
                            ? colors.pow_grey
                            : colors.pow_black
                        }`,
                        fontSize: 15,
                      }}
                    />
                    <View
                      style={{
                        position: "absolute",
                        right: 0,
                        bottom: 10,
                        transform: [
                          {
                            rotate: `${showGender === true ? "90deg" : "0deg"}`,
                          },
                        ],
                      }}
                    >
                      <View
                        style={{ paddingLeft: showGender === true ? 0 : 10 }}
                      >
                        <FontAwesome
                          name="angle-down"
                          size={24}
                          color="#0A62AE"
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                {togglegender}
              </View>

              <Pressable
                onPress={() => setShow(true)}
                style={{
                  flexDirection: "row",
                  height: 50,
                  borderBottomColor: "black",
                  borderBottomWidth: 1,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text
                    style={{
                      color:
                        datePlaceHolder === "Date of birth" ? "gray" : "black",
                      fontSize: 14.5,
                    }}
                  >
                    {datePlaceHolder}
                  </Text>
                </View>
                <View style={{ paddingVertical: 10, paddingLeft: 10 }}>
                  <Feather name="calendar" size={15} color="#0A62AE" />
                </View>
                <DateTimePickerModal
                  isVisible={show}
                  mode="date"
                  date={dob}
                  display="default"
                  onConfirm={handleDobConfirm}
                  onCancel={handleDobCancel}
                />
              </Pressable>

              <View style={{ height: 50, width: "100%" }}>
                <View
                  style={[
                    styles.innerContainer,
                    {
                      borderBottomColor: colors.pow_black,
                      borderBottomWidth: 1,
                    },
                  ]}
                >
                  <TextInput
                    style={[styles.input, { fontFamily: "Lato_400Regular" }]}
                    onChangeText={(pin) => setPin(pin)}
                    value={pin}
                    placeholder="Create PIN (4 Digit)"
                    secureTextEntry={showPassword}
                    maxLength={4}
                    keyboardType="number-pad"
                    placeholderTextColor={
                      pin.length !== "Create PIN (4 Digit)"
                        ? colors.pow_grey
                        : colors.pow_black
                    }
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
              </View>

              <View style={{ height: 50, width: "100%" }}>
                <View
                  style={[
                    styles.innerContainer,
                    {
                      borderBottomColor: colors.pow_black,
                      borderBottomWidth: 1,
                    },
                  ]}
                >
                  <TextInput
                    onChangeText={(pinConfirm) => setPinConfirm(pinConfirm)}
                    value={pinConfirm}
                    placeholder="Confirm PIN"
                    secureTextEntry={showPassword}
                    maxLength={4}
                    keyboardType="number-pad"
                    placeholderTextColor={
                      pinConfirm.length !== "Confirm PIN"
                        ? colors.pow_grey
                        : colors.pow_black
                    }
                    style={[styles.input, { fontFamily: "Lato_400Regular" }]}
                  />
                  <Pressable
                    style={{ paddingVertical: 10, paddingLeft: 10 }}
                    onPress={() => {
                      togglePin();
                    }}
                  >
                    {showPassword ? (
                      <FontAwesome name="eye-slash" size={15} color="#0A62AE" />
                    ) : (
                      <FontAwesome name="eye" size={15} color="#0A62AE" />
                    )}
                  </Pressable>
                </View>
              </View>
            </View>

            <View style={styles.appCheckBoxContainer}>
              <View style={styles.checkboxContainer}>
                <Pressable
                  style={[styles.checkboxBase, areTermsAccepted]}
                  onPress={() => setAreTermsAccepted(!areTermsAccepted)}
                >
                  {areTermsAccepted && (
                    <Ionicons
                      name="checkmark"
                      size={17}
                      color={colors.pow_blue}
                    />
                  )}
                </Pressable>
                <Text style={styles.termsContainer}>
                  <Text
                    style={styles.checkboxLabel}
                  >{`By checking this box you agree to our `}</Text>
                  <Text
                    onPress={() => handleTerms()}
                    style={styles.checkboxLabelBold}
                  >{`Terms of Service`}</Text>
                  <Text style={styles.checkboxLabel}>{` and`}</Text>
                  <Text
                    onPress={() => handlePrivacyPolicy()}
                    style={styles.checkboxLabelBold}
                  >{` Privacy Policy`}</Text>
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              justifyContent: "flex-end",
              alignContent: "stretch",
              alignItems: "center",
              width: "100%",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={styles.signUpButton}
              onPress={async () => {
                // validate the registration inputs
                if (firstName === null || firstName === "") {
                  Alert.alert("First Name cannot be empty");
                  return;
                }

                if (lastName === null || lastName === "") {
                  Alert.alert("Last Name cannot be empty");
                  return;
                }

                if (!isValidPhoneNumber) {
                  Alert.alert("Invalid Phone Number");
                  return;
                }

                if (gender === "Gender") {
                  Alert.alert("Gender cannot be empty");
                  return;
                }

                if (datePlaceHolder === "Date of birth") {
                  Alert.alert("Date of birth cannot be empty");
                  return;
                }

                if (pin.length !== 4) {
                  Alert.alert("Invalid Pin");
                  return;
                }

                if (pin !== pinConfirm) {
                  Alert.alert("The pins do not match");
                  return;
                }

                if (areTermsAccepted !== true) {
                  Alert.alert(
                    "Terms of Service and Privacy Policy must be accepted"
                  );
                  return;
                }

                try {
                  const phoneProvider =
                    new firebase.default.auth.PhoneAuthProvider();
                  const verificationId = await phoneProvider.verifyPhoneNumber(
                    phoneNumber,
                    recaptchaVerifier.current
                  );
                  navigation.navigate("Verification", {
                    firstName: firstName,
                    lastName: lastName,
                    phoneNumber: phoneNumber,
                    gender: gender,
                    dob: dob.toISOString(),
                    pin: pin,
                    verificationId: verificationId,
                  });
                } catch (err) {
                  sentryEx(err);
                  Alert.alert(
                    "Firebase Phone Auth Error",
                    err.response.data.message
                  );
                }
              }}
            >
              <Text
                style={[styles.signUpText, { fontFamily: "Lato_400Regular" }]}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  marginTop: "3%",
                }}
              >
                <Text
                  style={[
                    styles.alreadyHaveAnAccoText,
                    { fontFamily: "Lato_400Regular" },
                  ]}
                >
                  {"Already have an Account?  "}
                </Text>
                <Text
                  style={[styles.link, { fontFamily: "Lato_400Regular" }]}
                  onPress={() => navigation.goBack()}
                >
                  Log In
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  marginTop: "3%",
                }}
              >
                <Text
                  style={[
                    styles.alreadyHaveAnAccoText,
                    { fontFamily: "Lato_400Regular" },
                  ]}
                >
                  {"Trouble signing up? "}
                </Text>
                <Text
                  style={[styles.link, { fontFamily: "Lato_400Regular" }]}
                  onPress={() => handleContactUs()}
                >
                  Contact us
                </Text>
              </View>
              <FirebaseRecaptchaBanner
                textStyle={{
                  textAlign: "center",
                  fontSize: 8,
                  paddingTop: 5,
                }}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  signUpButton: {
    backgroundColor: colors.pow_blue,
    borderRadius: 10,
    width: "100%",
    height: 50,
    justifyContent: "center",
  },

  signUpText: {
    color: "white",
    fontSize: 21,
    textAlign: "center",
  },

  alreadyHaveAnAccoText: {
    color: "rgb(94, 94, 94)",
    textAlign: "center",
    fontSize: 13,
  },

  link: {
    color: colors.pow_blue,
    textAlign: "center",
    fontSize: 13,
  },

  appCheckBoxContainer: {
    alignItems: "center",
    marginTop: 15,
    width: "100%",
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },

  termsContainer: {
    marginLeft: 5,
    marginTop: 6,
    paddingRight: 15,
  },

  checkboxLabel: {
    marginLeft: 8,
    fontSize: 13,
  },

  checkboxLabelBold: {
    marginLeft: 8,
    fontWeight: "bold",
    fontSize: 14,
    color: colors.pow_blue,
  },

  checkboxBase: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: "transparent",
    borderColor: "#0A62AE",
  },

  // codefield styles
  cell: {
    width: 60,
    height: 30,
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginHorizontal: "3%",
    borderRadius: 6,
    borderBottomColor: colors.pow_black,
    borderColor: colors.pow_grey,
    borderBottomWidth: 0.5,
  },

  innercontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  error: {
    color: "red",
  },

  textInput: {
    textAlign: "left",
    width: "100%",
    height: "100%",
    fontSize: 15,
  },

  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },

  input: {
    width: "80%",
    height: "100%",
    fontSize: 15,
  },
});
