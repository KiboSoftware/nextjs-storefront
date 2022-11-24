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
