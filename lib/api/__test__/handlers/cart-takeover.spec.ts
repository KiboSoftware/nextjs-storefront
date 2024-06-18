import { setCookie } from 'cookies-next'
import { NextApiResponse } from 'next'

import cartTakeoverHandler from '@/lib/api/handlers/cart-takeover'
import getCartTakeover from '@/lib/api/operations/get-cart-takeover'
import { getAuthCookieName, prepareSetCookieValue } from '@/lib/helpers/cookieHelper'

jest.mock('@/lib/api/operations/get-cart-takeover')
jest.mock('cookies-next')
jest.mock('@/lib/helpers/cookieHelper')

describe('cartTakeoverHandler', () => {
  let req: any
  let res: any

  beforeEach(() => {
    req = {
      query: {},
    }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      redirect: jest.fn(),
      setHeader: jest.fn(),
    }
  })

  it('should return 400 if secretId is missing', async () => {
    req.query = {}

    await cartTakeoverHandler(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing secretId' })
  })

  it('should redirect to error page if cartTakeoverResponse is null', async () => {
    req.query = { secretId: 'test-secret-id' }
    ;(getCartTakeover as jest.MockedFunction<typeof getCartTakeover>).mockResolvedValueOnce(null)

    await cartTakeoverHandler(req, res)

    expect(res.redirect).toHaveBeenCalledWith(`/error-page?status500`)
  })

  it('should redirect to error page if cartTakeoverResponse has errors', async () => {
    req.query = { secretId: 'test-secret-id' }
    const errorResponse = {
      errors: [
        {
          extensions: {
            response: {
              status: 500,
              body: { message: 'Internal Server Error' },
            },
          },
        },
      ],
    }
    ;(getCartTakeover as jest.MockedFunction<typeof getCartTakeover>).mockResolvedValueOnce(
      errorResponse
    )

    await cartTakeoverHandler(req, res)

    expect(res.redirect).toHaveBeenCalledWith(
      `/error-page?status=500&message=Internal%20Server%20Error`
    )
  })

  it('should set cookies and redirect if authTicket is present', async () => {
    req.query = { secretId: 'test-secret-id' }
    const authTicket = {
      value: {
        accessToken: 'test-access-token',
        refreshToken: 'test-refresh-token',
        accessTokenExpiration: 'expiration-date',
        jwtAccessToken: 'jwt-token',
        refreshTokenExpiration: 'refresh-expiration-date',
        userId: 1,
        customerAccount: { id: 123 },
      },
    }
    const cartTakeoverResponse = { data: { getOneTimeSecret: authTicket } }
    ;(getCartTakeover as jest.MockedFunction<typeof getCartTakeover>).mockResolvedValueOnce(
      cartTakeoverResponse
    )
    ;(getAuthCookieName as jest.Mock).mockReturnValue('authCookie')
    ;(prepareSetCookieValue as jest.Mock).mockReturnValue('prepared-cookie-value')

    await cartTakeoverHandler(req, res)

    expect(res.setHeader).toHaveBeenCalledWith(
      'Set-Cookie',
      'authCookie=prepared-cookie-value;HttpOnly;path=/'
    )
    expect(setCookie).toHaveBeenCalledWith('isCSR', 'true', { req, res })
    expect(res.redirect).toHaveBeenCalledWith(`/cart`)
  })
})
