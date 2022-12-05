export const multiShipCheckoutGroupingFragment = /* GraphQL */ `
  fragment multiShipCheckoutGroupingFragment on CheckoutGrouping {
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
`
export const baseMultiShipCheckoutFragment = /* GraphQL */ `
  fragment baseMultiShipCheckoutFragment on Checkout {
    id
    originalCartId
    submittedDate
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
`
