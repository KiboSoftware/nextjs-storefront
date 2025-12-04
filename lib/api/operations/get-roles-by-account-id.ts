import { NextApiRequest, NextApiResponse } from 'next'

import { fetcher, getAdditionalHeader, getUserClaimsFromRequest } from '@/lib/api/util'
import { getRolesByAccountIdAsyncQuery as query } from '@/lib/gql/queries'
import { decodeParseCookieValue, getAuthCookieName } from '@/lib/helpers'

export interface B2BRole {
  id?: number
  name?: string
  isSystemRole?: boolean
  behaviors?: number[]
  accountIds?: number[]
}

export interface GetRolesAsyncResponse {
  startIndex?: number
  pageSize?: number
  pageCount?: number
  totalCount?: number
  items?: B2BRole[]
}

export default async function getRolesByAccountId(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<GetRolesAsyncResponse | null> {
  const authCookieName = getAuthCookieName()

  const cookies = req?.cookies

  if (!cookies?.[authCookieName]) return null

  const authTicket = decodeParseCookieValue(cookies[authCookieName])

  const variables = {
    accountId: Number(authTicket?.accountId),
  }

  const userClaims = await getUserClaimsFromRequest(req, res)

  const headers = getAdditionalHeader(req)
  const response = await fetcher({ query, variables }, { userClaims, headers })

  return response.data?.getRolesByAccountIdAsync || null
}
