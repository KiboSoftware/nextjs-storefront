import { renderHook } from '@testing-library/react-hooks'

import { useUpdateCheckoutPersonalInfo } from './useUpdateCheckoutPersonalInfo'
import { orderMock } from '@/__mocks__/stories/orderMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateCheckoutPersonalInfo', () => {
  it('should use useUpdateCheckoutPersonalInfo', async () => {
    const checkoutDetails = {
      orderId: 'OrderId-1',
      updateMode: '',
      orderInput: orderMock.checkout,
    }

    renderHook(
      async () => {
        const updatePersonalInfoMutation = useUpdateCheckoutPersonalInfo()
        const response = await updatePersonalInfoMutation.mutateAsync(checkoutDetails)

        expect(response).toStrictEqual(orderMock.checkout)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
