import { NextApiRequest, NextApiResponse } from 'next'

import { getCart } from '@/lib/api/operations/'
import { fetcher, getAdditionalHeader } from '@/lib/api/util'

// Configure your GraphQL endpoint

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }
  try {
    // Extract the body from the incoming POST request
    const { productToAdd } = req.body

    const response = await getCart(req as NextApiRequest, res as NextApiResponse)

    const cartId = response?.currentCart?.id
    // Prepare the GraphQL mutation
    const addToCartMutation = /* GraphQL */ `
      mutation addToCart($id: String!, $productToAdd: CrCartItemInput!) {
        addItemToCart(cartId: $id, cartItemInput: $productToAdd) {
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
              tenantOverridePrice
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
    const headers = req ? getAdditionalHeader(req) : {}
    const addToCartResponse = await fetcher(
      {
        query: addToCartMutation,
        variables: {
          id: cartId,
          productToAdd,
        },
      },
      { headers }
    )
    // Execute the mutation

    // Send the GraphQL response back to the client
    res.status(200).json(addToCartResponse.data.addItemToCart)
  } catch (error) {
    console.error('Error handling request:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default handler
