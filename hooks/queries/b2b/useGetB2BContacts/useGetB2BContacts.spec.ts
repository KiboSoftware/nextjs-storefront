import { renderHook, waitFor } from '@testing-library/react'

import { useGetB2BContacts } from './/useGetB2BContacts'
import { getB2BContactsMock } from '@/__mocks__/stories/getB2BContactsMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useGetB2BContacts', () => {
  it.only('should return B2B contacts list', async () => {
    const { result } = renderHook(
      () =>
        useGetB2BContacts({
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
      expect(result.current.data).toStrictEqual(getB2BContactsMock)
    })
  })
})
