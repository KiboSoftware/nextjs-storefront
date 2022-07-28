import getUserClaimsFromRequest from '../util/getUserClaimsFromRequest'
import { fetcher } from '@/lib/api/util'
import { getCartQuery } from '@/lib/gql/queries'
import type { KiboRequest } from '@/lib/types'

export default async function getCart(req: KiboRequest) {
  const userClaims = await getUserClaimsFromRequest(req)
  const response = await fetcher({ query: getCartQuery, variables: {} }, { userClaims })
  return response?.data
}
