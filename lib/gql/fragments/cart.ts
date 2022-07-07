export const cartItemDetails = /* GraphQL */ `
  fragment cartItemDetails on CartItem {
    id
    fulfillmentMethod
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

  fragment cartDetails on Cart {
    id
    invalidCoupons {
      couponCode
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
    shippingTotal
    taxTotal
    items {
      ...cartItemDetails
    }
  }
`
