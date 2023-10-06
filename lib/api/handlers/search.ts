import { productSearch } from '../operations'
import type { CategorySearchParams } from '@/lib/types'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function searchHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // get variables
    const response = await productSearch(req.query as unknown as CategorySearchParams, req)
    if (response?.errors) {
      throw {
        message: response?.errors[0]?.extensions?.response?.body?.message,
        code: response?.errors[0].extensions.response.status,
      }
    }

    res.status(200).json({ results: response?.data?.products })
  } catch (error: any) {
    res.status(error?.code).json({ message: error?.message })
  }
}
