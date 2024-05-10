import { NextApiRequest, NextApiResponse } from 'next'

import { fetcher, getAdditionalHeader } from '@/lib/api/util'
import { gqlFetch } from '@/lib/api/util/fetch-gql'
import {
  baseCheckoutFragment,
  checkoutLineItemFragment,
  checkoutPaymentFragment,
} from '@/lib/gql/fragments'
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
    const updateOrderMutation = /* GraphQL */ `
      mutation updateOrder($orderId: String!, $orderInput: CrOrderInput) {
        updateOrder(orderId: $orderId, orderInput: $orderInput) {
          originalQuoteId
          data
          originalQuoteNumber
          ...baseCheckoutFragment
          items {
            ...checkoutLineItemFragment
          }
          payments {
            ...checkoutPaymentFragment
          }
        }
      }
      ${baseCheckoutFragment}
      ${checkoutLineItemFragment}
      ${checkoutPaymentFragment}
    `

    const headers = req ? getAdditionalHeader(req) : {}
    const updateOrderResponse: any = await gqlFetch(
      {
        query: updateOrderMutation,
        variables: { ...params },
      },
      { headers }
    )
    // Execute the mutation
    correlationId =
      updateOrderResponse.headers.get('X-Vol-Correlation') ||
      updateOrderResponse.headers.get('x-vol-correlation')
    res.setHeader('x-vol-correlation', correlationId)
    // Send the GraphQL response back to the client
    if (updateOrderResponse.status > 499) {
      throw new Error('Internal Server Error')
    }
    const result = await updateOrderResponse.json()
    if (updateOrderResponse.ok) {
      return res.status(200).json(result.data.updateOrder)
    } else {
      return res.status(updateOrderResponse.status).json(result)
    }
  } catch (error) {
    console.error('Error handling request:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default handler
