import { renderHook } from '@testing-library/react-hooks'

import { mockCheckout } from '../../__mocks__/msw/mockData'
import { createQueryClientWrapper } from '../../__test__/utils/renderWithQueryClient'
import { useUpdatePersonalInfo } from '../useUpdatePersonalInfo/useUpdatePersonalInfo'

describe('[hooks] useUpdatePersonalInfo', () => {
  it('should use useUpdatePersonalInfo', async () => {
    const personalInfo = {
      orderId: 'OrderId-1',
      updateMode: '',
      orderInput: mockCheckout,
    }

    renderHook(
      async () => {
        const updatePersonalInfoMutation = useUpdatePersonalInfo()
        const response = await updatePersonalInfoMutation.mutateAsync(personalInfo)

        expect(response).toBe(mockCheckout)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
