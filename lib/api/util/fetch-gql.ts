import vercelFetch from '@vercel/fetch'

import { apiAuthClient } from './api-auth-client'
import { getGraphqlUrl, getProxyGraphqlUrl } from './config-helpers'

const fetch = vercelFetch()

const fetcher = async (
  { query, variables }: any,
  options: any,
  sellerTenantInfo?: { tenant: string; site: string }
) => {
  const authToken = await apiAuthClient.getAccessToken()

  const isUserSeller = sellerTenantInfo ? true : false
  const url = isUserSeller ? getProxyGraphqlUrl() : getGraphqlUrl()

  const headers = {
    Authorization: `Bearer ${authToken}`,
    'Content-Type': 'application/json',
    ...(isUserSeller
      ? {
          'x-vol-app-claims': options?.userClaims,
          'x-vol-tenant': sellerTenantInfo?.tenant,
          'x-vol-site': sellerTenantInfo?.site,
        }
      : {
          'x-vol-user-claims': options?.userClaims,
        }),
    ...options.headers,
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  })
  const jsonResponse = await response.json()

  return jsonResponse
}
export default fetcher
