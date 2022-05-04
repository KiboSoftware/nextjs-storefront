import React, { SyntheticEvent } from 'react'

import { Button, Stack, styled, Theme } from '@mui/material'
import { useTranslation } from 'next-i18next'

export interface ActionsProps {
  onGoToCart: () => void
  onContinueShopping: () => void
}

interface StyledButtonProps {
  theme?: Theme
}

const StyledActionsComponent = styled(Stack)(() => ({
  width: '100%',
  flexDirection: 'column',
  alignItems: 'stretch',
  padding: '0 2%',
  marginBottom: '1.438rem',
}))

const StyledGoToCartButton = styled(Button)(({ theme }: StyledButtonProps) => ({
  width: '100%',
  fontSize: theme?.typography.subtitle1.fontSize,
}))

const StyledContinueShoppingButton = styled(Button)(({ theme }: StyledButtonProps) => ({
  color: theme?.palette.grey[900],
  backgroundColor: theme?.palette.grey[50],
  borderColor: theme?.palette.grey[500],
  fontSize: theme?.typography.subtitle1.fontSize,
}))

const Actions = (props: ActionsProps) => {
  const { onGoToCart, onContinueShopping } = props
  const { t } = useTranslation('common')

  const handleGoToCart = (e: SyntheticEvent<Element, Event>) => {
    e.preventDefault()
    onGoToCart()
  }
  const handleContinueShopping = (e: SyntheticEvent<Element, Event>) => {
    e.preventDefault()
    onContinueShopping()
  }

  return (
    <StyledActionsComponent data-testid="actions-component" spacing={1}>
      <StyledGoToCartButton variant="contained" onClick={handleGoToCart}>
        {t('go-to-cart')}
      </StyledGoToCartButton>
      <StyledContinueShoppingButton variant="outlined" onClick={handleContinueShopping}>
        {t('continue-shopping')}
      </StyledContinueShoppingButton>
    </StyledActionsComponent>
  )
}

export default Actions
