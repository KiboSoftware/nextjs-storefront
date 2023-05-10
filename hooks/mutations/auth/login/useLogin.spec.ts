import { renderHook } from '@testing-library/react-hooks'

import { useLogin } from './useLogin'
import { loginUserMock } from '@/__mocks__/stories/userMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useLogin', () => {
  it('should use useLogin', async () => {
    const userCredentials = {
      username: 'abcd@email.com',
      password: '',
    }

    renderHook(
      async () => {
        const { mutateAsync } = useLogin()
        const response = await mutateAsync(userCredentials)

        expect(response).toStrictEqual(loginUserMock.account)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
