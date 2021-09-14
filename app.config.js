export default ({ config }) => {
  let api_url;
  let devEnv;
  let mapsApiKey;
  let pow_api_key;
  let FIREBASE_WEB_CONFIG;
  let SENTRY_DSN;
  let SENTRY_TOKEN;

  // Set to any value to log to Sentry during development
  let SENTRY_DEV;

  if (process.env.SENTRY_DEV === undefined) {
    SENTRY_DEV = false
  } else {
    SENTRY_DEV = true
  }

  FIREBASE_WEB_CONFIG = {
    apiKey: process.env.FB_WEB_API_KEY,
    authDomain: process.env.FB_WEB_AUTH_DOMAIN,
    projectId: process.env.WEB_PROJECT_ID,
    storageBucket: process.env.WEB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_SENDER_ID,
    appId: process.env.FB_WEB_APP_ID,
    measurementId: process.env.FB_WEB_MEASUREMENT_ID
  };

  mapsApiKey = process.env.MAPS_API_KEY
  pow_api_key = process.env.POW_API_KEY
  SENTRY_DSN = process.env.SENTRY_DSN
  SENTRY_TOKEN = process.env.SENTRY_TOKEN

  if (process.env.ENV == "DEV") {
    // Local Development env (Breaking Changes to API/DB) for Tychobra
    devEnv = "DEV"
    api_url = "https://powapi-dev.powwater.org"
    // api_url = "http://127.0.0.1:3168"


  } else if (process.env.ENV == "TEST") {
    // Staging (aka Testing) environment for Internal Deployment
    devEnv = "TEST"
    api_url = "https://powapi.powwater.org"

  } else if (process.env.ENV == "PRODUCTION") {
    // Production environment (Deployed to App Stores)
    // TODO: Add ENV for Prod before build/deploy
  } else {
    // Throw warning if no Development Environment Variable shown
    console.log("########################### MUST START W/ ENV VARIABLE ###########################")
    console.warn("No ENV variable set before start. Other devs should only use ENV='DEV' for now.")
  }

  config = {
    ...config,
    "ios": {
      ...config.ios,
      "config": {
        "googleMapsApiKey": process.env.IOS_MAPS_KEY
      }
    },
    "android": {
      ...config.android,
      "config": {
        "googleMaps": {
          "apiKey": process.env.ANDROID_MAPS_KEY
        }
      }
    }
  }

  return {
    ...config,
    hooks: {
      postPublish: [
        {
          "file": "sentry-expo/upload-sourcemaps",
          "config": {
            "organization": "powwater",
            "project": "customer",
            "authToken": SENTRY_TOKEN
          }
        }
      ]
    },
    extra: {
      mapsApiKey: mapsApiKey,
      pow_api_key: pow_api_key,
      apiUrl: api_url,
      devEnv: devEnv,
      FIREBASE_WEB_CONFIG: FIREBASE_WEB_CONFIG,
      SENTRY_DSN: SENTRY_DSN,
      SENTRY_DEV: SENTRY_DEV
    }
  };
};
