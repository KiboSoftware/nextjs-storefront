import React from 'react'

import { Box, Divider } from '@mui/material'
import { useTranslation } from 'next-i18next'

import OrderPrice from '@/components/common/OrderPrice/OrderPrice'
import type { OrderPriceProps } from '@/components/common/OrderPrice/OrderPrice'
import ProductItem from '@/components/common/ProductItem/ProductItem'

import type { CartItem, CrProductOption } from '@/lib/gql/types'
interface CartContentProps {
  cartItem: CartItem
}

const Content = (props: CartContentProps) => {
  const { cartItem } = props
  const { shippingTotal, quantity, subtotal, itemTaxTotal, total } = cartItem
  const { t } = useTranslation(['checkout', 'common'])
  const orderPriceProps: OrderPriceProps = {
    subTotalLabel: `${t('common:cart-sub-total')} (${t('item-quantity', { count: quantity })})`,
    shippingTotalLabel: t('common:standard-shopping'),
    taxLabel: t('common:estimated-tax'),
    totalLabel: t('common:total'),
    subTotal: t('common:currency', { val: subtotal }),
    shippingTotal: shippingTotal ? t('common:currency', { val: shippingTotal }) : t('free'),
    tax: t('common:currency', { val: itemTaxTotal }),
    total: t('common:currency', { val: total }),
  }

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
        />
      </Box>
      <Divider />
      <OrderPrice {...orderPriceProps} />
    </Box>
  )
}

export default Content
