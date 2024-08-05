import { UserAuthTicket } from '@kibocommerce/graphql-client'
import { NextApiRequest, NextApiResponse } from 'next'

import { fetcher, getAdditionalHeader } from '../util'
import { refreshAuthToken as query } from '@/lib/gql/mutations'
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
    req.logger.info('refresh auth', JSON.stringify(refreshAuthTicketsResponse))

    const authTicket = refreshAuthTicketsResponse?.data?.refreshCustomerAuthTickets

    const customerAccount = authTicket?.customerAccount
    delete authTicket?.customerAccount
    const cookieValue: UserAuthTicket & { accountId: number } = {
      ...authTicket,
      accountId: id,
    }
    req.logger.info('cookieValue', JSON.stringify(cookieValue))
    res.setHeader(
      'Set-Cookie',
      getAuthCookieName() + '=' + prepareSetCookieValue({ ...cookieValue }) + ';HttpOnly;path=/'
    )

    res.status(200).json(customerAccount ? customerAccount : { success: true })
  } catch (error: any) {
    res.redirect(`/error-page?status=500&message=${encodeURIComponent(error.message)}`)
  }
}

async function refreshCustomerAuthToken(accountId: string, req: NextApiRequestWithLogger) {
  const cookies = req?.cookies
  req.logger.info('cookies', cookies)
  const authTicket = decodeParseCookieValue(cookies[getAuthCookieName()])
  req.logger.info('authTicket', authTicket)
  const refreshToken = authTicket?.refreshToken
  req.logger.info('refreshToken', refreshToken)
  const headers = req ? getAdditionalHeader(req) : {}
  req.logger.info('headers', headers)
  const variables = {
    accountId: parseInt(accountId),
    refreshToken,
  }
  req.logger.info('variables', variables)
  const response = await fetcher({ query, variables }, { headers })
  req.logger.info('response', response)
  return response
}

export default switchUserHandler as any
