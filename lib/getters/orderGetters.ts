import { format } from 'date-fns'

import { billingGetters } from './billingGetters'
import { checkoutGetters } from './checkoutGetters'

import type { LocationCustom } from '../types'
import type {
  BillingInfo,
  Contact,
  CrOrderItem,
  Maybe,
  Order,
  PaymentCard,
  CrAddress,
} from '@/lib/gql/types'

const getId = (order: Order) => order.id as string

const getOrderNumber = (order: Order) => order?.orderNumber

const getOrderTotal = (order: Order) => order?.total || 0

const capitalizeWord = (word: Maybe<string> | undefined) =>
  word && word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()

const getSubmittedDate = (order: Order, withTimestamp?: boolean) =>
  order?.submittedDate
    ? withTimestamp
      ? (format(new Date(order?.submittedDate), 'MMMM dd, yyyy, hh:mm a zzz') as string)
      : (format(new Date(order?.submittedDate), 'MMMM dd, yyyy') as string)
    : (order?.submittedDate as string)

const getExpectedDeliveryDate = (items: Maybe<CrOrderItem>[]) => {
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
    paymentServiceCardId: card?.paymentServiceCardId || '',
    cardNumberPartOrMask: card?.cardNumberPartOrMask || '',
    expireMonth: card?.expireMonth || 0,
    expireYear: card?.expireYear || 0,
    cardType: card?.paymentOrCardType || '',
  }
}
const getOrderPaymentBillingInfo = (billingInfo: BillingInfo) => {
  return {
    ...billingInfo,
    card: getOrderPaymentCardDetails(billingInfo.card as PaymentCard),
    billingContact: billingGetters.getBillingDetails(billingInfo.billingContact as Contact),
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
    ? capitalizeWord(order?.fulfillmentInfo?.fulfillmentContact?.firstName) +
      ' ' +
      capitalizeWord(order?.fulfillmentInfo?.fulfillmentContact?.lastNameOrSurname)
    : ''

const getShippingAddress = (order: Order) => order?.fulfillmentInfo?.fulfillmentContact

const getBillingAddress = (order: Order) => order?.billingInfo?.billingContact

const getStorePickupAddress = (
  pickupAddresses: LocationCustom[],
  fulfillmentLocationCode: string
): CrAddress =>
  pickupAddresses?.find((store) => store.code === fulfillmentLocationCode)?.fullAddress as CrAddress

const getCardExpireMonth = (card: PaymentCard): number =>
  getOrderPaymentCardDetails(card).expireMonth

const getCardLastFourDigits = (card: Maybe<PaymentCard> | undefined) => {
  const cardNumberLength = card?.cardNumberPartOrMask?.length as number
  return card?.cardNumberPartOrMask?.slice(cardNumberLength - 4, cardNumberLength)
}

const getCardExpireYear = (card: PaymentCard): number => getOrderPaymentCardDetails(card).expireYear

const getOrderDetails = (order: Order) => {
  const id = getId(order)
  const orderNumber = getOrderNumber(order)
  const submittedDate = getSubmittedDate(order)
  const productNames = getProductNames(order)
  const orderTotal = getOrderTotal(order)
  const orderStatus = getOrderStatus(order)
  const orderPaymets = getOrderPayments(order)
  const shipTo = getShippedTo(order)
  const shippingAddress = getShippingAddress(order)

  return {
    id,
    orderNumber,
    submittedDate,
    productNames,
    orderTotal,
    orderStatus,
    orderPaymets,
    shipTo,
    shippingAddress,
  }
}

export const orderGetters = {
  getSubmittedDate,
  getProductNames,
  getOrderStatus,
  getExpectedDeliveryDate,
  getOrderPayments,
  getShippedTo,
  getShippingAddress,
  getBillingAddress,
  getStorePickupAddress,
  getCardLastFourDigits,
  getCardExpireMonth,
  getCardExpireYear,
  getOrderDetails,
  getOrderPaymentCardDetails,
  getOrderPaymentBillingInfo,
  ...checkoutGetters,
}
