import React, { SyntheticEvent } from 'react'

import { Button, Stack } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useTranslation } from 'next-i18next'

export interface ActionsProps {
  onAddToCart: () => void
  onContinueShopping: () => void
}

const Actions = (props: ActionsProps) => {
  const { onAddToCart, onContinueShopping } = props

  const { t } = useTranslation('common')

  const handleGoToCart = (e: SyntheticEvent<Element, Event>) => {
    e.preventDefault()
    onAddToCart()
  }
  const handleContinueShopping = (e: SyntheticEvent<Element, Event>) => {
    e.preventDefault()
    onContinueShopping()
  }

  const actionContainerStyle = {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: '0 2% 4% 2%',
  }
  const goToCartStyle = { width: '100%', fontSize: '18px' }
  const continueButtonStyle = {
    color: grey[500],
    background: grey[50],
    borderColor: grey[500],
    fontSize: '18px',
  }

  return (
    <Stack
      data-testid="actions-component"
      spacing={1}
      sx={{
        ...actionContainerStyle,
      }}
    >
      <Button variant="contained" sx={{ ...goToCartStyle }} onClick={handleGoToCart}>
        {t('go-to-cart')}
      </Button>
      <Button
        variant="outlined"
        sx={{
          ...continueButtonStyle,
        }}
        onClick={handleContinueShopping}
      >
        {t('continue-shopping')}
      </Button>
    </Stack>
  )
}

export default Actions
