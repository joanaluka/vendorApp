import React, { useRef } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
Location.setGoogleApiKey(Constants.manifest.extra.mapsApiKey);
Location.installWebGeolocationPolyfill();
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as colors from "../utils/colors";

import { Feather } from "@expo/vector-icons";

export default function InProgress({ userData, vendor_place_id }) {
  // google maps configuration
  const destination = {
    latitude: userData.latlon.latitude,
    longitude: userData.latlon.longitude,
  };

  const GOOGLE_MAPS_APIKEY = Constants.manifest.extra.mapsApiKey;

  const mapRef = useRef(null);

  // order succesfully delivered
  const deliveryMap = (
    <View style={styles.confirmingContainerMap}>
      <View style={{ paddingHorizontal: "5%" }}>
        <Text style={[styles.progressText, { fontFamily: "Lato_700Bold" }]}>
          En Route to customer
        </Text>
      </View>

      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        loadingEnabled={true}
        loadingIndicatorColor={colors.pow_blue}
        // minZoomLevel={10}
        // maxZoomLevel={7}
        // zoomControlEnabled
        paddingAdjustmentBehavior="always"
        toolbarEnabled={true}
        onLayout={async () => {
          mapRef.current?.fitToElements(true);
        }}
        initialRegion={{
          latitude: userData.latlon.latitude,
          longitude: userData.latlon.longitude,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.0421,
        }}
      >
        <MapViewDirections
          lineDashPattern={[0]}
          origin={vendor_place_id}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeColor="#0A62AE"
          strokeWidth={3}
          // onError={(err) => {
          //   Alert.alert("Error showing Route Preview");
          //   sentryEx(err);
          // }}
        />
      </MapView>
      <View>
        <View
          style={{
            marginVertical: 10,
            borderBottomColor: "lightgray",
            paddingBottom: 10,
            marginHorizontal: 15,
            borderBottomWidth: 1,
          }}
        >
          <Text
            style={[
              styles.textGray,
              { color: colors.pow_blue, textAlign: "center", fontSize: 14 },
            ]}
          >
            Estimated Preparing Time
          </Text>
          <Text
            style={[styles.textTitle, { textAlign: "center", fontSize: 16 }]}
          >
            15 - 20 Min
          </Text>
        </View>
        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
          <View
            style={{
              marginVertical: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottomColor: "lightgray",
              paddingBottom: 10,
              borderBottomWidth: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ marginRight: 10 }}>
                <Image
                  source={require("../../assets/images/rider.jpg")}
                  style={{ width: 60, height: 60, borderRadius: 50 }}
                />
              </View>
              <View>
                <Text style={styles.textTitle}>Abuya Awino</Text>
                <View style={{ flexDirection: "row", marginTop: 4 }}>
                  <Feather name="star" size={15} color={colors.pow_blue} />
                  <Text>4.9 (38)</Text>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Feather
                name="phone-call"
                size={15}
                color={colors.pow_blue}
                style={{ marginRight: 8 }}
              />
              <Feather
                name="message-circle"
                size={15}
                color={colors.pow_blue}
              />
            </View>
          </View>

          <View
            style={{
              paddingBottom: 10,
            }}
          >
            <View style={styles.detail}>
              <Text style={styles.textGray}>Order Number:</Text>
              <Text style={styles.textGray}>#123</Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.textGray}>Order From:</Text>
              <Text style={styles.textGray}>Martin Chezo</Text>
            </View>
            <View style={styles.detail}>
              <Text style={[styles.textGray, { flex: 1 }]}>
                Delivery Address
              </Text>
              <Text style={[styles.textGray, { flex: 1, textAlign: "right" }]}>
                Baywood Building, Moi Ave, Mombasa, Kenya
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const info = () => (
    <View>
      <View style={{ marginVertical: 10 }}>
        <Text
          style={[
            styles.textGray,
            { color: colors.pow_blue, textAlign: "center", fontSize: 14 },
          ]}
        >
          Estimated Preparing Time
        </Text>
        <Text style={[styles.textTitle, { textAlign: "center", fontSize: 16 }]}>
          15 - 20 Min
        </Text>
      </View>
      <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
        <View
          style={{
            paddingBottom: 10,
            borderBottomColor: "lightgray",
            borderBottomWidth: 1,
          }}
        >
          <View style={styles.detail}>
            <Text style={styles.textGray}>Order Number:</Text>
            <Text style={styles.textGray}>#123</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.textGray}>Order From:</Text>
            <Text style={styles.textGray}>Martin Chezo</Text>
          </View>
          <View style={styles.detail}>
            <Text style={[styles.textGray, { flex: 1 }]}>Delivery Address</Text>
            <Text style={[styles.textGray, { flex: 1, textAlign: "right" }]}>
              Baywood Building, Moi Ave, Mombasa, Kenya
            </Text>
          </View>
        </View>

        <View
          style={{
            marginVertical: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ marginRight: 10 }}>
              <Image
                source={require("../../assets/images/rider.jpg")}
                style={{ width: 60, height: 60, borderRadius: 50 }}
              />
            </View>
            <View>
              <Text style={styles.textTitle}>Abuya Awino</Text>
              <View style={{ flexDirection: "row", marginTop: 4 }}>
                <Feather name="star" size={15} color={colors.pow_blue} />
                <Text>4.9 (38)</Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Feather
              name="phone-call"
              size={15}
              color={colors.pow_blue}
              style={{ marginRight: 8 }}
            />
            <Feather name="message-circle" size={15} color={colors.pow_blue} />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={[
              styles.signUpButtonView,
              { backgroundColor: colors.pow_blue },
            ]}
          >
            <Text
              style={[styles.signUpText, { fontFamily: "Lato_400Regular" }]}
            >
              Ready for Pickup
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <>
      <View style={{ width: "100%" }}>{deliveryMap}</View>
      <View>{info}</View>
    </>
  );
}

const styles = StyleSheet.create({
  confirmingContainerMap: {
    width: "100%",
    textAlign: "center",
    marginTop: 20,
  },

  progressText: {
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 10,
  },

  map: {
    height: 250,
    marginVertical: 10,
  },
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  textTitle: {
    fontWeight: "bold",
    fontFamily: "Lato_400Regular",
  },
  textGray: {
    color: "#888888",
    fontSize: 12,
    fontFamily: "Lato_400Regular",
    lineHeight: 16,
  },

  signUpButtonView: {
    borderRadius: 10,
    width: "100%",
    height: 50,
    justifyContent: "space-around",
    marginBottom: "3%",
  },

  signUpText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
