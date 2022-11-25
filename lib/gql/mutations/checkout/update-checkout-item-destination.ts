import { checkoutLineItemFragment, destinationContactFragment } from '../../fragments'
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
      id
      siteId
      tenantId
      number
      originalCartId
      submittedDate
      type
      feeTotal
      subTotal
      itemTaxTotal
      itemTotal
      shippingSubTotal
      shippingTaxTotal
      itemLevelShippingDiscountTotal
      orderLevelShippingDiscountTotal
      shippingTotal
      handlingSubTotal
      itemLevelHandlingDiscountTotal
      orderLevelHandlingDiscountTotal
      handlingTaxTotal
      handlingTotal
      total
      amountRemainingForPayment
      itemLevelProductDiscountTotal
      orderLevelProductDiscountTotal
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
`

export default updateCheckoutItemDestination
