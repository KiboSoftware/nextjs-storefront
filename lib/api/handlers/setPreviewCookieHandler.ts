import { setCookie } from 'cookies-next'
import { NextApiResponse } from 'next'

import { NextApiRequestWithLogger } from '@/lib/types'

export default function setPreviewCookieHandler(
  req: NextApiRequestWithLogger,
  res: NextApiResponse
) {
  try {
    if (req.query.mz_pricelist) {
      const options = {
        httpOnly: true,
        ...(req && res && { req, res }),
      }
      setCookie('mz_pricelist', req.query.mz_pricelist, options)
    }

    if (req.query.mz_now) {
      const options = {
        httpOnly: true,
        ...(req && res && { req, res }),
      }
      setCookie('mz_now', req.query.mz_now, options)
    }

    res.status(200).json({ message: 'Cookie set' })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong, cookie not set', error })
    req.logger.error('Error in deletePreviewCookie handler', error)
  }
}
