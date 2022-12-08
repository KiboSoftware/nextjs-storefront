import {
  baseCheckoutFragment,
  checkoutLineItemFragment,
  fullfillmentInfoFragment,
} from '../../fragments'

const setPersonalInfo = /* GraphQL */ `
  mutation setPersonalInfo($orderId: String!, $updateMode: String, $orderInput: CrOrderInput) {
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
export default setPersonalInfo
