import { Maybe, Order } from '../gql/types'

const getOrderNumber = (checkout: Order) => checkout?.orderNumber
const getEmail = (checkout: Order) => checkout?.email
const getId = (checkout: Order) => checkout?.id
const getTotal = (checkout: Order): number => checkout?.total as number
const getDiscountedTotal = (checkout: Order) => checkout?.orderDiscounts || 0
const getShippingTotal = (checkout: Order) => checkout?.shippingTotal || 0
const getTaxTotal = (checkout: Order) => checkout?.taxTotal || 0
const getSubtotal = (checkout: Order): number => checkout?.subtotal as number
const getLineItemTotal = (checkout: Order) => {
  return checkout?.items
    ? checkout?.items?.reduce((previous, current) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return previous + current!.quantity
      }, 0)
    : 0
}
const getLineItemTaxTotal = (checkout: Order) => (checkout.taxTotal ? checkout.taxTotal : 0)
const getItemsByFulfillment = (checkout: Order, fulfillmentMethod: string) => {
  return checkout?.items?.filter((lineItem) => lineItem?.fulfillmentMethod === fulfillmentMethod)
}
const getPickupItems = (checkout: Order) => {
  return getItemsByFulfillment(checkout, 'Pickup')
}
const getShipItems = (checkout: Order) => getItemsByFulfillment(checkout, 'Ship')
const getDeliveryItems = (checkout: Order) => getItemsByFulfillment(checkout, 'Delivery')

export const checkoutGetters = {
  getOrderNumber,
  getEmail,
  getId,
  getTotal,
  getDiscountedTotal,
  getShippingTotal,
  getTaxTotal,
  getSubtotal,
  getLineItemTotal,
  getLineItemTaxTotal,
  getPickupItems,
  getShipItems,
  getDeliveryItems,
}
