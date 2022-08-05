import { fetcher } from '../util'
import getUserClaimsFromRequest from '../util/getUserClaimsFromRequest'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function graphQLHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { query, variables } = req.body
    const userClaims = await getUserClaimsFromRequest(req, res)
    const response = await fetcher({ query, variables }, { userClaims })
    res.status(200).json(response)
  } catch (error) {
    console.error(error)
    const message = 'An unexpected error ocurred'
    res.status(500).json({ data: null, errors: [{ message }] })
  }
}
