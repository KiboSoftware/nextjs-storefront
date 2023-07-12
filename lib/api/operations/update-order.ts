import { NextApiRequest, NextApiResponse } from 'next'

import { getAdditionalHeader } from '../util'
import getUserClaimsFromRequest from '../util/getUserClaimsFromRequest'
import { fetcher } from '@/lib/api/util'
import { CheckoutUpdateMode } from '@/lib/constants'
import { getCheckoutQuery as query } from '@/lib/gql/queries'

import type { CrOrder, CrOrderInput } from '@/lib/gql/types'

export default async function updateOrder(
  orderId: string,
  orderInput: CrOrderInput,
  req: NextApiRequest,
  res: NextApiResponse
): Promise<CrOrder> {
  const variables = {
    orderId: orderId,
    updateMode: CheckoutUpdateMode.APPLY_TO_ORIGINAL,
    orderInput,
  }

  const headers = req ? getAdditionalHeader(req) : {}

  const userClaims = await getUserClaimsFromRequest(req, res)
  const response = await fetcher({ query, variables }, { userClaims, headers })

  return response.data?.checkout
}
