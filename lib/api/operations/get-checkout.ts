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
  // const userClaims = req ? await getUserClaimsFromRequest(req) : null
  const response = await fetcher({ query, variables }, { userClaims })

  return response.data?.checkout
}
