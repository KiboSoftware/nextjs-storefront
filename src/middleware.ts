import { NextResponse, NextRequest } from 'next/server'

const checkIsAuthenticated = (req: NextRequest) => {
  const cookie = req.headers.get('cookie')
  const cookieValue = cookie?.split('kibo_at=')[1]
  const decodedCookie = JSON.parse(atob(cookieValue as string))
  return decodedCookie?.userId
}

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/my-account')) {
    if (checkIsAuthenticated(request)) {
      return NextResponse.next()
    }

    const homeUrl = new URL('/', request.url)
    return NextResponse.redirect(homeUrl)
  }
}
