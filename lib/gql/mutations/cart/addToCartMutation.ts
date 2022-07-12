const addToCartMutation = /* GraphQL */ `
  mutation addToCart($productToAdd: CartItemInput!) {
    addItemToCurrentCart(cartItemInput: $productToAdd) {
      id
      total
      itemTaxTotal
      subtotal
      quantity
      fulfillmentMethod
      product {
        productCode
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
  }
`

export default addToCartMutation
