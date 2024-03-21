import { NextApiRequest } from 'next'

const getAdditionalHeader = (req: NextApiRequest) => {
  const { mz_now, mz_pricelist } = req.cookies
  let headers = {}
  const forwardedForHeader = req?.headers['x-forwarded-for']

  if (req.preview === false && !forwardedForHeader) {
    return {}
  }

  const noUserClaimsRequired =
    req?.body?.operationName !== 'getUser' &&
    req?.body?.operationName !== 'getCurrentCart' &&
    req?.body?.operationName !== 'cart' &&
    req?.body?.operationName !== 'addToCart'

  if (req.preview === true) {
    headers = {
      ...headers,
      ...(noUserClaimsRequired && {
        'X-Vol-Preview-Date': mz_now,
        'X-Vol-PriceList': mz_pricelist,
        'X-Vol-Dataview-Mode': 'Pending',
      }),
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
