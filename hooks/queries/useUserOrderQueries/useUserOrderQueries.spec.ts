import { renderHook } from '@testing-library/react-hooks'

import { useUserOrderQueries } from './useUserOrderQueries'
import { orderMock } from '@/__mocks__/stories/orderMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUserOrderQueries', () => {
  it('should return checkout details when user provides valid checkoutId', async () => {
    const filters = '137a979305c65d00010800230000678b'
    const { result, waitFor } = renderHook(() => useUserOrderQueries({ filters }), {
      wrapper: createQueryClientWrapper(),
    })
    await waitFor(() => result.current.isSuccess)
    expect(result.current.data).toStrictEqual(orderMock.checkout)
  })
})
