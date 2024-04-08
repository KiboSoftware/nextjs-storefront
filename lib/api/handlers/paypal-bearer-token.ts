import getPaypalBearerToken from '../util/get-paypal-bearer-token'
import { NextApiRequestWithLogger } from '@/lib/types'

import type { NextApiResponse } from 'next'

export default async function paypalBearerTokenHandler(
  req: NextApiRequestWithLogger,
  res: NextApiResponse
) {
  try {
    const bearerToken = await getPaypalBearerToken()
    req.logger.info(`Paypal Bearer Token: ${bearerToken} created successfully`)

    res.status(200).json(bearerToken)
  } catch (error: any) {
    res.status(error?.code).json({ message: error?.message })
    req.logger.error(error, 'Error in Paypal Token handler')
  }
}
