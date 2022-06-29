import getConfig from 'next/config'

import { shopperAuthClient } from './api-auth-client'
import { isShopperAuthExpired } from './config-helpers'
import { decodeParseCookieValue } from '@/lib/helpers/cookieHelper'

import type { NextApiRequest } from 'next'

const { publicRuntimeConfig } = getConfig()
const authCookieName = publicRuntimeConfig.userCookieKey.toLowerCase()

const getUserClaimsFromRequest = async (req: NextApiRequest) => {
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
