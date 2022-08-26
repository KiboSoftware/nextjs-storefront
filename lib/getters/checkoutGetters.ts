import { FulfillmentOptions } from '../constants'
import { cartGetters } from './cartGetters'
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
  Cart,
} from '@/lib/gql/types'

interface ShippingDetails {
  firstName: string
  middleNameOrInitial: string
  lastNameOrSurname: string
  shippingPhoneHome: string
  shippingPhoneMobile: string
  shippingPhoneWork: string
  shippingAddress: CrAddress
}

interface BillingDetails {
  firstName: string
  middleNameOrInitial: string
  lastNameOrSurname: string
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

const getOrderNumber = (checkout: Order) => checkout?.orderNumber
const getEmail = (checkout: Order) => checkout?.email
const getId = (checkout: Order) => checkout?.id
const getTotal = (checkout: Order | Cart): number => checkout?.total as number
const getDiscountedTotal = (checkout: Order) => checkout?.orderDiscounts || 0
const getShippingTotal = (checkout: Order | Cart) => checkout?.shippingTotal || 0
const getTaxTotal = (checkout: Order | Cart) => checkout?.taxTotal || 0
const getSubtotal = (checkout: Order | Cart): number => checkout?.subtotal as number
const getDiscountedSubtotal = (checkout: Order | Cart): number => {
  if (checkout?.discountedSubtotal && checkout?.discountedSubtotal != checkout?.subtotal)
    return checkout?.discountedSubtotal
  else return 0
}
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
  return getItemsByFulfillment(checkout, FulfillmentOptions.PICKUP)
}
const getShipItems = (checkout: Order): Maybe<CrOrderItem>[] =>
  getItemsByFulfillment(checkout, FulfillmentOptions.SHIP)

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
  item?.product?.price?.salePrice ? (item?.product?.price?.salePrice).toString() : undefined

const getPurchaseLocation = (item: Maybe<CrOrderItem> | Maybe<CartItem>): string =>
  item?.purchaseLocation || ''
// review step changes

const getTotalCollected = (checkout: Order): number => checkout.totalCollected || 0

const getShippingContact = (checkout: Order): Contact =>
  checkout?.fulfillmentInfo?.fulfillmentContact as Contact

const getShippingEmail = (checkout: Order): string =>
  checkout.fulfillmentInfo?.fulfillmentContact?.email || ''

const getShippingFirstName = (checkout: Order): string =>
  checkout.fulfillmentInfo?.fulfillmentContact?.firstName || ''
const getShippingLastNameOrSurname = (checkout: Order): string =>
  checkout.fulfillmentInfo?.fulfillmentContact?.lastNameOrSurname || ''
const getShippingMiddleNameOrInitial = (checkout: Order): string =>
  checkout?.fulfillmentInfo?.fulfillmentContact?.middleNameOrInitial || ''

const getShippingPhoneHome = (checkout: Order): string =>
  checkout?.fulfillmentInfo?.fulfillmentContact?.phoneNumbers?.home || ''
const getShippingPhoneMobile = (checkout: Order): string =>
  checkout?.fulfillmentInfo?.fulfillmentContact?.phoneNumbers?.mobile || ''
const getShippingPhoneWork = (checkout: Order): string =>
  checkout?.fulfillmentInfo?.fulfillmentContact?.phoneNumbers?.work || ''
const getShipppingAddress = (checkout: Order) =>
  checkout.fulfillmentInfo?.fulfillmentContact?.address as CrAddress

const getBillingFirstName = (checkout: Order): string =>
  checkout.billingInfo?.billingContact?.firstName || ''
const getBillingLastNameOrSurname = (checkout: Order): string =>
  checkout.billingInfo?.billingContact?.lastNameOrSurname || ''
const getBillingMiddleNameOrInitial = (checkout: Order): string =>
  checkout?.billingInfo?.billingContact?.middleNameOrInitial || ''

const getBillingPhoneHome = (checkout: Order): string =>
  checkout.billingInfo?.billingContact?.phoneNumbers?.home || ''
const getBillingPhoneMobile = (checkout: Order): string =>
  checkout?.billingInfo?.billingContact?.phoneNumbers?.mobile || ''
const getBillingPhoneWork = (checkout: Order): string =>
  checkout?.billingInfo?.billingContact?.phoneNumbers?.work || ''
const getBillingAddress = (checkout: Order) =>
  checkout.billingInfo?.billingContact?.address as CrAddress

const getFulfillmentLocationCodes = (cartItems: Maybe<CartItem | CrOrderItem>[]): string => {
  const locationCodes = Array.from(
    cartItems.reduce((set, item) => {
      if (item?.fulfillmentMethod === FulfillmentOptions.PICKUP) {
        set.add(`code eq ${item?.fulfillmentLocationCode}`)
      }
      return set
    }, new Set())
  )
  return locationCodes.join(' or ')
}

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
    email: getEmail(checkout),
    firstName: getShippingFirstName(checkout),
    lastNameOrSurname: getShippingLastNameOrSurname(checkout),
  }
}

const getShippingDetails = (checkout: Order): ShippingDetails => {
  return {
    firstName: getShippingFirstName(checkout),
    middleNameOrInitial: getShippingMiddleNameOrInitial(checkout),
    lastNameOrSurname: getShippingLastNameOrSurname(checkout),
    shippingPhoneHome: getShippingPhoneHome(checkout),
    shippingPhoneMobile: getShippingPhoneMobile(checkout),
    shippingPhoneWork: getShippingPhoneWork(checkout),
    shippingAddress: getShipppingAddress(checkout),
  }
}

const getBillingDetails = (checkout: Order): BillingDetails => {
  return {
    firstName: getBillingFirstName(checkout),
    middleNameOrInitial: getBillingMiddleNameOrInitial(checkout),
    lastNameOrSurname: getBillingLastNameOrSurname(checkout),
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

const getSelectedPaymentMethods = (checkout?: Order, paymentType?: string) => {
  return checkout?.payments?.filter(
    (each) => each?.paymentType === paymentType && each?.status === 'New'
  )
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
  getDiscountedSubtotal,
  getLineItemTotal,
  getLineItemTaxTotal,
  getPickupItems,
  getShipItems,
  getProductId,
  getProductCode,
  getProductImage,
  getProductName,
  getProductOptions,
  getProductQuantity,
  getProductPrice,
  getProductSalePrice,
  getPurchaseLocation,
  getFulfillmentLocationCodes,
  getPersonalDetails,
  getShippingDetails,
  getBillingDetails,
  getPaymentMethods,
  getOrderSummary,
  getCheckoutDetails,
  getShippingContact,
  getSelectedPaymentMethods,
  ...cartGetters,
}
