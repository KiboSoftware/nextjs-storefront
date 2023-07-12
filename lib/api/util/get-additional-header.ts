import { NextApiRequest } from 'next'

const getAdditionalHeader = (req: NextApiRequest) => {
  const forwardedForHeader = req?.headers['x-forwarded-for']
  if (!forwardedForHeader) {
    return {}
  }

  const forwardedFor = forwardedForHeader.toString().split(',')[0]

  // add additional headers here
  const headers = {
    'x-forwarded-for': forwardedFor,
  }

  return headers
}

export default getAdditionalHeader
