import { getAdditionalHeader } from '../util'
import getUserClaimsFromRequest from '../util/getUserClaimsFromRequest'
import { fetcher } from '@/lib/api/util'
import { getCheckoutQuery as query } from '@/lib/gql/queries'

import type { CrOrder } from '@/lib/gql/types'

export default async function getCheckout(
  checkoutId: string,
  req: any,
  res: any
): Promise<CrOrder> {
  const variables = {
    checkoutId,
  }

  const userClaims = await getUserClaimsFromRequest(req, res)

  const headers = getAdditionalHeader(req)

  const response = await fetcher({ query, variables }, { userClaims, headers })

  return response.data?.checkout
}
