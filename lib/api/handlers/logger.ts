import { NextApiRequestWithLogger } from '@/lib/types'

import type { NextApiResponse } from 'next'

export default async function loggerHandler(req: NextApiRequestWithLogger, res: NextApiResponse) {
  try {
    req.logger.error(req.body, 'Client Error')
  } catch (error: any) {
    res.status(error?.code).json({ message: error?.message })
  }
}
