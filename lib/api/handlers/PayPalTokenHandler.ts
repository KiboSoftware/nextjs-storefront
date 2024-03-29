import { NextApiRequestWithLogger } from '@/lib/types'

import type { NextApiResponse } from 'next'

export default async function paypalTokenHandler(
  req: NextApiRequestWithLogger,
  res: NextApiResponse
) {
  try {
    const url = process.env.NEXT_PUBLIC_PAYPAL_URL || 'https://api-m.sandbox.paypal.com'
    const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID
    const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET

    const response = await fetch(url + '/v1/oauth2/token', {
      method: 'post',
      body: 'grant_type=client_credentials',
      headers: {
        Authorization:
          'Basic ' + Buffer.from(PAYPAL_CLIENT_ID + ':' + PAYPAL_CLIENT_SECRET).toString('base64'),
      },
    })

    const data = await response.json()
    res.status(200).json(data.access_token)
  } catch (error: any) {
    res.status(error?.code).json({ message: error?.message })
    req.logger.error(error, 'Error in Paypal Token handler')
  }
}
