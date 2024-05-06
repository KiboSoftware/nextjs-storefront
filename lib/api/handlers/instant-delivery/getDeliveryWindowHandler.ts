import { NextApiResponse } from 'next'
import getConfig from 'next/config'

import type { NextApiRequestWithLogger } from '@/lib/types'

export default async function getDeliveryWindowHandler(
  req: NextApiRequestWithLogger,
  res: NextApiResponse
) {
  const { serverRuntimeConfig } = getConfig()

  try {
    const { baseUrl, tenantId, x_api_key } = serverRuntimeConfig.deliverySolutions
    const url = `${baseUrl}/smartWindows`
    const body = req.body

    const headers = {
      accept: 'application/json',
      'content-type': 'application/json',
      tenantId: tenantId,
      'x-api-key': x_api_key,
      'x-compression': 'true',
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    })

    let data
    if (response.ok) {
      data = await response.json()
    } else {
      data = null
    }

    res.status(200).json(data)
  } catch (error: any) {
    res.status(200).json(null)
    req.logger.error(error, 'Error while fetching delivery window data')
  }
}
