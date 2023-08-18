import { renderHook, act } from '@testing-library/react-hooks'

import { useQuoteActions } from './useQuoteActions'
import { FulfillmentOptions } from '@/lib/constants'

import { CrOrderItem, Location, Maybe } from '@/lib/gql/types'

const showModalMock = jest.fn()
// Mock the necessary dependencies
jest.mock('@/context', () => ({
  useModalContext: jest.fn(() => ({ showModal: showModalMock, closeModal: jest.fn() })),
}))

const updateQuoteItemFulfillmentMutateAsyncMock = jest.fn()
const updateQuoteItemQuantityMutateAsync = jest.fn()

jest.mock('@/hooks', () => ({
  useUpdateQuoteItemFulfillment: jest.fn(() => ({
    updateQuoteItemFulfillment: { mutateAsync: updateQuoteItemFulfillmentMutateAsyncMock },
  })),
  useUpdateQuoteItemQuantity: jest.fn(() => ({
    updateQuoteItemQuantity: { mutateAsync: updateQuoteItemQuantityMutateAsync },
  })),
}))

describe('useQuoteActions', () => {
  // Sample test data
  const quoteItems = [
    {
      id: 'item1',
      product: {
        id: 'product1',
        name: 'Product 1',
      },
      quantity: 1,
    },
    {
      id: 'item2',
      product: {
        id: 'product2',
        name: 'Product 2',
      },
      quantity: 2,
    },
  ]
  let purchaseLocation = { code: 'store1', name: 'Store 1' }

  const quoteItemId = 'item1'
  const quoteId = 'quote-id'
  const updateMode = 'update-mode'

  const setup = (location?: Location) => {
    const { result } = renderHook(() =>
      useQuoteActions({
        quoteId: 'quote-id',
        quoteItems,
        updateMode: 'update-mode',
        purchaseLocation: location ?? purchaseLocation,
      })
    )

    return { result }
  }

  it('should handle product pickup location selection', () => {
    const { result } = setup()

    act(() => {
      result.current.handleProductPickupLocation(quoteItemId)
    })

    expect(showModalMock).toHaveBeenCalled()
  })

  it('should handle fulfillment option change', () => {
    const { result } = setup()

    // Test case where fulfillment option is not pickup
    const fulfillmentMethod = FulfillmentOptions.SHIP
    const shipProduct = quoteItems.find(
      (item: Maybe<CrOrderItem>) => item?.id === quoteItemId
    )?.product
    const shipQuantity = quoteItems.find(
      (item: Maybe<CrOrderItem>) => item?.id === quoteItemId
    )?.quantity
    act(() => {
      result.current.onFulfillmentOptionChange(fulfillmentMethod, quoteItemId)
    })
    expect(updateQuoteItemFulfillmentMutateAsyncMock).toHaveBeenCalledWith({
      fulfillmentMethod,
      locationCode: '',
      product: shipProduct,
      quantity: shipQuantity,
      quoteId,
      quoteItemId,
      updateMode,
    })

    // Test case where fulfillment option is pickup and locationCode is present
    const pickupQuoteItemId = 'item2'
    const fulfillmentMethodPickup = FulfillmentOptions.PICKUP
    const pickupProduct = quoteItems.find(
      (item: Maybe<CrOrderItem>) => item?.id === pickupQuoteItemId
    )?.product
    const pickupQuantity = quoteItems.find(
      (item: Maybe<CrOrderItem>) => item?.id === pickupQuoteItemId
    )?.quantity
    act(() => {
      result.current.onFulfillmentOptionChange(fulfillmentMethodPickup, pickupQuoteItemId)
    })

    expect(updateQuoteItemFulfillmentMutateAsyncMock).toHaveBeenCalledWith({
      fulfillmentMethod: fulfillmentMethodPickup,
      locationCode: 'store1',
      product: pickupProduct,
      quantity: pickupQuantity,
      quoteId,
      quoteItemId: pickupQuoteItemId,
      updateMode,
    })

    // Test case where fulfillment option is pickup and locationCode is not present
    const pickupQuoteItemId2 = 'item2'
    const fulfillmentMethodPickup2 = FulfillmentOptions.PICKUP
    purchaseLocation = { code: '', name: '' }

    const { result: response } = setup(purchaseLocation)

    act(() => {
      response.current.onFulfillmentOptionChange(fulfillmentMethodPickup2, pickupQuoteItemId2)
    })

    expect(showModalMock).toHaveBeenCalled()
  })

  it('should handle quantity update', async () => {
    const { result } = setup()

    const newQuantity = 5

    await act(async () => {
      result.current.handleQuantityUpdate(quoteItemId, newQuantity)
    })

    expect(updateQuoteItemQuantityMutateAsync).toHaveBeenCalledWith({
      quoteItemId,
      quantity: newQuantity,
      quoteId,
      updateMode,
    })
  })
})
