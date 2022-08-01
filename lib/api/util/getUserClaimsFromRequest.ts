import getConfig from 'next/config'

import { shopperAuthClient } from './api-auth-client'
import { isShopperAuthExpired } from './config-helpers'
import { decodeParseCookieValue } from '@/lib/helpers/cookieHelper'
import type { KiboRequest } from '@/lib/types'

import type { NextApiRequest } from 'next'

const { publicRuntimeConfig } = getConfig()

const authCookieName = publicRuntimeConfig.userCookieKey.toLowerCase()

const getUserClaimsFromRequest = async (
  req: NextApiRequest | KiboRequest
): Promise<{ userClaims: any; authTicket: any; authCookieName: any; isNewAuthTicket: boolean }> => {
  if (req.headers['x-vol-exclude-user-claims']) {
    return '' as any
  }

  const cookies = req.cookies
  let isNewAuthTicket = false
  let authTicket = decodeParseCookieValue(cookies[authCookieName])

  if (!authTicket || (authTicket && isShopperAuthExpired(authTicket))) {
    isNewAuthTicket = true
    authTicket = !authTicket
      ? await shopperAuthClient.anonymousAuth()
      : await shopperAuthClient.refreshUserAuth(authTicket)
  }

  return { userClaims: authTicket.accessToken, authTicket, authCookieName, isNewAuthTicket }
}

export default getUserClaimsFromRequest
