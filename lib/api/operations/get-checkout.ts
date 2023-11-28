import { NextApiRequest, NextApiResponse } from 'next'

import { fetcher, getAdditionalHeader, getUserClaimsFromRequest } from '@/lib/api/util'
import { getCheckoutQuery as query } from '@/lib/gql/queries'

import type { CrOrder } from '@/lib/gql/types'

export default async function getCheckout(
  checkoutId: string,
  req: NextApiRequest,
  res: NextApiResponse
): Promise<CrOrder> {
  const variables = {
    checkoutId,
  }

  const userClaims = await getUserClaimsFromRequest(req, res)

  const headers = getAdditionalHeader(req)

  const response = await fetcher({ query, variables }, { userClaims, headers })
  return response.data?.checkout
}
