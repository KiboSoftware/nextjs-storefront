import { renderHook } from '@testing-library/react-hooks'

import { useUpdateOrderPaymentActionMutation } from './useUpdateOrderPaymentActionMutation'
import { billingInfoInputMock } from '@/__mocks__/stories/billingInfoInputMock'
import { createOrderPaymentActionMock } from '@/__mocks__/stories/createOrderPaymentActionMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateOrderPaymentActionMutation', () => {
  it('should use useUpdateOrderPaymentActionMutation', async () => {
    const updateOrderPaymentActionMutationParams = {
      orderId: '13eaad5a5526f20001d2fab9000074e7',
      paymentId: '13eaad5a56753dfg0001d2fab9000074e7',
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
        const createCheckoutPaymentMethod = useUpdateOrderPaymentActionMutation()
        const response = await createCheckoutPaymentMethod.mutateAsync(
          updateOrderPaymentActionMutationParams
        )

        expect(response).toStrictEqual(createOrderPaymentActionMock.createOrderPaymentAction)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
