import { NextApiRequest, NextApiResponse } from 'next'

import { getAdditionalHeader } from '../util'
import getUserClaimsFromRequest from '../util/getUserClaimsFromRequest'
import { getSellerTenantInfo } from '../util/seller'
import { fetcher } from '@/lib/api/util'
import { getB2BContactsQuery } from '@/lib/gql/queries'

export default async function getB2bContacts(
  req: NextApiRequest,
  res: NextApiResponse,
  salesRepUserId: string
) {
  const userClaims = await getUserClaimsFromRequest(req, res)

  const headers = req ? getAdditionalHeader(req) : {}

  const response = await fetcher(
    {
      query: getB2BContactsQuery,
      variables: {
        filter: `salesrep.userid eq '${salesRepUserId}'`,
        sortBy: 'email asc',
        startIndex: 0,
        pageSize: 5,
      },
    },
    { userClaims, headers },
    getSellerTenantInfo(req)
  )
  return response?.data?.getB2BContacts
}
