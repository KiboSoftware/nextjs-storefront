import vercelFetch from '@vercel/fetch'

import { apiAuthClient, getAuthClientBySiteId } from './api-auth-client'
import { getGraphqlUrl } from './config-helpers'

const fetch = vercelFetch()

const fetcher = async ({ query, variables }: any, options: any) => {
  let authToken

  if (options.headers['X-Vol-Site']) {
    const client = getAuthClientBySiteId(options.headers['X-Vol-Site']).newApiAuthClient
    authToken = await client.getAccessToken()
  } else {
    authToken = await apiAuthClient.getAccessToken()
  }

  const response = await fetch(getGraphqlUrl(), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'x-vol-user-claims': options?.userClaims,
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
  return await response.json()
}
export default fetcher
