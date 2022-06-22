import React from 'react'

import { Info } from '@mui/icons-material'
import { Typography, Box, Divider, styled, Theme } from '@mui/material'

export interface OrderPriceProps {
  subTotalLabel: string
  fullfillmentMethodLable: string
  taxLabel: string
  totalLabel: string
  subTotal: string
  fulfillmentMethodCharge: string
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
  textAlign: 'right',
  flex: '50%',
  color: theme?.palette.text.primary,
}))

const OrderPrice = (props: OrderPriceProps) => {
  const {
    subTotalLabel,
    fullfillmentMethodLable,
    taxLabel,
    totalLabel,
    subTotal,
    fulfillmentMethodCharge,
    tax,
    total,
  } = props

  return (
    <Box sx={{ width: '100%' }} data-testid={'order-price-component'}>
      <StyledPriceSection>
        <StyledPriceRow>
          <StyledPriceLabel variant="body2">{subTotalLabel}</StyledPriceLabel>
          <StyledPriceData variant="body2">{subTotal}</StyledPriceData>
        </StyledPriceRow>
        <StyledPriceRow>
          <StyledPriceLabel variant="body2">{fullfillmentMethodLable}</StyledPriceLabel>
          <StyledPriceData variant="body2">{fulfillmentMethodCharge}</StyledPriceData>
        </StyledPriceRow>
        <StyledPriceRow>
          <StyledPriceLabel variant="body2">
            {taxLabel} <Info sx={{ width: '0.688rem', height: '0.688rem' }} />
          </StyledPriceLabel>
          <StyledPriceData variant="body2">{tax}</StyledPriceData>
        </StyledPriceRow>
      </StyledPriceSection>
      <Divider sx={{ margin: '0 0.438rem' }} />
      <StyledPriceTotalRow>
        <StyledPriceLabel variant="body2" fontWeight="bold">
          {totalLabel}
        </StyledPriceLabel>
        <StyledPriceData variant="body2" fontWeight="bold">
          {total}
        </StyledPriceData>
      </StyledPriceTotalRow>
    </Box>
  )
}

export default OrderPrice
