import {
  checkoutLineItemFragment,
  destinationContactFragment,
  checkoutGroupingsFragment,
  baseMultiShipCheckoutFragment,
} from '../../fragments'

const getMultiShipCheckoutQuery = /* GraphQL */ `
  query getMultiShipCheckout($checkoutId: String!) {
    checkout(checkoutId: $checkoutId) {
      ...baseMultiShipCheckoutFragment
      couponCodes
      items {
        destinationId
        ...checkoutLineItemFragment
      }
      destinations {
        id
        destinationContact {
          ...destinationContactFragment
        }
      }
      groupings {
        id
        destinationId
        orderItemIds
        fulfillmentMethod
        shippingMethodCode
        shippingMethodName
        dutyTotal
        shippingSubTotal
        itemLevelShippingDiscountTotal
        orderLevelShippingDiscountTotal
        shippingTaxTotal
        shippingTotal
        handlingSubTotal
        itemLevelHandlingDiscountTotal
        orderLevelHandlingDiscountTotal
        handlingTaxTotal
        handlingTotal
      }
    }
  }
  ${checkoutLineItemFragment}
  ${destinationContactFragment}
  ${checkoutGroupingsFragment}
  ${baseMultiShipCheckoutFragment}
`
export default getMultiShipCheckoutQuery
