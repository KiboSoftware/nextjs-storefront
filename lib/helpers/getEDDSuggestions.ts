import getConfig from 'next/config'

import { buildEDDSuggestionParams } from './buildEDDSuggestionParams'
import { apiAuthClient } from '../api/util/api-auth-client'
export const getEDDSuggestion = async (productAndShippingData: any) => {
  try {
    const { publicRuntimeConfig } = getConfig()
    const apiHost = publicRuntimeConfig?.apiHost as string
    const baseHost = publicRuntimeConfig?.baseHost as string
    const tenantAndSite = apiHost.split('.')[0]
    const tenantId = tenantAndSite.split('-')[0].split('t')[1].toString()
    const siteId = tenantAndSite.split('-')[1].split('s')[1].toString()
    const authToken = await apiAuthClient.getAccessToken()
    const url = `https://${baseHost}/kibo.orderrouting.webapi/commerce/orders/orderRouting/api/v1/routing/edd/suggestion`

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
        accept: 'application/json',
        'x-vol-tenant': tenantId,
        'Content-Type': 'application/json',
        'x-vol-site': siteId,
      },
      body: JSON.stringify(buildEDDSuggestionParams(productAndShippingData)),
    })
    const eddSuggestionData = await res.json()
    if (eddSuggestionData.isSuccessful) {
      return eddSuggestionData
    }
  } catch (e) {
    console.error(e)
  }
}
