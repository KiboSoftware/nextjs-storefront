import { setCookie } from 'cookies-next'
import { NextApiResponse } from 'next'

import setPreviewCookieHandler from '@/lib/api/handlers/setPreviewCookieHandler'
import { NextApiRequestWithLogger } from '@/lib/types'

jest.mock('cookies-next', () => ({
  setCookie: jest.fn(),
}))

describe('setPreviewCookieHandler', () => {
  let req: NextApiRequestWithLogger
  let res: NextApiResponse

  beforeEach(() => {
    req = {
      query: {},
      logger: {
        error: jest.fn(),
      },
    } as any
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should set mz_pricelist cookie when present in request query', () => {
    req.query.mz_pricelist = 'value1'

    setPreviewCookieHandler(req, res)

    expect(setCookie).toHaveBeenCalledWith('mz_pricelist', 'value1', expect.any(Object))
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: 'Cookie set' })
    expect(req.logger.error).not.toHaveBeenCalled()
  })

  it('should set mz_now cookie when present in request query', () => {
    req.query.mz_now = 'value2'

    setPreviewCookieHandler(req, res)

    expect(setCookie).toHaveBeenCalledWith('mz_now', 'value2', expect.any(Object))
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: 'Cookie set' })
    expect(req.logger.error).not.toHaveBeenCalled()
  })

  it('should handle error when setting cookie', () => {
    req.query.mz_pricelist = 'value1'
    const setCookieMock = setCookie as jest.MockedFunction<typeof setCookie>

    setCookieMock.mockImplementation(() => {
      throw new Error('Cookie not set')
    })

    setPreviewCookieHandler(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Something went wrong, cookie not set',
      error: expect.any(Error),
    })
    expect(req.logger.error).toHaveBeenCalled()
  })
})
