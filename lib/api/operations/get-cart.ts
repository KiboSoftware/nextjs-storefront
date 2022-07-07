import getUserClaimsFromRequest from '../util/getUserClaimsFromRequest'
import { fetcher } from '@/lib/api/util'
import { getCartQuery } from '@/lib/gql/queries'

import type { IncomingMessage } from 'http'
import type { NextApiRequestCookies } from 'next/dist/server/api-utils'

export default async function getCart(req: IncomingMessage & { cookies: NextApiRequestCookies }) {
  const userClaims = await getUserClaimsFromRequest(req)
  const response = await fetcher({ query: getCartQuery, variables: {} }, { userClaims })
  return response?.data
}
