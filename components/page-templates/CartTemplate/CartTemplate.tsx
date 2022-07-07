import React from 'react'

import { Grid, Typography, Box, Stack, Button, useTheme, useMediaQuery } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { CartItemList } from '@/components/cart'
import { FullWidthDivider } from '@/components/common'
import { PromoCodeBadge } from '@/components/common'
import OrderSummary from '@/components/common/OrderSummary/OrderSummary'

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
  const { cart } = props

  const { t } = useTranslation(['common', 'checkout', 'cart'])
  const theme = useTheme()
  const isMobileViewport = useMediaQuery(theme.breakpoints.down('md'))
  const router = useRouter()

  const cartItemCount = cart?.items?.length || 0
  const cartItems = cart?.items || []

  const handleApplyCouponCode = () => {
    // your code here
  }
  const handleRemoveCouponCode = () => {
    // your code here
  }

  const orderSummeryArgs = {
    nameLabel: t('order-summary'),
    subTotalLabel: `${t('subtotal')} ${t('item-quantity', { count: cartItemCount })}`,
    shippingTotalLabel: t('shipping'),
    taxLabel: t('estimated-tax'),
    totalLabel: t('estimated-order-total'),
    subTotal: t('currency', { val: cart?.subtotal }),
    shippingTotal: cart?.shippingTotal
      ? t('currency', { val: cart?.shippingTotal })
      : t('checkout:free'),
    tax: t('currency', { val: cart?.taxTotal }),
    total: t('currency', { val: cart?.total }),
    promoComponent: (
      <PromoCodeBadge
        onApplyCouponCode={handleApplyCouponCode}
        onRemoveCouponCode={handleRemoveCouponCode}
        promoList={cart?.couponCodes}
        promoError={false}
      />
    ),
  }

  const handleItemQuantity = (cartItemId: string, quantity: number) => {
    // your code here
  }
  const handleDeleteItem = (cartItemId: string) => {
    // your code here
  }
  const handleItemActions = () => {
    // your code here
  }
  const gotoCheckout = () => {
    router.push('/checkout')
    // your code here
  }

  return (
    <Grid container>
      {/* Header section */}
      <Grid item xs={12} md={8} sx={{ paddingY: { xs: 2 } }}>
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
          {<FullWidthDivider />}
        </Grid>
      )}
      {/* Cart item Section */}
      <Grid item xs={12} md={8} sx={{ paddingRight: { md: 2 } }}>
        <CartItemList
          cartItems={cartItems}
          onCartItemQuantityUpdate={handleItemQuantity}
          onCartItemDelete={handleDeleteItem}
          onCartItemActionSelection={handleItemActions}
        />
      </Grid>

      {/* Order Summary */}
      <Grid item xs={12} md={4} sx={{ paddingX: { xs: 0, md: 2 } }}>
        <OrderSummary {...orderSummeryArgs}>
          <Stack direction="column" gap={2}>
            <Button
              disabled={!cartItemCount}
              variant="contained"
              sx={{ ...styles.checkoutButtonStyle }}
              fullWidth
              onClick={gotoCheckout}
            >
              {t('common:go-to-checkout')}
            </Button>
          </Stack>
        </OrderSummary>
      </Grid>
    </Grid>
  )
}

export default CartTemplate
