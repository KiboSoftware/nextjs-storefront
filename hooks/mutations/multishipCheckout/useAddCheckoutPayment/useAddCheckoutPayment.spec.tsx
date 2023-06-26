import { renderHook, waitFor } from '@testing-library/react'

import { useAddCheckoutPayment } from './useAddCheckoutPayment'
import { checkoutMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useAddCheckoutPayment', () => {
  it('should use useAddCheckoutPayment', async () => {
    const { result } = renderHook(() => useAddCheckoutPayment(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.addCheckoutPayment.mutateAsync({
      checkoutId: '137a94b6402be000013718d80000678b',
      paymentAction: {},
    })

    await waitFor(() => {
      expect(result.current.addCheckoutPayment.data).toStrictEqual(checkoutMock)
    })
  })
})
