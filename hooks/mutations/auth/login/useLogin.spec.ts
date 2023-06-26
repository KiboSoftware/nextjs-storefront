import { renderHook, waitFor } from '@testing-library/react'

import { useLogin } from './useLogin'
import { loginUserMock } from '@/__mocks__/stories/userMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useLogin', () => {
  it('should use useLogin', async () => {
    const userCredentials = {
      username: 'abcd@email.com',
      password: '',
    }

    const { result } = renderHook(() => useLogin(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.mutateAsync(userCredentials)
    await waitFor(() => {
      expect(result.current.data).toStrictEqual(loginUserMock.account)
    })
  })
})
