import { NextApiRequest, NextApiResponse } from 'next'

import { fetcher, getAdditionalHeader } from '@/lib/api/util'
import { gqlFetch } from '@/lib/api/util/fetch-gql'
import { cartItemDetails } from '@/lib/gql/fragments'

// Configure your GraphQL endpoint

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }
  let correlationId: any = ''
  try {
    // Extract the body from the incoming POST request
    const { params } = req.body

    // Prepare the GraphQL mutation

    const headers = req ? getAdditionalHeader(req) : {}

    const updateCartMutation = /* GraphQL */ `
      ${cartItemDetails}

      mutation updateCart($cartId: String!, $cartInput: CrCartInput) {
        updateCart(cartId: $cartId, cartInput: $cartInput) {
          data
          items {
            ...cartItemDetails
          }
        }
      }
    `

    const updateCartResponse: any = await gqlFetch(
      {
        query: updateCartMutation,
        variables: { ...params },
      },
      { headers }
    )
    // Execute the mutation
    correlationId =
      updateCartResponse.headers.get('X-Vol-Correlation') ||
      updateCartResponse.headers.get('x-vol-correlation')
    res.setHeader('x-vol-correlation', correlationId)
    // Send the GraphQL response back to the client
    if (updateCartResponse.status > 499) {
      throw new Error('Internal Server Error')
    }
    const result = await updateCartResponse.json()
    if (updateCartResponse.ok) {
      return res.status(200).json(result.data.updateCart)
    } else {
      return res.status(updateCartResponse.status).json(result)
    }
  } catch (error) {
    console.error('Error handling request:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default handler
