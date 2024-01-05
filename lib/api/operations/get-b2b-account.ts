import { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'

import { fetcher, getAdditionalHeader, getUserClaimsFromRequest } from '@/lib/api/util'
import { getB2BAccount as query } from '@/lib/gql/queries'
import { decodeParseCookieValue } from '@/lib/helpers'

import { B2BAccount } from '@/lib/gql/types'

export default async function getB2BAccount(
  req: NextApiRequest,
  res: NextApiResponse,
  accountId: number
): Promise<B2BAccount | null> {
  const { publicRuntimeConfig } = getConfig()

  const authCookieName = publicRuntimeConfig.userCookieKey.toLowerCase()

  const cookies = req?.cookies

  if (!cookies?.[authCookieName]) return null

  const authTicket = decodeParseCookieValue(cookies[authCookieName])
  const variables = {
    accountId: accountId || authTicket?.accountId,
  }

  const userClaims = await getUserClaimsFromRequest(req, res)

  const headers = getAdditionalHeader(req)
  const response = await fetcher({ query, variables }, { userClaims, headers })

  return response?.data?.b2bAccount
}
