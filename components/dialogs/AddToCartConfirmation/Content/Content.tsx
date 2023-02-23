import React from 'react'

import { Box, Divider } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { OrderPrice, ProductItem } from '@/components/common'
import type { OrderPriceProps } from '@/components/common/OrderPrice/OrderPrice'
import { cartGetters } from '@/lib/getters'

import type { CrCartItem, CrProductOption } from '@/lib/gql/types'
interface CartContentProps {
  cartItem: CrCartItem
}

const Content = (props: CartContentProps) => {
  const { cartItem } = props
  const { shippingTotal, quantity, subtotal, itemTaxTotal, total } = cartItem
  const { t } = useTranslation('common')
  const orderPriceProps: OrderPriceProps = {
    subTotalLabel: `${t('cart-sub-total')} (${t('item-quantity', { count: quantity })})`,
    shippingTotalLabel: t('standard-shopping'),
    taxLabel: t('estimated-tax'),
    totalLabel: t('total'),
    subTotal: t('currency', { val: subtotal }),
    shippingTotal: shippingTotal ? t('currency', { val: shippingTotal }) : t('free'),
    tax: t('currency', { val: itemTaxTotal }),
    total: t('currency', { val: total }),
  }
  const subscriptionDetails = cartGetters.getSubscriptionDetails(cartItem)

  return (
    <Box sx={{ width: '100%' }} data-testid="content-component">
      <Box>
        <ProductItem
          image={cartItem.product?.imageUrl || ''}
          name={cartItem.product?.name || ''}
          options={cartItem.product?.options as Array<CrProductOption>}
          price={(cartItem.product?.price?.price || 0).toString()}
          salePrice={
            (cartItem.product?.price?.salePrice &&
              (cartItem.product?.price?.salePrice).toString()) ||
            undefined
          }
          subscriptionFrequency={subscriptionDetails as string}
        />
      </Box>
      <Divider />
      <OrderPrice {...orderPriceProps} />
    </Box>
  )
}

export default Content
