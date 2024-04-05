import { v4 as uuidv4 } from 'uuid'

import getPaypalBearerToken from '../operations/get-paypal-bearer-token'
import { NextApiRequestWithLogger } from '@/lib/types'

import type { NextApiResponse } from 'next'

export default async function paypalApproveOrderHandler(
  req: NextApiRequestWithLogger,
  res: NextApiResponse
) {
  try {
    const payPalRequestId = uuidv4()
    const paypalBearerToken = await getPaypalBearerToken()

    const orderID = req.query?.orderID as string
    const body = req.body

    const url = process.env.NEXT_PUBLIC_PAYPAL_URL || 'https://api-m.sandbox.paypal.com'

    const orderRes = await fetch(`${url}/v2/checkout/orders/${orderID}/confirm-payment-source`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'PayPal-Request-Id': payPalRequestId,
        Authorization: `Bearer ${paypalBearerToken}`,
      },
      body: JSON.stringify(body),
    })

    if (!orderRes.ok) throw new Error('Error creating paypal order')

    const order = await orderRes.json()

    req.logger.info(
      `Paypal order: ${order?.orderID}, payerID:${order?.payerID} confirmed successfully...`
    )
    res.status(200).json(order)
  } catch (error: any) {
    res.status(error?.code).json({ message: error?.message })
    req.logger.error(error, 'Error while creating Paypal create order')
  }
}
