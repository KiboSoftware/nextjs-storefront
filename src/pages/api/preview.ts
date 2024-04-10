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
    const queryParams: any = {}

    if (req?.query?.redirect) {
      const decodedRedirect = 'redirect=' + decodeURIComponent(req?.query?.redirect as string)

      // Parse the decoded string to extract query parameters
      decodedRedirect.split('&').forEach((pair, i) => {
        const [key, value] = pair.split('=')
        queryParams[key] = value || ''
      })
    }

    const url = new URL(process.env.NEXT_PUBLIC_URL + (queryParams['redirect'] || '/'))

    const mz_pricelist = queryParams['mz_pricelist'] as string
    const mz_now = queryParams['mz_now'] as string

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
