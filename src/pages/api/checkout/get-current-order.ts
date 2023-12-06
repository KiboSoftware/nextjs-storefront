import vercelFetch from '@vercel/fetch'

import { getAdditionalHeader, getUserClaimsFromRequest } from '@/lib/api/util'
import { apiAuthClient } from '@/lib/api/util/api-auth-client'
import { addProtocolToHost } from '@/lib/api/util/config-helpers'

import type { NextApiRequest, NextApiResponse } from 'next'

const fetch = vercelFetch()

export default async function getCurrentOrderHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { query, variables } = req.body
    const authToken = await apiAuthClient.getAccessToken()
    const userClaims = await getUserClaimsFromRequest(req, res)

    const headers = req ? getAdditionalHeader(req) : {}

    const resp: any = await fetch(
      addProtocolToHost(process.env.KIBO_API_HOST) + `/api/commerce/orders/${variables.checkoutId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          'x-vol-user-claims': userClaims,
          ...headers,
        },
        // body: JSON.stringify({
        //   ...variables.paymentAction,
        //   installmentPlanCode: 'PSA_False_InitAmt_False',
        // }),
      }
    )

    const response = await resp.json()

    console.log('order response', response)

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
