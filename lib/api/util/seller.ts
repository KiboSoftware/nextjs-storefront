import cookie from 'cookie'
import { NextApiRequest } from 'next'
import getConfig from 'next/config'

import { decodeParseCookieValue } from '@/lib/helpers/cookieHelper'

const replaceUrlTenantSite = (url: string, tenant: string, site: string) => {
  const parts = url.split('-')

  parts[0] = parts[0].replace(/\d+/, tenant)
  parts[1] = parts[1].replace(/\d+/, site)
  url = parts.join('-')

  return url
}

const getSellerTenantInfo = (req: NextApiRequest | undefined) => {
  if (!req) return

  const cookies = (req.headers && req.headers.cookie) || ''
  const parsedCookies = cookie.parse(cookies)

  // Access the Auth cookie
  const { publicRuntimeConfig } = getConfig()
  const cookieName =
    publicRuntimeConfig &&
    publicRuntimeConfig.userCookieKey &&
    publicRuntimeConfig.userCookieKey.toLowerCase()

  const parsedCookie = parsedCookies[cookieName]
  const decodedCookie = decodeParseCookieValue(parsedCookie)

  if (decodedCookie?.tenant && decodedCookie?.site) {
    return { tenant: decodedCookie?.tenant, site: decodedCookie?.site }
  }

  return
}

export { replaceUrlTenantSite, getSellerTenantInfo }
