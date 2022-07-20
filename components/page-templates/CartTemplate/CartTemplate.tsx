import React from 'react'

import {
  Grid,
  Typography,
  Box,
  Stack,
  Button,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { CartItemList } from '@/components/cart'
import { PromoCodeBadge, OrderSummary } from '@/components/common'
import { useCartQueries, useCreateFromCartMutation, useCartMutation } from '@/hooks'
import { checkoutGetters } from '@/lib/getters'

import type { Cart } from '@/lib/gql/types'

export interface CartTemplateProps {
  cart: Cart
}

const styles = {
  container: {
    paddingBlock: 2,
  },
  heading: {
    pt: 1,
    pb: 3,
  },
  divider: {
    height: '1px',
  },
  checkoutButtonStyle: {
    borderradius: '0.25rem',
    height: '42px',
  },
}

const CartTemplate = (props: CartTemplateProps) => {
  const { data: cart } = useCartQueries(props?.cart)

  const { t } = useTranslation(['common', 'checkout', 'cart'])
  const theme = useTheme()
  const isMobileViewport = useMediaQuery(theme.breakpoints.down('md'))
  const router = useRouter()
  const { createFromCart } = useCreateFromCartMutation()
  const { updateCartItemQuantity, removeCartItem } = useCartMutation()

  const cartItemCount = checkoutGetters.getCartItemCount(cart)
  const cartItems = checkoutGetters.getCartItems(cart)
  const cartSubTotal = checkoutGetters.getSubtotal(cart)
  const cartShippingTotal = checkoutGetters.getShippingTotal(cart)
  const cartTaxTotal = checkoutGetters.getTaxTotal(cart)
  const cartTotal = checkoutGetters.getTotal(cart)

  const handleApplyCouponCode = () => {
    // your code here
  }
  const handleRemoveCouponCode = () => {
    // your code here
  }

  const handleItemQuantity = async (cartItemId: string, quantity: number) => {
    try {
      await updateCartItemQuantity.mutateAsync({ cartItemId, quantity })
    } catch (err) {
      console.error(err)
    }
  }
  const handleDeleteItem = async (cartItemId: string) => {
    await removeCartItem.mutateAsync({ cartItemId })
  }
  const handleItemActions = () => {
    // your code here
  }
  const handleFulfillmentOption = () => {
    // your code here
  }
  const handleGotoCheckout = async () => {
    try {
      const createFromCartResponse = await createFromCart.mutateAsync(cart?.id)
      if (createFromCartResponse?.id) {
        router.push(`/checkout/${createFromCartResponse.id}`)
      }
      return false
    } catch (err) {
      console.error(err)
    }
  }

  const orderSummaryArgs = {
    nameLabel: t('order-summary'),
    subTotalLabel: `${t('subtotal')} ${t('item-quantity', { count: cartItemCount })}`,
    shippingTotalLabel: t('shipping'),
    taxLabel: t('estimated-tax'),
    totalLabel: t('estimated-order-total'),
    subTotal: t('currency', { val: cartSubTotal }),
    shippingTotal: cartShippingTotal
      ? t('currency', { val: cartShippingTotal })
      : t('checkout:free'),
    tax: t('currency', { val: cartTaxTotal }),
    total: t('currency', { val: cartTotal }),
    promoComponent: (
      <PromoCodeBadge
        onApplyCouponCode={handleApplyCouponCode}
        onRemoveCouponCode={handleRemoveCouponCode}
        promoList={cart?.couponCodes}
        promoError={false}
      />
    ),
  }

  return (
    <Grid container>
      {/* Header section */}
      <Grid item xs={12} md={8} sx={{ paddingX: { xs: 2, md: 0 }, paddingY: { xs: 2 } }}>
        <Box display="flex" gap={1}>
          <Typography variant="h1" gutterBottom>
            {t('cart:shopping-cart')}
          </Typography>
          <Typography variant="h1" fontWeight={'normal'}>
            ({t('cart:cart-item-count', { count: cartItemCount })})
          </Typography>
        </Box>
      </Grid>
      {isMobileViewport && (
        <Grid item xs={12}>
          {<Divider />}
        </Grid>
      )}
      {/* Cart item Section */}
      <Grid item xs={12} md={8} sx={{ paddingRight: { md: 2 } }}>
        <CartItemList
          cartItems={cartItems}
          onCartItemQuantityUpdate={handleItemQuantity}
          onCartItemDelete={handleDeleteItem}
          onCartItemActionSelection={handleItemActions}
          onFulfillmentOptionSelection={handleFulfillmentOption}
        />
      </Grid>
      {/* Order Summary */}
      <Grid item xs={12} md={4} sx={{ paddingRight: { xs: 0, md: 2 } }}>
        <OrderSummary {...orderSummaryArgs}>
          <Stack direction="column" gap={2}>
            <Button
              disabled={!cartItemCount}
              variant="contained"
              name="goToCart"
              sx={{ ...styles.checkoutButtonStyle }}
              fullWidth
              onClick={handleGotoCheckout}
            >
              {t('go-to-checkout')}
            </Button>
          </Stack>
        </OrderSummary>
      </Grid>
    </Grid>
  )
}

export default CartTemplate
