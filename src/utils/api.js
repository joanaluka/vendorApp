import Constants from 'expo-constants';
const axios = require("axios").default;
import { decode, encode } from 'base-64'
// Set these globally for `auth` to work in Axios calls
if (!global.btoa || !global.atob) {
  global.btoa = encode;
  global.atob = decode;
}

const apiUrl = Constants.manifest.extra.apiUrl;
const pow_api_key = Constants.manifest.extra.pow_api_key;
const app_name = "customers"

export async function getVendors(userUID) {
  let response = await axios({
    method: 'GET',
    url: apiUrl + "/vendors",
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      username: userUID,
      password: pow_api_key
    }
  });

  return(response)
};

export async function getOrders(userUID) {
  let response = await axios({
    method: 'GET',
    url: apiUrl + "/orders",
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      username: userUID,
      password: pow_api_key
    }
  })

  return(response);
}

export async function getSingleOrder(userUID, order_uid) {
  let response = await axios({
    method: 'GET',
    url: apiUrl + "/orders/" + order_uid,
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      username: userUID,
      password: pow_api_key
    }
  })

  return (response);
}

export async function postOrder(
  userUID, 
  vendor_uid, 
  cart, 
  orderType,
  location_uid
) {
  
  let order_items = {
    quantity: [],
    volume: [],
    bottle_type: []
  }

  cart.forEach(item => {
    order_items.quantity.push(item.quantity),
    order_items.volume.push(item.capacity),
    order_items.bottle_type.push(item.bottle_type)
  })

  
  let response = await axios({
    method: "POST",
    url: apiUrl + "/orders",
    data: {
      vendor_uid: vendor_uid,
      order_type: orderType,
      order_items: order_items,
      location_uid: location_uid,
      app_name: app_name
    },
    auth: {
      username: userUID,
      password: pow_api_key
    }
  })

  return(response);
}

export async function sendMpesaSTKPush(data, userUID) {
  return axios ({
    method: "POST",
    url: apiUrl + "/pay",
    data: data,
    auth: {
      username: userUID,
      password: pow_api_key
    }
})
}

export async function cancelOrder(userUID, order_uid) {
  let response = await axios({
    method: "PUT",
    url: apiUrl + "/orders/" + order_uid,
    data: {
      order_status: "Canceled"
    },
    auth: {
      username: userUID,
      password: pow_api_key
    }
  })

  return(response);
}


export async function updatePaymentStatus(userUID, order_uid, payment_status) {
  let response = await axios({
    method: "PUT",
    url: apiUrl + "/orders/" + order_uid,
    data: {
      payment_status: payment_status
    },
    auth: {
      username: userUID,
      password: pow_api_key
    }
  })

  return(response);
}

/* rate a rider for for a specific order */
export async function updateRiderRating(userUID, order_uid, rider_rating, comment) {
  let response = await axios({
    method: "PUT",
    url: apiUrl + "/orders/" + order_uid,
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      rider_rating: rider_rating,
      customer_comment: comment
    },
    auth: {
      username: userUID,
      password: pow_api_key
    }
  })

  return (response)
}

export async function registerUser(firstName, lastName, phone, gender, dob, pin, location, address) {
  let latlon = { latitude: location.latitude, longitude: location.longitude }

  let response = await axios({
    method: "POST",
    url: apiUrl + "/register-user",
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      first_name: firstName,
      last_name: lastName,
      phone_number: phone,
      gender: gender,
      dob: dob,
      hashed_pin: pin,
      location: latlon,
      address: address,
      app_name: app_name
    },
    auth: {
      username: "",
      password: pow_api_key
    }
  })
  
  return (response)
}

export async function logIn(phone, pin) {
  let response = await axios({
    method: "POST",
    url: apiUrl + "/login-user",
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      phone_number: phone,
      hashed_pin: pin,
      app_name: app_name
    },
    auth: {
      username: "",
      password: pow_api_key
    }
  })
  return(response)
}

export async function resetPin(phone, pin) {
  let response = await axios({
    method: "PUT",
    url: apiUrl + "/update-pin",
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      phone_number: phone,
      hashed_pin: pin,
      app_name: app_name
    },
    auth: {
      username: "",
      password: pow_api_key
    }
  })

  return (response)
}

export async function updateLocation(userUID, address_data, addressLabel, addressNotes) {
  let response = await axios({
    method: "PUT",
    url: apiUrl + "/locations",
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      address_data: address_data,
      customer_location_label: addressLabel,
      customer_location_notes: addressNotes
    },
    auth: {
      username: userUID,
      password: pow_api_key
    }
  })

  return (response)
}

export async function getDeliveryFee(userUID, location_uid, vendor_uid, offerType) {
  let response = await axios({
    method: "GET",
    url: apiUrl + "/price/delivery-fee",
    headers: {
      'Content-Type': 'application/json'
    },
    params: {
      location_uid: location_uid,
      vendor_uid: vendor_uid,
      offer_type: offerType
    },
    auth: {
      username: userUID,
      password: pow_api_key
    }
  })

  return (response)
}
