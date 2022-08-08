import { ServerResponse } from 'http'
import getConfig from 'next/config'

import { shopperAuthClient } from './api-auth-client'
import { isShopperAuthExpired } from './config-helpers'
import { decodeParseCookieValue, prepareSetCookieValue } from '@/lib/helpers/cookieHelper'
import type { KiboRequest } from '@/lib/types'

import type { NextApiRequest, NextApiResponse } from 'next'

const { publicRuntimeConfig } = getConfig()

const authCookieName = publicRuntimeConfig.userCookieKey.toLowerCase()

const getUserClaimsFromRequest = async (
  req: NextApiRequest | KiboRequest,
  res: NextApiResponse | ServerResponse
) => {
  if (req.headers['x-vol-exclude-user-claims']) {
    return
  }
  const cookies = req.cookies
  let authTicket = decodeParseCookieValue(cookies[authCookieName])

  if (authTicket && isShopperAuthExpired(authTicket) === false) {
    return authTicket.accessToken
  }

  // shopper is anonymous
  // else logged in user ticket needs to be refreshed
  if (!authTicket) {
    authTicket = await shopperAuthClient.anonymousAuth()
  } else {
    authTicket = await shopperAuthClient.refreshUserAuth(authTicket)
  }
  res.setHeader('Set-Cookie', authCookieName + '=' + prepareSetCookieValue(authTicket) + ';path=/')

  return authTicket.accessToken
}
export default getUserClaimsFromRequest
