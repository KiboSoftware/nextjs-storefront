import { NextApiRequest } from 'next'

import { getAdditionalHeader } from '../util'
import { getSellerTenantInfo } from '../util/seller'
import { fetcher } from '@/lib/api/util'
import { getCustomerAccountsQuery } from '@/lib/gql/queries'

export default async function getCustomerAccount(userId: string, req: NextApiRequest) {
  const variables = { filter: `userId eq ${userId}` }

  const headers = req ? getAdditionalHeader(req) : {}

  const response = await fetcher(
    { query: getCustomerAccountsQuery, variables: variables },
    { headers },
    getSellerTenantInfo(req)
  )
  return response?.data?.customerAccounts.items[0]
}
