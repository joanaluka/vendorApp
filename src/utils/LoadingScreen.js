import React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View
} from 'react-native';
import * as colors from './colors'

function LoadingScreen({ message } = "") {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        color={colors.pow_blue}
        size="large"
      />
      <Text
        style={styles.loadingMessage}
      >
        {message}
      </Text>
    </View>
  )
}

export default LoadingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'column',
  },

  loadingMessage: {
    color: colors.pow_blue,
    fontWeight: "bold",
    fontSize: 16,
    width: "50%",
    textAlign: "center",
    alignItems: "center"
  }
});