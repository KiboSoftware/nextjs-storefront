import { format } from 'date-fns'

import { FulfillmentOptions } from '../constants'
import { addressGetters } from './addressGetters'
import { cardGetters } from './cardGetters'

import type {
  CrOrderItem,
  Order,
  Payment,
  Maybe,
  CrAddress,
  Contact,
  CartItem,
  Cart,
  BillingInfo,
  PaymentCard,
  CustomerContact,
  CuAddress,
} from '@/lib/gql/types'

interface ContactDetails {
  firstName: string
  lastNameOrSurname: string
}

interface ShippingDetails extends ContactDetails {
  shippingPhoneHome: string
  shippingPhoneMobile: string
  shippingPhoneWork: string
  shippingAddress: CrAddress
}

interface BillingDetails extends ContactDetails {
  billingPhoneHome?: string
  billingPhoneMobile?: string
  billingPhoneWork?: string
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

const getEmail = (order: Order) => order?.email
const getTotal = (order: Order | Cart): number => order?.total as number
const getShippingTotal = (order: Order | Cart) => order?.shippingTotal || 0
const getTaxTotal = (order: Order | Cart) => order?.taxTotal || 0
const getSubtotal = (order: Order | Cart): number => order?.subtotal as number
const getDiscountedSubtotal = (order: Order | Cart): number => {
  if (order?.discountedSubtotal && order?.discountedSubtotal != order?.subtotal)
    return order?.discountedSubtotal
  else return 0
}

const getItemsByFulfillment = (order: Order, fulfillmentMethod: string): CrOrderItem[] => {
  return (
    (order?.items?.filter(
      (lineItem) => lineItem?.fulfillmentMethod === fulfillmentMethod
    ) as CrOrderItem[]) || []
  )
}
const getPickupItems = (order: Order): CrOrderItem[] => {
  return getItemsByFulfillment(order, FulfillmentOptions.PICKUP)
}
const getShipItems = (order: Order): CrOrderItem[] =>
  getItemsByFulfillment(order, FulfillmentOptions.SHIP)

const getCartItemId = (item: CrOrderItem | CartItem): string => item?.id || ''

const getProductQuantity = (item: CrOrderItem | CartItem): number => item?.quantity || 0

const getPurchaseLocation = (item: CrOrderItem | CartItem): string => item?.purchaseLocation || ''

const getTotalCollected = (order: Order): number => order.totalCollected || 0

const getShippingContact = (order: Order): Contact =>
  order?.fulfillmentInfo?.fulfillmentContact as Contact

const getShippingFirstName = (order: Order): string =>
  addressGetters.getFirstName(order.fulfillmentInfo?.fulfillmentContact as Contact)
const getShippingLastNameOrSurname = (order: Order): string =>
  addressGetters.getLastNameOrSurname(order.fulfillmentInfo?.fulfillmentContact as Contact)

const getShippingPhoneHome = (order: Order): string =>
  addressGetters.getPhoneNumbers(
    order?.fulfillmentInfo?.fulfillmentContact?.phoneNumbers as Contact
  ).home
const getShippingPhoneMobile = (order: Order): string =>
  addressGetters.getPhoneNumbers(
    order?.fulfillmentInfo?.fulfillmentContact?.phoneNumbers as Contact
  ).mobile
const getShippingPhoneWork = (order: Order): string =>
  addressGetters.getPhoneNumbers(
    order?.fulfillmentInfo?.fulfillmentContact?.phoneNumbers as Contact
  ).work
const getShippingAddress = (order: Order) =>
  addressGetters.getAddress(order?.fulfillmentInfo?.fulfillmentContact?.address as CrAddress)

const getFulfillmentLocationCodes = (cartItems: (CartItem | CrOrderItem)[]): string => {
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

const getPaymentMethods = (order: Order) => {
  const payments: Payment[] =
    (order?.payments?.filter((payment) => payment?.status?.toLowerCase() === 'new') as Payment[]) ||
    []

  if (!payments) return []

  return payments
    .filter((p: Payment) => p?.billingInfo?.card)
    .map((item: Payment) => {
      return {
        cardType: item?.billingInfo?.card?.paymentOrCardType,
        cardNumberPartOrMask: item?.billingInfo?.card?.cardNumberPartOrMask,
        expiry: item?.billingInfo?.card?.expireMonth + ' / ' + item?.billingInfo?.card?.expireYear,
      }
    }) as PaymentMethod[]
}

const getPersonalDetails = (order: Order): Contact => {
  return {
    email: getEmail(order),
    firstName: getShippingFirstName(order),
    lastNameOrSurname: getShippingLastNameOrSurname(order),
  }
}

const getShippingDetails = (order: Order): ShippingDetails => {
  return {
    firstName: getShippingFirstName(order),
    lastNameOrSurname: getShippingLastNameOrSurname(order),
    shippingPhoneHome: getShippingPhoneHome(order),
    shippingPhoneMobile: getShippingPhoneMobile(order),
    shippingPhoneWork: getShippingPhoneWork(order),
    shippingAddress: getShippingAddress(order),
  }
}

const getBillingDetails = (order: Order): BillingDetails => {
  const contact = order?.billingInfo?.billingContact as Contact

  return {
    firstName: addressGetters.getFirstName(contact),
    lastNameOrSurname: addressGetters.getLastNameOrSurname(contact),
    billingAddress: addressGetters.getAddress(contact.address as CrAddress),
  }
}

const getOrderSummary = (order: Order): OrderSummary => {
  return {
    shippingTotal: getShippingTotal(order),
    subTotal: getSubtotal(order),
    taxTotal: getTaxTotal(order),
    total: getTotal(order),
    totalCollected: getTotalCollected(order),
  }
}

const getCheckoutDetails = (order: Order): CheckoutDetails => {
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

const getSelectedPaymentMethods = (order?: Order, paymentType?: string) => {
  return order?.payments?.filter(
    (each) => each?.paymentType === paymentType && each?.status === 'New'
  )
}

const getId = (order: Order) => order.id as string

const getOrderNumber = (order: Order) => order?.orderNumber

const getOrderTotal = (order: Order) => order?.total || 0

const capitalizeWord = (word?: string) =>
  word && word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()

const getSubmittedDate = (order: Order, withTimestamp?: boolean) =>
  order?.submittedDate
    ? withTimestamp
      ? (format(new Date(order?.submittedDate), 'MMMM dd, yyyy, hh:mm a zzz') as string)
      : (format(new Date(order?.submittedDate), 'MMMM dd, yyyy') as string)
    : (order?.submittedDate as string)

const getExpectedDeliveryDate = (items: CrOrderItem[]) => {
  return items[0]?.expectedDeliveryDate
    ? format(new Date(items[0]?.expectedDeliveryDate), 'MMMM dd, yyyy, hh:mm a zzz')
    : items[0]?.expectedDeliveryDate
}

const getProductNames = (order: Order) => {
  const items = order?.items as CrOrderItem[]
  const productNames = items.map((item) => item?.product?.name)
  return productNames.join(', ')
}

const getOrderStatus = (order: Order) => order?.status || ''

const getOrderPaymentCardDetails = (card: PaymentCard) => {
  return {
    paymentServiceCardId: cardGetters.getPaymentServiceCardId(card),
    cardNumberPartOrMask: cardGetters.getCardNumberPartOrMask(card),
    expireMonth: cardGetters.getExpireMonth(card),
    expireYear: cardGetters.getExpireYear(card),
  }
}

const getPaymentBillingDetails = (data?: CustomerContact | Contact) => {
  return {
    firstName: addressGetters.getFirstName(data),
    lastNameOrSurname: addressGetters.getLastNameOrSurname(data),
    address: addressGetters.getAddress(data?.address as CuAddress | CrAddress | null),
    phoneNumbers: addressGetters.getPhoneNumbers(data),
    email: addressGetters.getEmail(data),
    id: addressGetters.getContactId(data),
  }
}

const getOrderPaymentBillingInfo = (billingInfo: BillingInfo) => {
  return {
    ...billingInfo,
    card: getOrderPaymentCardDetails(billingInfo.card as PaymentCard),
    billingContact: getPaymentBillingDetails(billingInfo.billingContact as Contact),
  }
}
const getOrderPayments = (order: Order) =>
  order?.payments?.map((payment) => {
    return {
      ...payment,
      billingInfo: getOrderPaymentBillingInfo(payment?.billingInfo as BillingInfo),
    }
  })

const getShippedTo = (order: Order) =>
  order?.fulfillmentInfo?.fulfillmentContact
    ? capitalizeWord(order?.fulfillmentInfo?.fulfillmentContact?.firstName as string) +
      ' ' +
      capitalizeWord(order?.fulfillmentInfo?.fulfillmentContact?.lastNameOrSurname as string)
    : ''

// Order History Template
const getOrderHistoryDetails = (order: Order) => {
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

const getShippingMethodCode = (checkout: Order): string =>
  checkout.fulfillmentInfo?.shippingMethodCode || ''

export const orderGetters = {
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
}
