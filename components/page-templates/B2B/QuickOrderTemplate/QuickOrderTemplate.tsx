import React, { useState } from 'react'

import ArrowBackIos from '@mui/icons-material/ArrowBackIos'
import { LoadingButton } from '@mui/lab'
import { Stack, Typography, Box, Grid, useMediaQuery, Theme } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { quickOrderTemplateStyles } from './QuickOrderTemplate.style'
import { B2BProductDetailsTable, B2BProductSearch } from '@/components/b2b'
import { CartItemList } from '@/components/cart'
import { KeyValueDisplay, PromoCodeBadge } from '@/components/common'
import {
  useCartActions,
  useGetCart,
  useGetPurchaseLocation,
  useGetStoreLocations,
  useProductCardActions,
  useUpdateCartCoupon,
  useDeleteCartCoupon,
  useDeleteCartItem,
  useInitiateOrder,
  useInitiateCheckout,
  useCreateQuoteFromCart,
} from '@/hooks'
import { FulfillmentOptions as FulfillmentOptionsConstant } from '@/lib/constants'
import { cartGetters, orderGetters, productGetters } from '@/lib/getters'

import { CrCart, CrCartItem, Location } from '@/lib/gql/types'

export interface QuickOrderTemplateProps {
  cart: CrCart
  isMultiShipEnabled: boolean
  onAccountTitleClick: () => void
}

const QuickOrderTemplate = (props: QuickOrderTemplateProps) => {
  const { cart: cartData, onAccountTitleClick, isMultiShipEnabled = false } = props
  const [showLoadingButton, setShowLoadingButton] = useState<boolean>(false)
  const { t } = useTranslation('common')
  const mdScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  const [promoError, setPromoError] = useState<string>('')
  const { data: cart } = useGetCart(cartData)
  const cartItems = cartGetters.getCartItems(cart)
  const cartTotal = orderGetters.getTotal(cart)
  const router = useRouter()

  const locationCodes = orderGetters.getFulfillmentLocationCodes(cartItems as CrCartItem[])
  const { data: locations } = useGetStoreLocations({ filter: locationCodes })
  const fulfillmentLocations = locations && Object.keys(locations).length ? locations : []
  const cartItemCount = cartGetters.getCartItemCount(cart)

  const { deleteCartItem } = useDeleteCartItem()
  const { updateCartCoupon } = useUpdateCartCoupon()
  const { deleteCartCoupon } = useDeleteCartCoupon()
  const { createQuoteFromCart } = useCreateQuoteFromCart()

  const { data: purchaseLocation } = useGetPurchaseLocation()

  const { initiateOrder } = useInitiateOrder()
  const { initiateCheckout } = useInitiateCheckout()
  const { openProductQuickViewModal, handleAddToCart } = useProductCardActions()
  const { onFulfillmentOptionChange, handleQuantityUpdate, handleProductPickupLocation } =
    useCartActions({
      cartItems: cartItems as CrCartItem[],
      purchaseLocation,
    })

  const handleAddProduct = (product: any) => {
    if (productGetters.isVariationProduct(product)) {
      const dialogProps = {
        title: t('product-configuration-options'),
        cancel: t('cancel'),
        addItemToCart: t('add-item-to-cart'),
        isB2B: true,
      }
      openProductQuickViewModal({ product, dialogProps })
    } else {
      const payload = {
        product: {
          productCode: productGetters.getProductId(product),
          variationProductCode: productGetters.getVariationProductCode(product),
          fulfillmentMethod: product?.fulfillmentTypesSupported?.includes(
            FulfillmentOptionsConstant.DIGITAL
          )
            ? FulfillmentOptionsConstant.DIGITAL
            : FulfillmentOptionsConstant.SHIP,
          purchaseLocationCode: '',
        },
        quantity: 1,
      }
      handleAddToCart(payload, false)
    }
  }

  const handleApplyCouponCode = async (couponCode: string) => {
    try {
      setPromoError('')
      const response = await updateCartCoupon.mutateAsync({
        cartId: cart?.id as string,
        couponCode,
      })
      if (response?.invalidCoupons?.length) {
        setPromoError(`<strong>${couponCode}</strong> ${response?.invalidCoupons[0]?.reason}`)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleRemoveCouponCode = async (couponCode: string) => {
    try {
      await deleteCartCoupon.mutateAsync({
        cartId: cart?.id as string,
        couponCode,
      })
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteItem = async (cartItemId: string) => {
    await deleteCartItem.mutateAsync({ cartItemId })
  }

  const handleGotoCheckout = async () => {
    setShowLoadingButton(true)
    try {
      const initiateOrderResponse = isMultiShipEnabled
        ? await initiateCheckout.mutateAsync(cart?.id)
        : await initiateOrder.mutateAsync({ cartId: cart?.id as string })

      if (initiateOrderResponse?.id) {
        router.push(`/checkout/${initiateOrderResponse.id}`)
      }
    } catch (err) {
      console.error(err)
      setShowLoadingButton(false)
    }
  }

  const handleInitiateQuote = async () => {
    try {
      const response = await createQuoteFromCart.mutateAsync({
        cartId: cart?.id as string,
        updateMode: 'ApplyToDraft',
      })
      if (response?.id) {
        router.push(`/my-account/b2b/quote/${response.id}?mode=create`)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack sx={quickOrderTemplateStyles.wrapIcon} direction="row" gap={2}>
          <Box sx={{ display: 'flex' }} onClick={onAccountTitleClick}>
            <ArrowBackIos fontSize="inherit" sx={quickOrderTemplateStyles.wrapIcon} />
            {mdScreen && <Typography variant="body2">{t('my-account')}</Typography>}
          </Box>
          {!mdScreen && (
            <Box sx={quickOrderTemplateStyles.quickOrderTextBox}>
              <Typography variant="h2" sx={quickOrderTemplateStyles.quickOrderText}>
                {t('quick-order')}
              </Typography>
            </Box>
          )}
        </Stack>
      </Grid>
      {mdScreen && (
        <Grid item xs={12} sm={12} display={'flex'} justifyContent={'space-between'}>
          <Typography variant="h1">{t('quick-order')}</Typography>
          <Stack display={'flex'} justifyContent={'flex-end'}>
            {mdScreen ? (
              <Stack direction="row" gap={2}>
                <Stack direction="column" gap={2}>
                  <LoadingButton
                    variant="contained"
                    color="secondary"
                    onClick={handleInitiateQuote}
                    disabled={!cartItemCount || showLoadingButton}
                  >
                    {t('initiate-quote')}
                  </LoadingButton>
                </Stack>
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
                    {t('checkout')}
                  </LoadingButton>
                </Stack>
              </Stack>
            ) : null}
          </Stack>
        </Grid>
      )}
      <Grid item xs={12} md={4}>
        <B2BProductSearch onAddProduct={handleAddProduct} />
      </Grid>
      <Grid item xs={12}>
        <Stack gap={3}>
          {mdScreen ? (
            <B2BProductDetailsTable
              items={cartItems as CrCartItem[]}
              fulfillmentLocations={fulfillmentLocations}
              purchaseLocation={purchaseLocation}
              onFulfillmentOptionChange={onFulfillmentOptionChange}
              onQuantityUpdate={handleQuantityUpdate}
              onStoreSetOrUpdate={handleProductPickupLocation}
              onItemDelete={handleDeleteItem}
            />
          ) : (
            <Stack spacing={2}>
              <Stack sx={quickOrderTemplateStyles.promoCode}>
                <Box sx={quickOrderTemplateStyles.promoCodeBadge}>
                  <PromoCodeBadge
                    onApplyCouponCode={handleApplyCouponCode}
                    onRemoveCouponCode={handleRemoveCouponCode}
                    promoError={!!promoError}
                    helpText={promoError}
                    couponLabel="Coupon"
                    promoList={cart?.couponCodes as string[]}
                  />
                </Box>
                <KeyValueDisplay
                  option={{
                    name: t('order-total'),
                    value: `${t('currency', { val: cartTotal })} `,
                  }}
                  variant="body1"
                  sx={quickOrderTemplateStyles.orderTotal}
                />
              </Stack>
              <Typography variant="h2">{t('cart')}</Typography>
              {cartItems.length > 0 ? (
                <CartItemList
                  cartItems={cartItems}
                  fulfillmentLocations={fulfillmentLocations as Location[]}
                  purchaseLocation={purchaseLocation}
                  onCartItemDelete={handleDeleteItem}
                  onCartItemQuantityUpdate={handleQuantityUpdate}
                  onFulfillmentOptionChange={onFulfillmentOptionChange}
                  onProductPickupLocation={handleProductPickupLocation}
                  onCartItemActionSelection={() => null}
                />
              ) : (
                <Typography variant="body1" sx={quickOrderTemplateStyles.noCartItems}>
                  {t('search-to-add-products')}
                </Typography>
              )}
            </Stack>
          )}

          {!mdScreen && cartItems.length ? (
            <Stack spacing={2}>
              <LoadingButton variant="contained" color="primary" onClick={handleGotoCheckout}>
                {t('checkout')}
              </LoadingButton>
              <LoadingButton variant="contained" color="secondary">
                {t('initiate-quote')}
              </LoadingButton>
            </Stack>
          ) : null}
        </Stack>
      </Grid>
      {mdScreen && (
        <Grid item xs={12}>
          <Stack sx={quickOrderTemplateStyles.promoCode}>
            <Box sx={quickOrderTemplateStyles.promoCodeBadge}>
              <PromoCodeBadge
                onApplyCouponCode={handleApplyCouponCode}
                onRemoveCouponCode={handleRemoveCouponCode}
                promoError={!!promoError}
                helpText={promoError}
                couponLabel="Coupon"
                promoList={cart?.couponCodes as string[]}
              />
            </Box>
            <KeyValueDisplay
              option={{
                name: t('order-total'),
                value: `${t('currency', { val: cartTotal })} `,
              }}
              variant="body1"
              sx={quickOrderTemplateStyles.orderTotal}
            />
          </Stack>
        </Grid>
      )}
    </Grid>
  )
}

export default QuickOrderTemplate
