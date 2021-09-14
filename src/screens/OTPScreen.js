import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

// Firebase
const firebase = require("firebase/app");
require("firebase/auth");

// Utils
import LoadingScreen from "../utils/LoadingScreen";
import { sentryEx } from "../utils/sentry";

export default function OTPScreen({ navigation, route }) {
  const [isLoading, setLoading] = useState(false);

  const { phoneNumber, verificationId } = route.params;

  const [code, SetCode] = useState("");
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    if (value.split("").length >= 6) {
      SetCode("Done");
    } else {
      SetCode("Resend Code");
    }
  }, [value]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView
      style={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableWithoutFeedback
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        onPress={Keyboard.dismiss}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          enabled
          contentContainerStyle={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 25}
          style={{
            flexGrow: 1,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <View
            style={{ margin: 20, flex: 1, justifyContent: "space-between" }}
          >
            <View style={{ marginTop: "20%" }}>
              <Text style={{ fontSize: 26, fontWeight: "bold" }}>
                Enter the Code
              </Text>
              <Text style={{ paddingTop: 20, fontSize: 15, color: "gray" }}>
                An OTP code has been sent via SMS to your mobile
              </Text>
              <Text style={{ fontSize: 15, color: "gray" }}>
                phone. {phoneNumber} Please enter the code below.
              </Text>
              <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={6}
                rootStyle={styles.codeFiledRoot}
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
            </View>
            <View style={styles.appButtonContainer}>
              <Pressable
                style={{ width: "100%" }}
                onPress={async () => {
                  setLoading(true);

                  try {
                    let credential =
                      firebase.default.auth.PhoneAuthProvider.credential(
                        verificationId,
                        value
                      );
                    await firebase.default
                      .auth()
                      .signInWithCredential(credential);
                    let currentUser = firebase.default.auth().currentUser;

                    if (currentUser) {
                      setLoading(false);
                      navigation.push("ResetPin", {
                        phoneNumber: phoneNumber,
                      });
                    }
                  } catch (err) {
                    setLoading(false);
                    sentryEx(err);
                    Alert.alert(
                      "Verification Error",
                      "Error verifying with Firebase"
                    );
                    navigation.navigate("SignIn");
                  }
                }}
              >
                <Text style={styles.appButtonText}>{code}</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  codeFiledRoot: {
    height: 60,
    marginTop: 30,
    justifyContent: "center",
  },

  cell: {
    marginHorizontal: 8,
    height: 60,
    width: 33,
    lineHeight: 55,
    fontSize: 30,
    textAlign: "center",
    borderRadius: 0,
    color: "black",
    fontWeight: "bold",
    backgroundColor: "#fff",

    // IOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3,
  },

  container: {
    flex: 1,
    padding: 30,
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  innercontainer: {
    alignItems: "flex-start",
  },

  title: {
    paddingTop: 100,
    color: "#000",
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
  },

  subTitle: {
    paddingTop: 30,
    color: "gray",
    textAlign: "left",
  },

  nextButton: {
    alignSelf: "stretch",
    marginTop: 30,
    borderRadius: 5,
    height: 50,
    backgroundColor: "#3557b7",
    justifyContent: "center",
    minWidth: 200,
    marginBottom: 100,
  },

  nextButtonText: {
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
    fontWeight: "300",
  },

  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#0A62AE",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 12,
  },

  appButtonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
});
