import { NextApiRequest, NextApiResponse } from 'next'

import { getAdditionalHeader } from '../util'
import getUserClaimsFromRequest from '../util/getUserClaimsFromRequest'
import { fetcher } from '@/lib/api/util'
import { getMultiShipCheckoutQuery as query } from '@/lib/gql/queries'

import type { Checkout } from '@/lib/gql/types'

export default async function getMultiShipCheckout(
  checkoutId: string,
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Checkout> {
  const variables = {
    checkoutId,
  }

  const userClaims = await getUserClaimsFromRequest(req, res)

  const headers = req ? getAdditionalHeader(req) : {}

  const response = await fetcher({ query, variables }, { userClaims, headers })

  return response.data?.checkout
}
