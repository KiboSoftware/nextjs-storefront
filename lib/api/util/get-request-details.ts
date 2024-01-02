import { NextApiRequest } from 'next'
import getConfig from 'next/config'

const getDecodeCookie = (req: NextApiRequest) => {
  const config = getConfig()
  const cookieName = config?.publicRuntimeConfig.userCookieKey.toLowerCase()

  const cookie = req.cookies?.[cookieName]?.split(';')[0] || ''
  const decodedCookie = JSON.parse(Buffer.from(cookie, 'base64').toString('ascii'))

  return decodedCookie
}

const getUserId = (req: NextApiRequest) => {
  return getDecodeCookie(req)?.userId
}

const getTenant = (req: NextApiRequest) => {
  const KIBO_API_HOST = process.env.KIBO_API_HOST

  let tenant
  if (KIBO_API_HOST) {
    const tenantArr = KIBO_API_HOST.match(/t(\d+)-/)
    tenant = tenantArr && tenantArr[1]
  } else {
    tenant = getDecodeCookie(req)?.tenant
  }

  return tenant || ''
}

const getSite = (req: NextApiRequest) => {
  const KIBO_API_HOST = process.env.KIBO_API_HOST

  let site
  if (KIBO_API_HOST) {
    const siteArr = KIBO_API_HOST.match(/s(\d+)\./)
    site = siteArr && siteArr[1]
  } else {
    site = getDecodeCookie(req)?.site
  }

  return site || ''
}

const getRequestDetails = (req: NextApiRequest) => {
  const reqDetails = {
    url: process.env.NEXT_PUBLIC_URL,
    apiEndpoint: req.url,
    // query: req.body.query,
    // variables: req.body.variables,
    tenant: getTenant(req),
    site: getSite(req),
    userId: getUserId(req),
    'X-Forwarded-For': req.socket.remoteAddress,
    'ip-address': req.socket.remoteAddress,
  }

  return reqDetails
}

export default getRequestDetails
