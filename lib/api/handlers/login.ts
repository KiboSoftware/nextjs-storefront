import getConfig from 'next/config'

import { fetcher, getAdditionalHeader } from '../util'
import getUserClaimsFromRequest from '../util/getUserClaimsFromRequest'
import { fromBitVectorSetArray } from '@/lib/helpers'
import { NextApiRequestWithLogger } from '@/lib/types'

import type { NextApiResponse } from 'next'

const config = getConfig()
const maxCookieAge = config?.publicRuntimeConfig?.maxCookieAge
const cookieName = config?.publicRuntimeConfig.userCookieKey.toLowerCase()

export default async function loginHandler(req: NextApiRequestWithLogger, res: NextApiResponse) {
  try {
    const { query, variables } = req.body
    const userClaims = await getUserClaimsFromRequest(req, res)
    const headers = getAdditionalHeader(req)
    const response = await fetcher({ query, variables }, { userClaims, headers })
    if (response?.errors) {
      throw {
        message: response?.errors[0]?.extensions?.response?.body?.message,
        code: response?.errors[0].extensions.response.status,
      }
    }

    // set HTTP cookie
    const account = response?.data?.account
    const userId = response?.data?.account?.customerAccount?.userId
    const jwtAccessToken = response?.data?.account?.jwtAccessToken
    const decoded = JSON.parse(
      Buffer.from(jwtAccessToken?.split('.')[1], 'base64').toString('ascii')
    )
    const bv = decoded['https://www.kibocommerce.com/user_claims'].bv
    const behaviors = fromBitVectorSetArray(bv)
    const cookieValue = {
      accessToken: account?.accessToken,
      accessTokenExpiration: account?.accessTokenExpiration,
      refreshToken: account?.refreshToken,
      refreshTokenExpiration: account?.refreshTokenExpiration,
      userId: userId,
      accountId: account?.customerAccount?.id,
    }
    const encodedValue = Buffer.from(JSON.stringify(cookieValue)).toString('base64')
    // set cookie
    if (userId) {
      res.setHeader(
        'Set-Cookie',
        `${cookieName}=${encodedValue}; HttpOnly; Max-Age=${maxCookieAge}; path=/`
      )
    }
    // response object
    const successResponse = {
      data: {
        account: {
          customerAccount: response?.data?.account?.customerAccount,
          behaviors,
        },
      },
    }
    // response status
    const loginResponse = userId ? successResponse : response
    // send response
    res.status(200).json(loginResponse)
  } catch (error: any) {
    res.status(error?.code).json({ message: error?.message })
    req.logger.error(error, 'Error in Login handler')
  }
}
