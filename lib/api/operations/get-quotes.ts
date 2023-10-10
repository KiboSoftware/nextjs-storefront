import { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'

import { fetcher, getAdditionalHeader, getUserClaimsFromRequest } from '@/lib/api/util'
import { getQuotes as query } from '@/lib/gql/queries'

import type { Quote } from '@/lib/gql/types'

const { serverRuntimeConfig } = getConfig()

export default async function getQuotes(
  req: NextApiRequest,
  res: NextApiResponse,
  customerAccountId?: number
): Promise<Quote> {
  const variables = {
    startIndex: 0,
    pageSize: parseInt(serverRuntimeConfig.B2BQuotes.pageSize) || 5,
    sortBy: 'number desc',
    filter: `customerAccountId eq ${customerAccountId}`,
    q: '',
  }

  const userClaims = await getUserClaimsFromRequest(req, res)

  const headers = getAdditionalHeader(req)
  const response = await fetcher({ query, variables }, { userClaims, headers })
  return response.data?.quotes
}
