export const cartItemDetails = /* GraphQL */ `
  fragment cartItemDetails on CrCartItem {
    id
    fulfillmentMethod
    subscription {
      frequency {
        unit
        value
      }
    }
    purchaseLocation
    fulfillmentLocationCode
    productDiscounts {
      discountQuantity
      productQuantity
      impactPerUnit
      impact
      excluded
      discount {
        id
        name
        hasMultipleTargetProducts
      }
    }
    discountTotal
    discountedTotal
    subtotal
    total
    product {
      productCode
      productType
      variationProductCode
      fulfillmentTypesSupported
      measurements {
        height {
          unit
          value
        }
        width {
          unit
          value
        }
        length {
          unit
          value
        }
        weight {
          unit
          value
        }
      }
      name
      description
      imageUrl
      options {
        attributeFQN
        name
        value
      }
      properties {
        attributeFQN
        name
        values {
          value
        }
      }
      sku
      price {
        price
        salePrice
        tenantOverridePrice
      }
      categories {
        id
      }
    }
    quantity
  }
`

export const cartDetails = /* GraphQL */ `
  ${cartItemDetails}

  fragment cartDetails on CrCart {
    id
    data
    invalidCoupons {
      couponCode
      reason
    }
    couponCodes
    orderDiscounts {
      impact
      discount {
        id
        name
      }
      couponCode
    }
    total
    subtotal
    discountedSubtotal
    shippingTotal
    taxTotal
    items {
      ...cartItemDetails
    }
  }
`
