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
// Expo
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
// import Toast from "react-native-root-toast"
// Other
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
// API
import { resetPin } from "../utils/api";
// Utils
import * as colors from "../utils/colors";
import LoadingScreen from "../utils/LoadingScreen";
import { sentryEx } from "../utils/sentry";

export default function ResetPinScreen({ navigation, route }) {
  const [isLoading, setLoading] = useState(false);

  const { phoneNumber } = route.params;

  // Masked Pin Code
  const CELL_COUNT = 4;
  const [enableMask, setEnableMask] = useState(true);
  const toggleMask = () => setEnableMask((f) => !f);
  const [pin, setPin] = useState("");
  const [pinConfirm, setPinConfirm] = useState("");
  const ref = useBlurOnFulfill({ pin, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    pin,
    setPin,
  });

  const renderCell = ({ index, symbol, isFocused }) => {
    let textChild = null;

    if (symbol) {
      textChild = enableMask ? "•" : symbol;
    } else if (isFocused) {
      textChild = <Cursor delay={5000} />;
    }

    return (
      <View
        key={index}
        style={[styles.cell, isFocused]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        <Text style={[styles.cell, isFocused]}>{textChild}</Text>
      </View>
    );
  };

  const reff = useBlurOnFulfill({ pinConfirm, cellCount: CELL_COUNT });
  const [propss, getCellOnLayoutHandlers] = useClearByFocusCell({
    pinConfirm,
    setPinConfirm,
  });

  const renderCellConfirm = ({ index, symbol, isFocused }) => {
    let textChild = null;

    if (symbol) {
      textChild = enableMask ? "•" : symbol;
    } else if (isFocused) {
      textChild = <Cursor delay={5000} />;
    }

    return (
      <View
        key={index}
        style={[styles.cell, isFocused]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        <Text style={[styles.cell, isFocused]}>{textChild}</Text>
      </View>
    );
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView
      style={{
        // flexGrow: 1,
        // justifyContent: "space-between",
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
          style={
            {
              // flexGrow: 1,
              // justifyContent: "center",
              // alignItems: "center"
            }
          }
        >
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <View>
              <Text style={{ fontSize: 26, fontWeight: "bold" }}>
                Reset Pin
              </Text>
              <Text style={{ paddingTop: 20, fontSize: 15, color: "gray" }}>
                Please choose a new pin to use for signing in.
              </Text>
            </View>
            <View style={styles.pincontainer}>
              <Text style={styles.title}>New Pin</Text>
              <View style={styles.innercontainer}>
                <CodeField
                  ref={ref}
                  {...props}
                  value={pin}
                  onChangeText={setPin}
                  cellCount={CELL_COUNT}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  renderCell={renderCell}
                />
                <Pressable onPress={toggleMask}>
                  {enableMask ? (
                    <FontAwesome5
                      name="eye-slash"
                      size={15}
                      color={colors.pow_blue}
                    />
                  ) : (
                    <FontAwesome5
                      name="eye"
                      size={15}
                      color={colors.pow_blue}
                    />
                  )}
                </Pressable>
              </View>
            </View>
            <View style={styles.pincontainer}>
              <Text style={styles.title}>Confirm Pin</Text>
              <View style={styles.innercontainer}>
                <CodeField
                  ref={reff}
                  {...propss}
                  value={pinConfirm}
                  onChangeText={setPinConfirm}
                  cellCount={CELL_COUNT}
                  rootStyle={styles.codeFiledRoot}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  renderCell={renderCellConfirm}
                />
                <Pressable onPress={toggleMask}>
                  {enableMask ? (
                    <FontAwesome5
                      name="eye-slash"
                      size={15}
                      color={colors.pow_blue}
                    />
                  ) : (
                    <FontAwesome5
                      name="eye"
                      size={15}
                      color={colors.pow_blue}
                    />
                  )}
                </Pressable>
              </View>
            </View>
            <View style={styles.appButtonContainer}>
              <Pressable
                onPress={async () => {
                  setLoading(true);
                  try {
                    let response = await resetPin(phoneNumber, pin);

                    if (response.status == 200) {
                      setLoading(false);
                      navigation.navigate("LogIn");
                    }
                  } catch (err) {
                    sentryEx(err);
                    Alert.alert("Reset Pin Error", "Error resetting pin");
                    setLoading(false);
                  }
                }}
              >
                <Text style={styles.appButtonText}>Submit</Text>
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
  },

  title: {
    color: "#000",
    fontWeight: "700",
  },

  appButtonContainer: {
    // elevation: 8,
    backgroundColor: "#0A62AE",
    borderRadius: 10,
    paddingVertical: 15,
    // paddingHorizontal: 12
  },

  appButtonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },

  cell: {
    width: 45,
    height: 45,
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginLeft: "1%",
    marginRight: "3%",
    borderRadius: 6,
    borderBottomColor: colors.pow_black,
    borderColor: colors.pow_grey,
    borderBottomWidth: 0.5,
  },
  pincontainer: {
    // flex: .25,
    // flex: 1,
    // marginVertical: "3%",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "flex-start",
    alignSelf: "flex-start",
  },
  dark: {
    color: "blue",
  },
  innercontainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
  },
});
