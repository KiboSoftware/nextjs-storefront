import React, { useState } from 'react'

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import { LoadingButton } from '@mui/lab'
import {
  Grid,
  Typography,
  Box,
  Stack,
  Button,
  useTheme,
  Divider,
  useMediaQuery,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { CartItemList } from '@/components/cart'
import { PromoCodeBadge, OrderSummary } from '@/components/common'
import { StoreLocatorDialog } from '@/components/dialogs'
import { useModalContext } from '@/context'
import {
  useGetCart,
  useInitiateOrder,
  useGetStoreLocations,
  useGetPurchaseLocation,
  useUpdateCartItemQuantity,
  useDeleteCartItem,
  useUpdateCartItem,
  useUpdateCartCoupon,
  useDeleteCartCoupon,
  useInitiateCheckout,
} from '@/hooks'
import { FulfillmentOptions } from '@/lib/constants'
import { orderGetters, cartGetters } from '@/lib/getters'
import type { LocationCustom } from '@/lib/types'

import type { Maybe, CrCart, Location, CrCartItemInput, CrCartItem } from '@/lib/gql/types'

export interface CartTemplateProps {
  isMultiShipEnabled: boolean
  cart: CrCart
}

const CartTemplate = (props: CartTemplateProps) => {
  const { isMultiShipEnabled } = props
  const { data: cart } = useGetCart(props?.cart)

  const { t } = useTranslation('common')
  const theme = useTheme()
  const isMobileViewport = useMediaQuery(theme.breakpoints.down('md'))
  const router = useRouter()
  const { initiateOrder } = useInitiateOrder()
  const { initiateCheckout } = useInitiateCheckout()
  const { updateCartItemQuantity } = useUpdateCartItemQuantity()
  const { deleteCartItem } = useDeleteCartItem()
  const { updateCartItem } = useUpdateCartItem()
  const { showModal, closeModal } = useModalContext()

  const cartItemCount = cartGetters.getCartItemCount(cart)
  const cartItems = cartGetters.getCartItems(cart)
  const cartSubTotal = orderGetters.getSubtotal(cart)
  const cartDiscountedSubTotal = orderGetters.getDiscountedSubtotal(cart)
  const cartShippingTotal = orderGetters.getShippingTotal(cart)
  const cartTaxTotal = orderGetters.getTaxTotal(cart)
  const cartTotal = orderGetters.getTotal(cart)
  const locationCodes = orderGetters.getFulfillmentLocationCodes(cartItems as CrCartItem[])

  const { data: locations } = useGetStoreLocations({ filter: locationCodes })
  const { data: purchaseLocation } = useGetPurchaseLocation()
  const { updateCartCoupon } = useUpdateCartCoupon()
  const { deleteCartCoupon } = useDeleteCartCoupon()
  const [promoError, setPromoError] = useState<string>('')
  const [showLoadingButton, setShowLoadingButton] = useState<boolean>(false)

  const handleApplyPromoCode = async (couponCode: string) => {
    try {
      setPromoError('')
      const response = await updateCartCoupon.mutateAsync({
        cartId: cart?.id as string,
        couponCode,
      })
      if (response?.invalidCoupons?.length) {
        setPromoError(response?.invalidCoupons[0]?.reason)
      }
    } catch (err) {
      console.error(err)
    }
  }
  const handleRemovePromoCode = async (couponCode: string) => {
    try {
      await deleteCartCoupon.mutateAsync({
        cartId: cart?.id as string,
        couponCode,
      })
    } catch (err) {
      console.error(err)
    }
  }

  const handleItemQuantity = async (cartItemId: string, quantity: number) => {
    try {
      await updateCartItemQuantity.mutateAsync({ cartItemId, quantity })
    } catch (err) {
      console.error(err)
    }
  }
  const handleDeleteItem = async (cartItemId: string) => {
    await deleteCartItem.mutateAsync({ cartItemId })
  }
  const handleItemActions = () => {
    // your code here
  }
  const handleFulfillmentOptionSelection = async (
    fulfillmentMethod: string,
    cartItemId: string
  ) => {
    const locationCode =
      fulfillmentMethod === FulfillmentOptions.PICKUP ? (purchaseLocation.code as string) : ''
    if (fulfillmentMethod === FulfillmentOptions.PICKUP && !locationCode) {
      handleProductPickupLocation(cartItemId)
    } else {
      mutateCartItem(cartItemId, fulfillmentMethod, locationCode)
    }
  }

  const handleProductPickupLocation = (cartItemId: string) => {
    showModal({
      Component: StoreLocatorDialog,
      props: {
        handleSetStore: async (selectedStore: LocationCustom) => {
          mutateCartItem(cartItemId, FulfillmentOptions.PICKUP, selectedStore?.code)
          closeModal()
        },
      },
    })
  }

  const mutateCartItem = async (
    cartItemId: string,
    fulfillmentMethod: string,
    locationCode = ''
  ) => {
    try {
      const cartItem = cartItems.find((item: Maybe<CrCartItem>) => item?.id === cartItemId)
      await updateCartItem.mutateAsync({
        cartItemInput: {
          ...(cartItem as CrCartItemInput),
          fulfillmentMethod,
          fulfillmentLocationCode: locationCode,
        },
        cartItemId: cartItemId,
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleGotoCheckout = async () => {
    setShowLoadingButton(true)
    try {
      const initiateOrderResponse = isMultiShipEnabled
        ? await initiateCheckout.mutateAsync(cart?.id)
        : await initiateOrder.mutateAsync(cart?.id)

      if (initiateOrderResponse?.id) {
        router.push(`/checkout/${initiateOrderResponse.id}`)
      }
    } catch (err) {
      console.error(err)
      setShowLoadingButton(false)
    }
  }

  const orderSummaryArgs = {
    nameLabel: t('order-summary'),
    subTotalLabel: `${t('subtotal')} (${t('item-quantity', { count: cartItemCount })})`,
    shippingTotalLabel: t('shipping'),
    taxLabel: t('estimated-tax'),
    totalLabel: t('estimated-order-total'),
    subTotal: t('currency', { val: cartSubTotal }),
    discountedSubtotal:
      cartDiscountedSubTotal && cartDiscountedSubTotal !== cartSubTotal
        ? t('currency', { val: cartDiscountedSubTotal })
        : '',
    shippingTotal: cartShippingTotal ? t('currency', { val: cartShippingTotal }) : t('free'),
    tax: t('currency', { val: cartTaxTotal }),
    total: t('currency', { val: cartTotal }),
    promoComponent: (
      <PromoCodeBadge
        onApplyCouponCode={handleApplyPromoCode}
        onRemoveCouponCode={handleRemovePromoCode}
        promoList={cart?.couponCodes as string[]}
        promoError={!!promoError}
        helpText={promoError}
      />
    ),
  }

  const handleContinueShopping = () => {
    router.back()
  }

  return (
    <Grid container>
      {/* Header section */}
      <Grid item xs={12} md={8} sx={{ paddingX: { xs: 2, md: 0 }, paddingY: { xs: 2 } }}>
        <Box display="flex" gap={1}>
          <Typography variant="h1" gutterBottom>
            {t('shopping-cart')}
          </Typography>
          <Typography variant="h1" fontWeight={'normal'}>
            ({t('item-quantity', { count: cartItemCount })})
          </Typography>
        </Box>
      </Grid>
      {isMobileViewport && (
        <Grid item xs={12}>
          {<Divider />}
        </Grid>
      )}
      {/* Cart item Section */}
      {!!cart?.items?.length && (
        <>
          <Grid item xs={12} md={8} sx={{ paddingRight: { md: 2 } }}>
            <CartItemList
              cartItems={cartItems}
              fulfillmentLocations={
                locations && Object.keys(locations).length ? (locations as Location[]) : []
              }
              purchaseLocation={purchaseLocation}
              onCartItemQuantityUpdate={handleItemQuantity}
              onCartItemDelete={handleDeleteItem}
              onCartItemActionSelection={handleItemActions}
              onFulfillmentOptionSelection={handleFulfillmentOptionSelection}
              onProductPickupLocation={handleProductPickupLocation}
            />
            <Box py={5}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleContinueShopping}
                startIcon={<KeyboardArrowLeft fontSize="small" sx={{ color: 'text.secondary' }} />}
              >
                {t('continue-shopping')}
              </Button>
            </Box>
          </Grid>
          {/* Order Summary */}
          <Grid item xs={12} md={4} sx={{ paddingRight: { xs: 0, md: 2 } }}>
            <OrderSummary {...orderSummaryArgs}>
              <Stack direction="column" gap={2}>
                <LoadingButton
                  variant="contained"
                  color="primary"
                  name="goToCart"
                  fullWidth
                  onClick={handleGotoCheckout}
                  loading={showLoadingButton}
                  disabled={!cartItemCount || showLoadingButton}
                >
                  {t('go-to-checkout')}
                </LoadingButton>
              </Stack>
            </OrderSummary>
          </Grid>
        </>
      )}
      {!cart?.items?.length && (
        <Box data-testid="empty-cart">
          <Typography variant="h4" fontWeight={'bold'}>
            {t('empty-cart-message')}
          </Typography>
          <Box maxWidth="23.5rem">
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '100%', marginTop: '3.063rem' }}
              onClick={() => router.push('/')}
            >
              {t('shop-now')}
            </Button>
          </Box>
        </Box>
      )}
    </Grid>
  )
}

export default CartTemplate
