import Constants from "expo-constants"
import * as Sentry from "sentry-expo";

const devEnv = Constants.manifest.extra.devEnv
const SENTRY_DEV = Constants.manifest.extra.SENTRY_DEV

let sentryDebug;

if (__DEV__) {
  sentryDebug = true
} else {
  sentryDebug = false
}

export function sentryInit() {
  Sentry.init({
    dsn: Constants.manifest.extra.SENTRY_DSN,
    enableInExpoDevelopment: true,
    debug: sentryDebug, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
    autoSessionTracking: true,
    enableAutoSessionTracking: true,
    sampleRate: 1,
    tracesSampleRate: 1,
    setCommits: true,
    environment: devEnv,
    deployEnv: devEnv
  });
};

export function sentryEx(error) {
  if (__DEV__) {
    console.log(error)
  
    if (SENTRY_DEV) {
      Sentry.Browser.captureException(error)
    }
  } else {
    try {
      Sentry.Native.captureException(error)
    } catch (err) {
      // Sentry.Browser.captureException(err)
    }
  }
};

// Ref: https://colinwren.medium.com/monitoring-crashes-in-your-react-native-app-with-sentry-expo-d02d5ccba891
// export function sentryCrumb(type, category, message) {
//   Sentry.Native.addBreadcrumb({
//     type: type,
//     category: category,
//     message: message
//   })
// }

export function sentryUser(phoneNumber = null, clear = false) {

  if (clear) {
    // if (__DEV__) {
    //   Sentry.Browser.configureScope(scope => scope.setUser(null));
    // } else {
    //   Sentry.Native.configureScope(scope => scope.setUser(null))
    // }
    
    Sentry.Browser.configureScope(scope => scope.setUser(null));
  } else {
    // if (__DEV__) {
    //   Sentry.Browser.setUser({
    //     username: phoneNumber
    //   })
    // } else {
    //   Sentry.Native.setUser({
    //     username: phoneNumber
    //   })
    // }

    Sentry.Browser.setUser({
      username: phoneNumber
    })
  }

}