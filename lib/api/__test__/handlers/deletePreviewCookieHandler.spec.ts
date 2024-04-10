import { deleteCookie } from 'cookies-next'
import { NextApiResponse } from 'next'

import deletePreviewCookieHandler from '@/lib/api/handlers/deletePreviewCookieHandler'
import { NextApiRequestWithLogger } from '@/lib/types'

jest.mock('cookies-next', () => ({
  deleteCookie: jest.fn(),
}))

describe('deletePreviewCookieHandler', () => {
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

  it('should delete cookie when name is present in request query', () => {
    req.query.name = 'cookie_name'

    deletePreviewCookieHandler(req, res)

    expect(deleteCookie).toHaveBeenCalledWith('cookie_name', expect.any(Object))
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: 'Cookie deleted' })
    expect(req.logger.error).not.toHaveBeenCalled()
  })

  it('should handle error when deleting cookie', () => {
    req.query.name = 'cookie_name'
    const deleteCookieMock = deleteCookie as jest.MockedFunction<typeof deleteCookie>

    deleteCookieMock.mockImplementation(() => {
      throw new Error('Cookie not deleted')
    })

    deletePreviewCookieHandler(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Something went wrong, cookie not deleted',
      error: expect.any(Error),
    })
    expect(req.logger.error).toHaveBeenCalled()
  })
})
