import { deleteCookie } from 'cookies-next'
import { NextApiResponse } from 'next'

import { NextApiRequestWithLogger } from '@/lib/types'

export default function deletePreviewCookieHandler(
  req: NextApiRequestWithLogger,
  res: NextApiResponse
) {
  try {
    if (req.query.name) {
      deleteCookie(req.query.name as string, {
        req,
        res,
        httpOnly: true,
      })
    }

    res.status(200).json({ message: 'Cookie deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong, cookie not deleted', error })
    req.logger.error('Error in deletePreviewCookie handler', error)
  }
}
