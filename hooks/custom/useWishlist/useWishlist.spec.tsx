import { renderHook } from '@testing-library/react'

import { useWishlist } from './useWishlist'
import { userResponseMock } from '@/__mocks__/stories/userMock'
import { wishlistMock } from '@/__mocks__/stories/wishlistMock'
import { createQueryClientWrapper } from '@/__test__/utils'

const setup = () => {
  const { result } = renderHook(() => useWishlist(), {
    wrapper: createQueryClientWrapper(),
  })

  return {
    result,
  }
}

const mockWishlist = wishlistMock?.items[0]
const mockUser = userResponseMock

jest.mock('@/hooks', () => ({
  useCreateWishlist: () => {
    const { id, name, customerAccountId } = mockWishlist
    return {
      createWishlist: {
        mutateAsync: () => Promise.resolve({ id, name, customerAccountId, items: [] }),
      },
    }
  },
  useGetCurrentCustomer: () => {
    return {
      customerAccount: mockUser,
    }
  },
  useGetWishlist: () => mockWishlist,
  useAddToWishlistItem: () => {
    return {
      addToWishlist: {
        mutateAsync: () => Promise.resolve({ createWishlistItem: mockWishlist?.items[0] }),
      },
    }
  },
  useDeleteWishlistItem: () => {
    return {
      deleteWishlistItem: {
        mutateAsync: () => Promise.resolve({ deleteWishlistItem: true }),
      },
    }
  },
}))

let mockIsAuthenticated = true
jest.mock('@/context/AuthContext', () => ({
  useAuthContext: () => ({ isAuthenticated: mockIsAuthenticated }),
}))

describe('useWishlist', () => {
  const addOrRemoveWishlistItemProductInput = {
    productCode: 'MS-BTL-005',
    isPackagedStandAlone: true,
    variationProductCode: 'MS-BTL-005',
    options: [],
  }

  it('Should add or remove wishlist item', () => {
    const { result } = setup()
    mockIsAuthenticated = true
    const { productCode, variationProductCode } = addOrRemoveWishlistItemProductInput
    const response = result.current.checkProductInWishlist({
      productCode,
      variationProductCode,
      userWishlist: mockWishlist,
    })

    expect(response).toBeTruthy()
  })
})
