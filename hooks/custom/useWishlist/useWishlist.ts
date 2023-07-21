/**
 * @module useWishlist
 */
import { useTranslation } from 'next-i18next'

import { LoginDialog } from '@/components/layout'
import { useAuthContext, useModalContext, useSnackbarContext } from '@/context'
import {
  useGetWishlist,
  useAddToWishlistItem,
  useDeleteWishlistItem,
  useCreateWishlist,
} from '@/hooks'
import { wishlistGetters } from '@/lib/getters'
import { buildAddOrRemoveWishlistItemParams, buildWishlistParams } from '@/lib/helpers'
import type {
  WishlistParams,
  WishlistItemInWishlistParams,
  WishlistProductInput,
  ProductCustom,
} from '@/lib/types'

import { CrWishlist } from '@/lib/gql/types'

/**
 * [Custom Hook] Updates the wishlist items and checks if the product is already in wishlist.
 *
 * Return two functions:
 * 1. checkProductInWishlist(props: WishlistItemInWishlistParams) => Expects object of type 'WishlistItemInWishlistParams' containing productCode
 * 2. addOrRemoveWishlistItem({product: ProductCustom | WishlistProductInput}) => Expects product object of type 'ProductCustom' or 'WishlistProductInput'
 *
 * @param params Expects a nullable prop of type 'WishlistHookParams' containing isRemovedFromWishlist and delay
 */

export const useWishlist = () => {
  const { showModal } = useModalContext()

  const response = useGetWishlist()
  const wishlists = response.data as CrWishlist
  const { addToWishlist } = useAddToWishlistItem()
  const { deleteWishlistItem } = useDeleteWishlistItem()
  const { createWishlist } = useCreateWishlist()
  const { isAuthenticated, user: customerAccount } = useAuthContext()
  const { showSnackbar } = useSnackbarContext()
  const { t } = useTranslation('common')

  const checkProductInWishlist = (props: WishlistItemInWishlistParams) => {
    const { productCode, variationProductCode, userWishlist } = props
    return wishlistGetters.isInWishlist({
      product: {
        productCode,
        variationProductCode,
      },
      currentWishlist: userWishlist ? userWishlist : wishlists,
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
      showSnackbar(t('added-to-wishlist'), 'success')
    } else {
      await deleteWishlistItem.mutateAsync(variables)
      showSnackbar(t('removed-from-wishlist'), 'success')
    }

    // showModal({
    //   Component: WishlistPopover,
    //   props: {
    //     isInWishlist: !isProductInWishlist,
    //   },
    // })
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

      if (!wishlists?.id) {
        const response = await createWishlist.mutateAsync(customerAccount?.id as number)
        if (response?.id)
          return updateWishlistItem({ ...updateWishlistItemParams, currentWishlist: response })
      } else {
        return updateWishlistItem({ ...updateWishlistItemParams, currentWishlist: wishlists })
      }
    } catch (error) {
      console.log('Error: add or remove wishlist item from custom useWishlist', error)
    }
  }

  return {
    wishlists,
    addOrRemoveWishlistItem,
    checkProductInWishlist,
    isWishlistLoading: addToWishlist.isPending || deleteWishlistItem.isPending,
  }
}
