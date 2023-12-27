import { getCategoryTree } from '../operations'
import getRequestDetails from '../util/get-request-details'
import logger from '@/next-logger.config'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function categoryTreeHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')
    const response = await getCategoryTree(req)
    if (response?.errors) {
      throw {
        message: response?.errors[0]?.extensions?.response?.body?.message,
        code: response?.errors[0].extensions.response.status,
      }
    }
    res.status(200).json(response)
  } catch (error: any) {
    res.status(error?.code).json({ message: error?.message })

    const requestDetails = getRequestDetails(req)
    logger.info(requestDetails, 'Category-tree handler: request details')
    logger.error(error, 'Error in Category-tree handler')
  }
}
