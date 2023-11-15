import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'
import { parse } from 'url'

import { apiAuthClient } from '../util/api-auth-client'
import { getApiConfig } from '../util/config-helpers'
import { replaceUrlTenantSite } from '../util/seller'
import { prepareSetCookieValue } from '@/lib/helpers/cookieHelper'

const { publicRuntimeConfig } = getConfig()
const authCookieName = publicRuntimeConfig.userCookieKey.toLowerCase()

const getRefreshToken = (req: NextApiRequest) => {
  const cookies = req.headers.cookie || ''
  const parsedCookies = cookie.parse(cookies)

  // Access the "mzrt-qa" cookie
  const mzrtQACookie = parsedCookies['mzrt-qa']

  if (mzrtQACookie) {
    // Split the "mzrt-qa" cookie into its key-value pairs
    const keyValuePairs = mzrtQACookie.split('&')

    // Initialize variables to store the values
    let token = ''
    let expires = ''
    let expiration = ''
    let user = ''

    // Iterate through the key-value pairs and extract the values
    for (const pair of keyValuePairs) {
      const [key, value] = pair.split('=')

      switch (key) {
        case 'Token':
          token = value
          break
        case 'Expires':
          expires = value
          break
        case 'Expiration':
          expiration = value
          break
        case 'User':
          user = value
          break
        default:
          // Handle unknown keys, if any
          break
      }
    }

    return token
  }
}

const getAuthHost = (tenant: string, site: string) => {
  const authHost = getApiConfig().authHost
  const url = `https://${authHost}/api/platform/adminuser/authtickets/tenants?tenantId=${tenant}`

  return replaceUrlTenantSite(url, tenant, site)
}

const saveSellerToken = async (req: NextApiRequest, res: NextApiResponse) => {
  // Get tenant, site, redirect and refreshToken from request
  const { query } = parse(req.url as string, true)
  const { tenant, site } = query
  const refreshToken = getRefreshToken(req)

  // Get authToken
  const authToken = await apiAuthClient.getAccessToken()

  // Construct url and headers
  const url = getAuthHost(tenant as string, site as string)

  const headers = new Headers()
  headers.set('x-vol-site', site as string)
  headers.set('Authorization', `Bearer ${authToken}`)
  headers.set('Content-Type', 'application/json')

  // Fetch user-claims
  const jsonResponse = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      refreshToken,
    }),
  })

  const response = await jsonResponse.json()

  // Set cookie
  const token = {
    userId: response?.user?.userId,
    userName: response?.user?.userName,
    accessToken: response?.accessToken,
    accessTokenExpiration: response?.accessTokenExpiration,
    refreshToken: response?.refreshToken,
    refreshTokenExpiration: response?.refreshTokenExpiration,
    tenant,
    site,
  }

  res.setHeader(
    'Set-Cookie',
    authCookieName + '=' + prepareSetCookieValue({ ...token }) + ';path=/'
  )
}

export default saveSellerToken
