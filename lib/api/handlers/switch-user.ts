import { UserAuthTicket } from '@kibocommerce/graphql-client'
import { getCookie, setCookie } from 'cookies-next'
import { NextApiResponse } from 'next'

import refreshCustomerAuthToken from '../operations/refresh-customer-auth-token'
import { decodeParseCookieValue, getAuthCookieName, prepareSetCookieValue } from '@/lib/helpers/cookieHelper'
import { NextApiRequestWithLogger } from '@/lib/types'

async function switchUserHandler(req: NextApiRequestWithLogger, res: NextApiResponse) {
  try {

    console.log(req.cookies, req.query)
    const { id } = req.query

    const refreshAuthTicketsResponse = await refreshCustomerAuthToken(
      id,
      req as NextApiRequestWithLogger
    )

    console.log('refreshAuthTicketsResponse', refreshAuthTicketsResponse)
    // if (!cartTakeoverResponse) {
    //   return res.redirect(`/error-page?status500`)
    // }

    const authTicket = refreshAuthTicketsResponse?.data?.refreshCustomerAuthTickets

    // if (!authTicket && cartTakeoverResponse?.errors?.length > 0) {
    //   const status = cartTakeoverResponse?.errors[0]?.extensions?.response?.status
    //   const message = cartTakeoverResponse?.errors[0]?.extensions?.response?.body?.message

    //   res.redirect(`/error-page?status=${status}&message=${encodeURIComponent(message)}`)
    // }

    // if (authTicket) {
    //   const options = {
    //     ...(req && res && { req, res }),
    //   }
      delete authTicket.customerAccount
      const cookieValue: UserAuthTicket & { accountId: number } = {
        ...authTicket, 
        accountId: id,
      }

      res.setHeader(
        'Set-Cookie',
        getAuthCookieName() + '=' + prepareSetCookieValue({ ...cookieValue }) + ';HttpOnly;path=/'
      )
      res.status(200).json({ message: 'User switched successfully' })
    //   setCookie('isCSR', 'true', options)
    //   setCookie('customer', authTicket?.value?.customerAccount?.firstName, options)

    //   const redirectUrl = `/cart`
    //   res.redirect(redirectUrl)
    // }
  } catch (error: any) {
    res.redirect(`/error-page?status=500&message=${encodeURIComponent(error.message)}`)
  }
}

export default switchUserHandler as any
