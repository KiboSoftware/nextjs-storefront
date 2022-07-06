import { renderHook } from '@testing-library/react-hooks'

import { usePurchaseLocation } from './usePurchaseLocation'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] usePurchaseLocation', () => {
  it('should return search loactions when entered search term', async () => {
    const { result, waitFor } = renderHook(() => usePurchaseLocation(''), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => result.current.isSuccess)
    expect(result.current.data).toEqual('')
  })
})
