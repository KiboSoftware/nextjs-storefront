import getPayPalBearerToken from '../../util/get-paypal-bearer-token'
import { paypalCheckoutSettingsMock } from '@/__mocks__/stories'

const mockFetch = jest.fn()
global.fetch = mockFetch // Assign the mock to global fetch

const firstMockResponse = paypalCheckoutSettingsMock // First mock response
const secondMockResponse = { access_token: 'bearerToken' }

// Mock the first call to fetch
mockFetch.mockResolvedValueOnce({
  json: () => firstMockResponse,
  ok: true,
})

// Mock the second call to fetch
mockFetch.mockResolvedValueOnce({
  json: () => secondMockResponse,
  ok: true,
})

jest.mock('@/lib/api/util/api-auth-client', () => ({
  apiAuthClient: {
    getAccessToken: () => Promise.resolve('bearerToken'),
  },
}))

describe('getPayPalBearerToken util function', () => {
  it('should PayPal Bearer Token', async () => {
    const response = await getPayPalBearerToken()

    expect(response).toEqual('bearerToken')
  })
})
