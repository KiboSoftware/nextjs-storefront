import { NextApiRequest, NextApiResponse } from 'next'

import getCheckout from '@/lib/api/operations/get-checkout'

jest.mock('@/lib/api/util', () => ({
  getUserClaimsFromRequest: () => jest.fn(),
  getAdditionalHeader: () => jest.fn(),
  fetcher: jest.fn(() => Promise.resolve({ data: { checkout: 'checkout' } })),
}))

jest.mock('next/config', () => {
  return () => {
    return {
      serverRuntimeConfig: {
        cacheKey: 'categoryTree',
        cacheTimeOut: 10000,
      },
    }
  }
})

describe('[operations] Get Checkout', () => {
  it('should get checkout by checkout id', async () => {
    const checkoutId = '12345'
    const req = {} as NextApiRequest
    const res = {} as NextApiResponse
    const response = await getCheckout(checkoutId, req, res)

    expect(response).toEqual('checkout')
  })
})
