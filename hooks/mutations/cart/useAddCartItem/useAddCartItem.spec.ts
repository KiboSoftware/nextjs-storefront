import { renderHook, waitFor } from '@testing-library/react'

import { useAddCartItem } from './useAddCartItem'
import { cartItemMock } from '@/__mocks__/stories/cartItemMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

const productInput = {
  options: [
    {
      attributeFQN: 'tenant~brand-colors',
      value: 'Pine-Green',
      shopperEnteredValue: null,
    },
    {
      attributeFQN: 'tenant~size',
      value: 'L/XL',
      shopperEnteredValue: null,
    },
  ],
  productCode: 'MS-BTL-002',
  variationProductCode: 'MS-BTL-002-8',
}

describe('[hooks] useAddCartItem', () => {
  it('should use useAddCartItem when addToCart', async () => {
    const { result } = renderHook(() => useAddCartItem(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.addToCart.mutateAsync({
      product: productInput,
      quantity: 6,
    })
    await waitFor(() => {
      expect(result.current.addToCart.data).toStrictEqual(cartItemMock)
    })
  })
})
