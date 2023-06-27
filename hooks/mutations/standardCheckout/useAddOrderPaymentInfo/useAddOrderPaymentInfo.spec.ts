import { renderHook, waitFor } from '@testing-library/react'

import { useAddOrderPaymentInfo } from './useAddOrderPaymentInfo'
import { billingInfoInputMock } from '@/__mocks__/stories/billingInfoInputMock'
import { createOrderPaymentActionMock } from '@/__mocks__/stories/createOrderPaymentActionMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useAddOrderPaymentInfo', () => {
  it('should use useAddOrderPaymentInfo', async () => {
    const createOrderPaymentActionParams = {
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

    const { result } = renderHook(() => useAddOrderPaymentInfo(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.addOrderPayment.mutateAsync(createOrderPaymentActionParams)

    await waitFor(() => {
      expect(result.current.addOrderPayment.data).toStrictEqual(
        createOrderPaymentActionMock.createOrderPaymentAction
      )
    })
  })
})
