const addToCartMutation = /* GraphQL */ `
  mutation addToCart($productToAdd: CrCartItemInput!) {
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
          shopperEnteredValue
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
      subscription {
        frequency {
          unit
          value
        }
      }
    }
  }
`

export default addToCartMutation
