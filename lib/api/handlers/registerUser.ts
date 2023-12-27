import getConfig from 'next/config'

import { fetcher, getAdditionalHeader } from '../util'
import getRequestDetails from '../util/get-request-details'
import getUserClaimsFromRequest from '../util/getUserClaimsFromRequest'
import { fromBitVectorSetArray } from '@/lib/helpers'
import logger from '@/next-logger.config'

import type { NextApiRequest, NextApiResponse } from 'next'

const config = getConfig()
const maxCookieAge = config?.publicRuntimeConfig?.maxCookieAge
const cookieName = config?.publicRuntimeConfig.userCookieKey.toLowerCase()

export default async function registerUserHandler(req: NextApiRequest, res: NextApiResponse) {
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
      Buffer.from(jwtAccessToken.split('.')[1], 'base64').toString('ascii')
    )
    const bv = decoded['https://www.kibocommerce.com/user_claims'].bv
    const behaviors = fromBitVectorSetArray(bv)

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
    const registerResponse = userId ? successResponse : response
    res.status(200).json(registerResponse)
  } catch (error: any) {
    res.status(error?.code).json({ message: error?.message })

    const requestDetails = getRequestDetails(req)
    logger.info(requestDetails, 'Register user handler: request details')
    logger.error(error, 'Error in Register user handler')
  }
}
