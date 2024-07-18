import { UserAuthTicket } from '@kibocommerce/graphql-client'
import { getCookie, setCookie } from 'cookies-next'
import { NextApiResponse } from 'next'

import refreshCustomerAuthToken from '../operations/refresh-customer-auth-token'
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

    console.log('refreshAuthTicketsResponse', refreshAuthTicketsResponse)

    const authTicket = refreshAuthTicketsResponse?.data?.refreshCustomerAuthTickets

    const customerAccount = authTicket?.customerAccount
    delete authTicket?.customerAccount
    const cookieValue: UserAuthTicket & { accountId: number } = {
      ...authTicket,
      accountId: id,
    }

    res.setHeader(
      'Set-Cookie',
      getAuthCookieName() + '=' + prepareSetCookieValue({ ...cookieValue }) + ';HttpOnly;path=/'
    )

    res.status(200).json(customerAccount ? customerAccount : { success: true })
  } catch (error: any) {
    res.redirect(`/error-page?status=500&message=${encodeURIComponent(error.message)}`)
  }
}

export default switchUserHandler as any
