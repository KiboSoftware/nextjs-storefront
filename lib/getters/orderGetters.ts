import { format } from 'date-fns'

import { addressGetters } from './addressGetters'
import { cardGetters } from './cardGetters'
import { FulfillmentOptions, DateFormat, PaymentType } from '../constants'
import {
  ShippingDetails,
  BillingDetails,
  CheckoutDetails,
  OrderSummary,
  PaymentMethod,
} from '../types/OrderGettersTypes'

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

const getTotal = (order: CrOrder | CrCart | Checkout): number => (order?.total as number) || 0

const getShippingSubTotal = (order: CrOrder | CrCart | Checkout) => order?.shippingSubTotal || 0

const getShippingTotal = (order: CrOrder | CrCart) => order?.shippingTotal || 0
const getShippingTaxTotal = (order: CrOrder | CrCart | Checkout) => order?.shippingTaxTotal || 0
const getShippingDiscounts = (order: CrOrder) =>
  order?.shippingDiscounts?.map((discount) => {
    return {
      id: discount?.discount?.discount?.id,
      name: discount?.discount?.discount?.name,
      impact: (discount?.discount?.impact as number) * -1,
    }
  })

const getHandlingTotal = (order: CrOrder | CrCart | Checkout) => order?.handlingTotal || 0

const getHandlingSubTotal = (order: CrOrder | CrCart | Checkout) => order?.handlingSubTotal || 0

const getHandlingTaxTotal = (order: CrOrder | CrCart | Checkout) => order?.handlingTaxTotal || 0
const getHandlingDiscounts = (order: CrOrder) =>
  order?.handlingDiscounts?.map((discount) => {
    return {
      id: discount?.discount?.id,
      name: discount?.discount?.name,
      impact: (discount?.impact as number) * -1,
    }
  })
const getTaxTotal = (order: CrOrder | CrCart) => (order?.taxTotal as number) || 0

const getSubtotal = (order: CrOrder | CrCart | Checkout): number =>
  ((order as Checkout)?.subTotal as number) ||
  ((order as CrOrder | CrCart)?.subtotal as number) ||
  0

const getDiscountedSubtotal = (order: CrOrder | CrCart): number => {
  if (order?.discountedSubtotal && order?.discountedSubtotal != order?.subtotal)
    return order?.discountedSubtotal
  else return 0
}

const getOrderDiscounts = (order: CrOrder) =>
  order?.orderDiscounts?.map((discount) => {
    return {
      id: discount?.discount?.id,
      name: discount?.discount?.name,
      impact: (discount?.impact as number) * -1,
    }
  })
const getLineItemSubtotal = (order: CrOrder | CrCart) =>
  (order?.lineItemSubtotalWithOrderAdjustments as number) || 0

const getItemTaxTotal = (order: CrOrder | CrCart) => (order?.itemTaxTotal as number) || 0

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

const getDigitalItems = (order: CrOrder): CrOrderItem[] =>
  getItemsByFulfillment(order, FulfillmentOptions.DIGITAL)

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

const getPurchaseOrderPaymentMethods = (order: CrOrder) => {
  const payments: CrPayment[] =
    (order?.payments?.filter(
      (payment) => payment?.status?.toLowerCase() === 'new'
    ) as CrPayment[]) || []
  if (!payments) return []

  return payments
    .filter((p: CrPayment) => p?.billingInfo?.purchaseOrder)
    .map((item: CrPayment) => {
      return {
        purchaseOrderNumber: item?.billingInfo?.purchaseOrder?.purchaseOrderNumber,
        paymentTerms: item?.billingInfo?.purchaseOrder?.paymentTerm?.code,
      }
    })
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
  const activePayment = getSelectedPaymentType(order, PaymentType.CREDITCARD)
  const contact =
    order?.billingInfo?.billingContact || (activePayment?.billingInfo?.billingContact as CrContact)
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
    discountedSubtotal: getDiscountedSubtotal(order),
  }
}

const getCheckoutDetails = (order: CrOrder): CheckoutDetails => {
  return {
    shipItems: getShipItems(order),
    pickupItems: getPickupItems(order),
    digitalItems: getDigitalItems(order),
    orderSummary: getOrderSummary(order),
    personalDetails: getPersonalDetails(order),
    shippingDetails: getShippingDetails(order),
    billingDetails: getBillingDetails(order),
    paymentMethods: getPaymentMethods(order),
    purchaseOrderPaymentMethods: getPurchaseOrderPaymentMethods(order),
  }
}

const getSelectedPaymentType = (order?: CrOrder | Checkout, paymentType?: string): CrPayment => {
  return order?.payments?.find((each) => {
    if (paymentType) {
      return each?.paymentType === paymentType && each?.status?.toLowerCase() === 'new'
    }

    return each?.status?.toLowerCase() === 'new'
  }) as CrPayment
}

const getId = (order: CrOrder) => order.id as string

const getOrderNumber = (order: CrOrder) => order?.orderNumber

const getOrderTotal = (order: CrOrder) => order?.total || 0

const capitalizeWord = (word?: string) =>
  word && word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()

const getSubmittedDate = (order: CrOrder, withTimestamp?: boolean) =>
  order?.submittedDate
    ? withTimestamp
      ? format(new Date(order?.submittedDate), DateFormat.DATE_FORMAT_WITH_TIME)
      : format(new Date(order?.submittedDate), DateFormat.DATE_FORMAT)
    : order?.submittedDate

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
    cardType: cardGetters.getCardType(card),
    isCardInfoSaved: card?.isCardInfoSaved,
  }
}

const getOrderPurchaseOrderDetails = (purchaseOrder: any) => {
  return {
    purchaseOrderNumber: purchaseOrder?.purchaseOrderNumber,
    paymentTerm: purchaseOrder?.paymentTerm,
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
    card: getOrderPaymentCardDetails(billingInfo?.card as CrPaymentCard),
    billingContact: getPaymentBillingDetails(billingInfo?.billingContact as CrContact),
  }
}
const getNewOrderPayments = (order: CrOrder) => {
  const payments: CrPayment[] =
    (order?.payments?.filter(
      (payment) => payment?.status?.toLowerCase() === 'new'
    ) as CrPayment[]) || []
  return payments?.map((payment) => {
    return {
      ...payment,
      billingInfo: getOrderPaymentBillingInfo(payment?.billingInfo as CrBillingInfo),
    }
  })
}

const getFinalOrderPayment = (order: CrOrder) => {
  if (!order?.payments?.length) return

  const latestPayment = order?.payments && order?.payments[order?.payments?.length - 1]
  return {
    payment: latestPayment,
    billingInfo: getOrderPaymentBillingInfo(latestPayment?.billingInfo as CrBillingInfo),
  }
}

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
  const orderPayments = getNewOrderPayments(order)
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
  getNewOrderPayments,
  getShippedTo,
  getShippingAddress,
  getOrderHistoryDetails,
  getOrderPaymentCardDetails,
  getOrderNumber,
  getEmail,
  getTotal,
  getShippingTotal,
  getShippingSubTotal,
  getShippingTaxTotal,
  getTaxTotal,
  getSubtotal,
  getDiscountedSubtotal,
  getOrderDiscounts,
  getPickupItems,
  getShipItems,
  getCartItemId,
  getProductQuantity,
  getPurchaseLocation,
  getFulfillmentLocationCodes,
  getCheckoutDetails,
  getShippingContact,
  getSelectedPaymentType,
  getShippingMethodCode,
  getLocationCode,
  getPaymentMethods,
  getOrderStatus,
  getFinalOrderPayment,
  getOrderPurchaseOrderDetails,
  getHandlingTotal,
  getHandlingSubTotal,
  getHandlingTaxTotal,
  getHandlingDiscounts,
  getLineItemSubtotal,
  getShippingDiscounts,
  getItemTaxTotal,
  getDigitalItems,
}
