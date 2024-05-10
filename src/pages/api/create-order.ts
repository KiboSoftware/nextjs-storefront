import { NextApiRequest, NextApiResponse } from 'next'

import { fetcher, getAdditionalHeader } from '@/lib/api/util'
import { gqlFetch } from '@/lib/api/util/fetch-gql'
import { updateCartItemByCartIDMutation, updateCartItemMutation } from '@/lib/gql/mutations'
import { getOrCreateCheckoutFromCartMutation } from '@/lib/gql/queries'

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
    const createOrderResponse: any = await gqlFetch(
      {
        query: getOrCreateCheckoutFromCartMutation,
        variables: { ...params },
      },
      { headers }
    )
    // Execute the mutation
    correlationId =
      createOrderResponse.headers.get('X-Vol-Correlation') ||
      createOrderResponse.headers.get('x-vol-correlation')
    res.setHeader('x-vol-correlation', correlationId)
    // Send the GraphQL response back to the client
    if (createOrderResponse.status > 499) {
      throw new Error('Internal Server Error')
    }
    const result = await createOrderResponse.json()
    if (createOrderResponse.ok) {
      return res.status(200).json(result.data.checkout)
    } else {
      return res.status(createOrderResponse.status).json(result)
    }
  } catch (error) {
    console.error('Error handling request:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default handler
