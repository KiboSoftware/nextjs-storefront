import type { IncomingMessage } from 'http'

export type RequestCookies = {
  [key: string]: string | undefined
}

export type KiboRequest = IncomingMessage & { cookies: RequestCookies }
