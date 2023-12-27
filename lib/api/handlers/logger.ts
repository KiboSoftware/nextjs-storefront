import getRequestDetails from '../util/get-request-details'
import logger from '@/next-logger.config'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function loggerHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // get variables

    const requestDetails = getRequestDetails(req)
    logger.info(requestDetails, 'Client error: request details')
    logger.error(req.body, 'Client Error')
  } catch (error: any) {
    res.status(error?.code).json({ message: error?.message })
    logger.error(error, 'Error in Logger handler')
  }
}
