import { deleteCookie } from 'cookies-next'
import { NextApiResponse } from 'next'

import clearPreviewModeHandler from '@/lib/api/handlers/clearPreviewModeHandler'
import { NextApiRequestWithLogger } from '@/lib/types'

jest.mock('cookies-next', () => ({
  deleteCookie: jest.fn(),
}))

describe('clearPreviewModeHandler', () => {
  let req: NextApiRequestWithLogger
  let res: NextApiResponse

  beforeEach(() => {
    req = {
      logger: {
        error: jest.fn(),
      },
    } as any
    res = {
      clearPreviewData: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should clear preview mode and delete cookies', () => {
    clearPreviewModeHandler(req, res)

    expect(deleteCookie).toHaveBeenCalledWith('mz_pricelist', expect.any(Object))
    expect(deleteCookie).toHaveBeenCalledWith('mz_now', expect.any(Object))
    expect(res.clearPreviewData).toHaveBeenCalledWith({})
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: 'Preview mode disabled' })
    expect(req.logger.error).not.toHaveBeenCalled()
  })

  it('should handle error when deleting cookies', () => {
    const deleteCookieMock = deleteCookie as jest.MockedFunction<typeof deleteCookie>

    deleteCookieMock.mockImplementation(() => {
      throw new Error('Cookies not deleted')
    })

    clearPreviewModeHandler(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Something went wrong, cookies not deleted',
      error: expect.any(Error),
    })
    expect(req.logger.error).toHaveBeenCalled()
  })
})
