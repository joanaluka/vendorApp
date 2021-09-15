// MUST import at TOP of Entry File (e.g. `App.js`) for `React Navigation`
import "react-native-gesture-handler";
// Suggested (although not required)
//  - Ref: https://medium.com/geekculture/optimize-react-native-performance-and-development-experience-fd77a8a25120
import { enableScreens } from "react-native-screens";
enableScreens();


// REQUIRED for Toasts (react-native-root-toast)
// import { RootSiblingParent } from 'react-native-root-siblings';

// React & React-Native
import React, {
  useEffect,
  useState,
  useContext,
  useMemo,
  useRef,
  useReducer,
} from "react";
import { Alert, Pressable, Text, View, TouchableOpacity } from "react-native";

// Expo
import Constants from "expo-constants";
import * as Device from "expo-device";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import {
  getTrackingPermissionsAsync,
  requestTrackingPermissionsAsync,
} from "expo-tracking-transparency";
import AsyncStorage from "@react-native-async-storage/async-storage";
// console.log("APP Async: ", showAsyncStorageContentInDev());
import * as Location from "expo-location";
// Set Maps API Key
Location.setGoogleApiKey(Constants.manifest.extra.mapsApiKey);
Location.installWebGeolocationPolyfill();
import * as Updates from "expo-updates";
import * as Analytics from "expo-firebase-analytics";
// Fonts (Google) w/ expo-font
import {
  useFonts,
  Lato_100Thin,
  Lato_100Thin_Italic,
  Lato_300Light,
  Lato_300Light_Italic,
  Lato_400Regular,
  Lato_400Regular_Italic,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
  Lato_900Black_Italic,
} from "@expo-google-fonts/lato";

const devEnv = Constants.manifest.extra.devEnv;

if (__DEV__) {
  console.log("DEV ENVIRONMENT: ", devEnv);
  // Hide Firebase Warning (unavailable in Expo Go)
  Analytics.setUnavailabilityLogging(false);
} else if (__DEV__ && devEnv !== "DEV") {
  console.warn(
    "DEV ENVIRONMENT SET INCORRECTLY \n Development Environment should be 'DEV', but is set to ",
    devEnv
  );
}

// Initialize Firebase JS SDK
import { firebaseInit } from "./src/utils/firebase";

// Global setting for Font Scaling
Text.defaultProps = {
  allowFontScaling: false,
};

// React-Navigation
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

/// SCREENS ///
// Auth //
import SignUpScreen from "./src/screens/SignUpScreen";
import VerificationScreen from "./src/screens/VerificationScreen";
import LoginScreen from "./src/screens/LoginScreen";
import ForgotPinScreen from "./src/screens/ForgotPinScreen";
import OTPScreen from "./src/screens/OTPScreen";
import ResetPinScreen from "./src/screens/ResetPinScreen";
// Sidebar Menu (Main) /
// Other //

// Utils & Helpers
import * as colors from "./src/utils/colors";
import SplashScreen from "./src/screens/SplashScreen";

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
    border: "white",
  },
};

import { sentryInit, sentryEx, sentryUser } from "./src/utils/sentry";
import { Native } from "sentry-expo";

// Sentry (Error Tracking)
try {
  sentryInit();
} catch (err) {
  if (__DEV__) {
    console.log(err);
  }
}

// CONTEXT
import AuthContext from "./src/context/AuthContext";
import Activity from "./src/screens/Activity";
import Inventory from "./src/screens/Inventory";
import OrderPendingDetails from "./src/screens/OrderDetails/OrderPendingDetails";
import OrderPreparingDetails from "./src/screens/OrderDetails/OrderPreparing";
import Home from "./src/screens/Home";
import Wallet from "./src/screens/Wallet";
import Help from "./src/screens/Help";
import SuccessfulOrder from "./src/screens/OrderDetails/SuccessfulOrder";
import ApprovalStatus from "./src/screens/OrderDetails/ApprovalStatus";
import DeclineReason from "./src/screens/OrderDetails/DeclineReason";
import OrderInProgressDetails from "./src/screens/OrderDetails/OrderInProgressDetails";

export default function App({ navigation }) {
  // Check for Published Updates
  useEffect(() => {
    if (!__DEV__) {
      (async () => {
        try {
          const update = await Updates.checkForUpdateAsync();
          if (update.isAvailable) {
            let response = await Updates.fetchUpdateAsync();
            setTimeout(() => {
              Updates.reloadAsync();
            }, 5000);
          }
        } catch (error) {
          sentryEx(error);
        }
      })();
    }
  }, []);

  // Initialize Firebase
  firebaseInit();

  // Screen Tracking
  const navigationRef = useRef();
  const routeNameRef = useRef();
  const [currentRoute, setCurrentRoute] = useState();

  // Check & Request Tracking Transparency (iOS Only)
  if (Device.osName === "iOS") {
    useEffect(() => {
      (async () => {
        try {
          const { granted } = await getTrackingPermissionsAsync();
          if (granted === false) {
            const { status } = await requestTrackingPermissionsAsync();
            if (status !== "granted" || status === "denied") {
              Alert.alert(
                "Tracking Services Disabled",
                "Tracking Services are required. Powwater tracks usage and device info to find bugs and improve performance. Your data is never shared.",
                [],
                { cancelable: false }
              );
            }
          }
        } catch (error) {
          sentryEx(error);
        }
      })();
    }, []);
  }

  const emptyUserData = {
    userUID: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    placeID: "",
    location_uid: "",
    address: "",
    addressLabel: "",
    addressNotes: "",
    latlon: {
      latitude: "",
      longitude: "",
    },
    city: "",
    region: "",
  };

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        // Sentry User phone #
        sentryUser(data.phoneNumber);

        // Firebase Analytics User ID & Properties
        await Analytics.setUserId(data.userUID);
        await Analytics.setUserProperties({
          name: data.firstName + " " + data.lastName,
          phone: data.phoneNumber,
        });

        data.latlon = {
          latitude: data.latitude,
          longitude: data.longitude,
        };

        await AsyncStorage.setItem("pow_key", JSON.stringify(data));

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
      signOut: async () => {
        sentryUser(true);
        // Remove token from Async storage
        await AsyncStorage.removeItem("pow_key");

        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (data) => {
        sentryUser(data.phoneNumber);

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
      userData: emptyUserData,
      orderData: {
        refreshOrders: false,
      },
      userCart: {
        clickedBottle: null,
        subtotalPrice: 0,
        10: {
          Dispenser: 0,
          Jerrycan: 0,
          PET: 0,
          Refill: 0,
        },
        18.9: {
          Dispenser: 0,
          Jerrycan: 0,
          PET: 0,
          Refill: 0,
        },
        20: {
          Dispenser: 0,
          Jerrycan: 0,
          PET: 0,
          Refill: 0,
        },
        totalItems: 0,
      },
      device: Device,
    }),
    []
  );

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: action.isLoading,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            userData: {
              address: action.address,
              location: action.location,
            },
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            userData: {},
            userCart: {},
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        let userDataAsync = await AsyncStorage.getItem("pow_key");

        if (userDataAsync === null) {
          authContext.userData = emptyUserData;
          userToken = null;
        } else {
          let data = JSON.parse(userDataAsync);

          // Update Context vals
          authContext.userData.userUID = data.userUID;
          authContext.userData.firstName = data.firstName;
          authContext.userData.lastName = data.lastName;
          authContext.userData.phoneNumber = data.phoneNumber;
          authContext.userData.location_uid = data.location_uid;
          authContext.userData.address = data.address;
          authContext.userData.addressLabel = data.addressLabel;
          authContext.userData.addressNotes = data.addressNotes;
          authContext.userData.placeID = data.placeID;
          authContext.userData.latlon = {
            latitude: data.latlon.latitude,
            longitude: data.latlon.longitude,
          };

          // Sentry User phone #
          sentryUser(data.phoneNumber);

          // Firebase Analytics User ID & Properties
          await Analytics.setUserId(data.uid);
          await Analytics.setUserProperties({
            name: data.firstName + " " + data.lastName,
            phone: data.phoneNumber,
          });

          userToken = "dummy-auth-token";
        }
      } catch (err) {
        sentryEx(err);
        await AsyncStorage.removeItem("pow_key");
        userToken = null;
      }

      setTimeout(() => {
        dispatch({ type: "RESTORE_TOKEN", token: userToken, isLoading: false });
      }, 3000);
    };

    (async () => {
      await bootstrapAsync();
    })();
  }, []);

  const DrawerMenu = (props) => {
    const { userData, signOut } = useContext(AuthContext);

    // Keep only desired Side Bar Menu items
    const sideBarItems = [
      "Home",
      "Wallet",
      "Order History",
      "Help",
      "Inventory",
    ];
    const { state, ...rest } = props;
    const newState = { ...state };
    newState.routes = newState.routes.filter(
      (item) => sideBarItems.indexOf(item.name) !== -1
    );

    let displayAddress;

    try {
      if (userData.address !== null) {
        displayAddress =
          userData.address.split(", ")[1] +
          ", " +
          userData.address.split(", ")[2];
      }
    } catch (err) {
      sentryEx(err);
      displayAddress = "";
    }

    return (
      <>
        <View
          style={{
            flexGrow: 0.15,
            paddingTop: "10%",
            backgroundColor: colors.pow_blue,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "stretch",
            alignSelf: "flex-end",
            paddingHorizontal: "5%",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: 50,
              height: 50,
              borderRadius: 50 / 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("./assets/images/water.jpg")}
              style={{ width: 50, height: 50, borderRadius: 50 }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              BrookSide Water
            </Text>
            <Text
              style={{
                color: "white",
                textAlign: "center",
                lineHeight: 20,
                paddingTop: "5%",
              }}
            >
              Sidiriya Mombasa
              {/* {displayAddress} */}
            </Text>
          </View>
          <Feather
            name="x"
            size={30}
            color="white"
            onPress={() => props.navigation.closeDrawer()}
          />
        </View>
        <DrawerContentScrollView
          {...rest}
          contentInsetAdjustmentBehavior="never"
          contentContainerStyle={{
            paddingTop: 0,
          }}
        >
          <DrawerItemList
            labelStyle={{
              fontWeight: "bold",
            }}
            state={newState}
            {...rest}
          />
        </DrawerContentScrollView>
        <Pressable
          onPress={signOut}
          style={{
            left: "5%",
            bottom: "5%",
            fontWeight: "bold",
          }}
        >
          <Text
            style={{
              left: "5%",
              bottom: "5%",
              fontWeight: "bold",
            }}
          >
            Log Out
          </Text>
        </Pressable>
      </>
    );
  };

  let [fontsLoaded] = useFonts({
    Lato_100Thin,
    Lato_100Thin_Italic,
    Lato_300Light,
    Lato_300Light_Italic,
    Lato_400Regular,
    Lato_400Regular_Italic,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
    Lato_900Black_Italic,
  });

  return (
    <Native.TouchEventBoundary>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <AuthContext.Provider value={authContext}>
          <NavigationContainer
            theme={AppTheme}
            ref={navigationRef}
            onReady={() =>
              (routeNameRef.current =
                navigationRef.current.getCurrentRoute().name)
            }
            onStateChange={async () => {
              const previousRouteName = routeNameRef.current;
              const currentRouteName =
                navigationRef.current.getCurrentRoute().name;

              if (previousRouteName !== currentRouteName) {
                setCurrentRoute(currentRouteName);
                Analytics.setCurrentScreen(currentRouteName);
                // console.log("ROUTE NAME: ", currentRouteName)
                if (currentRouteName === "Home") {
                  // setVendorRoute(true);
                } else {
                  // setVendorRoute(false);
                }
              }
              // Save the current route name for later comparison
              routeNameRef.current = currentRouteName;
            }}
          >
            {state.isLoading ? (
              // We haven't finished checking for the token yet
              <Stack.Navigator>
                <Stack.Screen
                  name="Splash"
                  options={{ headerShown: false }}
                  component={SplashScreen}
                />
              </Stack.Navigator>
            ) : state.userToken == null ? (
              // No token found, user isn't signed in
              <Stack.Navigator initialRouteName="LogIn">
                <Stack.Screen
                  name="LogIn"
                  component={LoginScreen}
                  options={{
                    headerTitle: null,
                    animationEnabled: false,
                    stackAnimation: "none",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="SignUp"
                  component={SignUpScreen}
                  options={{
                    headerTitle: null,
                    animationEnabled: false,
                    stackAnimation: "none",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Verification"
                  component={VerificationScreen}
                  options={{
                    headerTitle: null,
                    animationEnabled: false,
                    stackAnimation: "none",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="ForgotPin"
                  component={ForgotPinScreen}
                  options={{
                    headerTitle: null,
                    animationEnabled: false,
                    stackAnimation: "none",
                    headerShown: true,
                  }}
                />
                <Stack.Screen
                  name="OTP"
                  component={OTPScreen}
                  options={{
                    headerTitle: null,
                    animationEnabled: false,
                    stackAnimation: "none",
                    headerShown: true,
                  }}
                />
                <Stack.Screen
                  name="ResetPin"
                  component={ResetPinScreen}
                  options={{
                    headerTitle: null,
                    animationEnabled: false,
                    stackAnimation: "none",
                    headerShown: true,
                  }}
                />
              </Stack.Navigator>
            ) : (
              // User is signed in
              <Drawer.Navigator
                statusBarAnimation="none"
                drawerContent={(props) => <DrawerMenu {...props} />}
                drawerContentOptions={{
                  activeTintColor: colors.pow_blue,
                  contentContainerStyle: {
                    paddingTop: 0,
                  },
                }}
                screenOptions={{
                  headerTitleAlign: "center",
                  headerStyle: {
                    borderBottomWidth: 0,
                    elevation: 0,
                  },
                }}
              >
                <Drawer.Screen
                  name="Home"
                  component={Home}
                  options={({ navigation }) => ({
                    drawerIcon: () => (
                      <Feather name="home" size={24} color="black" />
                    ),
                    headerShown: true,
                    headerTitle: null,
                    headerStyle: {
                      borderBottomColor: "transparent",
                      borderBottomWidth: 0,
                      elevation: 0,
                    },
                    headerRight: () => (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          paddingRight: 10,
                        }}
                        onPress={() => navigation.navigate("Help")}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            marginRight: 5,
                            color: "#3A8ED6",
                            fontFamily: "Lato_400Regular",
                          }}
                        >
                          Contact Us
                        </Text>
                        <AntDesign name="user" size={15} color="#3A8ED6" />
                      </TouchableOpacity>
                    ),
                  })}
                />
                <Drawer.Screen
                  name="Wallet"
                  component={Wallet}
                  options={({ navigation }) => ({
                    drawerIcon: () => (
                      <Feather name="credit-card" size={24} color="black" />
                    ),
                    headerLeft: () => (
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                          <AntDesign
                            name="arrowleft"
                            size={24}
                            color="#3A8ED6"
                            style={{ marginLeft: 5, marginTop: 5 }}
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            fontFamily: "Lato_400Regular",
                            marginLeft: 5,
                          }}
                        >
                          Wallet
                        </Text>
                      </View>
                    ),
                    headerShown: true,
                    headerTitle: "",
                  })}
                />
                <Drawer.Screen
                  name="Order History"
                  component={Activity}
                  options={({ navigation }) => ({
                    drawerIcon: () => (
                      <Feather name="clipboard" size={24} color="black" />
                    ),
                    headerShown: true,
                    headerTitle: " ",
                    headerRight: () => (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate("Help")}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          paddingRight: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            marginRight: 5,
                            color: "#3A8ED6",
                            fontFamily: "Lato_400Regular",
                          }}
                        >
                          Contact Us
                        </Text>
                        <AntDesign name="user" size={15} color="#3A8ED6" />
                      </TouchableOpacity>
                    ),
                  })}
                />
                <Drawer.Screen
                  name="Inventory"
                  component={Inventory}
                  options={({ navigation }) => ({
                    drawerIcon: () => (
                      <Feather name="folder" size={24} color="black" />
                    ),
                    headerLeft: () => (
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                          <AntDesign
                            name="arrowleft"
                            size={24}
                            color="#3A8ED6"
                            style={{ marginLeft: 5, marginTop: 5 }}
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            fontFamily: "Lato_400Regular",
                            marginLeft: 5,
                          }}
                        >
                          Inventory
                        </Text>
                      </View>
                    ),
                    headerShown: true,
                    headerTitle: "",
                  })}
                />
                <Drawer.Screen
                  name="Help"
                  component={Help}
                  options={({ navigation }) => ({
                    drawerIcon: () => (
                      <Ionicons
                        name="help-circle-outline"
                        size={24}
                        color="black"
                      />
                    ),
                    headerLeft: () => (
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                          <AntDesign
                            name="arrowleft"
                            size={24}
                            color="#3A8ED6"
                            style={{ marginLeft: 5, marginTop: 5 }}
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            fontFamily: "Lato_400Regular",
                            marginLeft: 5,
                          }}
                        >
                          Help
                        </Text>
                      </View>
                    ),
                    headerShown: true,
                    headerTitle: "",
                  })}
                />

                <Drawer.Screen
                  name="DelineReason"
                  component={DeclineReason}
                  options={({ navigation }) => ({
                    drawerIcon: () => (
                      <Feather name="clipboard" size={24} color="black" />
                    ),
                    headerLeft: () => (
                      <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                          <AntDesign
                            name="close"
                            size={24}
                            color="#3A8ED6"
                            style={{ marginLeft: 5, marginTop: 5 }}
                          />
                        </TouchableOpacity>
                      </View>
                    ),
                    headerShown: true,
                    headerTitle: "",
                  })}
                />

                <Drawer.Screen
                  name="OrderPending"
                  component={OrderPendingDetails}
                  options={({ navigation }) => ({
                    drawerIcon: () => (
                      <Feather name="clipboard" size={24} color="black" />
                    ),
                    headerLeft: () => (
                      <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                          <AntDesign
                            name="close"
                            size={24}
                            color="#3A8ED6"
                            style={{ marginLeft: 5, marginTop: 5 }}
                          />
                        </TouchableOpacity>
                        <View style={{ marginLeft: 10 }}>
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: 20,
                              fontFamily: "Lato_400Regular",
                            }}
                          >
                            Order Details
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: "Lato_400Regular",
                            }}
                          >
                            Martin Chezo, Sidiriya, Mombasa
                          </Text>
                        </View>
                      </View>
                    ),
                    headerShown: true,
                    headerTitle: "",
                  })}
                />

                <Drawer.Screen
                  name="ApprovalStatus"
                  component={ApprovalStatus}
                  options={({ navigation }) => ({
                    drawerIcon: () => (
                      <Feather name="clipboard" size={24} color="black" />
                    ),
                    headerLeft: () => (
                      <View style={{ flexDirection: "row" }}>
                        <AntDesign name="arrowleft" size={24} color="#3A8ED6" />
                      </View>
                    ),
                    headerShown: true,
                    headerTitle: "",
                    headerRight: () => (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate("Help")}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          paddingRight: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            marginRight: 5,
                            color: "#3A8ED6",
                            fontFamily: "Lato_400Regular",
                          }}
                        >
                          Contact Us
                        </Text>
                        <AntDesign name="user" size={15} color="#3A8ED6" />
                      </TouchableOpacity>
                    ),
                  })}
                />

                <Drawer.Screen
                  name="SuccessfulOrder"
                  component={SuccessfulOrder}
                  options={({ navigation }) => ({
                    drawerIcon: () => (
                      <Feather name="clipboard" size={24} color="black" />
                    ),
                    headerLeft: () => (
                      <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                          <AntDesign
                            name="close"
                            size={24}
                            color="#3A8ED6"
                            style={{ marginLeft: 5, marginTop: 5 }}
                          />
                        </TouchableOpacity>
                        <View style={{ marginLeft: 10 }}>
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: 20,
                              fontFamily: "Lato_400Regular",
                            }}
                          >
                            Order Details
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: "Lato_400Regular",
                            }}
                          >
                            Martin Chezo, Sidiriya, Mombasa
                          </Text>
                        </View>
                      </View>
                    ),
                    headerShown: true,
                    headerTitle: "",
                    headerRight: () => (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          paddingRight: 10,
                        }}
                        onPress={() => navigation.navigate("Help")}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            marginRight: 5,
                            color: "#3A8ED6",
                            fontFamily: "Lato_400Regular",
                          }}
                        >
                          Contact Us
                        </Text>
                        <AntDesign name="user" size={15} color="#3A8ED6" />
                      </TouchableOpacity>
                    ),
                  })}
                />
                <Stack.Screen
                  name="OrderInProgress"
                  component={OrderInProgressDetails}
                  options={({ navigation }) => ({
                    drawerIcon: () => (
                      <Feather name="clipboard" size={24} color="black" />
                    ),
                    headerLeft: () => (
                      <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                          <AntDesign
                            name="close"
                            size={24}
                            color="#3A8ED6"
                            style={{ marginLeft: 5, marginTop: 5 }}
                          />
                        </TouchableOpacity>
                        <View style={{ marginLeft: 10 }}>
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: 20,
                              fontFamily: "Lato_400Regular",
                            }}
                          >
                            Order Details
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: "Lato_400Regular",
                            }}
                          >
                            Martin Chezo, Sidiriya, Mombasa
                          </Text>
                        </View>
                      </View>
                    ),
                    headerShown: true,
                    headerTitle: "",
                    headerRight: () => (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          paddingRight: 10,
                        }}
                        onPress={() => navigation.navigate("Help")}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            marginRight: 5,
                            color: "#3A8ED6",
                            fontFamily: "Lato_400Regular",
                          }}
                        >
                          Contact Us
                        </Text>
                        <AntDesign name="user" size={15} color="#3A8ED6" />
                      </TouchableOpacity>
                    ),
                  })}
                />

                <Drawer.Screen
                  name="OrderPreparing"
                  component={OrderPreparingDetails}
                  options={({ navigation }) => ({
                    drawerIcon: () => (
                      <Feather name="clipboard" size={24} color="black" />
                    ),
                    headerLeft: () => (
                      <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                          <AntDesign
                            name="close"
                            size={24}
                            color="#3A8ED6"
                            style={{ marginLeft: 5, marginTop: 5 }}
                          />
                        </TouchableOpacity>
                        <View style={{ marginLeft: 10 }}>
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: 20,
                              fontFamily: "Lato_400Regular",
                            }}
                          >
                            Order Details
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: "Lato_400Regular",
                            }}
                          >
                            Martin Chezo, Sidiriya, Mombasa
                          </Text>
                        </View>
                      </View>
                    ),
                    headerShown: true,
                    headerTitle: "",
                    headerRight: () => (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          paddingRight: 10,
                        }}
                        onPress={() => navigation.navigate("Help")}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            marginRight: 5,
                            color: "#3A8ED6",
                            fontFamily: "Lato_400Regular",
                          }}
                        >
                          Contact Us
                        </Text>
                        <AntDesign name="user" size={15} color="#3A8ED6" />
                      </TouchableOpacity>
                    ),
                  })}
                />
              </Drawer.Navigator>
            )}
          </NavigationContainer>
        </AuthContext.Provider>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </Native.TouchEventBoundary>
  );
}
