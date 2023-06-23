import { AddToCartDialog } from '@/components/dialogs'
import { ProductQuickViewDialog } from '@/components/product'
import { useModalContext } from '@/context'
import { useAddCartItem, useWishlist } from '@/hooks'
import { ProductCustom, WishlistProductInput } from '@/lib/types'

export const useProductCardActions = () => {
  const { showModal } = useModalContext()
  const { addToCart } = useAddCartItem()
  const { addOrRemoveWishlistItem, checkProductInWishlist } = useWishlist()

  const handleAddToCart = async (payload: any) => {
    try {
      const cartResponse = await addToCart.mutateAsync(payload)

      if (cartResponse.id) {
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

  const openProductQuickViewModal = (product: ProductCustom) => {
    showModal({
      Component: ProductQuickViewDialog,
      props: {
        product,
        isQuickViewModal: true,
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

  const isATCLoading = addToCart.isLoading

  return {
    handleAddToCart,
    openProductQuickViewModal,
    handleWishList,
    checkProductInWishlist,
    isATCLoading,
  }
}
