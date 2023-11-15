import { NextApiRequest } from 'next'

import { getAdditionalHeader } from '../util'
import { getSellerTenantInfo } from '../util/seller'
import { fetcher } from '@/lib/api/util'
import { getProductQuery } from '@/lib/gql/queries'

export default async function getProduct(productCode: string, req?: NextApiRequest) {
  const variables = {
    productCode,
  }

  const headers = req ? getAdditionalHeader(req) : {}

  const response = await fetcher(
    { query: getProductQuery, variables },
    { headers },
    getSellerTenantInfo(req)
  )
  return response.data?.product
}
