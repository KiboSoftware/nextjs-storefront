import { renderHook, waitFor } from '@testing-library/react'

import { useAddItemsToCurrentCart } from './useAddItemsToCurrentCart'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useAddItemsToCurrentCart', () => {
  it('should use useAddItemsToCurrentCart when addToCart', async () => {
    const { result } = renderHook(() => useAddItemsToCurrentCart(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.addItemsToCurrentCart.mutate({
      items: [
        {
          product: {
            productCode: 'MS-BTL-002',
          },
          quantity: 1,
        },
      ],
    })
    await waitFor(() => {
      expect(result.current.addItemsToCurrentCart.data).toStrictEqual(true)
    })
  })
})
