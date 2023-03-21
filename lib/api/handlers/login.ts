import getConfig from 'next/config'

import { fetcher } from '../util'
import getUserClaimsFromRequest from '../util/getUserClaimsFromRequest'

import type { NextApiRequest, NextApiResponse } from 'next'

const config = getConfig()
const maxCookieAge = config?.publicRuntimeConfig?.maxCookieAge
const cookieName = config?.publicRuntimeConfig.userCookieKey.toLowerCase()

export default async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { query, variables } = req.body
    const userClaims = await getUserClaimsFromRequest(req, res)
    const response = await fetcher({ query, variables }, { userClaims })

    // set HTTP cookie
    const account = response?.data?.account
    const userId = response?.data?.account?.customerAccount?.userId

    const cookieValue = {
      accessToken: account?.accessToken,
      accessTokenExpiration: account?.accessTokenExpiration,
      refreshToken: account?.refreshToken,
      refreshTokenExpiration: account?.refreshTokenExpiration,
      userId: userId,
    }
    const encodedValue = Buffer.from(JSON.stringify(cookieValue)).toString('base64')

    res.setHeader(
      'Set-Cookie',
      `${cookieName}=${encodedValue}; HttpOnly; Max-Age=${maxCookieAge}; path=/`
    )
    res.status(200).json(response)
  } catch (error) {
    console.error(error)
    const message = 'An unexpected error ocurred'
    res.status(500).json({ data: null, errors: [{ message }] })
  }
}
