import { ServerResponse } from 'http'

import getUserClaimsFromRequest from '../util/getUserClaimsFromRequest'
import { fetcher } from '@/lib/api/util'
import { getCartQuery } from '@/lib/gql/queries'
import type { KiboRequest } from '@/lib/types'

export default async function getCart(req: KiboRequest, res: ServerResponse) {
  const userClaims = await getUserClaimsFromRequest(req, res)
  const response = await fetcher({ query: getCartQuery, variables: {} }, { userClaims })
  return response?.data
}
