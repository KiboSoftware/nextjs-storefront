import { NextResponse, NextRequest } from 'next/server'

const checkIsAuthenticated = (req: NextRequest) => {
  const cookie = req.headers.get('cookie')
  const cookieValue = cookie?.split('kibo_at=')[1]
  const encodedValue = cookieValue?.split(';')[0]
  if (encodedValue) {
    const decodedCookie = JSON.parse(Buffer.from(encodedValue, 'base64').toString('utf8'))
    return decodedCookie?.userId
  }
  return null
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
