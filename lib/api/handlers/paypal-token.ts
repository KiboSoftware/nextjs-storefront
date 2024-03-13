import { getToken } from '@/lib/helpers/paypal/PayPalExpress'
import { NextApiRequestWithLogger } from '@/lib/types'

import { CrOrder } from '@/lib/gql/types'
import type { NextApiResponse } from 'next'

export default async function paypalTokenHandler(
  req: NextApiRequestWithLogger,
  res: NextApiResponse
) {
  try {
    const checkout = JSON.parse(req.body)?.checkout as CrOrder

    const details = await getToken(checkout)

    res.status(200).json(details)
  } catch (error: any) {
    res.status(error?.code).json({ message: error?.message })
    req.logger.error(error, 'Error in Paypal Token handler')
  }
}
