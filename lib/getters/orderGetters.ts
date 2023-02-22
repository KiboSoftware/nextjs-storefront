import { format } from 'date-fns'

import { FulfillmentOptions, DateFormat } from '../constants'
import {
  ShippingDetails,
  BillingDetails,
  CheckoutDetails,
  OrderSummary,
  PaymentMethod,
} from '../types/OrderGettersTypes'
import { addressGetters } from './addressGetters'
import { cardGetters } from './cardGetters'

import type {
  CrOrderItem,
  CrOrder,
  CrPayment,
  CrAddress,
  CrContact,
  CrCartItem,
  CrCart,
  CrBillingInfo,
  CrPaymentCard,
  CustomerContact,
  CuAddress,
  Checkout,
} from '@/lib/gql/types'

const getCheckoutItemCount = (order: CrOrder) => order?.items?.length
const getEmail = (order: CrOrder) => order?.email
const getTotal = (order: CrOrder | CrCart | Checkout): number => order?.total as number
const getShippingTotal = (order: CrOrder | CrCart) => order?.shippingTotal || 0
const getTaxTotal = (order: CrOrder | CrCart) => order?.taxTotal || 0
const getSubtotal = (order: CrOrder | CrCart): number => order?.subtotal as number
const getDiscountedSubtotal = (order: CrOrder | CrCart): number => {
  if (order?.discountedSubtotal && order?.discountedSubtotal != order?.subtotal)
    return order?.discountedSubtotal
  else return 0
}

const getItemsByFulfillment = (order: CrOrder, fulfillmentMethod: string): CrOrderItem[] => {
  return (
    (order?.items?.filter(
      (lineItem) => lineItem?.fulfillmentMethod === fulfillmentMethod
    ) as CrOrderItem[]) || []
  )
}
const getPickupItems = (order: CrOrder): CrOrderItem[] => {
  return getItemsByFulfillment(order, FulfillmentOptions.PICKUP)
}
const getShipItems = (order: CrOrder): CrOrderItem[] =>
  getItemsByFulfillment(order, FulfillmentOptions.SHIP)

const getCartItemId = (item: CrOrderItem | CrCartItem): string => item?.id || ''

const getProductQuantity = (item: CrOrderItem | CrCartItem): number => item?.quantity || 0

const getPurchaseLocation = (item: CrOrderItem | CrCartItem): string => item?.purchaseLocation || ''

const getTotalCollected = (order: CrOrder): number => order.totalCollected || 0

const getShippingContact = (order: CrOrder): CrContact =>
  order?.fulfillmentInfo?.fulfillmentContact as CrContact

const getShippingFirstName = (order: CrOrder): string =>
  addressGetters.getFirstName(order.fulfillmentInfo?.fulfillmentContact as CrContact)
const getShippingLastNameOrSurname = (order: CrOrder): string =>
  addressGetters.getLastNameOrSurname(order.fulfillmentInfo?.fulfillmentContact as CrContact)

const getShippingPhoneHome = (order: CrOrder): string =>
  addressGetters.getPhoneNumbers(order?.fulfillmentInfo?.fulfillmentContact as CrContact).home
const getShippingPhoneMobile = (order: CrOrder): string =>
  addressGetters.getPhoneNumbers(order?.fulfillmentInfo?.fulfillmentContact as CrContact).mobile
const getShippingPhoneWork = (order: CrOrder): string =>
  addressGetters.getPhoneNumbers(order?.fulfillmentInfo?.fulfillmentContact as CrContact).work
const getShippingAddress = (order: CrOrder) =>
  addressGetters.getAddress(order?.fulfillmentInfo?.fulfillmentContact?.address as CrAddress)

const getFulfillmentLocationCodes = (cartItems: (CrCartItem | CrOrderItem)[]): string => {
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

const getPaymentMethods = (order: CrOrder) => {
  const payments: CrPayment[] =
    (order?.payments?.filter(
      (payment) => payment?.status?.toLowerCase() === 'new'
    ) as CrPayment[]) || []

  if (!payments) return []

  return payments
    .filter((p: CrPayment) => p?.billingInfo?.card)
    .map((item: CrPayment) => {
      return {
        cardType: item?.billingInfo?.card?.paymentOrCardType,
        cardNumberPartOrMask: item?.billingInfo?.card?.cardNumberPartOrMask,
        expiry: item?.billingInfo?.card?.expireMonth + ' / ' + item?.billingInfo?.card?.expireYear,
      }
    }) as PaymentMethod[]
}

const getPersonalDetails = (order: CrOrder): CrContact => {
  return {
    email: getEmail(order),
    firstName: getShippingFirstName(order),
    lastNameOrSurname: getShippingLastNameOrSurname(order),
  }
}

const getShippingDetails = (order: CrOrder): ShippingDetails => {
  return {
    firstName: getShippingFirstName(order),
    lastNameOrSurname: getShippingLastNameOrSurname(order),
    shippingPhoneHome: getShippingPhoneHome(order),
    shippingPhoneMobile: getShippingPhoneMobile(order),
    shippingPhoneWork: getShippingPhoneWork(order),
    shippingAddress: getShippingAddress(order),
  }
}

const getBillingDetails = (order: CrOrder): BillingDetails => {
  const contact = order?.billingInfo?.billingContact as CrContact

  return {
    firstName: addressGetters.getFirstName(contact),
    lastNameOrSurname: addressGetters.getLastNameOrSurname(contact),
    billingAddress: addressGetters.getAddress(contact?.address as CrAddress),
  }
}

const getOrderSummary = (order: CrOrder): OrderSummary => {
  return {
    shippingTotal: getShippingTotal(order),
    subTotal: getSubtotal(order),
    taxTotal: getTaxTotal(order),
    total: getTotal(order),
    totalCollected: getTotalCollected(order),
  }
}

const getCheckoutDetails = (order: CrOrder): CheckoutDetails => {
  return {
    shipItems: getShipItems(order),
    pickupItems: getPickupItems(order),
    orderSummary: getOrderSummary(order),
    personalDetails: getPersonalDetails(order),
    shippingDetails: getShippingDetails(order),
    billingDetails: getBillingDetails(order),
    paymentMethods: getPaymentMethods(order),
  }
}

const getSelectedPaymentMethods = (order?: CrOrder | Checkout, paymentType?: string) => {
  return order?.payments?.filter(
    (each) => each?.paymentType === paymentType && each?.status === 'New'
  )
}

const getId = (order: CrOrder) => order.id as string

const getOrderNumber = (order: CrOrder) => order?.orderNumber

const getOrderTotal = (order: CrOrder) => order?.total || 0

const capitalizeWord = (word?: string) =>
  word && word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()

const getSubmittedDate = (order: CrOrder, withTimestamp?: boolean) =>
  order?.submittedDate
    ? withTimestamp
      ? (format(new Date(order?.submittedDate), DateFormat.DATE_FORMAT_WITH_TIME) as string)
      : (format(new Date(order?.submittedDate), DateFormat.DATE_FORMAT) as string)
    : (order?.submittedDate as string)

const getExpectedDeliveryDate = (items: CrOrderItem[]) => {
  return items[0]?.expectedDeliveryDate
    ? format(new Date(items[0]?.expectedDeliveryDate), DateFormat.DATE_FORMAT_WITH_TIME)
    : items[0]?.expectedDeliveryDate
}

const getProductNames = (order: CrOrder) => {
  const items = order?.items as CrOrderItem[]
  const productNames = items.map((item) => item?.product?.name)
  return productNames.join(', ')
}

const getOrderStatus = (order: CrOrder) => order?.status || ''

const getOrderPaymentCardDetails = (card: CrPaymentCard) => {
  return {
    paymentServiceCardId: cardGetters.getPaymentServiceCardId(card),
    cardNumberPartOrMask: cardGetters.getCardNumberPartOrMask(card),
    expireMonth: cardGetters.getExpireMonth(card),
    expireYear: cardGetters.getExpireYear(card),
  }
}

const getPaymentBillingDetails = (data?: CustomerContact | CrContact) => {
  return {
    firstName: addressGetters.getFirstName(data),
    lastNameOrSurname: addressGetters.getLastNameOrSurname(data),
    address: addressGetters.getAddress(data?.address as CuAddress | CrAddress | null),
    phoneNumbers: addressGetters.getPhoneNumbers(data),
    email: addressGetters.getEmail(data),
    id: addressGetters.getContactId(data),
  }
}

const getOrderPaymentBillingInfo = (billingInfo: CrBillingInfo) => {
  return {
    ...billingInfo,
    card: getOrderPaymentCardDetails(billingInfo.card as CrPaymentCard),
    billingContact: getPaymentBillingDetails(billingInfo.billingContact as CrContact),
  }
}
const getOrderPayments = (order: CrOrder) =>
  order?.payments?.map((payment) => {
    return {
      ...payment,
      billingInfo: getOrderPaymentBillingInfo(payment?.billingInfo as CrBillingInfo),
    }
  })

const getShippedTo = (order: CrOrder) =>
  order?.fulfillmentInfo?.fulfillmentContact
    ? capitalizeWord(order?.fulfillmentInfo?.fulfillmentContact?.firstName as string) +
      ' ' +
      capitalizeWord(order?.fulfillmentInfo?.fulfillmentContact?.lastNameOrSurname as string)
    : ''

// Order History Template
const getOrderHistoryDetails = (order: CrOrder) => {
  const id = getId(order)
  const orderNumber = getOrderNumber(order)
  const submittedDate = getSubmittedDate(order)
  const productNames = getProductNames(order)
  const orderTotal = getOrderTotal(order)
  const orderStatus = getOrderStatus(order)
  const orderPayments = getOrderPayments(order)
  const shipTo = getShippedTo(order)
  const shippingAddress = getShippingAddress(order)

  return {
    id,
    orderNumber,
    submittedDate,
    productNames,
    orderTotal,
    orderStatus,
    orderPayments,
    shipTo,
    shippingAddress,
  }
}

const getShippingMethodCode = (checkout: CrOrder): string =>
  checkout.fulfillmentInfo?.shippingMethodCode || ''

const getLocationCode = (order: CrOrder) => order?.locationCode

export const orderGetters = {
  getCheckoutItemCount,
  getSubmittedDate,
  getProductNames,
  getExpectedDeliveryDate,
  getOrderPayments,
  getShippedTo,
  getShippingAddress,
  getOrderHistoryDetails,
  getOrderPaymentCardDetails,
  getOrderNumber,
  getEmail,
  getTotal,
  getShippingTotal,
  getTaxTotal,
  getSubtotal,
  getDiscountedSubtotal,
  getPickupItems,
  getShipItems,
  getCartItemId,
  getProductQuantity,
  getPurchaseLocation,
  getFulfillmentLocationCodes,
  getCheckoutDetails,
  getShippingContact,
  getSelectedPaymentMethods,
  getShippingMethodCode,
  getLocationCode,
}
