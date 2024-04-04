import { setCookie } from 'cookies-next'
import { NextApiResponse } from 'next'

import withLogger from '@/lib/api/util/with-logger'
import {} from '@/lib/helpers'
import { NextApiRequestWithLogger } from '@/lib/types'

function previewHandler(req: NextApiRequestWithLogger, res: NextApiResponse) {
  try {
    if (process.env.DISALLOW_KIBO_PREVIEW) {
      return res.status(403).json({ error: 'Preview mode is disabled' })
    }

    const redirectTo = (req?.query?.redirect as string) || '/'
    const url = new URL(process.env.NEXT_PUBLIC_URL + redirectTo)

    const mz_pricelist = req?.query?.mz_pricelist as string
    const mz_now = req?.query?.mz_now as string

    const options = {
      httpOnly: true,
      req,
      res,
    }

    if (mz_pricelist) {
      url.searchParams.set('mz_pricelist', mz_pricelist)
      setCookie('mz_pricelist', mz_pricelist, options)
    }
    if (mz_now) {
      url.searchParams.set('mz_now', mz_now)
      setCookie('mz_now', mz_now, options)
    }

    res.setPreviewData({})
    res.redirect(url.href)
  } catch (error: any) {
    req.logger.error(error, 'Error in Preview mode handler')
    res.status(500).json({ error: 'Something went wrong with preview mode' })
  }
}

export default withLogger(previewHandler as any)
