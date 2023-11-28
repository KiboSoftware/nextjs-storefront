import { NextApiRequest, NextApiResponse } from 'next'

import { getAdditionalHeader } from '../util'
import getUserClaimsFromRequest from '../util/getUserClaimsFromRequest'
import { fetcher } from '@/lib/api/util'
import { getCurrentUser as getCurrentUserQuery } from '@/lib/gql/queries'

export default async function getCurrentUser(req: NextApiRequest, res: NextApiResponse) {
  const userClaims = await getUserClaimsFromRequest(req, res)

  const headers = req ? getAdditionalHeader(req) : {}

  const response = await fetcher(
    { query: getCurrentUserQuery, variables: {} },
    { userClaims, headers }
  )
  return response?.data
}
