import { NextResponse, NextRequest } from 'next/server'

const checkIsAuthenticated = (req: NextRequest) => {
  const cookie = req.headers.get('cookie')
  const cookieValue = cookie?.split('kibo_at=')[1]
  const encodedValue = cookieValue?.split(';')[0]
  if (encodedValue) {
    console.log('Encoded cookie value:', encodedValue)
    const decodedCookie = JSON.parse(decodeBase64(encodedValue))
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

function decodeBase64(str: string): string {
  // Use the built-in atob function which is available in the Edge runtime
  try {
    return atob(str)
  } catch (e) {
    // Fallback to custom implementation if atob fails
    const base64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    let result = ''

    // Add back any padding that might have been removed
    while (str.length % 4) {
      str += '='
    }

    for (let i = 0; i < str.length; i += 4) {
      // Calculate how many characters we'll output (2 or 3)
      const pad =
        str.substring(i + 1, i + 4).indexOf('=') >= 0
          ? str.substring(i, i + 4).split('=').length - 1
          : 0

      // Decode the 4 characters
      let bits =
        (base64chars.indexOf(str[i] || 'A') << 18) | (base64chars.indexOf(str[i + 1] || 'A') << 12)

      if (pad < 2) {
        bits |= base64chars.indexOf(str[i + 2] || 'A') << 6
      }

      if (pad < 1) {
        bits |= base64chars.indexOf(str[i + 3] || 'A')
      }

      // Convert to characters, respecting padding
      result += String.fromCharCode((bits >> 16) & 0xff)
      if (pad < 2) result += String.fromCharCode((bits >> 8) & 0xff)
      if (pad < 1) result += String.fromCharCode(bits & 0xff)
    }

    return result
  }
}
