import { productSearch } from '../operations'
import type { CategorySearchParams } from '@/lib/types'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function searchHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // get variables
    const response = await productSearch(req.query as unknown as CategorySearchParams)
    res.status(200).json({ results: response?.data?.products })
  } catch (error) {
    console.error(error)
    const message = 'An unexpected error ocurred'
    res.status(500).json({ data: null, errors: [{ message }] })
  }
}
