import React, { ReactNode } from 'react'

import { Typography, Box, Divider } from '@mui/material'
import getConfig from 'next/config'
import { useTranslation } from 'next-i18next'

import OrderPriceCollapsible from '../OrderPriceCollapsible/OrderPriceCollapsible'
import { Price } from '@/components/common'
import { checkoutGetters, orderGetters } from '@/lib/getters'

import type { Checkout, CrCart, CrOrder } from '@/lib/gql/types'

export interface OrderPriceProps<T extends CrCart | CrOrder | Checkout> {
  subTotalLabel: string
  shippingTotalLabel?: string
  totalLabel: string
  handlingLabel?: string
  orderDetails: T
  isShippingTaxIncluded?: boolean
  promoComponent?: ReactNode
}

const styles = {
  priceRow: { display: 'flex', py: 1 },
  priceLabel: { flex: '50%', color: 'text.primary', fontSize: '1rem' },
  priceTotalRow: { display: 'flex', py: 1, pr: 1 },
}

const OrderPrice = <T extends CrCart | CrOrder | Checkout>(props: OrderPriceProps<T>) => {
  const {
    subTotalLabel,
    shippingTotalLabel,
    totalLabel,
    handlingLabel,

    promoComponent,
    isShippingTaxIncluded = true,
    orderDetails,
  } = props

  const { publicRuntimeConfig } = getConfig()
  const isMultiShipEnabled = publicRuntimeConfig.isMultiShipEnabled

  const total = orderGetters.getTotal(orderDetails)

  const subTotal = isMultiShipEnabled
    ? checkoutGetters.getSubtotal(orderDetails as Checkout)
    : orderGetters.getSubtotal(orderDetails as CrCart | CrOrder)

  const orderTax = orderGetters.getOrderTax(orderDetails as CrOrder)

  const discountedSubtotal =
    orderGetters.getDiscountedSubtotal(orderDetails as CrOrder | CrCart) ||
    checkoutGetters.getDiscountedSubtotal(orderDetails as Checkout)

  const orderDiscounts = orderGetters.getOrderDiscounts(orderDetails as CrOrder)
  const lineItemSubtotal = isMultiShipEnabled
    ? checkoutGetters.getSubtotal(orderDetails as Checkout)
    : orderGetters.getLineItemSubtotal(orderDetails as CrOrder)
  // multiship
  const orderLevelProductDiscountTotal = checkoutGetters.getOrderLevelProductDiscountTotal(
    orderDetails as Checkout
  )

  const shippingTotal = orderGetters.getShippingTotal(orderDetails as CrOrder)
  const shippingSubTotal = orderGetters.getShippingSubTotal(orderDetails)
  const shippingTaxTotal = orderGetters.getShippingTaxTotal(orderDetails)
  const shippingDiscounts = orderGetters.getShippingDiscounts(orderDetails as CrOrder)
  // multiship
  const orderLevelShippingDiscountTotal = checkoutGetters.getOrderLevelShippingDiscountTotal(
    orderDetails as Checkout
  )

  const handlingTotal = orderGetters.getHandlingTotal(orderDetails)
  const handlingSubTotal = orderGetters.getHandlingSubTotal(orderDetails)
  const handlingTaxTotal = orderGetters.getHandlingTaxTotal(orderDetails)
  const handlingDiscounts = orderGetters.getHandlingDiscounts(orderDetails as CrOrder)
  // multiship
  const orderLevelHandlingDiscountTotal = checkoutGetters.getOrderLevelHandlingDiscountTotal(
    orderDetails as Checkout
  )

  const { t } = useTranslation('common')

  return (
    <Box sx={{ width: '100%' }} data-testid={'order-price-component'}>
      <>
        {isShippingTaxIncluded && (
          <>
            <OrderPriceCollapsible
              title={subTotalLabel as string}
              total={subTotal}
              subTotal={lineItemSubtotal}
              taxTotal={orderTax}
              discountedSubtotal={discountedSubtotal}
              orderDiscounts={orderDiscounts}
              checkoutDiscount={orderLevelProductDiscountTotal}
            />
            <OrderPriceCollapsible
              title={shippingTotalLabel as string}
              total={shippingTotal}
              subTotal={shippingSubTotal}
              taxTotal={shippingTaxTotal}
              orderDiscounts={shippingDiscounts}
              checkoutDiscount={orderLevelShippingDiscountTotal}
            />
            <OrderPriceCollapsible
              title={handlingLabel as string}
              total={handlingTotal}
              subTotal={handlingSubTotal}
              taxTotal={handlingTaxTotal}
              orderDiscounts={handlingDiscounts}
              checkoutDiscount={orderLevelHandlingDiscountTotal}
            />
          </>
        )}

        {!isShippingTaxIncluded && (
          <>
            <Box sx={{ ...styles.priceRow }}>
              <Typography sx={{ ...styles.priceLabel }} variant="body1">
                {subTotalLabel}
              </Typography>
              <Price
                variant="body1"
                fontWeight="bold"
                price={t('currency', { val: subTotal })}
                salePrice={
                  discountedSubtotal > 0 && discountedSubtotal !== subTotal
                    ? t('currency', { val: discountedSubtotal })
                    : ''
                }
              />
            </Box>
            <Box sx={{ ...styles.priceRow }}>
              <Typography sx={{ ...styles.priceLabel }} variant="body2">
                {t('shipping-tax-at-checkout')}
              </Typography>
            </Box>
          </>
        )}
      </>
      <Divider sx={{ margin: '0 0.438rem' }} />

      {promoComponent && <Box>{promoComponent}</Box>}

      <Box sx={{ ...styles.priceTotalRow }}>
        <Typography sx={{ ...styles.priceLabel }} variant="body1" fontWeight="bold">
          {totalLabel}
        </Typography>
        <Price variant="body1" fontWeight="bold" price={t('currency', { val: total })} />
      </Box>
    </Box>
  )
}

export default OrderPrice
