import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/my-account')) {
    const homeUrl = new URL('/', request.url)
    return NextResponse.redirect(homeUrl)
  }
}
