import { renderHook, waitFor } from '@testing-library/react'

import { useGetAccountsByUser } from './useGetAccountsByUser'
import { activeUsersAccountMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useGetAccountsByUser', () => {
  it('should return user accounts list', async () => {
    const { result } = renderHook(() => useGetAccountsByUser('user1@example.com'), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => {
      expect(result.current.activeUsersAccount).toStrictEqual(
        activeUsersAccountMock.activeUsersAccount
      )
    })
  })
})
