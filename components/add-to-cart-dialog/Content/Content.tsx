import React from 'react'

import InfoIcon from '@mui/icons-material/Info'
import { Typography, Box, Divider, styled, Theme } from '@mui/material'
import { useTranslation } from 'next-i18next'

interface CartContentProps {
  fullfillmentOption: string
  quantity: number
  subtotal: string
  tax: string
  total: string
}

interface StyledThemeProps {
  theme?: Theme
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

const StyledPriceLabel = styled(Typography)(({ theme }: StyledThemeProps) => ({
  flex: '50%',
  color: theme?.palette.text.primary,
}))

const StyledPriceData = styled(Typography)(({ theme }: StyledThemeProps) => ({
  width: '1.25rem',
  height: '1.25rem',
  textAlign: 'right',
  flex: '50%',
  color: theme?.palette.text.primary,
}))

const Content = (props: CartContentProps) => {
  const { fullfillmentOption, quantity, subtotal, tax, total } = props
  const { t } = useTranslation('common')

  return (
    <Box sx={{ width: '100%' }} data-testid="content-component">
      <Box>
        <Typography gutterBottom>Product Component</Typography>
      </Box>
      <Divider />
      <StyledPriceSection>
        <StyledPriceRow>
          <StyledPriceLabel variant="body2">
            {t('cart-sub-total', { quantity: quantity })}
          </StyledPriceLabel>
          <StyledPriceData variant="body2">{t('currency', { val: subtotal })}</StyledPriceData>
        </StyledPriceRow>
        <StyledPriceRow>
          <StyledPriceLabel variant="body2">{t('standard-shopping')}</StyledPriceLabel>
          <StyledPriceData variant="body2">{fullfillmentOption}</StyledPriceData>
        </StyledPriceRow>
        <StyledPriceRow>
          <StyledPriceLabel variant="body2">
            {t('estimated-tax')} <InfoIcon sx={{ width: '0.688rem', height: '0.688rem' }} />
          </StyledPriceLabel>
          <StyledPriceData variant="body2">{t('currency', { val: tax })}</StyledPriceData>
        </StyledPriceRow>
      </StyledPriceSection>
      <Divider sx={{ margin: '0 0.438rem' }} />
      <StyledPriceTotalRow>
        <StyledPriceLabel variant="body2" fontWeight="bold">
          {t('total')}
        </StyledPriceLabel>
        <StyledPriceData variant="body2" fontWeight="bold">
          {t('currency', { val: total })}
        </StyledPriceData>
      </StyledPriceTotalRow>
    </Box>
  )
}

export default Content
