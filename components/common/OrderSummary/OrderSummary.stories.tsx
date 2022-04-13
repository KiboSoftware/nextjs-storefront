/** @format */

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import OrderSummary from "./OrderSummary";
export default {
  title: "Common/OrderSummary",
  component: OrderSummary,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof OrderSummary>;
const Template: ComponentStory<typeof OrderSummary> = (args) => (
  <OrderSummary {...args} />
);
export const Checkout = Template.bind({});
Checkout.args = {
  name: "Order Summary",
  type: "orderSummary",
  cartTotal: "Cart Subtotal (3 items)",
  standardShipping: "Standard Shipping",
  standardShippingAmount: "Free",
  estTax: "Tax",
  estTaxamt: "$13.73",
  orderTotal: "$233.72",
  subTotal: "$219.99",
  estOrderTotal: "Order Total",
  boxStyle: {
    // backgroundcolor: "red",
    fontFamily: "Roboto-Regular",
    fontSize: "14px",
    lineHeight: "17px",
    display: "flex",
    justifyContent: "space-between",
  },
  estStyle: {
    fontFamily: "Roboto-Regular",
    fontSize: "14px",
    lineHeight: "17px",
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "bold",
  },
  headerStyle: {
    color: " #2B2B2B",
    // fontFamily: 'Roboto-Regular',
    fontSize: "20px",
    lineHeight: "24px",
    textAlign: "left",
    fontWeight: "bold",
  },
  checkOutButtonStyle: {
    // backgroundcolor: "#2EA195",
    borderradius: "4px",
    width: "376px",
    height: "42px",
  },
};
export const Shipping = Template.bind({});
Shipping.args = {
  name: "Order Summary",
  type: "orderShipping",
  cartTotal: "Cart Subtotal (3 items)",
  standardShipping: "Standard Shipping",
  standardShippingAmount: "Free",
  estTax: "Tax",
  estTaxamt: "$13.73",
  orderTotal: "$233.72",
  subTotal: "$219.99",
  estOrderTotal: "Order Total",
  boxStyle: {
    // backgroundcolor: "red",
    fontFamily: "Roboto-Regular",
    fontSize: "14px",
    lineHeight: "17px",
    display: "flex",
    justifyContent: "space-between",
  },
  estStyle: {
    fontFamily: "Roboto-Regular",
    fontSize: "14px",
    lineHeight: "17px",
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "bold",
  },
  headerStyle: {
    color: " #2B2B2B",
    // fontFamily: 'Roboto-Regular',
    fontSize: "20px",
    lineHeight: "24px",
    textAlign: "left",
    fontWeight: "bold",
  },
  shippingButtonStyle: {
    // backgroundcolor: "#2EA195",
    borderradius: "4px",
    margin: "10px",
    width: "376px",
    height: "42px",
  },
  backButtonStyle: {
    color: "black",
    backgroundColor: "white",
    borderradius: "4px",
    width: "376px",
    height: "42px",
  },
};
