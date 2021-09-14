// React & React-Native
import React, { useRef, useState } from 'react';
import { Alert, Keyboard, View, StyleSheet, Text, Pressable, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
// Expo
import Constants from "expo-constants";
import IntlPhoneInput from 'pow-react-native-intl-phone-input';

// Firebase
const FIREBASE_WEB_CONFIG = Constants.manifest.extra.FIREBASE_WEB_CONFIG;
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
const firebase = require("firebase/app");
require("firebase/auth");

// Utils
import * as colors from "../utils/colors";

// Sentry (Error Tracking)
import { sentryEx } from '../utils/sentry'

export default function ForgotPinScreen({ navigation }) {
  const [isLoading, setLoading] = useState(false);

  // Firebase Recaptcha Verification
  const recaptchaVerifier = useRef(null);
  const [verificationId, setVerificationId] = useState();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhoneNumber, setValidPhoneNumber] = useState(false);
  const [countryChangeDisabled, setCountryChangeDisabled] = useState(false);
  const [hideButton, setHide] = useState(true)
  // start phone input feature
  function onChangeText({ dialCode, unmaskedPhoneNumber, phoneNumber, isVerified }) {
    if (unmaskedPhoneNumber !== '') {
      setCountryChangeDisabled(true)
      setHide(false)
    } else {
      setCountryChangeDisabled(false)
      setHide(true)
    }
    setValidPhoneNumber(isVerified)
    if (dialCode === "+254") {
      setPhoneNumber(dialCode + "0" + unmaskedPhoneNumber)
    } else {
      setPhoneNumber(dialCode + unmaskedPhoneNumber)
    }
  };

  const NextButton = (verificationId) => {
    if (hideButton) {
      return (
        <View />
      )
    } else {
      return (
        <View style={styles.appButtonContainer}>
          <Pressable
            style={{ width: '100%' }}
            onPress={async () => {
              if (!isValidPhoneNumber) {
                Alert.alert("Invalid Phone Number")
                return
              }

              try {
                const phoneProvider = new firebase.default.auth.PhoneAuthProvider();
                const verificationId = await phoneProvider.verifyPhoneNumber(
                  phoneNumber,
                  recaptchaVerifier.current
                );
                setVerificationId(verificationId);
                navigation.push("OTP", {
                  phoneNumber: phoneNumber,
                  verificationId: verificationId
                })
              } catch (err) {
                sentryEx(err)
                setLoading(false);
                Alert.alert(
                  "Error Sending OTP",
                  err.response.data.message
                )
                setPhoneNumber()
                setVerificationId()
              }
            }}>
            <Text style={styles.appButtonText}>Next</Text>
          </Pressable>
        </View>
      )
    }
  }

  return (
    <SafeAreaView
      style={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: 'center'
      }}>
      <TouchableWithoutFeedback style={{ flex: 1, justifyContent: "center", alignItems: "center" }} onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          enabled
          contentContainerStyle={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 25}
          style={{
            flexGrow: 1,
            justifyContent: "space-around",
            alignItems: "center"
          }}>
          <View style={{ margin: 20, flex: 1, justifyContent: 'space-between' }}>
            <FirebaseRecaptchaVerifierModal
              ref={recaptchaVerifier}
              firebaseConfig={FIREBASE_WEB_CONFIG}
              appVerificationDisabledForTesting={__DEV__ ? true : false}
              attemptInvisibleVerification={true}
            //TODO: Confirm other verifcation option
            // verify={true}
            />
            <View style={{ marginTop: "20%" }}>
              <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Forgot Pin</Text>
              <Text style={{ paddingTop: 30, fontSize: 15, color: 'gray', textAlign: "center" }}>
                Please enter your phone number. You will recieve an OTP via SMS
              </Text>
              <View style={styles.IntlPhoneInput}>
                <IntlPhoneInput
                  lang="EN"
                  placeholder="712 345678"
                  defaultCountry="KE"
                  onChangeText={onChangeText}
                  disableCountryChange={countryChangeDisabled}
                  phoneInputStyle={{
                    // borderBottomWidth: 1,
                    fontSize: 15,
                    // letterSpacing: 0.5,
                  }}
                  dialCodeTextStyle={{ width: 0 }} // Hides Country Code
                />
              </View>
              <View style={{ backgroundColor: 'gray', height: 0.7 }} />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignSelf: "center"
              }}>
              <NextButton
                verificationId={verificationId}
              />
            </View>
            <FirebaseRecaptchaBanner />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  IntlPhoneInput: {
    borderBottomColor: 'gray',
  },
  pleaseEnter: {
    fontSize: 18,
    color: 'blue',
  },
  appButtonContainer: {
    justifyContent: "space-evenly",
    // paddingVertical: 15,
    // paddingHorizontal: 12
    backgroundColor: colors.pow_blue,
    borderRadius: 10,
    width: 307,
    height: 56,
  },
  appButtonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
});