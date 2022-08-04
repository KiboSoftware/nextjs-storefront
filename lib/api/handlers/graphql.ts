import { fetcher } from '../util'
import getUserClaimsFromRequest from '../util/getUserClaimsFromRequest'
import { prepareSetCookieValue } from '@/lib/helpers/cookieHelper'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function graphQLHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { query, variables } = req.body
    const { userClaims, authTicket, authCookieName, isNewAuthTicket } =
      await getUserClaimsFromRequest(req)
    const response = await fetcher({ query, variables }, { userClaims })
    if (req.body.operationName === 'login') {
      res.setHeader('Set-Cookie', authCookieName + '=;max-age=0')
    }
    if (isNewAuthTicket && req.body.operationName === 'addToCart') {
      // first time customer go for add to cart
      res.setHeader(
        'Set-Cookie',
        authCookieName + '=' + prepareSetCookieValue(authTicket) + ';path=/'
      )
    }

    res.status(200).json(response)
  } catch (error) {
    console.error(error)

    const message = 'An unexpected error ocurred'

    res.status(500).json({ data: null, errors: [{ message }] })
  }
}
