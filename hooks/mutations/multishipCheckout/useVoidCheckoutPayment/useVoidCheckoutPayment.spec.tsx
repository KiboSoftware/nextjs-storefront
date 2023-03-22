import { renderHook } from '@testing-library/react-hooks'

import { useVoidCheckoutPayment } from './useVoidCheckoutPayment'
import { billingInfoInputMock, checkoutMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useVoidCheckoutPayment', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should update checkout payment method', () => {
    renderHook(
      async () => {
        const updateCheckoutPaymentAction = useVoidCheckoutPayment()
        const updateCheckoutPaymentActionResponse = await updateCheckoutPaymentAction.mutateAsync({
          checkoutId: '12345',
          paymentId: '45678',
          paymentActionInput: {
            currencyCode: 'US',
            amount: 220,
            newBillingInfo: {
              ...billingInfoInputMock,
            },
            actionName: '',
          },
        })

        expect(updateCheckoutPaymentActionResponse).toStrictEqual(checkoutMock)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
