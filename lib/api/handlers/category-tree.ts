import { getCategoryTree } from '../operations'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function categoryTreeHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await getCategoryTree()
    res.status(200).json(response)
  } catch (error) {
    console.error(error)
    const message = 'An unexpected error ocurred'
    res.status(500).json({ data: null, errors: [{ message }] })
  }
}
