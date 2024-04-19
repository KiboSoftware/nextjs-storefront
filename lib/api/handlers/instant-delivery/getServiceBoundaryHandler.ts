import { NextApiResponse } from 'next'
import getConfig from 'next/config'

import type { NextApiRequestWithLogger } from '@/lib/types'

export default async function getServiceBoundaryHandler(
  req: NextApiRequestWithLogger,
  res: NextApiResponse
) {
  const { serverRuntimeConfig } = getConfig()

  try {
    const { url, tenantId, x_api_key } = serverRuntimeConfig.deliverySolutions
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

    if (!response.ok) throw new Error(`Request failed with status: ${response.status}`)

    const data = await response.json()
    res.status(200).json(data['store-boundary-dsp'])
  } catch (error: any) {
    res.status(error?.code).json({ message: error?.message })
    req.logger.error(error, 'Error in Search handler')
  }
}
