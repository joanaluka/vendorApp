// Expo
import Constants from "expo-constants";
import * as Location from "expo-location";
import { Platform } from 'react-native';
import { sentryEx } from './sentry';
Location.setGoogleApiKey(Constants.manifest.extra.mapsApiKey);
Location.installWebGeolocationPolyfill();

export async function checkLocationPermissions() {
  let devicePerm = await Location.hasServicesEnabledAsync();
  if (devicePerm) {
    if (Platform.OS === "android") {
      let { networkAvailable } = await Location.getProviderStatusAsync();
      if (!networkAvailable) {
        Location.enableNetworkProviderAsync();
      }
    }
    let getForePerm = await Location.getForegroundPermissionsAsync();
    if (getForePerm.status === "granted") {
      let location
      let geo_res
      try {
        location = await Location.getCurrentPositionAsync({ accuracy: 1 });
        if (location) {
          geo_res = await Location.reverseGeocodeAsync(
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
            { useGoogleMaps: true }
          );
        }
      } catch (err) {
        sentryEx(err)
      } finally {
        location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Lowest });
        if (location) {
          geo_res = await Location.reverseGeocodeAsync(
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
            { useGoogleMaps: true }
          );
        }
      }
      return { device: true, fore: true, geo_res: geo_res };
    } else if (forePerm.status !== "granted") {
      return { device: true, fore: false, geo_res: null };
    }
  } else {
    Location.enableNetworkProviderAsync();
    let getForePerm = await Location.getForegroundPermissionsAsync();
    if (getForePerm.status === 'granted') {
      let location
      let geo_res
      try {
        location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Lowest });
        if (location) {
          geo_res = await Location.reverseGeocodeAsync(
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
            { useGoogleMaps: true }
          );
        }
      } catch (err) {
        sentryEx(err)
      } finally {
        location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Lowest });
        if (location) {
          geo_res = await Location.reverseGeocodeAsync(
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
            { useGoogleMaps: true }
          );
        }
      }
      return { device: true, fore: true, geo_res: geo_res };
    } else {
      return { device: false, fore: null, geo_res: null };
    }
  }
}

export function updateInventoryDisplayed(inventory, offerType) {
  return inventory.filter((item) => item.offer_type === offerType);
}

export function formatDuration(secs) {
  let buffer = 30 * 60
  let newsecs = secs + buffer
  let h = Math.floor(newsecs / 3600);
  let m = Math.floor(newsecs % 3600 / 60);
  if (Math.ceil((parseInt(m) + 10) / 10) * 10 > 59) {
    let newhours = h + 1
    return `${newhours.toString()} h `
  }
  if (h < 1) {
    return `${Math.ceil(m / 10) * 10}` + ' - ' + `${Math.ceil((m + 10) / 10) * 10}min`
  } else {
    return `${h.toString()}h ` + `${Math.ceil((parseInt(m) + 10) / 10) * 10}min`
  }
}

function addMinutes(time, minsToAdd) {
  function D(J) { return (J < 10 ? '0' : '') + J; };
  let piece = time.split(':');
  let mins = piece[0] * 60 + +piece[1] + +minsToAdd;
  return D(mins % (24 * 60) / 60 | 0) + ':' + D(mins % 60);
}


export function openHour(working_hours) {
  let today = new Date();
  let current_day_of_week = today.getDay();
  let current_working_hours = working_hours.filter((item) => {
    return item.day_of_week === current_day_of_week;
  });
  let minsToAdd = '40';
  let time = current_working_hours[0]?.working_hours_start
  let finaltime = addMinutes(time, minsToAdd)
  return finaltime
}

export function formatAMPM(time) {
  let hours = time.split(':')[0]
  let minutes = time.split(':')[1]
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes.toString().padStart(2, '0');
  let strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}
