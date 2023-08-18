import { AddToCartDialog } from '@/components/dialogs'
import { ProductQuickViewDialog } from '@/components/product'
import { useModalContext } from '@/context'
import { useAddCartItem, useCreateQuoteItem, useWishlist } from '@/hooks'
import { ProductCustom, WishlistProductInput } from '@/lib/types'

export const useProductCardActions = () => {
  const { showModal } = useModalContext()
  const { addToCart } = useAddCartItem()
  const { addOrRemoveWishlistItem, checkProductInWishlist } = useWishlist()
  const { createQuoteItem } = useCreateQuoteItem()

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

  const openProductQuickViewModal = (
    product: ProductCustom,
    dialogProps?: any,
    quoteDetails?: any
  ) => {
    showModal({
      Component: ProductQuickViewDialog,
      props: {
        product,
        isQuickViewModal: true,
        dialogProps,
        quoteDetails,
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

  const isATCLoading = addToCart.isPending

  return {
    handleAddToCart,
    handleAddToQuote,
    openProductQuickViewModal,
    handleWishList,
    checkProductInWishlist,
    isATCLoading,
  }
}
