import { renderHook, waitFor } from '@testing-library/react'

import { useGetSubscriptions } from './useGetSubscriptions'
import { subscriptionCollectionMock } from '@/__mocks__/stories/subscriptionCollectionMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useGetSubscriptions', () => {
  it('should return subscription collection', async () => {
    const { result } = renderHook(() => useGetSubscriptions(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() =>
      expect(result.current.data).toStrictEqual(subscriptionCollectionMock.subscriptions)
    )
  })
})
