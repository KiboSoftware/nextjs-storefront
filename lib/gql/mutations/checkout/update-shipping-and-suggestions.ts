import {
  baseCheckoutFragment,
  checkoutLineItemFragment,
  fullfillmentInfoFragment,
} from '../../fragments'

const updateShippingAndSuggestions = /* GraphQL */ `
  mutation updateShippingAndSuggestions(
    $orderId: String!
    $orderItemId: String!
    $updateMode: String
    $itemFulfillmentInfoInput: ItemFulfillmentInfoInput
  ) {
    updateShippingAndSuggestions(
      orderId: $orderId
      orderItemId: $orderItemId
      updateMode: $updateMode
      itemFulfillmentInfoInput: $itemFulfillmentInfoInput
    ) {
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
export default updateShippingAndSuggestions
