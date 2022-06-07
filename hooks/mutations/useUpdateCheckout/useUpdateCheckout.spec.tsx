import { renderHook } from '@testing-library/react-hooks'

import { orderMock } from '../../../__mocks__/stories/orderMock'
import { createQueryClientWrapper } from '../../../__test__/utils/renderWithQueryClient'
import { useUpdateCheckout } from './useUpdateCheckout'

describe('[hooks] useUpdateCheckout', () => {
  it('should use useUpdateCheckout', async () => {
    const checkoutDetails = {
      orderId: 'OrderId-1',
      updateMode: '',
      orderInput: orderMock.checkout,
    }

    renderHook(
      async () => {
        const updatePersonalInfoMutation = useUpdateCheckout()
        const response = await updatePersonalInfoMutation.mutateAsync(checkoutDetails)

        expect(response).toStrictEqual(orderMock.checkout)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
