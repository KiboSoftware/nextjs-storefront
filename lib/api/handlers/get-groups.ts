import { getGroups } from '../operations'
import { NextApiRequestWithLogger } from '@/lib/types'

import type { NextApiResponse } from 'next'

export default async function getGroupsHandler(
  req: NextApiRequestWithLogger,
  res: NextApiResponse
) {
  try {
    res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')
    const response = await getGroups(req, res)
    if (response?.errors) {
      throw {
        message: response?.errors[0]?.extensions?.response?.body?.message,
        code: response?.errors[0].extensions.response.status,
      }
    }
    res.status(200).json(response)
  } catch (error: any) {
    res.status(error?.code).json({ message: error?.message })
    req.logger.error('Error in Category-tree handler', error)
  }
}
