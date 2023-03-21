import { renderHook } from '@testing-library/react-hooks'

import { useCheckoutQueries } from './useCheckoutQueries'
import { orderMock } from '@/__mocks__/stories/orderMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCheckoutQueries', () => {
  it('should return checkout details when user provides valid checkoutId', async () => {
    const checkoutId = '137a979305c65d00010800230000678b'
    const { result, waitFor } = renderHook(() => useCheckoutQueries({ checkoutId }), {
      wrapper: createQueryClientWrapper(),
    })
    await waitFor(() => result.current.isSuccess)
    expect(result.current.data).toStrictEqual(orderMock.checkout)
  })
})
