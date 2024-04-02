import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const redirectTo = (req?.query?.redirect as string) || '/'
  const url = new URL(process.env.NEXT_PUBLIC_URL + redirectTo)

  const mz_pricelist = url.searchParams.get('mz_pricelist') as string
  const mz_now = url.searchParams.get('mz_now') as string

  if (mz_pricelist) {
    res.setHeader('Set-Cookie', `mz_pricelist=${mz_pricelist}; Path=/`)
  }
  if (mz_now) {
    res.setHeader('Set-Cookie', `mz_now=${mz_now}; Path=/`)
  }

  res.setPreviewData({ mz_pricelist })

  res.redirect(redirectTo)

  res.end()
}
