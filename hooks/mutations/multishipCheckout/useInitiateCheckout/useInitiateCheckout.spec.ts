import { renderHook, waitFor } from '@testing-library/react'

import { useInitiateCheckout } from './useInitiateCheckout'
import { orderMock } from '@/__mocks__/stories/orderMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useInitiateCheckout', () => {
  it('should return cart details when user provides valid cartId', async () => {
    const { result } = renderHook(() => useInitiateCheckout(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.initiateCheckout.mutateAsync('137a94b6402be000013718d80000678b')

    await waitFor(() => {
      expect(result.current.initiateCheckout.data).toStrictEqual(orderMock.checkout)
    })
  })
})
