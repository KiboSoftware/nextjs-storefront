import { APIAuthClient, AppAuthTicket, ShopperAuthClient } from '@kibocommerce/graphql-client'
import vercelFetch from '@vercel/fetch'

import { getApiConfig } from './config-helpers'
type AuthClient = {
  newApiAuthClient: APIAuthClient
  newShopperAuthClient: ShopperAuthClient
}
const fetch = vercelFetch()
let authTicket: AppAuthTicket | undefined
const authTicketMemCache = {
  // eslint-disable-next-line require-await
  getAuthTicket: async () => authTicket,
  setAuthTicket: (newAuthTicket: AppAuthTicket) => {
    authTicket = newAuthTicket
  },
}
const apiAuthClient = new APIAuthClient(getApiConfig(), fetch, authTicketMemCache)
const shopperAuthClient = new ShopperAuthClient(getApiConfig(), fetch, apiAuthClient)

const authClients: Record<number, AuthClient> = []

const getAuthClientBySiteId = (siteId: number): AuthClient => {
  // if (authClients[siteId]) return { ...authClients[siteId]}

  const newApiAuthClient = new APIAuthClient(
    { ...getApiConfig(), apiHost: newApiHost(siteId) },
    fetch,
    authTicketMemCache
  )

  const newShopperAuthClient = new ShopperAuthClient(
    { ...getApiConfig(), apiHost: newApiHost(siteId) },
    fetch,
    newApiAuthClient
  )
  // authClients[siteId] = { newApiAuthClient, newShopperAuthClient}

  return { newApiAuthClient, newShopperAuthClient }
}
const newApiHost = (siteId: number): string => {
  const apiHost = getApiConfig().apiHost
  return apiHost.replace(/-s(\d+)/, `-s${siteId}`)
}

export { apiAuthClient, shopperAuthClient, getAuthClientBySiteId }
