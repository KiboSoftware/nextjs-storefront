import { renderHook } from '@testing-library/react-hooks'

import { useAddToCartMutation } from './useAddToCartMutation'
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

describe('[hooks] useAddToCartMutation', () => {
  it('should use useAddToCartMutation when addToCart', () => {
    renderHook(
      async () => {
        const { addToCart } = useAddToCartMutation()
        const addResponse = await addToCart.mutateAsync({
          product: productInput,
          quantity: 6,
        })

        expect(addResponse).toStrictEqual(cartItemMock)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
