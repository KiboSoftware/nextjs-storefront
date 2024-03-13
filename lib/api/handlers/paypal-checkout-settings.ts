import { apiAuthClient } from '@/lib/api/util/api-auth-client'
import { NextApiRequestWithLogger } from '@/lib/types'

import type { NextApiResponse } from 'next'

const getMerchantId = (res: any) => {
  const payPalExpress2 = res.paymentSettings.externalPaymentWorkflowDefinitions.find(
    (item: any) => item.name === 'PayPalExpress2'
  )

  const merchantAccountId = payPalExpress2.credentials.find(
    (item: any) => item.displayName === 'Merchant account ID'
  ).value

  return merchantAccountId
}

export default async function paypalCheckoutSettingsHandler(
  req: NextApiRequestWithLogger,
  res: NextApiResponse
) {
  try {
    const authToken = await apiAuthClient.getAccessToken()
    const url = `https://${process.env.KIBO_API_HOST}/api/commerce/settings/checkout`

    const checkoutSettingsData = await fetch(url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })

    if (!checkoutSettingsData.ok)
      throw new Error(`Error fetching checkout settings: ${checkoutSettingsData}`)

    const checkoutSettings = await checkoutSettingsData.json()
    const merchantAccountId = checkoutSettings ? getMerchantId(checkoutSettings) : null

    res.status(200).json(merchantAccountId)
  } catch (error: any) {
    res.status(error).json({ message: error })
    req.logger.error(error, 'Error in Paypal Checkout Settings Handler')
  }
}
