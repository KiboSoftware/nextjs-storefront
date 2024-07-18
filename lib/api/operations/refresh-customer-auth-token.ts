import { NextApiRequest } from 'next'

import { fetcher, getAdditionalHeader } from '@/lib/api/util'
import { refreshAuthToken as query } from '@/lib/gql/mutations'
import { decodeParseCookieValue, getAuthCookieName } from '@/lib/helpers'

export default async function refreshCustomerAuthToken(accountId: string, req: NextApiRequest) {
  const cookies = req?.cookies
  const authTicket = decodeParseCookieValue(cookies[getAuthCookieName()])

  const refreshToken = authTicket?.refreshToken

  const headers = req ? getAdditionalHeader(req) : {}
  const variables = {
    accountId: parseInt(accountId),
    refreshToken,
  }
  const response = await fetcher({ query, variables }, { headers })
  return response
}
