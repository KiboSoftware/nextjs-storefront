import { renderHook, waitFor } from '@testing-library/react'

import { useGetQuotes } from './useGetQuotes'
import { quotesMock } from '@/__mocks__/stories/quotesMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useGetQuotes', () => {
  it.only('should return B2B quotes list', async () => {
    const { result } = renderHook(
      () =>
        useGetQuotes({
          filter: '',
          pageSize: 5,
          sortBy: '',
          startIndex: 0,
        }),
      {
        wrapper: createQueryClientWrapper(),
      }
    )

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    await waitFor(() => {
      expect(result.current.data).toStrictEqual(quotesMock)
    })
  })
})
