import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import image from "../../assets/images/splash.png";

import * as colors from "../utils/colors";

export default function SplashScreen() {
  // const [showLoading, setShowLoading] = useState(false)
  // setTimeout(() => {
  //   setShowLoading(true)
  // }, 3000)

  const enlargeAnim = useRef(new Animated.Value(0)).current;
  const fadeInWaterAnim = useRef(new Animated.Value(0)).current;
  const fadeInPowerOfWaterAnim = useRef(new Animated.Value(0)).current;
  // use this to enlarge image
  const enlarge = () => {
    Animated.timing(enlargeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  //use this to fadein water text
  const fadeInWater = () => {
    Animated.timing(fadeInWaterAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };
  //use this to fadein the power of water text
  const fadeInPowerOfWater = () => {
    Animated.timing(fadeInPowerOfWaterAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };
  // on component mount initiate fade in text water
  useEffect(() => {
    enlarge();
    fadeInWater();
    fadeInPowerOfWater();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View>
        <Animated.Image
          style={[
            styles.enlargingImage,
            {
              // opacity: enlargeAnim,
              // resizeMode: "contain",
            },
          ]}
          source={image}
          res
        />
      </Animated.View>

      <View style={styles.innercontainer}>
        <Text style={styles.poww1}>pow</Text>
        <Animated.Text
          style={[
            styles.poww2,
            {
              // Bind opacity to animated value
              opacity: fadeInWaterAnim,
            },
          ]}
        >
          water
        </Animated.Text>
      </View>
      <View style={styles.powcontainer}>
        <Animated.Text
          style={[
            styles.desc,
            {
              // Bind opacity to animated value
              opacity: fadeInPowerOfWaterAnim,
            },
          ]}
        >
          THE POWER OF WATER
        </Animated.Text>
        <MaterialCommunityIcons
          style={styles.tm}
          name="trademark"
          size={10}
          color={colors.pow_blue}
        />
      </View>
      {/* {showLoading ? (
        <ActivityIndicator
          size="large"
          color={colors.pow_blue}
          style={{
            marginTop: 50
          }} />
      ) : (null)} */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  innercontainer: {
    display: "flex",
    flexDirection: "row",
  },
  poww1: {
    color: colors.pow_blue,
    fontWeight: "bold",
    fontSize: 45,
    lineHeight: 50,
  },
  poww2: {
    color: colors.pow_blue,
    fontWeight: "bold",
    fontSize: 45,
    lineHeight: 50,
  },
  powcontainer: {
    position: "relative",
  },
  desc: {
    color: colors.pow_blue,
    fontSize: 11,
  },
  tm: {
    position: "absolute",
    top: -4,
    right: -10,
  },
  enlargingImage: {
    height: 160,
    width: 160,
  },
});
