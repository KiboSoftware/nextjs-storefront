import { setCookie } from 'cookies-next'
import getConfig from 'next/config'

import type { UserAuthTicket } from '@kibocommerce/graphql-client'

const config = getConfig()
const maxCookieAge = config?.publicRuntimeConfig?.maxCookieAge
const purchaseLocationCookieName = config?.publicRuntimeConfig?.storeLocationCookie

export const storeClientCookie = (cookieName: string, cookieValue: UserAuthTicket | string) => {
  const date = new Date()
  date.setTime(date.getTime() + maxCookieAge) // max age for cookie, 5 days
  const expires = 'expires=' + date.toUTCString()
  document.cookie = `${cookieName}=${prepareSetCookieValue(cookieValue)};${expires};path=/`
}

export const removeClientCookie = (cookieName: string) => {
  const date = new Date(0)
  const expires = 'expires=' + date.toUTCString()
  document.cookie = `${cookieName}=;${expires};path=/`
}

const decode = (encodedStr: string) => Buffer.from(encodedStr, 'base64').toString('ascii')
const encode = (value: string) => Buffer.from(value).toString('base64')

export const decodeParseCookieValue = (cookieValue: string | undefined) => {
  try {
    if (!cookieValue) return
    return JSON.parse(decode(cookieValue))
  } catch (error) {
    console.error(`Unable to parse cookie`, error)
  }
}
export const prepareSetCookieValue = (cookie: UserAuthTicket | string): string => {
  try {
    return encode(JSON.stringify(cookie))
  } catch (error) {
    console.error(`Unable to stringify / encode cookie`, error)
    return ''
  }
}

export const setPurchaseLocationCookie = (cookieValue: string) => {
  setCookie(purchaseLocationCookieName, prepareSetCookieValue(cookieValue))
}
