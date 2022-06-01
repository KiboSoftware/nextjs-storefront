import {
  baseCheckoutFragment,
  checkoutLineItemFragment,
  fullfillmentInfoFragment,
} from '../../fragments'

export const updateOrder = /* GraphQL */ `
  mutation updatePersonalDetails($orderId: String!, $updateMode: String, $orderInput: OrderInput) {
    checkout: updateOrder(orderId: $orderId, updateMode: $updateMode, orderInput: $orderInput) {
      ...baseCheckoutFragment
      items {
        ...checkoutLineItemFragment
      }
      fulfillmentInfo {
        ...fullfillmentInfoFragment
      }
    }
  }

  ${baseCheckoutFragment}
  ${checkoutLineItemFragment}
  ${fullfillmentInfoFragment}
`
