import { renderHook } from '@testing-library/react-hooks'

import { useCartMutation } from './useCartMutation'
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

describe('[hooks] useCartMutation', () => {
  it('should use useCartMutation', async () => {
    renderHook(
      async () => {
        const { addToCart } = useCartMutation()
        const response = await addToCart.mutateAsync({
          product: productInput,
          quantity: 6,
        })
        expect(response).toStrictEqual(cartItemMock)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
