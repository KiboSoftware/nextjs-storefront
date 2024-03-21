import { APIAuthClient, AppAuthTicket, ShopperAuthClient } from '@kibocommerce/graphql-client'
import vercelFetch from '@vercel/fetch'

import { getApiConfig } from './config-helpers'

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

export { apiAuthClient, shopperAuthClient }
