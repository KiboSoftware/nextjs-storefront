import { apiAuthClient } from '../util/api-auth-client'
import { NextApiRequestWithLogger } from '@/lib/types'

import type { NextApiResponse } from 'next'

export default async function isPayPalEnabledHandler(
  req: NextApiRequestWithLogger,
  res: NextApiResponse
) {
  try {
    const authToken = await apiAuthClient.getAccessToken()
    const url = `https://${process.env.KIBO_API_HOST}/api/commerce/settings/checkout/paymentsettings/thirdpartyworkflow/mozuadmin~paypal_complete_payments_application`

    const paymentSettings = await fetch(url, {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })

    if (!paymentSettings.ok) throw new Error(`Error fetching checkout settings: ${paymentSettings}`)

    const paymentSettingsData = await paymentSettings.json()
    const isEnabled = paymentSettingsData ? paymentSettingsData?.isEnabled : false

    req.logger.info(`isPayPalEnabled request completed successfully`)
    res.status(200).json(isEnabled)
  } catch (error: any) {
    res.status(error?.code).json({ message: error?.message })
    req.logger.error(error, 'Error in isPayPalEnabledHandler')
  }
}
