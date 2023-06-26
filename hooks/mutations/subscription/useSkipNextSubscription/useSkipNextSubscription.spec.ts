import { renderHook, waitFor } from '@testing-library/react'

import { useSkipNextSubscription } from './useSkipNextSubscription'
import { subscriptionMock } from '@/__mocks__/stories/subscriptionMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useSkipNextSubscription', () => {
  it('should return subscription details when subscriptionID is passed', async () => {
    const { result } = renderHook(() => useSkipNextSubscription(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.skipNextSubscription.mutateAsync('149ceaac15c2eb00016c498e000045a4')

    await waitFor(() => {
      expect(result.current.skipNextSubscription.data).toStrictEqual(subscriptionMock.subscription)
    })
  })
})
