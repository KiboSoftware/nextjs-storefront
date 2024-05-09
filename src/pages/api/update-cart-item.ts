import { NextApiRequest, NextApiResponse } from 'next'

import { fetcher, getAdditionalHeader } from '@/lib/api/util'
import { gqlFetch } from '@/lib/api/util/fetch-gql'
import { updateCartItemByCartIDMutation, updateCartItemMutation } from '@/lib/gql/mutations'

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
    const updateCartItemCartResponse: any = await gqlFetch(
      {
        query: updateCartItemByCartIDMutation,
        variables: { ...params },
      },
      { headers }
    )
    // Execute the mutation
    correlationId =
      updateCartItemCartResponse.headers.get('X-Vol-Correlation') ||
      updateCartItemCartResponse.headers.get('x-vol-correlation')
    res.setHeader('x-vol-correlation', correlationId)
    // Send the GraphQL response back to the client
    if (updateCartItemCartResponse.status > 499) {
      throw new Error('Internal Server Error')
    }
    const result = await updateCartItemCartResponse.json()
    if (updateCartItemCartResponse.ok) {
      return res.status(200).json(result.data.updateCartItem)
    } else {
      return res.status(updateCartItemCartResponse.status).json(result)
    }
  } catch (error) {
    console.error('Error handling request:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default handler
