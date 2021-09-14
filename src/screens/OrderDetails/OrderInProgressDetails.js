import React from "react";
import { View } from "react-native";
import InProgress from "../../Components/InProgress";
// Expo
// React-Navigation
// Utils
// Helpers

export default function OrderInProgressDetails() {
  const average_rate = 4.9;
  const totalpeople = 38;
  const arrivalTime = "30 min";
  const orderItems = "Details";
  const discount = "20";
  const deliveryFee = "200;";
  const riderNumber = "0726522476";
  const currency = "KES";
  const userData = {
    latlon: {
      latitude: -3.951883714021485,
      longitude: 39.74248073998735,
    },
  };
  const rider = "Joan";
  const riderName = "Joan O";
  const order = { payment_status: "Complete" };
  const customerOrderDetails = {};
  const orderType = "Type";
  const totalValue = 100;
  const paymentType = "Mpesa";
  const riderLocation = {
    latitude: -3.951883714021485,
    longitude: 39.74248073998735,
  };
  const vendorPlaceID = "ChIJ5b0LA6wOQBgRe0sIruEoRCc";

  return (
    <View>
      <InProgress
        rider={rider}
        riderName={riderName}
        riderNumber={riderNumber}
        average_rate={average_rate}
        totalpeople={totalpeople}
        arrivalTime={arrivalTime}
        order_uid={order.order_uid}
        orderDetails={customerOrderDetails}
        orderItems={orderItems}
        discount={discount}
        deliveryFee={deliveryFee}
        orderType={orderType}
        totalValue={totalValue}
        paymentType={paymentType}
        paymentStatus={order.payment_status}
        currency={currency}
        userData={userData}
        riderLocation={riderLocation}
        vendor_place_id={vendorPlaceID}
      />
    </View>
  );
}
