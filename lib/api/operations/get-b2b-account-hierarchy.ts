import { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'

import { fetcher, getAdditionalHeader, getUserClaimsFromRequest } from '@/lib/api/util'
import { getB2BAccountHierarchyQuery as query } from '@/lib/gql/queries'
import { decodeParseCookieValue } from '@/lib/helpers'
import { B2BAccountHierarchyResult } from '@/lib/types'

export default async function getB2BAccountHierarchy(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<B2BAccountHierarchyResult | null> {
  const { publicRuntimeConfig } = getConfig()

  const authCookieName = publicRuntimeConfig.userCookieKey.toLowerCase()

  const cookies = req?.cookies

  if (!cookies?.[authCookieName]) return null

  const authTicket = decodeParseCookieValue(cookies[authCookieName])

  const variables = {
    accountId: authTicket?.accountId,
  }

  const userClaims = await getUserClaimsFromRequest(req, res)

  const headers = getAdditionalHeader(req)
  const response = await fetcher({ query, variables }, { userClaims, headers })

  return response.data?.getB2BAccountHierarchy
}
