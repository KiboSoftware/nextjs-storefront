import getPayPalBearerToken from '../../util/get-paypal-bearer-token'

const mockFetch = jest.fn()
global.fetch = mockFetch // Assign the mock to global fetch

const firstMockResponse = { access_token: 'bearerToken' }

// Mock the first call to fetch
mockFetch.mockResolvedValueOnce({
  json: () => firstMockResponse,
  ok: true,
})

describe('getPayPalBearerToken util function', () => {
  it('should PayPal Bearer Token', async () => {
    const response = await getPayPalBearerToken()

    expect(response).toEqual('bearerToken')
  })
})
