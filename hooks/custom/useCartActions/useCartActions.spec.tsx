import { renderHook, act } from '@testing-library/react-hooks'

import { useCartActions } from './useCartActions'
import { FulfillmentOptions } from '@/lib/constants'

import { Location } from '@/lib/gql/types'

const showModalMock = jest.fn()
// Mock the necessary dependencies
jest.mock('@/context', () => ({
  useModalContext: jest.fn(() => ({ showModal: showModalMock, closeModal: jest.fn() })),
}))

const updateCartItemMutateAsyncMock = jest.fn()
const updateCartItemQuantityMutateAsync = jest.fn()

jest.mock('@/hooks', () => ({
  useUpdateCartItem: jest.fn(() => ({
    updateCartItem: { mutateAsync: updateCartItemMutateAsyncMock },
  })),
  useUpdateCartItemQuantity: jest.fn(() => ({
    updateCartItemQuantity: { mutateAsync: updateCartItemQuantityMutateAsync },
  })),
}))

describe('useCartActions', () => {
  // Sample test data
  const cartItems = [
    { id: 'item1', name: 'Item 1', quantity: 1 },
    { id: 'item2', name: 'Item 2', quantity: 2 },
  ]
  let purchaseLocation = { code: 'store1', name: 'Store 1' }

  const setup = (location?: Location) => {
    const { result } = renderHook(() =>
      useCartActions({ cartItems, purchaseLocation: location ?? purchaseLocation })
    )

    return { result }
  }

  it('should handle product pickup location selection', () => {
    const { result } = setup()

    const cartItemId = 'item1'
    act(() => {
      result.current.handleProductPickupLocation(cartItemId)
    })

    expect(showModalMock).toHaveBeenCalled()
  })

  it('should handle fulfillment option change', () => {
    const { result } = setup()

    // Test case where fulfillment option is not pickup
    const cartItemId = 'item1'
    const fulfillmentMethod = FulfillmentOptions.SHIP
    act(() => {
      result.current.onFulfillmentOptionChange(fulfillmentMethod, cartItemId)
    })

    expect(updateCartItemMutateAsyncMock).toHaveBeenCalledWith({
      cartItemInput: {
        ...cartItems.filter((item) => item.id === cartItemId)[0],
        fulfillmentMethod,
        fulfillmentLocationCode: '',
      },
      cartItemId: cartItemId,
    })

    // Test case where fulfillment option is pickup and locationCode is present
    const pickupCartItemId = 'item2'
    const fulfillmentMethodPickup = FulfillmentOptions.PICKUP
    act(() => {
      result.current.onFulfillmentOptionChange(fulfillmentMethodPickup, pickupCartItemId)
    })

    expect(updateCartItemMutateAsyncMock).toHaveBeenCalledWith({
      cartItemInput: {
        ...cartItems.filter((item) => item.id === pickupCartItemId)[0],
        fulfillmentMethod: fulfillmentMethodPickup,
        fulfillmentLocationCode: 'store1',
      },
      cartItemId: pickupCartItemId,
    })

    // Test case where fulfillment option is pickup and locationCode is not present
    const pickupCartItemId2 = 'item2'
    const fulfillmentMethodPickup2 = FulfillmentOptions.PICKUP
    purchaseLocation = { code: '', name: '' }

    const { result: response } = setup(purchaseLocation)

    act(() => {
      response.current.onFulfillmentOptionChange(fulfillmentMethodPickup2, pickupCartItemId2)
    })

    expect(showModalMock).toHaveBeenCalled()
  })

  it('should handle quantity update', async () => {
    const { result } = setup()

    const cartItemId = 'item1'
    const newQuantity = 5

    await act(async () => {
      result.current.handleQuantityUpdate(cartItemId, newQuantity)
    })

    expect(updateCartItemQuantityMutateAsync).toHaveBeenCalledWith({
      cartItemId,
      quantity: newQuantity,
    })
  })
})
