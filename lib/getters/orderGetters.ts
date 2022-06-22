import { format } from 'date-fns'

import { checkoutGetters } from './checkoutGetters'

import { CrOrderItem, Maybe, Order, PaymentCard } from '@/lib/gql/types'

const capitalizeWord = (word: Maybe<string> | undefined) =>
  word && word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()

const getSubmittedDate = (order: Order, withTimestamp?: boolean) => {
  return order?.submittedDate
    ? withTimestamp
      ? format(new Date(order?.submittedDate), 'MMMM D, YYYY, hh:mm a zzz')
      : format(new Date(order?.submittedDate), 'MMMM D, YYYY')
    : order?.submittedDate
}

const getExpectedDeliveryDate = (items: Maybe<CrOrderItem>[]) => {
  return items[0]?.expectedDeliveryDate
    ? format(new Date(items[0]?.expectedDeliveryDate), 'dddd, MMMM D, YYYY')
    : items[0]?.expectedDeliveryDate
}

const getProductNames = (order: Order) => {
  const items = order?.items as CrOrderItem[]
  const productNames = items.map((item) => item?.product?.name)
  return productNames.join(',')
}

const getOrderStatus = (order: Order) => order?.status

const getOrderPayments = (order: Order) => order?.payments
const getShippedTo = (order: Order) =>
  capitalizeWord(order?.fulfillmentInfo?.fulfillmentContact?.firstName) +
  ' ' +
  capitalizeWord(order?.fulfillmentInfo?.fulfillmentContact?.lastNameOrSurname)

const getShippingAddress = (order: Order) => order?.fulfillmentInfo?.fulfillmentContact

const getBillingAddress = (order: Order) => order?.billingInfo?.billingContact

const getCardLastFourDigits = (card: Maybe<PaymentCard> | undefined) => {
  const cardNumberLength = card?.cardNumberPartOrMask?.length as number
  return card?.cardNumberPartOrMask?.slice(cardNumberLength - 4, cardNumberLength)
}

const getCardExpireMonth = (card: Maybe<PaymentCard> | undefined): number =>
  card?.expireMonth as number

const getCardExpireYear = (card: Maybe<PaymentCard> | undefined): number =>
  card?.expireYear as number

const getCardPaymentDetails = (card: Maybe<PaymentCard> | undefined) => {
  return {
    cardLastFourDigits: getCardLastFourDigits(card),
    expireMonth: getCardExpireMonth(card),
    expireYear: getCardExpireYear(card),
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
  getCardLastFourDigits,
  getCardExpireMonth,
  getCardExpireYear,
  getCardPaymentDetails,
  ...checkoutGetters,
}
