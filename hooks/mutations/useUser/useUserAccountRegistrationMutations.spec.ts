import { renderHook } from '@testing-library/react-hooks'

import { useUserAccountRegistrationMutations } from './useUserAccountRegistrationMutations'
import { registerUserMock } from '@/__mocks__/stories/userMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUserAccountRegistrationMutations', () => {
  it('should use useUserAccountRegistrationMutations', async () => {
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
        const { mutateAsync } = useUserAccountRegistrationMutations()
        const response = await mutateAsync(createAccountAndLoginMutationVars)
        expect(response).toStrictEqual(registerUserMock.account)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
