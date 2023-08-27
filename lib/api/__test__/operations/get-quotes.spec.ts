import { NextApiRequest, NextApiResponse } from 'next'

import getQuotes from '../../operations/get-quotes'
import { quotesMock } from '@/__mocks__/stories'

// Mock fetcher and getUserClaimsFromRequest
jest.mock('@/lib/api/util', () => ({
  getUserClaimsFromRequest: () => jest.fn(),
  getAdditionalHeader: () => jest.fn(),
  fetcher: jest.fn(() => Promise.resolve({ data: { quotes: quotesMock } })),
}))

jest.mock('next/config', () => {
  return () => {
    return {
      serverRuntimeConfig: {
        B2BQuotes: {
          pageSize: '5',
        },
      },
    }
  }
})

describe('getQuotes API route', () => {
  it('should return quotes successfully', async () => {
    const req = {} as NextApiRequest
    const res = {} as NextApiResponse

    const response = await getQuotes(req, res)

    expect(response).toEqual(quotesMock)
  })
})
