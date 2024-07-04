import { NextApiRequest, NextApiResponse } from 'next'

import { fetcher, getAdditionalHeader } from '@/lib/api/util'
import { gqlFetch } from '@/lib/api/util/fetch-gql'
import { updateOrderItemPriceMutation } from '@/lib/gql/mutations'

// Configure your GraphQL endpoint

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }
  let correlationId: any = ''
  try {
    // Extract the body from the incoming POST request
    const { params } = req.body

    const headers = req ? getAdditionalHeader(req) : {}
    const updateOrderItemPriceResponse: any = await gqlFetch(
      {
        query: updateOrderItemPriceMutation,
        variables: { ...params },
      },
      { headers }
    )
    // Execute the mutation
    correlationId =
      updateOrderItemPriceResponse.headers.get('X-Vol-Correlation') ||
      updateOrderItemPriceResponse.headers.get('x-vol-correlation')
    res.setHeader('x-vol-correlation', correlationId)
    // Send the GraphQL response back to the client
    if (updateOrderItemPriceResponse.status > 499) {
      throw new Error('Internal Server Error')
    }
    const result = await updateOrderItemPriceResponse.json()
    if (updateOrderItemPriceResponse.ok) {
      return res.status(200).json(result.data.updateOrderItemPrice)
    } else {
      return res.status(updateOrderItemPriceResponse.status).json(result)
    }
  } catch (error) {
    console.error('Error handling request:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default handler
