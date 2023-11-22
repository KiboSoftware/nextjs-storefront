import { renderHook, waitFor } from '@testing-library/react'

import { useGetB2BUserQueries } from './useGetB2BUserQuery'
import { customerB2BUserForPage0Mock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useGetB2BUserQuery', () => {
  it.only('should return B2B account users list', async () => {
    const { result } = renderHook(
      () =>
        useGetB2BUserQueries({
          accountId: 1001,
          q: '',
          isB2BUser: true,
        }),
      {
        wrapper: createQueryClientWrapper(),
      }
    )

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    await waitFor(() => {
      expect(result.current.data).toStrictEqual(customerB2BUserForPage0Mock)
    })
  })
})
