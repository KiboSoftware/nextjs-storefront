import { baseOrderFragment, orderItemFragment, orderPaymentFragment } from '../fragments/orders'

const getOrdersQuery = /* GraphQL */ `
  query getOrders($filter: String, $startIndex: Int, $pageSize: Int) {
    orders(filter: $filter, startIndex: $startIndex, pageSize: $pageSize) {
      pageCount
      items {
        ...baseOrderFragment
        items {
          ...orderItemFragment
        }
        payments {
          ...orderPaymentFragment
        }
      }
    }
  }
  ${orderItemFragment}
  ${baseOrderFragment}
  ${orderPaymentFragment}
`

export default getOrdersQuery
