import DefaultImage from '@/public/product_placeholder.svg'

import type { CrOrderItem, CrProductOption, Maybe, Order, CartItem } from '../gql/types'

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

const getProductId = (item: Maybe<CrOrderItem> | Maybe<CartItem>): string => item?.id || ''

const getProductCode = (item: Maybe<CrOrderItem> | Maybe<CartItem>): string =>
  item?.product?.productCode || ''

const getProductImage = (item: Maybe<CrOrderItem> | Maybe<CartItem>): string =>
  item?.product?.imageUrl || DefaultImage

const getProductName = (item: Maybe<CrOrderItem> | Maybe<CartItem>): string =>
  item?.product?.name || ''

const getProductOptions = (item: Maybe<CrOrderItem> | Maybe<CartItem>): Maybe<CrProductOption>[] =>
  item?.product?.options || []

const getProductQuantity = (item: Maybe<CrOrderItem> | Maybe<CartItem>): number =>
  item?.quantity || 0

const getProductPrice = (item: Maybe<CrOrderItem> | Maybe<CartItem>): string =>
  (item?.product?.price?.price || 0).toString()

const getProductSalePrice = (item: Maybe<CrOrderItem> | Maybe<CartItem>): string | undefined =>
  (item?.product?.price?.salePrice && (item?.product?.price?.salePrice).toString()) || undefined

const getPurchaseLocation = (item: Maybe<CrOrderItem> | Maybe<CartItem>): string =>
  item?.purchaseLocation || ''

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
  getProductId,
  getProductCode,
  getProductImage,
  getProductName,
  getProductOptions,
  getProductQuantity,
  getProductPrice,
  getProductSalePrice,
  getPurchaseLocation,
}
