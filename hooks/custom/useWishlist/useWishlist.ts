/**
 * @module useWishlist
 */
import { WishlistPopover } from '@/components/dialogs'
import { LoginDialog } from '@/components/layout'
import { useAuthContext, useModalContext } from '@/context'
import {
  useWishlistQueries,
  useAddToWishlistMutation,
  useRemoveWishlistItemMutation,
  useCreateWishlistMutation,
} from '@/hooks'
import { wishlistGetters } from '@/lib/getters'
import { buildAddOrRemoveWishlistItemParams, buildWishlistParams } from '@/lib/helpers'
import type {
  WishlistParams,
  WishlistItemInWishlistParams,
  WishlistHookParams,
  WishlistProductInput,
  ProductCustom,
} from '@/lib/types'

/**
 * [Custom Hook] Updates the wishlist items and checks if the product is already in wishlist.
 *
 * Return two functions:
 * 1. checkProductInWishlist(props: WishlistItemInWishlistParams) => Expects object of type 'WishlistItemInWishlistParams' containing productCode
 * 2. addOrRemoveWishlistItem({product: ProductCustom | WishlistProductInput}) => Expects product object of type 'ProductCustom' or 'WishlistProductInput'
 *
 * @param params Expects a nullable prop of type 'WishlistHookParams' containing isRemovedFromWishlist and delay
 */

export const useWishlist = (params?: WishlistHookParams) => {
  const { showModal } = useModalContext()

  const { data: wishlist } = useWishlistQueries()
  const { addToWishlist } = useAddToWishlistMutation()
  const { removeWishlistItem } = useRemoveWishlistItemMutation(params)
  const { createWishlist } = useCreateWishlistMutation()
  const { isAuthenticated, user: customerAccount } = useAuthContext()

  const checkProductInWishlist = (props: WishlistItemInWishlistParams) => {
    const { productCode, variationProductCode, userWishlist } = props
    return wishlistGetters.isInWishlist({
      product: {
        productCode,
        variationProductCode,
      },
      currentWishlist: userWishlist ? userWishlist : wishlist,
    })
  }

  const updateWishlistItem = async (props: WishlistParams) => {
    const { productCode, variationProductCode, isPackagedStandAlone, options, currentWishlist } =
      props

    const variables = buildWishlistParams({
      productCode,
      variationProductCode,
      isPackagedStandAlone,
      options,
      currentWishlist,
    })

    const isProductInWishlist = checkProductInWishlist({
      productCode,
      variationProductCode,
      userWishlist: currentWishlist,
    })

    if (!isProductInWishlist) {
      await addToWishlist.mutateAsync({
        ...variables,
        customerAccountId: customerAccount?.id as number,
      })
    } else {
      await removeWishlistItem.mutateAsync(variables)
    }

    showModal({
      Component: WishlistPopover,
      props: {
        isInWishlist: !isProductInWishlist,
      },
    })
    return !isProductInWishlist
  }

  const addOrRemoveWishlistItem = async ({
    product,
  }: {
    product: ProductCustom | WishlistProductInput
  }) => {
    try {
      if (!isAuthenticated) {
        showModal({ Component: LoginDialog })
        return
      }

      const params = buildAddOrRemoveWishlistItemParams(product as ProductCustom)

      const { productCode, variationProductCode, isPackagedStandAlone, options } = params

      const updateWishlistItemParams = {
        productCode,
        variationProductCode,
        isPackagedStandAlone,
        options,
      }

      if (!wishlist?.id) {
        const response = await createWishlist.mutateAsync(customerAccount?.id as number)
        if (response?.id)
          return updateWishlistItem({ ...updateWishlistItemParams, currentWishlist: response })
      } else {
        return updateWishlistItem({ ...updateWishlistItemParams, currentWishlist: wishlist })
      }
    } catch (error) {
      console.log('Error: add or remove wishlist item from custom useWishlist', error)
    }
  }

  return {
    addOrRemoveWishlistItem,
    checkProductInWishlist,
  }
}
