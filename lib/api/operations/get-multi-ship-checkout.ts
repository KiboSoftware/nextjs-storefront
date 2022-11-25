import getUserClaimsFromRequest from '../util/getUserClaimsFromRequest'
import { fetcher } from '@/lib/api/util'
import { getMultiShipCheckoutQuery as query } from '@/lib/gql/queries'

import type { Checkout } from '@/lib/gql/types'

export default async function getMultiShipCheckout(
  checkoutId: string,
  req: any,
  res: any
): Promise<Checkout> {
  const variables = {
    checkoutId,
  }

  const userClaims = await getUserClaimsFromRequest(req, res)
  const response = await fetcher({ query, variables }, { userClaims })

  return response.data?.checkout
}
