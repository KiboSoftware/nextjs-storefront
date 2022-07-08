import getConfig from 'next/config'

import { RequestCookies } from '../operations/get-cart'
import { shopperAuthClient } from './api-auth-client'
import { isShopperAuthExpired } from './config-helpers'
import { decodeParseCookieValue } from '@/lib/helpers/cookieHelper'

import type { IncomingMessage } from 'http'
import type { NextApiRequest } from 'next'

const { publicRuntimeConfig } = getConfig()
const authCookieName = publicRuntimeConfig.userCookieKey.toLowerCase()

const getUserClaimsFromRequest = async (
  req: NextApiRequest | (IncomingMessage & { cookies: RequestCookies })
) => {
  if (req.headers['x-vol-exclude-user-claims']) {
    return
  }
  const cookies = req.cookies
  let authTicket = decodeParseCookieValue(cookies[authCookieName])
  if (!authTicket || (authTicket && isShopperAuthExpired(authTicket))) {
    authTicket = !authTicket
      ? await shopperAuthClient.anonymousAuth()
      : await shopperAuthClient.refreshUserAuth(authTicket)
  }
  return authTicket.accessToken
}

export default getUserClaimsFromRequest
