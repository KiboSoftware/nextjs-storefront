import { NextApiRequest, NextApiResponse } from 'next'

import { fetcher, getAdditionalHeader, getUserClaimsFromRequest } from '@/lib/api/util'
import { getCustomerB2BAccountUsersQuery as query } from '@/lib/gql/queries'
import { decodeParseCookieValue, getAuthCookieName } from '@/lib/helpers'

import { B2BUserCollection } from '@/lib/gql/types'

export default async function getB2BUsers(
  req: NextApiRequest,
  res: NextApiResponse,
  quoteUserId?: string
): Promise<B2BUserCollection | null> {
  const authCookieName = getAuthCookieName()

  const cookies = req?.cookies

  if (!cookies?.[authCookieName]) return null

  const authTicket = decodeParseCookieValue(cookies[authCookieName])

  const variables = quoteUserId
    ? { b2bAccountId: authTicket?.accountId, filter: `userId eq ${quoteUserId}` }
    : {
        b2bAccountId: authTicket?.accountId,
      }
  const userClaims = await getUserClaimsFromRequest(req, res)

  const headers = getAdditionalHeader(req)
  const response = await fetcher({ query, variables }, { userClaims, headers })

  return response.data?.b2bAccountUsers
}
