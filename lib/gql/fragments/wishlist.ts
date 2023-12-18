export const wishlistItem = `
fragment wishlistItem on CrWishlistItem {
    id
    quantity
    total
    subtotal
    discountTotal
    discountedTotal
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
    product {
        productCode
        name
        description
        imageUrl
        variationProductCode
        fulfillmentTypesSupported
        options {
            attributeFQN
            name
            value
        }
        price {
            price
            salePrice
        }
        properties {
          attributeFQN
          values {
            value
            stringValue
          }
       }
    }
}

`

export const wishlist = /* GraphQL */ `
  fragment wishlist on CrWishlist {
    customerAccountId
    auditInfo {
      createDate
      createBy
      updateDate
      updateBy
    }
    name
    id
    items {
      ...wishlistItem
    }
  }

  ${wishlistItem}
`
