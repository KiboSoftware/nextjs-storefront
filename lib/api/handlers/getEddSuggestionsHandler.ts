import { apiAuthClient } from '@/lib/api/util/api-auth-client'
import { NextApiRequestWithLogger } from '@/lib/types'

import type { NextApiResponse } from 'next'

export default async function getEDDSuggestions(
  req: NextApiRequestWithLogger,
  res: NextApiResponse
) {
  try {
    const authToken = await apiAuthClient.getAccessToken()
    const apiHost = process.env.KIBO_API_HOST as string
    const tenantAndSite = apiHost.split('.')[0]
    const tenantId = tenantAndSite.split('-')[0].split('t')[1].toString()
    const siteId = tenantAndSite.split('-')[1].split('s')[1].toString()

    const url = `https://${process.env.KIBO_API_HOST}/api/commerce/orders/orderRouting/api/v1/routing/edd/suggestion?returnSuggestionLog=true`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
        'x-vol-tenant': tenantId,
        'x-vol-site': siteId,
      },
      body: req.body,
    })

    const eddSuggestionData = await response.json()

    return res.status(200).json(eddSuggestionData || {})
  } catch (e) {
    console.error(e)
    return res.status(200).json({})
  }
}
