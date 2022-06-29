import { renderHook } from '@testing-library/react-hooks'

import { loginUserMock } from '../../../__mocks__/stories/userMock'
import { createQueryClientWrapper } from '../../../__test__/utils/renderWithQueryClient'
import { useUserMutations } from './useUserMutations'

describe('[hooks] useUserMutations', () => {
  it('should use useUserMutations', async () => {
    const userCredentials = {
      username: 'abcd@email.com',
      password: '',
    }

    renderHook(
      async () => {
        const { mutateAsync } = useUserMutations()
        const response = await mutateAsync(userCredentials)

        expect(response).toStrictEqual(loginUserMock.account)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
