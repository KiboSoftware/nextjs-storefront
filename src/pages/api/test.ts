import type { NextApiRequest, NextApiResponse } from 'next'

export default async function testHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // get variables
    console.log('testHandler')
    res.status(200).json({ results: 'ok' })
  } catch (error) {
    console.error(error)
    const message = 'An unexpected error ocurred'
    res.status(500).json({ data: null, errors: [{ message }] })
  }
}
