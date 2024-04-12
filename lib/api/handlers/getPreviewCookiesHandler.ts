import { getCookie } from 'cookies-next'
import { NextApiResponse } from 'next'

import { NextApiRequestWithLogger } from '@/lib/types'

export default function getPreviewCookiesHandler(
  req: NextApiRequestWithLogger,
  res: NextApiResponse
) {
  try {
    const options = {
      httpOnly: true,
      path: '/',
      ...(req && res && { req, res }),
    }

    const mz_pricelist = getCookie('mz_pricelist', options)
    const mz_now = getCookie('mz_now', options)

    const response = {
      ...(mz_pricelist && { mz_pricelist }),
      ...(mz_now && { mz_now }),
    }

    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong, cookies not retrieved', error })
    req.logger.error('Error in deletePreviewCookie handler', error)
  }
}
