import React, { ReactNode } from 'react'

import Info from '@mui/icons-material/Info'
import { Typography, Box, Divider } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { Price } from '@/components/common'
import { checkoutGetters, orderGetters } from '@/lib/getters'

import type { Checkout, CrCart, CrOrder } from '@/lib/gql/types'

export interface OrderPriceProps<T extends CrCart | CrOrder | Checkout> {
  subTotalLabel: string
  shippingTotalLabel?: string
  taxLabel?: string
  totalLabel: string
  handlingLabel?: string
  orderDetails: T
  isShippingTaxIncluded?: boolean
  promoComponent?: ReactNode
}

const styles = {
  priceSection: { padding: '0 0.438rem' },
  priceRow: { display: 'flex', padding: '0.563rem 0' },
  priceLabel: { flex: '50%', color: 'text.primary', fontSize: '1rem' },
  priceTotalRow: { display: 'flex', padding: '1.188rem 0.438rem 0.25rem 0.438rem' },
  infoIcon: { width: '0.688rem', height: '0.688rem' },
}

const OrderPrice = <T extends CrCart | CrOrder | Checkout>(props: OrderPriceProps<T>) => {
  const {
    subTotalLabel,
    shippingTotalLabel,
    taxLabel,
    totalLabel,
    handlingLabel,

    promoComponent,
    isShippingTaxIncluded = true,
    orderDetails,
  } = props

  const subTotal = orderGetters.getSubtotal(orderDetails)
  const discountedSubtotal =
    orderGetters.getDiscountedSubtotal(orderDetails as CrOrder | CrCart) ||
    checkoutGetters.getDiscountedSubtotal(orderDetails as Checkout)

  const shippingSubTotal = orderGetters.getShippingSubTotal(orderDetails)

  const shippingDiscounts = (orderDetails as CrOrder)?.shippingDiscounts?.map((discount) => {
    return {
      id: discount?.discount?.discount?.id,
      name: discount?.discount?.discount?.name,
      impact: (discount?.discount?.impact as number) * -1,
    }
  })

  const taxTotal =
    orderGetters.getTaxTotal(orderDetails as CrOrder) ??
    checkoutGetters.getTaxTotal(orderDetails as Checkout)

  const handlingTotal = orderGetters.getHandlingTotal(orderDetails)

  const total = orderGetters.getTotal(orderDetails)

  const { t } = useTranslation('common')

  return (
    <Box sx={{ width: '100%' }} data-testid={'order-price-component'}>
      <Box sx={{ ...styles.priceSection }}>
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
        {shippingTotalLabel && isShippingTaxIncluded && (
          <Box sx={{ ...styles.priceRow }}>
            <Typography sx={{ ...styles.priceLabel }} variant="body1">
              {shippingTotalLabel}
            </Typography>
            <Price
              variant="body1"
              fontWeight="bold"
              price={t('currency', { val: shippingSubTotal })}
            />
          </Box>
        )}
        {shippingDiscounts?.length &&
          isShippingTaxIncluded &&
          shippingDiscounts?.map((discount) => (
            <Box key={discount?.id} sx={{ ...styles.priceRow }}>
              <Typography sx={{ ...styles.priceLabel }} variant="body1">
                {discount.name}
              </Typography>
              <Price
                variant="body1"
                fontWeight="bold"
                price={t('currency', { val: discount.impact })}
              />
            </Box>
          ))}

        {handlingLabel && isShippingTaxIncluded && (
          <Box sx={{ ...styles.priceRow }}>
            <Typography sx={{ ...styles.priceLabel }} variant="body1">
              {handlingLabel}
            </Typography>
            <Price
              variant="body1"
              fontWeight="bold"
              price={t('currency', { val: handlingTotal })}
            />
          </Box>
        )}

        {taxLabel && isShippingTaxIncluded && (
          <Box sx={{ ...styles.priceRow }}>
            <Typography sx={{ ...styles.priceLabel }} variant="body1">
              {taxLabel} <Info sx={{ ...styles.infoIcon }} />
            </Typography>
            <Price variant="body1" fontWeight="bold" price={t('currency', { val: taxTotal })} />
          </Box>
        )}

        {!isShippingTaxIncluded && (
          <Box sx={{ ...styles.priceRow }}>
            <Typography sx={{ ...styles.priceLabel }} variant="body2">
              {t('shipping-tax-at-checkout')}
            </Typography>
          </Box>
        )}
      </Box>
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
