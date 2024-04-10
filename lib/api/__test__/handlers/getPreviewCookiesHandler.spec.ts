import { getCookie } from 'cookies-next'
import { NextApiRequest, NextApiResponse } from 'next'

import getPreviewCookiesHandler from '@/lib/api/handlers/getPreviewCookiesHandler' // Adjust path if needed
import { NextApiRequestWithLogger } from '@/lib/types'

// Mock dependencies
jest.mock('cookies-next', () => ({
  getCookie: jest.fn(),
}))

describe('getPreviewCookiesHandler', () => {
  let req: NextApiRequestWithLogger
  let res: NextApiResponse

  beforeEach(() => {
    req = {
      logger: { error: jest.fn() }, // Mock logger
    } as any
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any
  })

  it('should return cookies in response', async () => {
    const getCookieMock = getCookie as jest.MockedFunction<typeof getCookie>
    getCookieMock.mockReturnValueOnce('pricelist123')
    getCookieMock.mockReturnValueOnce('2024-04-10T08:43:00Z')

    getPreviewCookiesHandler(req as NextApiRequestWithLogger, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      mz_pricelist: 'pricelist123',
      mz_now: '2024-04-10T08:43:00Z',
    })
  })

  it('should handle errors gracefully', async () => {
    const getCookieMock = getCookie as jest.MockedFunction<typeof getCookie>

    getCookieMock.mockImplementation(() => {
      throw new Error('Cookies not retrieved')
    })

    getPreviewCookiesHandler(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Something went wrong, cookies not retrieved',
      error: expect.any(Error),
    })
    expect(req.logger.error).toHaveBeenCalled()
  })
})
