import React from 'react'

import { Box, Divider } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { OrderPrice, ProductItem } from '@/components/common'
import type { OrderPriceProps } from '@/components/common/OrderPrice/OrderPrice'
import { cartGetters, productGetters } from '@/lib/getters'

import type { CrCart, CrCartItem, CrProductOption } from '@/lib/gql/types'
interface CartContentProps {
  cartItem: CrCartItem
}

const Content = (props: CartContentProps) => {
  const { cartItem } = props
  const { shippingTotal, quantity, subtotal, itemTaxTotal, total } = cartItem
  const { t } = useTranslation('common')
  const orderPriceProps = {
    subTotalLabel: `${t('cart-sub-total')} (${t('item-quantity', { count: quantity })})`,
    totalLabel: t('total'),
    isShippingTaxIncluded: false,
    orderDetails: {
      subtotal,
      shippingTotal,
      tax: itemTaxTotal,
      total,
    } as CrCart,
  }
  const subscriptionDetails = cartGetters.getSubscriptionDetails(cartItem)
  const price = productGetters.getPrice(cartItem.product as any)
  return (
    <Box sx={{ width: '100%' }} data-testid="content-component">
      <Box>
        <ProductItem
          image={cartItem?.product?.imageUrl || ''}
          name={cartItem?.product?.name || ''}
          options={cartItem?.product?.options as Array<CrProductOption>}
          price={price.regular.toString()}
          salePrice={(price.special && price.special.toString()) || undefined}
          subscriptionFrequency={subscriptionDetails as string}
          discounts={cartItem?.productDiscounts}
        />
      </Box>
      <Divider />
      <OrderPrice {...orderPriceProps} />
    </Box>
  )
}

export default Content
