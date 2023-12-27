import { NextApiRequest } from 'next'
import getConfig from 'next/config'

const getUserId = (req: NextApiRequest) => {
  const config = getConfig()
  const cookieName = config?.publicRuntimeConfig.userCookieKey.toLowerCase()

  const cookie = req.cookies?.[cookieName]?.split(';')[0] || ''
  const decodedCookie = JSON.parse(Buffer.from(cookie, 'base64').toString('ascii'))

  return decodedCookie?.userId
}

const getTenant = () => {
  const KIBO_API_HOST = process.env.KIBO_API_HOST || ''
  const tenantArr = KIBO_API_HOST.match(/t(\d+)-/)
  const tenant = tenantArr && tenantArr[1]

  return tenant || ''
}

const getSite = () => {
  const KIBO_API_HOST = process.env.KIBO_API_HOST || ''
  const siteArr = KIBO_API_HOST.match(/s(\d+)\./)
  const site = siteArr && siteArr[1]

  return site || ''
}

const getRequestDetails = (req: NextApiRequest) => {
  const reqDetails = {
    url: process.env.NEXT_PUBLIC_URL,
    apiEndpoint: req.url,
    // query: req.body.query,
    // variables: req.body.variables,
    tenant: getTenant(),
    site: getSite(),
    userId: getUserId(req),
    'X-Forwarded-For': req.socket.remoteAddress,
    'ip-address': req.socket.remoteAddress,
  }

  return reqDetails
}

export default getRequestDetails
