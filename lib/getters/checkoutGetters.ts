import getConfig from 'next/config'

import DefaultImage from '@/public/product_placeholder.svg'

import type {
  CrProductOption,
  CrOrderItem,
  Order,
  Payment,
  Maybe,
  CrAddress,
  Contact,
  CartItem,
} from '@/lib/gql/types'

interface ShippingDetails {
  shippingPhoneHome: string
  shippingPhoneMobile: string
  shippingPhoneWork: string
  shippingAddress: CrAddress
}

interface BillingDetails {
  billingPhoneHome: string
  billingPhoneMobile: string
  billingPhoneWork: string
  billingAddress: CrAddress
}

interface OrderSummary {
  shippingTotal: number
  subTotal: number
  taxTotal: number
  total: number
  totalCollected: number
}
interface PaymentMethod {
  cardType: string
  cardNumberPartOrMask: string
  expiry: string
}
interface CheckoutDetails {
  shipItems: Maybe<CrOrderItem>[]
  pickupItems: Maybe<CrOrderItem>[]
  orderSummary: OrderSummary
  personalDetails: Contact
  shippingDetails: ShippingDetails
  billingDetails: BillingDetails
  paymentMethods: PaymentMethod[]
}

const { publicRuntimeConfig } = getConfig()

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
const getItemsByFulfillment = (
  checkout: Order,
  fulfillmentMethod: string
): Maybe<CrOrderItem>[] => {
  return (
    checkout?.items?.filter((lineItem) => lineItem?.fulfillmentMethod === fulfillmentMethod) || []
  )
}
const getPickupItems = (checkout: Order): Maybe<CrOrderItem>[] => {
  return getItemsByFulfillment(checkout, publicRuntimeConfig.fullfillmentOptions[1].shortName)
}
const getShipItems = (checkout: Order): Maybe<CrOrderItem>[] =>
  getItemsByFulfillment(checkout, publicRuntimeConfig.fullfillmentOptions[0].shortName)
const getDeliveryItems = (checkout: Order) => getItemsByFulfillment(checkout, 'Delivery')

const getProductId = (item: Maybe<CrOrderItem> | Maybe<CartItem>): string => item?.id || ''

const getProductCode = (item: Maybe<CrOrderItem> | Maybe<CartItem>): string =>
  item?.product?.productCode || ''

const getProductImage = (item: Maybe<CrOrderItem> | Maybe<CartItem>): string =>
  item?.product?.imageUrl || DefaultImage

const getProductName = (item: Maybe<CrOrderItem> | Maybe<CartItem>): string =>
  item?.product?.name || ''

const getProductOptions = (item: Maybe<CrOrderItem> | Maybe<CartItem>): CrProductOption[] =>
  (item?.product?.options as CrProductOption[]) || []

const getProductQuantity = (item: Maybe<CrOrderItem> | Maybe<CartItem>): number =>
  item?.quantity || 0

const getProductPrice = (item: Maybe<CrOrderItem> | Maybe<CartItem>): string =>
  (item?.product?.price?.price || 0).toString()

const getProductSalePrice = (item: Maybe<CrOrderItem> | Maybe<CartItem>): string | undefined =>
  (item?.product?.price?.salePrice && (item?.product?.price?.salePrice).toString()) || undefined

const getPurchaseLocation = (item: Maybe<CrOrderItem> | Maybe<CartItem>): string =>
  item?.purchaseLocation || ''
// review step changes

const getTotalCollected = (checkout: Order): number => checkout.totalCollected || 0
//u
const getShippingEmail = (checkout: Order): string =>
  checkout.fulfillmentInfo?.fulfillmentContact?.email || ''

const getShippingFirstName = (checkout: Order): string =>
  checkout.fulfillmentInfo?.fulfillmentContact?.firstName || ''
const getShippingLastNameOrSurname = (checkout: Order): string =>
  checkout.fulfillmentInfo?.fulfillmentContact?.lastNameOrSurname || ''

const getShippingPhoneHome = (checkout: Order): string =>
  checkout?.fulfillmentInfo?.fulfillmentContact?.phoneNumbers?.home || ''
const getShippingPhoneMobile = (checkout: Order): string =>
  checkout?.fulfillmentInfo?.fulfillmentContact?.phoneNumbers?.mobile || ''
const getShippingPhoneWork = (checkout: Order): string =>
  checkout?.fulfillmentInfo?.fulfillmentContact?.phoneNumbers?.work || ''
const getShipppingAddress = (checkout: Order) =>
  checkout.fulfillmentInfo?.fulfillmentContact?.address as CrAddress

const getBillingPhoneHome = (checkout: Order): string =>
  checkout.billingInfo?.billingContact?.phoneNumbers?.home || ''
const getBillingPhoneMobile = (checkout: Order): string =>
  checkout?.billingInfo?.billingContact?.phoneNumbers?.mobile || ''
const getBillingPhoneWork = (checkout: Order): string =>
  checkout?.billingInfo?.billingContact?.phoneNumbers?.work || ''
const getBillingAddress = (checkout: Order) =>
  checkout.billingInfo?.billingContact?.address as CrAddress

const getPaymentMethods = (checkout: Order) => {
  const payments: Maybe<Payment>[] = checkout?.payments || []

  if (!payments) return []

  return payments
    .filter((p: Maybe<Payment>) => p?.billingInfo?.card)
    .map((item: Maybe<Payment>) => {
      return {
        cardType: item?.billingInfo?.card?.paymentOrCardType,
        cardNumberPartOrMask: item?.billingInfo?.card?.cardNumberPartOrMask,
        expiry: item?.billingInfo?.card?.expireMonth + ' / ' + item?.billingInfo?.card?.expireYear,
      }
    }) as PaymentMethod[]
}

const getPersonalDetails = (checkout: Order): Contact => {
  return {
    email: getShippingEmail(checkout),
    firstName: getShippingFirstName(checkout),
    lastNameOrSurname: getShippingLastNameOrSurname(checkout),
  }
}

const getShippingDetails = (checkout: Order): ShippingDetails => {
  return {
    shippingPhoneHome: getShippingPhoneHome(checkout),
    shippingPhoneMobile: getShippingPhoneMobile(checkout),
    shippingPhoneWork: getShippingPhoneWork(checkout),
    shippingAddress: getShipppingAddress(checkout),
  }
}

const getBillingDetails = (checkout: Order): BillingDetails => {
  return {
    billingPhoneHome: getBillingPhoneHome(checkout),
    billingPhoneMobile: getBillingPhoneMobile(checkout),
    billingPhoneWork: getBillingPhoneWork(checkout),
    billingAddress: getBillingAddress(checkout),
  }
}

const getOrderSummary = (checkout: Order): OrderSummary => {
  return {
    shippingTotal: getShippingTotal(checkout),
    subTotal: getSubtotal(checkout),
    taxTotal: getTaxTotal(checkout),
    total: getTotal(checkout),
    totalCollected: getTotalCollected(checkout),
  }
}

const getCheckoutDetails = (checkout: Order): CheckoutDetails => {
  return {
    shipItems: getShipItems(checkout),
    pickupItems: getPickupItems(checkout),
    orderSummary: getOrderSummary(checkout),
    personalDetails: getPersonalDetails(checkout),
    shippingDetails: getShippingDetails(checkout),
    billingDetails: getBillingDetails(checkout),
    paymentMethods: getPaymentMethods(checkout),
  }
}

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
  getPersonalDetails,
  getShippingDetails,
  getBillingDetails,
  getPaymentMethods,
  getOrderSummary,
  getCheckoutDetails,
}
