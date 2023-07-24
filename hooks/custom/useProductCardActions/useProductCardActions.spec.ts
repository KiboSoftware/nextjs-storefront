import { renderHook, act } from '@testing-library/react-hooks'

import { useProductCardActions } from './useProductCardActions'
import { AddToCartDialog } from '@/components/dialogs'
import { ProductQuickViewDialog } from '@/components/product'
import { useModalContext } from '@/context'
import { useAddCartItem, useWishlist } from '@/hooks'
import { ProductCustom } from '@/lib/types'

const showModalMock = jest.fn()
jest.mock('@/context', () => ({
  useModalContext: jest.fn(() => ({ showModal: showModalMock })),
}))

const cartResponse = { id: 'mock-cart-response-id' }
const addToCartMutateAsyncMock = jest.fn(() => Promise.resolve(cartResponse))

const addOrRemoveWishlistItemMock = jest.fn()
jest.mock('@/hooks', () => ({
  useAddCartItem: jest.fn(() => ({
    addToCart: { mutateAsync: addToCartMutateAsyncMock, isPending: false },
  })),
  useWishlist: jest.fn(() => ({
    addOrRemoveWishlistItem: addOrRemoveWishlistItemMock,
    checkProductInWishlist: jest.fn(),
  })),
}))

describe('useProductCardActions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should handle adding to cart', async () => {
    const { result } = renderHook(() => useProductCardActions())
    const { addToCart } = useAddCartItem()
    const { showModal } = useModalContext()

    const payload = { productId: '123', quantity: 2 }
    await act(async () => {
      await result.current.handleAddToCart(payload, false)
    })

    expect(addToCart.mutateAsync).toHaveBeenCalledWith(payload)

    // showModal should not be called because isQuickOrder is false
    expect(showModal).not.toHaveBeenCalled()

    // Test with isQuickOrder as true
    await act(async () => {
      await result.current.handleAddToCart(payload, true)
    })

    expect(addToCart.mutateAsync).toHaveBeenCalledWith(payload)
    expect(showModal).toHaveBeenCalledWith({
      Component: AddToCartDialog,
      props: {
        cartItem: cartResponse,
      },
    })
  })

  const product: ProductCustom = {
    createDate: '01-01-1970',
    personalizationScore: 1,
    score: 1,
    updateDate: '18-07-2023',
    fulfillmentMethod: 'Ship',
    fulfillmentMethodShortName: 'Ship',
    purchaseLocationCode: 'kw1',
  }

  it('should handle opening product quick view modal', () => {
    const { result } = renderHook(() => useProductCardActions())
    const { showModal } = useModalContext()

    const dialogProps = { dialogProp1: 'value1' }

    act(() => {
      result.current.openProductQuickViewModal(product, dialogProps)
    })

    expect(showModal).toHaveBeenCalledWith({
      Component: ProductQuickViewDialog,
      props: {
        product,
        isQuickViewModal: true,
        dialogProps,
      },
    })
  })

  it('should handle wish list actions', async () => {
    const { result } = renderHook(() => useProductCardActions())
    const { addOrRemoveWishlistItem } = useWishlist()
    // Test adding to wishlist
    await act(async () => {
      await result.current.handleWishList(product)
    })

    expect(addOrRemoveWishlistItem).toHaveBeenCalledWith({ product })
  })
})
