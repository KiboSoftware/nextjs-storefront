import vercelFetch from '@vercel/fetch'

import { getAdditionalHeader, getUserClaimsFromRequest } from '@/lib/api/util'
import { apiAuthClient } from '@/lib/api/util/api-auth-client'
import { addProtocolToHost } from '@/lib/api/util/config-helpers'
import { CheckoutUpdateMode } from '@/lib/constants'

import type { NextApiRequest, NextApiResponse } from 'next'

const fetch = vercelFetch()

export default async function updateOrderHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { query, variables } = req.body
    const authToken = await apiAuthClient.getAccessToken()
    const userClaims = await getUserClaimsFromRequest(req, res)

    const headers = req ? getAdditionalHeader(req) : {}

    const resp: any = await fetch(
      addProtocolToHost(process.env.KIBO_API_HOST) +
        `/api/commerce/orders/${variables.orderId}?updateMode=${CheckoutUpdateMode.APPLY_TO_ORIGINAL}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          'x-vol-user-claims': userClaims,
          // ...headers,
        },
        body: JSON.stringify({
          ...variables.orderInput,
        }),
      }
    )

    const response = await resp.json()

    console.log('response', response)

    if (response?.errors) {
      console.log('response errors', response.errors)
      throw {
        message: response?.errors[0]?.extensions?.response?.body?.message,
        code: response?.errors[0].extensions.response.status,
      }
    }
    res.status(200).json({ data: { checkout: response }, status: 200 })
  } catch (error: any) {
    console.log('in catch', error)
    res.status(error?.code).json({ message: error?.message })
  }
}
