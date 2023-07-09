import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { tokenizeCreditCardPayment } from '../tokenizeCreditCardPayment'

// Create a mock server using MSW
const server = setupServer(
  rest.post('https://<mocked-pci-host>/payments/commerce/payments/cards/', (req, res, ctx) => {
    // Mock the response based on the test case scenario
    return res(ctx.json({ isSuccessful: true }))
  })
)

const mockFetch = jest.fn(() => {
  return {
    json: () => ({ isSuccessful: true }),
  }
}) as any

// Assign the mock fetch implementation to the global object
global.fetch = mockFetch

// Set up the server before running the tests
beforeAll(() => server.listen())

// Clean up the server after running the tests
afterAll(() => server.close())

describe('tokenizeCreditCardPayment', () => {
  it('should return the tokenized credit card data if the API request is successful', async () => {
    // Arrange
    const creditCardData = {
      cardNumber: '4111111111111111',
      cardType: 'VISA',
      cvv: '123',
    }
    const pciHost = 'payments-mock.kibo.com'
    const apiHost = 't12345-s67890.mock.kibo.com'

    // Act
    const tokenizedCCData = await tokenizeCreditCardPayment(creditCardData, pciHost, apiHost)

    // Assert
    expect(tokenizedCCData).toEqual({ isSuccessful: true })
  })
})
