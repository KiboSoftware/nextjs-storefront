import { AddToCartDialog } from '@/components/dialogs'
import { ProductQuickViewDialog } from '@/components/product'
import { useModalContext } from '@/context'
import {
  useAddCartItem,
  useCreateQuoteItem,
  useUpdateWishlistItemMutation,
  useWishlist,
} from '@/hooks'
import { productGetters } from '@/lib/getters'
import { ProductCustom, WishlistProductInput } from '@/lib/types'

import { CrProductOption, CrWishlist, CrWishlistInput, Product } from '@/lib/gql/types'

export const useProductCardActions = () => {
  const { showModal } = useModalContext()
  const { addToCart } = useAddCartItem()
  const { addOrRemoveWishlistItem, checkProductInWishlist } = useWishlist()
  const { createQuoteItem } = useCreateQuoteItem()
  const { updateWishlist } = useUpdateWishlistItemMutation()

  const handleAddToCart = async (payload: any, showConfirmationModal = true) => {
    try {
      const cartResponse = await addToCart.mutateAsync(payload)

      if (cartResponse.id && showConfirmationModal) {
        showModal({
          Component: AddToCartDialog,
          props: {
            cartItem: cartResponse,
          },
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddToQuote = async (
    quoteId: string,
    updateMode: string,
    product: any,
    quantity: number
  ) => {
    try {
      await createQuoteItem.mutateAsync({
        quoteId,
        updateMode,
        product,
        quantity,
      })
    } catch (err) {
      console.log(err)
    }
  }

  const openProductQuickViewModal = ({
    product,
    dialogProps,
    quoteDetails,
    listData,
    onUpdateListData,
  }: {
    product: ProductCustom
    dialogProps?: any
    quoteDetails?: any
    listData?: any
    onUpdateListData?: (param: CrWishlist) => void
  }) => {
    showModal({
      Component: ProductQuickViewDialog,
      props: {
        product,
        isQuickViewModal: true,
        dialogProps,
        quoteDetails,
        listData,
        onUpdateListData,
      },
    })
  }

  const handleWishList = async (product: ProductCustom | WishlistProductInput) => {
    try {
      await addOrRemoveWishlistItem({ product })
    } catch (error) {
      console.log('Error: add or remove wishlist item from PLP', error)
    }
  }

  const handleAddToList = async ({
    listData,
    product,
    onUpdateListData,
  }: {
    listData: CrWishlist | undefined
    onUpdateListData: (param: CrWishlist) => void
    product: Product
  }) => {
    const items = listData?.items
    items?.push({
      product: {
        options: product?.options as CrProductOption[],
        productCode: productGetters.getProductId(product),
        variationProductCode: productGetters.getVariationProductCode(product),
        isPackagedStandAlone: product?.isPackagedStandAlone,
      },
      quantity: 1,
    })
    if (listData) listData.items = items
    const payload = {
      wishlistId: listData?.id as string,
      wishlistInput: listData as CrWishlistInput,
    }
    const response = await updateWishlist.mutateAsync(payload)
    onUpdateListData(response.updateWishlist)
  }

  const isATCLoading = addToCart.isPending

  return {
    handleAddToCart,
    handleAddToQuote,
    openProductQuickViewModal,
    handleWishList,
    checkProductInWishlist,
    isATCLoading,
    handleAddToList,
  }
}
