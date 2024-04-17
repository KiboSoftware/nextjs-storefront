import getPaypalBearerToken from '../util/get-paypal-bearer-token'
import { NextApiRequestWithLogger } from '@/lib/types'

import type { NextApiResponse } from 'next'

export default async function paypalCreateOrderHandler(
  req: NextApiRequestWithLogger,
  res: NextApiResponse
) {
  try {
    const paypalBearerToken = await getPaypalBearerToken()
    const body = req.body

    const url = process.env.NEXT_PUBLIC_PAYPAL_URL || 'https://api-m.sandbox.paypal.com'

    const orderRes = await fetch(`${url}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${paypalBearerToken}`,
      },
      body: JSON.stringify(body),
    })

    if (!orderRes.ok) throw new Error('Error creating paypal order')

    const order = await orderRes.json()

    req.logger.info(`Paypal order: ${order.id} created successfully...`)
    res.status(200).json(order)
  } catch (error: any) {
    res.status(error?.code).json({ message: error?.message })
    req.logger.error(error, 'Error while creating Paypal create order')
  }
}
