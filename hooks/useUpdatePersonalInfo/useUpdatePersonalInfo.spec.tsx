import { renderHook } from '@testing-library/react-hooks'

import { useUpdatePersonalInfo } from '..'
import { mockCheckout } from '../../__mocks__/msw/mockData'
import { createQueryClientWrapper } from '../../__test__/utils/renderWithQueryClient'

describe('[hooks] useLoadCheckout', () => {
  it('should use useLoadCheckout', async () => {
    const personalInfo = {
      orderId: 'OrderId-1',
      updateMode: '',
      orderInput: mockCheckout,
    }

    let data
    const { result, waitFor } = renderHook(
      () => {
        const updatePersonalInfoMutation = useUpdatePersonalInfo()
        updatePersonalInfoMutation.mutate(personalInfo)

        data = updatePersonalInfoMutation.data
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )

    await waitFor(() => result.current)

    expect(data).toBe(mockCheckout)
  })
})
