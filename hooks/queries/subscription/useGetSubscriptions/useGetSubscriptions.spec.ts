import { renderHook } from '@testing-library/react-hooks'

import { useGetSubscriptions } from './useGetSubscriptions'
import { subscriptionCollectionMock } from '@/__mocks__/stories/subscriptionCollectionMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useGetSubscriptions', () => {
  it('should return subscription collection', async () => {
    const { result, waitFor } = renderHook(() => useGetSubscriptions(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => result.current.isSuccess)
    expect(result.current.data).toStrictEqual(subscriptionCollectionMock.subscriptions)
  })
})
