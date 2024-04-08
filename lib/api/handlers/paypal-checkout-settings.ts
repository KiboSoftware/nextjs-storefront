import getPaypalCheckoutSettings from '../util/get-paypal-checkout-settings'
import { NextApiRequestWithLogger } from '@/lib/types'

import type { NextApiResponse } from 'next'

export default async function paypalCheckoutSettingsHandler(
  req: NextApiRequestWithLogger,
  res: NextApiResponse
) {
  try {
    const checkoutSettings = await getPaypalCheckoutSettings()
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    res.status(200).json(checkoutSettings)
  } catch (error: any) {
    res.status(error).json({ message: error })
    req.logger.error(error, 'Error in Paypal Checkout Settings Handler')
  }
}
