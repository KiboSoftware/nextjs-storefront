import { renderHook } from '@testing-library/react'

import { useVoidOrderPayment } from './useVoidOrderPayment'
import { billingInfoInputMock } from '@/__mocks__/stories/billingInfoInputMock'
import { createOrderPaymentActionMock } from '@/__mocks__/stories/createOrderPaymentActionMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useVoidOrderPayment', () => {
  it('should use useVoidOrderPayment', async () => {
    const updateOrderPaymentActionParams = {
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
        const { voidOrderPayment } = useVoidOrderPayment()
        const response = await voidOrderPayment.mutateAsync(updateOrderPaymentActionParams)

        expect(response).toStrictEqual(createOrderPaymentActionMock.createOrderPaymentAction)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
