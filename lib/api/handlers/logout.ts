import getConfig from 'next/config'

import getRequestDetails from '../util/get-request-details'
import logger from '@/next-logger.config'

import type { NextApiRequest, NextApiResponse } from 'next'

const config = getConfig()
const cookieName = config?.publicRuntimeConfig.userCookieKey.toLowerCase()

export default async function logoutHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // clear HTTP cookie
    res.setHeader('Set-Cookie', `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`)
    res.status(200).end('true')
  } catch (error) {
    console.error(error)
    const message = 'An unexpected error ocurred'
    res.status(500).json({ data: null, errors: [{ message }] })

    const requestDetails = getRequestDetails(req)
    logger.info(requestDetails, 'Logout handler: request details')
    logger.error(error, 'Error in Logout handler')
  }
}
