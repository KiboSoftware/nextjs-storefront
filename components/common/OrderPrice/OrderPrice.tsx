import React from 'react'

import { Info } from '@mui/icons-material'
import { Typography, Box, Divider } from '@mui/material'

import Price from '@/components/common/Price/Price'
export interface OrderPriceProps {
  subTotalLabel: string
  shippingTotalLabel: string
  taxLabel: string
  totalLabel: string
  subTotal: string
  shippingTotal: string
  tax: string
  total: string
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
    shippingTotal,
    tax,
    total,
  } = props

  return (
    <Box sx={{ width: '100%' }} data-testid={'order-price-component'}>
      <Box sx={{ ...styles.priceSection }}>
        <Box sx={{ ...styles.priceRow }}>
          <Typography sx={{ ...styles.priceLabel }} variant="body1">
            {subTotalLabel}
          </Typography>
          <Price variant="body1" fontWeight="bold" price={subTotal} />
        </Box>
        <Box sx={{ ...styles.priceRow }}>
          <Typography sx={{ ...styles.priceLabel }} variant="body1">
            {shippingTotalLabel}
          </Typography>
          <Price variant="body1" fontWeight="bold" price={shippingTotal} />
        </Box>
        <Box sx={{ ...styles.priceRow }}>
          <Typography sx={{ ...styles.priceLabel }} variant="body1">
            {taxLabel} <Info sx={{ ...styles.infoIcon }} />
          </Typography>
          <Price variant="body1" fontWeight="bold" price={tax} />
        </Box>
      </Box>
      <Divider sx={{ margin: '0 0.438rem' }} />
      <Box sx={{ ...styles.priceTotalRow }}>
        <Typography sx={{ ...styles.priceLabel }} variant="body1" fontWeight="bold">
          {totalLabel}
        </Typography>
        <Price variant="body1" fontWeight="bold" price={total} />
        {/* tobe: add sale price for promocode */}
      </Box>
    </Box>
  )
}

export default OrderPrice
