import { CrOrderItem, Maybe, Order } from '../gql/types'
// import { format } from 'date-fns'

const capitalizeWord = (word: Maybe<string> | undefined) =>
  word && word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()

const getOrderNumber = (order: Order) => order?.orderNumber

const getId = (order: Order) => order?.id

// const getSubmittedDate = (order: Order, withTimestamp?: boolean) =>
//   order?.submittedDate
//     ? withTimestamp
//       ? format(new Date(order?.submittedDate), 'MMMM dd, yyyy, hh:mm a zzz')
//       : format(new Date(order?.submittedDate), 'MMMM dd, yyyy')
//     : order?.submittedDate

// const getExpectedDeliveryDate = (order: Order) => {
//   const items = order?.items as CrOrderItem[]
//   return items[0]?.expectedDeliveryDate
//     ? format(new Date(items[0]?.expectedDeliveryDate), 'EEEE, MMMM dd, yyyy')
//     : items[0]?.expectedDeliveryDate
// }

const getProductNames = (order: Order) => {
  const items = order?.items as CrOrderItem[]
  const productNames = items.map((item) => item?.product?.name)
  return productNames.join(',')
}

const getOrderTotal = (order: Order) => order?.total

const getOrderStatus = (order: Order) => order?.status

const getOrderPayments = (order: Order) => order?.payments
const getShippedTo = (order: Order) =>
  capitalizeWord(order?.fulfillmentInfo?.fulfillmentContact?.firstName) +
  ' ' +
  capitalizeWord(order?.fulfillmentInfo?.fulfillmentContact?.lastNameOrSurname)

const getShippingAddress = (order: Order) => order?.fulfillmentInfo?.fulfillmentContact

export const orderGetters = {
  getOrderNumber,
  getId,
  // getSubmittedDate,
  getProductNames,
  getOrderTotal,
  getOrderStatus,
  // getExpectedDeliveryDate,
  getOrderPayments,
  getShippedTo,
  getShippingAddress,
}
