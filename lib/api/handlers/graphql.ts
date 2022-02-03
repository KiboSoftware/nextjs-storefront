import type { NextApiRequest, NextApiResponse } from 'next'
import { fetcher } from '../util'
export default async function graphQLHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { query, variables } = req.body
    const response = await fetcher({ query, variables })
    res.status(200).json(response)
  } catch (error) {
    console.error(error)
    const message = 'An unexpected error ocurred'
    res.status(500).json({ data: null, errors: [{ message }] })
  }
}
