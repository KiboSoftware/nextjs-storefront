import { UserAuthTicket } from '@kibocommerce/graphql-client'
import { NextApiRequest, NextApiResponse } from 'next'

import { fetcher, getAdditionalHeader } from '../util'
import { getBehaviors } from '../util/get-behaviors'
import { refreshAuthToken as query } from '@/lib/gql/mutations'
import { fromBitVectorSetArray } from '@/lib/helpers'
import {
  decodeParseCookieValue,
  getAuthCookieName,
  prepareSetCookieValue,
} from '@/lib/helpers/cookieHelper'
import { NextApiRequestWithLogger } from '@/lib/types'

async function switchUserHandler(req: NextApiRequestWithLogger, res: NextApiResponse) {
  try {
    const { id } = req.query

    const refreshAuthTicketsResponse = await refreshCustomerAuthToken(
      id as string,
      req as NextApiRequestWithLogger
    )

    const authTicket = refreshAuthTicketsResponse?.data?.refreshCustomerAuthTickets

    const customerAccount = authTicket?.customerAccount
    delete authTicket?.customerAccount
    const cookieValue: UserAuthTicket & { accountId: number } = {
      ...authTicket,
      accountId: id,
    }

    const jwtAccessToken = authTicket?.jwtAccessToken

    customerAccount.behaviors = getBehaviors(jwtAccessToken)

    res.setHeader(
      'Set-Cookie',
      getAuthCookieName() + '=' + prepareSetCookieValue({ ...cookieValue }) + ';HttpOnly;path=/'
    )

    res.status(200).json(customerAccount ? customerAccount : { success: true })
  } catch (error: any) {
    res.redirect(`/error-page?status=500&message=${encodeURIComponent(error.message)}`)
  }
}

async function refreshCustomerAuthToken(accountId: string, req: NextApiRequest) {
  const cookies = req?.cookies
  const authTicket = decodeParseCookieValue(cookies[getAuthCookieName()])

  const refreshToken = authTicket?.refreshToken

  const headers = req ? getAdditionalHeader(req) : {}
  const variables = {
    accountId: parseInt(accountId),
    refreshToken,
  }
  const response = await fetcher({ query, variables }, { headers })
  return response
}

export default switchUserHandler as any
