import { ServerResponse } from 'http'
import getConfig from 'next/config'

import { shopperAuthClient, getAuthClientBySiteId } from './api-auth-client'
import { isShopperAuthExpired } from './config-helpers'
import {
  decodeParseCookieValue,
  getAuthCookieName,
  prepareSetCookieValue,
} from '@/lib/helpers/cookieHelper'
import type { KiboRequest } from '@/lib/types'

import type { NextApiRequest, NextApiResponse } from 'next'

const { publicRuntimeConfig } = getConfig()

const getUserClaimsFromRequest = async (
  req: NextApiRequest | KiboRequest,
  res: NextApiResponse | ServerResponse
) => {
  if (req.headers['x-vol-exclude-user-claims']) {
    return
  }

  const siteId =
    (req as NextApiRequest).preview && ((req as NextApiRequest).previewData as any).siteId

  console.log('=========================siteId', siteId)

  try {
    const cookies = req?.cookies
    let authTicket = decodeParseCookieValue(cookies[getAuthCookieName(siteId)])

    if (authTicket && isShopperAuthExpired(authTicket) === false) {
      return authTicket.accessToken
    }

    const accountId = authTicket?.accountId

    // shopper is anonymous
    // else logged in user ticket needs to be refreshed
    if (!authTicket) {
      authTicket = siteId
        ? await getAuthClientBySiteId(siteId).newShopperAuthClient.anonymousAuth()
        : await shopperAuthClient.anonymousAuth()
    } else {
      const response = siteId
        ? await getAuthClientBySiteId(siteId).newShopperAuthClient.refreshUserAuth(authTicket)
        : await shopperAuthClient.refreshUserAuth(authTicket)
      if (response.accessToken) {
        authTicket = response
      }
    }

    console.log('getAuthCookieName(siteId)', siteId, getAuthCookieName(siteId))

    res.setHeader(
      'Set-Cookie',
      getAuthCookieName(siteId) +
        '=' +
        prepareSetCookieValue({ ...authTicket, accountId }) +
        ';path=/'
    )

    console.log('====================================setting cookie', siteId)

    return authTicket.accessToken
  } catch (err) {
    console.error(err)
  }
  return
}
export default getUserClaimsFromRequest
