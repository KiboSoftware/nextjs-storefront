import {
  contactForOrdersFragment,
  checkoutLineItemFragment,
  checkoutPaymentFragment,
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
        id
        destinationId
        fulfillmentMethod
        orderItemIds
        shippingMethodCode
        shippingMethodName
        standaloneGroup
        shippingDiscounts {
          methodCode
          discount {
            impact
            discount {
              id
              name
            }
            couponCode
          }
        }
        handlingDiscounts {
          impact
          discount {
            id
            name
          }
          couponCode
        }
        dutyAmount
        dutyTotal
        shippingAmount
        shippingSubTotal
        itemLevelShippingDiscountTotal
        orderLevelShippingDiscountTotal
        shippingTax
        shippingTaxTotal
        shippingTotal
        handlingAmount
        handlingSubTotal
        itemLevelHandlingDiscountTotal
        orderLevelHandlingDiscountTotal
        handlingTax
        handlingTaxTotal
        handlingTotal
        taxData
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
      customerTaxId
      isTaxExempt
      currencyCode
      priceListCode
      attributes {
        fullyQualifiedName
        attributeDefinitionId
        values
      }
      shopperNotes {
        giftMessage
        comments
        deliveryInstructions
      }
      availableActions
      data
      taxData
      channelCode
      locationCode
      ipAddress
      sourceDevice
      visitId
      webSessionId
      customerInteractionType
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
  ${checkoutPaymentFragment}
  ${contactForOrdersFragment}
`

export default createCheckoutMutation
