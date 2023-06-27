import { renderHook, waitFor } from '@testing-library/react'

import { useLogout } from './useLogout'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useLogout', () => {
  it('should use useLogout', async () => {
    const callbackFn = jest.fn()

    const { result } = renderHook(() => useLogout(callbackFn), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.mutateAsync()

    await waitFor(() => {
      expect(result.current.data).toStrictEqual('true')
    })
    await waitFor(() => {
      expect(callbackFn).toHaveBeenCalledTimes(1)
    })
  })
})
