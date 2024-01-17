import getConfig from 'next/config'
import { NextApiRequest, NextApiResponse } from 'next/types'

import { NextApiRequestWithLogger } from '@/lib/types'
import logger from '@/next-logger.config'

type ApiHandler = (
  req: NextApiRequest | NextApiRequestWithLogger,
  res: NextApiResponse
) => Promise<any>

const getDecodeCookie = (req: NextApiRequest) => {
  const config = getConfig()
  const cookieName = config?.publicRuntimeConfig.userCookieKey.toLowerCase()

  const cookie = req.cookies?.[cookieName]?.split(';')[0] || ''
  const decodedCookie = cookie ? JSON.parse(Buffer.from(cookie, 'base64').toString('ascii')) : null

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
    tenant = req.headers?.tenant
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
    site = req.headers?.site
  }

  return site || ''
}

function requestMetaData(req: NextApiRequest) {
  return {
    url: req.url,
    tenant: getTenant(req),
    site: getSite(req),
    userId: getUserId(req),
    'X-Forwarded-For': req.socket.remoteAddress,
    variables: req.body.variables,
  }
}

function responseMetaData(res: NextApiResponse) {
  return { statusCode: res.statusCode }
}

export default function withLogger(handle: ApiHandler) {
  return async (request: NextApiRequest, response: NextApiResponse) => {
    const start = Date.now()
    const requestLogger = logger.child({
      handlerName: handle.name,
      request: requestMetaData(request),
    })
    ;(request as any).logger = requestLogger

    requestLogger.info('Request start')

    await handle(request, response)
    requestLogger.info(
      { duration: Date.now() - start, response: responseMetaData(response) },
      'Request end'
    )
  }
}
