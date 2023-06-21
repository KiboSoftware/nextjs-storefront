import { renderHook } from '@testing-library/react'

import { useUpdateOrderBillingInfo } from './useUpdateOrderBillingInfo'
import { billingInfoInputMock } from '@/__mocks__/stories/billingInfoInputMock'
import { updateOrderBillingInfoMock } from '@/__mocks__/stories/updateOrderBillingInfoMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateOrderBillingInfo', () => {
  it('should use useUpdateOrderBillingInfo', async () => {
    const updateBillingInfoParams = {
      orderId: '13eaad5a5526f20001d2fab9000074e7',
      billingInfoInput: {
        ...billingInfoInputMock,
      },
    }

    renderHook(
      async () => {
        const { updateOrderBillingInfo } = useUpdateOrderBillingInfo()
        const response = await updateOrderBillingInfo.mutateAsync(updateBillingInfoParams)

        expect(response).toStrictEqual(updateOrderBillingInfoMock.updateOrderBillingInfo)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
