import { NextApiRequest } from 'next'

const getAdditionalHeader = (req: NextApiRequest, userClaims?: string) => {
  const { mz_now, mz_pricelist } = req.cookies
  let headers = {}
  const forwardedForHeader = req?.headers['x-forwarded-for']

  if (req.preview === false && !forwardedForHeader) {
    return {}
  }

  if (req.preview === true) {
    headers = {
      ...headers,
      'X-Vol-Preview-Date': mz_now,
      'X-Vol-PriceList': mz_pricelist,
      'X-Vol-Dataview-Mode': 'Pending',
    }
  }

  if (forwardedForHeader) {
    const forwardedFor = forwardedForHeader?.toString().split(',')[0]

    // add additional headers here
    headers = {
      ...headers,
      'x-forwarded-for': forwardedFor,
    }
  }

  return headers
}

export default getAdditionalHeader
