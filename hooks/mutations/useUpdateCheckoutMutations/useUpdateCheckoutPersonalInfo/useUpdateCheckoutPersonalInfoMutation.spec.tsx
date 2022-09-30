import { renderHook } from '@testing-library/react-hooks'

import { useUpdateCheckoutPersonalInfoMutation } from './useUpdateCheckoutPersonalInfoMutation'
import { orderMock } from '@/__mocks__/stories/orderMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateCheckoutPersonalInfoMutation', () => {
  it('should use useUpdateCheckoutPersonalInfoMutation', async () => {
    const checkoutDetails = {
      orderId: 'OrderId-1',
      updateMode: '',
      orderInput: orderMock.checkout,
    }

    renderHook(
      async () => {
        const updatePersonalInfoMutation = useUpdateCheckoutPersonalInfoMutation()
        const response = await updatePersonalInfoMutation.mutateAsync(checkoutDetails)

        expect(response).toStrictEqual(orderMock.checkout)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
