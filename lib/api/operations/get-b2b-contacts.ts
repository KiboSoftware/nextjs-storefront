import { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'

import { getAdditionalHeader } from '../util'
import getUserClaimsFromRequest from '../util/getUserClaimsFromRequest'
import { getSellerTenantInfo } from '../util/seller'
import { fetcher } from '@/lib/api/util'
import { getB2BContactsQuery } from '@/lib/gql/queries'
import { decodeParseCookieValue } from '@/lib/helpers'

const { publicRuntimeConfig } = getConfig()
const authCookieName = publicRuntimeConfig.userCookieKey.toLowerCase()

export default async function getB2bContacts(req: NextApiRequest, res: NextApiResponse) {
  const userClaims = await getUserClaimsFromRequest(req, res)

  const headers = req ? getAdditionalHeader(req) : {}

  const cookies = req?.cookies
  const salesRepUserId = decodeParseCookieValue(cookies[authCookieName])?.userId

  console.log('salesRepUserId', salesRepUserId)

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
