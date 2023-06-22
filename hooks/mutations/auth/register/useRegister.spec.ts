import { renderHook } from '@testing-library/react'

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

    renderHook(
      async () => {
        const { registerUserAccount } = useRegister()
        const response = await registerUserAccount.mutateAsync(createAccountAndLoginMutationVars)
        expect(response).toStrictEqual(registerUserMock.account)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
