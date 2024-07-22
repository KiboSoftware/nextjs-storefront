import { renderHook } from '@testing-library/react-hooks'

import { useGetAccountsByUser } from './useGetAccountsByUser'
import { activeUsersAccountMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useGetAccountsByUser', () => {
  it('should return user accounts list', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useGetAccountsByUser('user1@example.com'),
      {
        wrapper: createQueryClientWrapper(),
      }
    )

    await waitForNextUpdate()
    expect(result.current.activeUsersAccount).toStrictEqual(
      activeUsersAccountMock.activeUsersAccount
    )
  })
})
