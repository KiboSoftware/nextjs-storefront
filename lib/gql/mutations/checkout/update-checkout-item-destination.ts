import {
  baseCheckoutFragment,
  checkoutLineItemFragment,
  checkoutPaymentFragment,
  fullfillmentInfoFragment,
} from '../../fragments'
const updateCheckoutItemDestination = /* GraphQL */ `
  mutation updateCheckoutItemDestination(
    $checkoutId: String!
    $itemId: String!
    $destinationId: String!
  ) {
    updateCheckoutItemDestination(
      checkoutId: $checkoutId
      itemId: $itemId
      destinationId: $destinationId
    ) {
      ...baseCheckoutFragment
      items {
        ...checkoutLineItemFragment
      }
      fulfillmentInfo {
        ...fullfillmentInfoFragment
      }
      payments {
        ...checkoutPaymentFragment
      }
    }
  }
  ${baseCheckoutFragment}
  ${checkoutLineItemFragment}
  ${fullfillmentInfoFragment}
  ${checkoutPaymentFragment}
`

export default updateCheckoutItemDestination
