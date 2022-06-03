import * as util from '@/lib/api/util'
import { getCheckoutQuery } from '@/lib/gql/queries'
import { getCheckout } from '@/lib/api/operations'

const mockUtil = util as any
jest.mock('@/lib/api/util', () => ({
  __esModule: true,
  fetcher: jest.fn(),
}))

describe('[operations] Get Checkout', () => {
  it('should get checkout by checkout id', async () => {
    mockUtil.fetcher = jest
      .fn()
      .mockImplementationOnce(async () => ({ data: { checkout: 'checkout' } }))

    const checkoutId = '12345'
    const response = await getCheckout(checkoutId)
    expect(util.fetcher).toBeCalledWith({ query: getCheckoutQuery, variables: { checkoutId } })
    expect(response).toEqual('checkout')
  })
})
