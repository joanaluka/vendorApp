import Constants from "expo-constants";
import * as FirebaseCore from 'expo-firebase-core';

const firebase = require("firebase/app");
require("firebase/auth");

// Sentry (Error Tracking)
import { sentryEx } from './sentry';

FIREBASE_WEB_CONFIG = Constants.manifest.extra.FIREBASE_WEB_CONFIG

export function firebaseInit() {
  if (!firebase.default.apps.length) {
    try {
      // console.log(FirebaseCore.DEFAULT_APP_OPTIONS)
      firebase.default.initializeApp(FirebaseCore.DEFAULT_APP_OPTIONS)

    } catch (err) {
      sentryEx(err)
      Alert.alert(
        "Firebase Error",
        err.response.data.message
      )
    }
  }
}

