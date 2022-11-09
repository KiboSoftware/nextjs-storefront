import { NextResponse, NextRequest } from 'next/server'

import { decodeParseCookieValue } from './lib/helpers/cookieHelper'

const checkIsAuthenticated = (req: NextRequest) => {
  const cookie = req.headers.get('cookie')

  const decodedCookie = decodeParseCookieValue(cookie?.split('kibo_at=')[1])
  return decodedCookie?.userId
}

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/my-account')) {
    if (checkIsAuthenticated(request)) {
      return NextResponse.next()
    }
    const homeUrl = new URL('/', request.url)
    return NextResponse.redirect(homeUrl.pathname)
  }
}