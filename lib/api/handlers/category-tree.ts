import { getCategoryTree } from '../operations'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function categoryTreeHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')
    const response = await getCategoryTree(req)
    if (response?.errors) {
      throw {
        message: response?.errors[0]?.extensions?.response?.body?.message,
        code: response?.errors[0].extensions.response.status,
      }
    }
    res.status(200).json(response)
  } catch (error: any) {
    res.status(error?.code).json({ message: error?.message })
  }
}
