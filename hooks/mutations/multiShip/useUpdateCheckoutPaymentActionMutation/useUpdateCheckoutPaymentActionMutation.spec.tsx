import { renderHook } from '@testing-library/react-hooks'

import { useUpdateCheckoutPaymentActionMutation } from './useUpdateCheckoutPaymentActionMutation'
import { billingInfoInputMock, checkoutMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateCheckoutPaymentActionMutation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should use useUpdateCheckoutPaymentActionMutation ', () => {
    renderHook(
      async () => {
        const updateCheckoutPaymentAction = useUpdateCheckoutPaymentActionMutation()
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
