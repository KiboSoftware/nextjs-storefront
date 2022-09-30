import { getCheckout } from '@/lib/api/operations'
import * as util from '@/lib/api/util'
import { getCheckoutQuery } from '@/lib/gql/queries'

const mockUtil = util as any
jest.mock('@/lib/api/util', () => ({
  __esModule: true,
  fetcher: jest.fn(),
}))
jest.mock('@/lib/api/util/getUserClaimsFromRequest.ts', () => jest.fn(() => null))

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
    mockUtil.fetcher = jest
      .fn()
      .mockImplementationOnce(async () => ({ data: { checkout: 'checkout' } }))

    const checkoutId = '12345'
    const response = await getCheckout(checkoutId, { userClaims: 'test' }, '')

    expect(util.fetcher).toBeCalledWith(
      { query: getCheckoutQuery, variables: { checkoutId } },
      { userClaims: null }
    )
    expect(response).toEqual('checkout')
  })
})
