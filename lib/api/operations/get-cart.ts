import { NextApiRequest, NextApiResponse } from 'next'

import { getAdditionalHeader } from '../util'
import getUserClaimsFromRequest from '../util/getUserClaimsFromRequest'
import { fetcher } from '@/lib/api/util'
import { getCartQuery } from '@/lib/gql/queries'

export default async function getCart(req: NextApiRequest, res: NextApiResponse) {
  const userClaims = await getUserClaimsFromRequest(req, res)

  const headers = req ? getAdditionalHeader(req) : {}

  const response = await fetcher({ query: getCartQuery, variables: {} }, { userClaims, headers })
  return response?.data
}
