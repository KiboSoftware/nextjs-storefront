import { UserAuthTicket } from '@kibocommerce/graphql-client'
import { setCookie } from 'cookies-next'
import { NextApiResponse } from 'next'

import getCartTakeover from '../operations/get-cart-takeover'
import { getAuthCookieName, prepareSetCookieValue } from '@/lib/helpers/cookieHelper'
import { NextApiRequestWithLogger } from '@/lib/types'

async function cartTakeoverHandler(req: NextApiRequestWithLogger, res: NextApiResponse) {
  try {
    const { secretId } = req.query

    if (!secretId) {
      return res.status(400).json({ error: 'Missing secretId' })
    }

    const cartTakeoverResponse = await getCartTakeover(
      secretId as string,
      req as NextApiRequestWithLogger
    )

    if (!cartTakeoverResponse) {
      return res.redirect(`/error-page?status500`)
    }

    const authTicket = cartTakeoverResponse?.data?.getOneTimeSecret

    if (!authTicket && cartTakeoverResponse?.errors?.length > 0) {
      const status = cartTakeoverResponse?.errors[0]?.extensions?.response?.status
      const message = cartTakeoverResponse?.errors[0]?.extensions?.response?.body?.message

      res.redirect(`/error-page?status=${status}&message=${encodeURIComponent(message)}`)
    }

    if (authTicket) {
      const options = {
        ...(req && res && { req, res }),
      }
      const cookieValue: UserAuthTicket & { accountId: number } = {
        accessToken: authTicket?.value?.accessToken,
        refreshToken: authTicket?.value?.refreshToken,
        accessTokenExpiration: authTicket?.value?.accessTokenExpiration,
        jwtAccessToken: authTicket?.value?.jwtAccessToken,
        refreshTokenExpiration: authTicket?.value?.refreshTokenExpiration,
        userId: authTicket?.value?.userId,
        accountId: authTicket?.value?.customerAccount?.id,
      }

      res.setHeader(
        'Set-Cookie',
        getAuthCookieName() + '=' + prepareSetCookieValue({ ...cookieValue }) + ';HttpOnly;path=/'
      )
      setCookie('isCSR', 'true', options)
      setCookie('customer', authTicket?.value?.customerAccount?.firstName, options)

      const redirectUrl = `/cart`
      res.redirect(redirectUrl)
    }
  } catch (error: any) {
    res.redirect(`/error-page?status=500&message=${encodeURIComponent(error.message)}`)
  }
}

export default cartTakeoverHandler as any
