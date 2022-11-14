import { NextResponse, NextRequest } from 'next/server'

const checkIsAutheticated = (req: NextRequest) => {
  return true
}

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/my-account')) {
    if (checkIsAutheticated(request)) {
      return NextResponse.next()
    }
    const homeUrl = new URL('/', request.url)
    return NextResponse.redirect(homeUrl)
  }
}
