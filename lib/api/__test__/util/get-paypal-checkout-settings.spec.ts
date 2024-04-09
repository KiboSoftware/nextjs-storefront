import getPayPalCheckoutSettings from '../../util/get-paypal-checkout-settings'
import { paypalCheckoutSettingsMock } from '@/__mocks__/stories'

const mockFetch = jest.fn(() => {
  return {
    json: () => paypalCheckoutSettingsMock,
    ok: true,
  }
}) as any

global.fetch = mockFetch

jest.mock('@/lib/api/util/api-auth-client', () => ({
  apiAuthClient: {
    getAccessToken: () => Promise.resolve('bearerToken'),
  },
}))

describe('getPayPalBearerToken util function', () => {
  it('should return PayPal checkout settings', async () => {
    const response = await getPayPalCheckoutSettings()
    expect(response).toEqual({
      userName: 'userName',
      password: 'password',
      orderProcessing: 'AuthAndCaptureOnOrderPlacement',
    })
  })
})
