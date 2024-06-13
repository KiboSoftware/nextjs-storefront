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

    const authTicket = await getCartTakeover(
      secretId as string,
      req as NextApiRequestWithLogger,
      res as NextApiResponse
    )
    if (!authTicket?.getOneTimeSecret?.value && authTicket?.errors?.length > 0) {
      res.redirect(
        `/error-page?errorMessage=${encodeURIComponent(
          authTicket?.errors[0]?.message || 'Unknown error'
        )}`
      )
    }

    if (authTicket?.getOneTimeSecret?.value) {
      const options = {
        ...(req && res && { req, res }),
      }
      const cookieValue: UserAuthTicket & { accountId: number } = {
        accessToken: authTicket?.getOneTimeSecret?.value?.accessToken,
        refreshToken: authTicket?.getOneTimeSecret?.value?.refreshToken,
        accessTokenExpiration: authTicket?.getOneTimeSecret?.value?.accessTokenExpiration,
        jwtAccessToken: authTicket?.getOneTimeSecret?.value?.jwtAccessToken,
        refreshTokenExpiration: authTicket?.getOneTimeSecret?.value?.refreshTokenExpiration,
        userId: authTicket?.getOneTimeSecret?.value?.userId,
        accountId: authTicket?.getOneTimeSecret?.value?.customerAccount?.id,
      }

      res.setHeader(
        'Set-Cookie',
        getAuthCookieName() + '=' + prepareSetCookieValue({ ...cookieValue }) + ';HttpOnly;path=/'
      )
      setCookie('isCSR', 'true', options)
      const redirectUrl = `/cart`
      res.redirect(redirectUrl)
    }
  } catch (error: any) {
    res.redirect(`/error-page?errorMessage=${encodeURIComponent(error.message)}`)
  }
}

export default cartTakeoverHandler as any
