import React from 'react'

import { Info } from '@mui/icons-material'
import { Typography, Box, Divider, styled, Theme } from '@mui/material'

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

const StyledPriceSection = styled(Box)(() => ({
  padding: '0 0.438rem',
}))

const StyledPriceRow = styled(Box)(() => ({
  display: 'flex',
  padding: '0.563rem 0',
}))

const StyledPriceTotalRow = styled(Box)(() => ({
  display: 'flex',
  padding: '1.188rem 0.438rem 0.25rem 0.438rem',
}))

const StyledPriceLabel = styled(Typography)(({ theme }: { theme?: Theme }) => ({
  flex: '50%',
  color: theme?.palette.text.primary,
}))

const StyledPriceData = styled(Typography)(({ theme }: { theme?: Theme }) => ({
  width: '1.25rem',
  height: '1.25rem',
  display: 'flex',
  justifyContent: 'flex-end',
  flex: '50%',
  color: theme?.palette.text.primary,
}))

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
      <StyledPriceSection>
        <StyledPriceRow>
          <StyledPriceLabel variant="body2">{subTotalLabel}</StyledPriceLabel>
          <StyledPriceData variant="body2">
            <Price variant="body2" fontWeight="normal" price={subTotal} />
          </StyledPriceData>
        </StyledPriceRow>
        <StyledPriceRow>
          <StyledPriceLabel variant="body2">{shippingTotalLabel}</StyledPriceLabel>
          <StyledPriceData variant="body2">
            <Price variant="body2" fontWeight="normal" price={shippingTotal} />
          </StyledPriceData>
        </StyledPriceRow>
        <StyledPriceRow>
          <StyledPriceLabel variant="body2">
            {taxLabel} <Info sx={{ width: '0.688rem', height: '0.688rem' }} />
          </StyledPriceLabel>
          <StyledPriceData variant="body2">
            <Price variant="body2" fontWeight="normal" price={tax} />
          </StyledPriceData>
        </StyledPriceRow>
      </StyledPriceSection>
      <Divider sx={{ margin: '0 0.438rem' }} />
      <StyledPriceTotalRow>
        <StyledPriceLabel variant="body2" fontWeight="bold">
          {totalLabel}
        </StyledPriceLabel>
        <StyledPriceData variant="body2" fontWeight="bold">
          <Price variant="body2" fontWeight="normal" price={total} />
          {/* tobe: add sale price for promocode */}
        </StyledPriceData>
      </StyledPriceTotalRow>
    </Box>
  )
}

export default OrderPrice
