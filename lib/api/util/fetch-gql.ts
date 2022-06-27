import vercelFetch from '@vercel/fetch'

import { apiAuthClient } from './api-auth-client'
import { getGraphqlUrl } from './config-helpers'

const fetch = vercelFetch()

const fetcher = async ({ query, variables }: any, options: any) => {
  const authToken = await apiAuthClient.getAccessToken()
  const response = await fetch(getGraphqlUrl(), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'x-vol-user-claims': options?.userClaims,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
  return await response.json()
}
export default fetcher
