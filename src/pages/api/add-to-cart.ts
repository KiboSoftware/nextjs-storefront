import { NextApiRequest, NextApiResponse } from 'next'

import { getCart } from '@/lib/api/operations/'
import { fetcher, getAdditionalHeader } from '@/lib/api/util'
import { gqlFetch } from '@/lib/api/util/fetch-gql'

// Configure your GraphQL endpoint

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }
  let correlationId:any = ''
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
    const addToCartResponse:any = await gqlFetch(
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
    correlationId = addToCartResponse.headers.get('X-Vol-Correlation') || addToCartResponse.headers.get('x-vol-correlation')
    res.setHeader('x-vol-correlation', correlationId)
    // Send the GraphQL response back to the client
    if(addToCartResponse.status > 499){
      throw new Error('Internal Server Error')
    }
    const result = await addToCartResponse.json()
    if(addToCartResponse.ok){ 
      return res.status(200).json(result.data.addItemToCart)
    } else {
      return res.status(addToCartResponse.status).json(result)
    }
  } catch (error) {
    console.error('Error handling request:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default handler
