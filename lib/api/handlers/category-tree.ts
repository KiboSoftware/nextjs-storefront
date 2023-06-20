import { getCategoryTree } from '../operations'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function categoryTreeHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')
    const response = await getCategoryTree(req)
    res.status(200).json(response)
  } catch (error) {
    console.error(error)
    const message = 'An unexpected error ocurred'
    res.status(500).json({ data: null, errors: [{ message }] })
  }
}
