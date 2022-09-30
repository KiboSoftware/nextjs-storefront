import { renderHook } from '@testing-library/react-hooks'

import { useCreateCheckoutPaymentMethodMutation } from './useCreateCheckoutPaymentMethodMutation'
import { billingInfoInputMock } from '@/__mocks__/stories/billingInfoInputMock'
import { createOrderPaymentActionMock } from '@/__mocks__/stories/createOrderPaymentActionMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCreateCheckoutPaymentMethodMutation', () => {
  it('should use useCreateCheckoutPaymentMethodMutation', async () => {
    const createCheckoutPaymentMethodParams = {
      orderId: '13eaad5a5526f20001d2fab9000074e7',
      paymentAction: {
        currencyCode: 'US',
        amount: 220,
        newBillingInfo: {
          ...billingInfoInputMock,
        },
        actionName: '',
      },
    }

    renderHook(
      async () => {
        const createCheckoutPaymentMethod = useCreateCheckoutPaymentMethodMutation()
        const response = await createCheckoutPaymentMethod.mutateAsync(
          createCheckoutPaymentMethodParams
        )

        expect(response).toStrictEqual(createOrderPaymentActionMock.createOrderPaymentAction)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
