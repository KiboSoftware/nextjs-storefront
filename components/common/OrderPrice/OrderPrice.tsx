import React, { ReactNode } from 'react'

import Info from '@mui/icons-material/Info'
import { Typography, Box, Divider } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { Price } from '@/components/common'
export interface OrderPriceProps {
  subTotalLabel: string
  subTotal: string

  shippingTotalLabel?: string
  shippingTotal?: string

  taxLabel?: string
  tax?: string

  totalLabel: string
  total: string

  discountedSubtotal?: string
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

const OrderPrice = (props: OrderPriceProps) => {
  const {
    subTotalLabel,
    shippingTotalLabel,
    taxLabel,
    totalLabel,
    subTotal,
    discountedSubtotal,
    shippingTotal,
    tax,
    total,
    promoComponent,
    isShippingTaxIncluded = true,
  } = props

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
            price={subTotal}
            salePrice={discountedSubtotal}
          />
        </Box>
        {shippingTotalLabel && (
          <Box sx={{ ...styles.priceRow }}>
            <Typography sx={{ ...styles.priceLabel }} variant="body1">
              {shippingTotalLabel}
            </Typography>
            <Price variant="body1" fontWeight="bold" price={shippingTotal} />
          </Box>
        )}
        {taxLabel && (
          <Box sx={{ ...styles.priceRow }}>
            <Typography sx={{ ...styles.priceLabel }} variant="body1">
              {taxLabel} <Info sx={{ ...styles.infoIcon }} />
            </Typography>
            <Price variant="body1" fontWeight="bold" price={tax} />
          </Box>
        )}
        {!isShippingTaxIncluded && (
          <Box sx={{ ...styles.priceRow }}>
            <Typography sx={{ ...styles.priceLabel }} variant="body2">
              {t('shipping-tax-at-checkout')}
            </Typography>
            <Price variant="body1" fontWeight="bold" price={tax} />
          </Box>
        )}
      </Box>
      <Divider sx={{ margin: '0 0.438rem' }} />
      {promoComponent && <Box>{promoComponent}</Box>}
      <Box sx={{ ...styles.priceTotalRow }}>
        <Typography sx={{ ...styles.priceLabel }} variant="body1" fontWeight="bold">
          {totalLabel}
        </Typography>
        <Price variant="body1" fontWeight="bold" price={total} />
      </Box>
    </Box>
  )
}

export default OrderPrice
