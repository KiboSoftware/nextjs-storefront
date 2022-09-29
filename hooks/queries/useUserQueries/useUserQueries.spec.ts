import { renderHook } from '@testing-library/react-hooks'

import { userMock } from '../../../__mocks__/stories/userMock'
import { createQueryClientWrapper } from '../../../__test__/utils/renderWithQueryClient'
import { useUserQueries } from './useUserQueries'

describe('[hooks] useUser', () => {
  it('should return current user when user is logged in', async () => {
    const { result, waitFor } = renderHook(() => useUserQueries(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => {
      expect(result.current.data).toStrictEqual(userMock.customerAccount)
    })
  })
})
