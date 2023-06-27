import { renderHook, waitFor } from '@testing-library/react'

import { useRegister } from './useRegister'
import { registerUserMock } from '@/__mocks__/stories/userMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useRegister', () => {
  it('should use useRegister', async () => {
    const createAccountAndLoginMutationVars = {
      account: {
        id: 0,
        userName: 'sss@email.com  ',
        emailAddress: 'sss@email.com ',
        firstName: 'sss',
        lastName: '',
      },
      password: '',
    }

    const { result } = renderHook(() => useRegister(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.mutateAsync(createAccountAndLoginMutationVars)
    await waitFor(() => {
      expect(result.current.data).toStrictEqual(registerUserMock.account)
    })
  })
})
