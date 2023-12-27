import { productSearch } from '../operations'
import getRequestDetails from '../util/get-request-details'
import type { CategorySearchParams } from '@/lib/types'
import logger from '@/next-logger.config'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function searchHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // get variables
    const response = await productSearch(req.query as unknown as CategorySearchParams, req)
    if (response?.errors) {
      throw {
        message: response?.errors[0]?.extensions?.response?.body?.message,
        code: response?.errors[0].extensions.response.status,
      }
    }

    res.status(200).json({ results: response?.data?.products })
  } catch (error: any) {
    res.status(error?.code).json({ message: error?.message })

    const requestDetails = getRequestDetails(req)
    logger.info(requestDetails, 'Search handler: request details')
    logger.error(error, 'Error in Search handler')
  }
}
