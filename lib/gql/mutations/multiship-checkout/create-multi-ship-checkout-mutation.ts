import {
  contactForOrdersFragment,
  checkoutLineItemFragment,
  checkoutPaymentFragment,
  multiShipCheckoutGroupingFragment,
} from '@/lib/gql/fragments'

const createCheckoutMutation = /* GraphQL */ `
  mutation createCheckout($cartId: String) {
    createCheckout(cartId: $cartId) {
      id
      originalCartId
      submittedDate
      items {
        destinationId
        ...checkoutLineItemFragment
      }
      groupings {
        ...multiShipCheckoutGroupingFragment
      }
      destinations {
        id
        destinationContact {
          ...contactForOrdersFragment
        }
        isDestinationCommercial
        data
      }
      payments {
        ...checkoutPaymentFragment
      }
      amountRemainingForPayment
      acceptsMarketing
      customerAccountId
      email
      currencyCode
      priceListCode
      attributes {
        fullyQualifiedName
        attributeDefinitionId
        values
      }
      availableActions
      data
      taxData
      channelCode
      locationCode
      orderDiscounts {
        impact
        discount {
          id
          name
        }
        couponCode
      }
      couponCodes
      invalidCoupons {
        couponCode
        reason
      }
      suggestedDiscounts {
        productCode
        autoAdd
        discountId
        hasMultipleProducts
        hasOptions
      }
      discountThresholdMessages {
        discountId
        message
        thresholdValue
        showOnCheckout
        showInCart
        requiresCouponCode
      }
      dutyTotal
      feeTotal
      subTotal
      itemLevelProductDiscountTotal
      orderLevelProductDiscountTotal
      itemTaxTotal
      itemTotal
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
      total
    }
  }
  ${checkoutLineItemFragment}
  ${multiShipCheckoutGroupingFragment}
  ${checkoutPaymentFragment}
  ${contactForOrdersFragment}
`

export default createCheckoutMutation
