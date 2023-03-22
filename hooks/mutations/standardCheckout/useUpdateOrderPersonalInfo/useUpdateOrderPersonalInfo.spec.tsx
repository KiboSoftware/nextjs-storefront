import { renderHook } from '@testing-library/react-hooks'

import { useUpdateOrderPersonalInfo } from './useUpdateOrderPersonalInfo'
import { orderMock } from '@/__mocks__/stories/orderMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateOrderPersonalInfo', () => {
  it('should use useUpdateOrderPersonalInfo', async () => {
    const checkoutDetails = {
      checkout: orderMock.checkout,
      email: 'amol23@kibo.com',
    }

    renderHook(
      async () => {
        const updatePersonalInfoMutation = useUpdateOrderPersonalInfo()
        const response = await updatePersonalInfoMutation.mutateAsync(checkoutDetails)

        expect(response).toStrictEqual(orderMock.checkout)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
