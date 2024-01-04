import { getCategoryTree } from '../operations'
import { NextApiRequestWithLogger } from '@/lib/types'

import type { NextApiResponse } from 'next'

export default async function categoryTreeHandler(
  req: NextApiRequestWithLogger,
  res: NextApiResponse
) {
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
    req.logger.error(error, 'Error in Category-tree handler')
  }
}
