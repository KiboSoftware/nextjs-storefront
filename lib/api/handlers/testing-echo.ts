import getConfig from 'next/config'

import type { NextApiRequest, NextApiResponse } from 'next'
export default async function testingEcho(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { publicRuntimeConfig } = getConfig()
    res.status(200).json({
      pciHost: publicRuntimeConfig?.pciHost,
      apiHost: publicRuntimeConfig?.apiHost,
      authHost: process.env.KIBO_AUTH_HOST,
    })
  } catch (error) {
    console.error(error)
    const message = 'An unexpected error ocurred'
    res.status(500).json({ data: null, errors: [{ message }] })
  }
}
