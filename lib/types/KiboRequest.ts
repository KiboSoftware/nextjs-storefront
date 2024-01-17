import type { IncomingMessage } from 'http'
import type { NextApiRequest } from 'next'
import type { Logger } from 'pino'

export type RequestCookies = {
  [key: string]: string | undefined
}

export type KiboRequest = IncomingMessage & { cookies: RequestCookies }

export type NextApiRequestWithLogger = NextApiRequest & { logger: Logger }
