import { renderHook } from '@testing-library/react-hooks'

import { orderMock } from '../../__mocks__/stories/orderMock'
import { createQueryClientWrapper } from '../../__test__/utils/renderWithQueryClient'
import { useUpdatePersonalInfo } from '../useUpdatePersonalInfo/useUpdatePersonalInfo'

describe('[hooks] useUpdatePersonalInfo', () => {
  it('should use useUpdatePersonalInfo', async () => {
    const personalInfo = {
      orderId: 'OrderId-1',
      updateMode: '',
      orderInput: orderMock.checkout,
    }

    renderHook(
      async () => {
        const updatePersonalInfoMutation = useUpdatePersonalInfo()
        const response = await updatePersonalInfoMutation.mutateAsync(personalInfo)

        expect(response).toStrictEqual(orderMock.checkout)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
