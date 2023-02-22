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
      couponCode
    }
    subtotal
    total
    product {
      productCode
      variationProductCode
      fulfillmentTypesSupported
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
