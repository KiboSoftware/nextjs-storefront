import { renderHook } from '@testing-library/react-hooks'

import { useSubscriptionsQueries } from './useSubscriptionsQueries'
import { subscriptionCollectionMock } from '@/__mocks__/stories/subscriptionCollectionMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useSubscriptionsQueries', () => {
  it('should return subscription collection', async () => {
    const { result, waitFor } = renderHook(() => useSubscriptionsQueries(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => result.current.isSuccess)
    expect(result.current.data).toStrictEqual(subscriptionCollectionMock.subscriptions)
  })
})
