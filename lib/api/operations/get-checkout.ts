import getUserClaimsFromRequest from '../util/getUserClaimsFromRequest'
import { fetcher } from '@/lib/api/util'
import { getCheckoutQuery as query } from '@/lib/gql/queries'

import type { Order } from '@/lib/gql/types'

export default async function getCheckout(checkoutId: string, req: any): Promise<Order> {
  const variables = {
    checkoutId,
  }

  const userClaims = await getUserClaimsFromRequest(req)
  // const userClaims = req ? await getUserClaimsFromRequest(req) : null
  const response = await fetcher({ query, variables }, { userClaims })

  return response.data?.checkout
}
