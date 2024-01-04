import { productSearch } from '../operations'
// import getRequestDetails from '../util/get-request-details'
import type { CategorySearchParams, NextApiRequestWithLogger } from '@/lib/types'
// import logger from '@/next-logger.config'

import type { NextApiResponse } from 'next'

export default async function searchHandler(req: NextApiRequestWithLogger, res: NextApiResponse) {
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
    req.logger.error(error, 'Error in Search handler')
  }
}
