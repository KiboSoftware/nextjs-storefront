import { deleteCookie } from 'cookies-next'
import { NextApiResponse } from 'next'

import { NextApiRequestWithLogger } from '@/lib/types'

export default function clearPreviewModeHandler(
  req: NextApiRequestWithLogger,
  res: NextApiResponse
) {
  try {
    deleteCookie('mz_pricelist', {
      req,
      res,
      httpOnly: true,
    })

    deleteCookie('mz_now', {
      req,
      res,
      httpOnly: true,
    })

    res.clearPreviewData({})

    res.status(200).json({ message: 'Preview mode disabled' })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong, cookies not deleted', error })
    req.logger.error('Error in deletePreviewCookie handler', error)
  }
}
